//src/services/pdfDiaryParser/pdfDiaryParser.services.ts

import { DiaryRecord, PdfDiaryMetadata } from "@models/diaryReader/diaryReader.models";
import { extractValue } from "@helpers/diaryRegex.helpers";
import { normalizePdfDiaryMarkers } from "@helpers/pdfDiaryText.helpers";
import { extractDiaryPartes } from "@helpers/diaryPartes.helpers";
import { extractDiaryAdvogados } from "@helpers/diaryAdvogados.helpers";
import { cleanDiaryValue, removeComunicacaoId } from "@helpers/diaryText.helpers";
import { removeSerdijulNoise } from "@helpers/pdfDiaryText.helpers";
import { resolveMainProcessNumber } from "@services/diaryParser/diaryPublicationParser.services";

function extractMainTJSEProcessNumber(informacoes: string): string | undefined {
  return (
    extractValue(
      informacoes,
      /(?:NRO\.?|Nº|N°|NUMERO|NÚMERO)\s*(?:DO\s+)?PROCESSO\.*\s*:\s*([0-9]{8,})/i
    ) ??
    extractValue(
      informacoes,
      /PROCESSO\.*\s*:\s*([0-9]{8,})(?![-.\d])/i
    )
  );
}

function extractCNJProcessNumber(informacoes: string): string | undefined {
  return (
    extractValue(informacoes, /NUMERO\s+UNICO\s*:\s*([0-9.-]+)/i) ??
    extractValue(informacoes, /NÚMERO\s+ÚNICO\s*:\s*([0-9.-]+)/i)
  );
}

function extractOriginProcessNumber(informacoes: string): string | undefined {
  return extractValue(
    informacoes,
    /PROCESSO\s+ORIGEM\.*\s*:\s*([0-9A-Z./-]+)/i
  );
}

export function parsePdfDiaryRecords(
  text: string,
  metadata: PdfDiaryMetadata = {}
): DiaryRecord[] {
  const normalized = normalizePdfDiaryMarkers(text);

  if (isOutlookIsProcessosLayout(normalized)) {
    return parseOutlookIsProcessosRecords(normalized, metadata);
  }

  if (isSerdijulLayout(normalized)) {
    return parseSerdijulPdfDiaryRecords(normalized, metadata);
  }

  return parseDefaultPdfDiaryRecords(normalized, metadata);
}

function parseOutlookIsProcessosRecords(
  text: string,
  metadata: PdfDiaryMetadata
): DiaryRecord[] {
  const blocks = text
    .split(/(?=Data\s*:\s*\d{2}\/\d{2}\/\d{4})/gi)
    .map(block => block.trim())
    .filter(block =>
      /^Data\s*:\s*\d{2}\/\d{2}\/\d{4}/i.test(block) &&
      /Codigo\s*:/i.test(block) &&
      /Informacoes\s*:/i.test(block)
    );

  return blocks
    .map(block => parseOutlookIsProcessosRecord(block, metadata))
    .filter(isValidOutlookIsProcessosRecord);
}

function parseOutlookIsProcessosRecord(
  block: string,
  metadata: PdfDiaryMetadata
): DiaryRecord {
  const informacoes = extractValue(
    block,
    /Informacoes\s*:\s*([\s\S]*)$/i
  );

  const data = extractValue(
    block,
    /Data\s*:\s*(\d{2}\/\d{2}\/\d{4})/i
  );

  const baseRecord: DiaryRecord = {
    layout: "DEFAULT",

    data,
    dataPublicacao: data,

    codigo: extractValue(
      block,
      /Codigo\s*:\s*([\s\S]*?)\s+Nome\s+Pesquisado\s*:/i
    ),

    nomePesquisado: extractValue(
      block,
      /Nome\s+Pesquisado\s*:\s*([\s\S]*?)\s+Jornal\s*:/i
    ),

    jornal:
      extractValue(block, /Jornal\s*:\s*([\s\S]*?)\s+Tribunal\s*:/i) ??
      metadata.jornal,

    tribunal:
      extractValue(block, /Tribunal\s*:\s*([\s\S]*?)\s+Vara\s*:/i) ??
      metadata.tribunal,

    vara: extractValue(
      block,
      /Vara\s*:\s*([\s\S]*?)\s+Informacoes\s*:/i
    ),

    informacoes,

    partes: [],
    advogados: []
  };

  if (informacoes && /Publicacao\s+Processo\s*:/i.test(informacoes)) {
    return enrichRecordWithPublicacaoProcesso(baseRecord, informacoes);
  }

  return enrichRecordWithLegacyInformation(baseRecord, informacoes ?? "");
}

function enrichRecordWithPublicacaoProcesso(
  baseRecord: DiaryRecord,
  informacoes: string
): DiaryRecord {
  const processo = resolveMainProcessNumber(informacoes);

  const orgao = extractValue(
    informacoes,
    /Orgao\s*:\s*([\s\S]*?)\s+Data\s+de\s+disponibilizacao\s*:/i
  );

  const comunicacaoId = extractValue(
    informacoes,
    /\|\s*comunicacao_id\s*:\s*([^|]+)\|/i
  );

  const conteudo = extractValue(
    informacoes,
    /Conteudo\s*:\s*([\s\S]*?)(?=\s+\|\s*comunicacao_id\s*:|$)/i
  );

  return {
    ...baseRecord,

    processo,
    processoCnj: processo,

    orgao,
    vara: orgao ?? baseRecord.vara,

    dataDisponibilizacao: extractValue(
      informacoes,
      /Data\s+de\s+disponibilizacao\s*:\s*([\d\/-]+)/i
    ),

    tipoComunicacao: extractValue(
      informacoes,
      /Tipo\s+de\s+comunicacao\s*:\s*([\s\S]*?)\s+Meio\s*:/i
    ),

    meio: extractValue(
      informacoes,
      /Meio\s*:\s*([\s\S]*?)\s+Inteiro\s+teor\s*:/i
    ),

    inteiroTeor: extractValue(
      informacoes,
      /Inteiro\s+teor\s*:\s*([\s\S]*?)\s+Parte\s*:/i
    ),

    classe: extractValue(
      informacoes,
      /Classe\s*:\s*([\s\S]*?)\s+Conteudo\s*:/i
    ),

    conteudo: cleanDiaryValue(conteudo),

    comunicacaoId,

    informacoes: cleanDiaryValue(
      removeComunicacaoId(informacoes)
    ),

    partes: extractDiaryPartes(informacoes),
    advogados: extractDiaryAdvogados(informacoes)
  };
}

function enrichRecordWithLegacyInformation(
  baseRecord: DiaryRecord,
  informacoes: string
): DiaryRecord {
  const processo = resolveMainProcessNumber(informacoes);

  return {
    ...baseRecord,

    processo,
    processoCnj: processo,

    processoOrigem: extractOriginProcessNumber(informacoes),

    orgao: extractValue(
      informacoes,
      /ORGAO\s+JULGADOR\.*\s*:\s*([\s\S]*?)\s+RELATOR/i
    ),

    classe: extractValue(
      informacoes,
      /<\s*IDENTIFICACAO\s+DO\s+PROCESSO\s*>\s*[\d\s-]*\s*([A-ZÀ-Ú\s]+?)\s+NRO\.\s*PROCESSO/i
    ),

    conteudo: cleanDiaryValue(informacoes),

    informacoes: cleanDiaryValue(informacoes),

    partes: extractDiaryPartes(informacoes),
    advogados: extractDiaryAdvogados(informacoes)
  };
}

function isValidOutlookIsProcessosRecord(record: DiaryRecord): boolean {
  return Boolean(
    record.data &&
    record.informacoes
  );
}

function isOutlookIsProcessosLayout(text: string): boolean {
  return (
    /Data\s*:\s*\d{2}\/\d{2}\/\d{4}/i.test(text) &&
    /Codigo\s*:/i.test(text) &&
    /Informacoes\s*:/i.test(text)
  );
}

function isSerdijulLayout(text: string): boolean {
  return (
    /Publicacao\s+Processo\s*:/i.test(text) &&
    !/Data\s*:\s*\d{2}\/\d{2}\/\d{4}/i.test(text) &&
    !/Codigo\s*:/i.test(text) &&
    !/Informacoes\s*:/i.test(text)
  );
}

function parseSerdijulPdfDiaryRecords(
  text: string,
  metadata: PdfDiaryMetadata
): DiaryRecord[] {
  const blocks = extractSerdijulBlocks(text);

  return blocks
    .map(block => parseSerdijulPdfDiaryRecord(block, metadata))
    .filter(isValidSerdijulPdfDiaryRecord);
}

function extractSerdijulBlocks(text: string): string[] {
  const startRegex = /Publicacao\s+Processo\s*:/gi;

  const starts = [...text.matchAll(startRegex)]
    .map(match => match.index ?? -1)
    .filter(index => index >= 0);

  if (!starts.length) return [];

  const blocks: string[] = [];

  for (let i = 0; i < starts.length; i++) {
    const start = starts[i];
    const nextStart = starts[i + 1] ?? text.length;

    const block = removeSerdijulNoise(
      text.slice(start, nextStart).trim()
    );

    if (block) {
      blocks.push(block);
    }
  }

  return blocks;
}

function parseSerdijulPdfDiaryRecord(
  block: string,
  metadata: PdfDiaryMetadata
): DiaryRecord {
  const processo = extractValue(
    block,
    /Publicacao\s+Processo\s*:\s*([0-9.-]+)/i
  );

  const orgao = extractValue(
    block,
    /Orgao\s*:\s*([\s\S]*?)\s+Data\s+de\s+disponibilizacao\s*:/i
  );

  const comunicacaoId = extractValue(
    block,
    /\|\s*comunicacao_id\s*:\s*([^|]+)\|/i
  );

  return {
    layout: "SERDIJUL",

    processo,
    processoCnj: processo,

    orgao,
    vara: orgao,

    dataDisponibilizacao: extractValue(
      block,
      /Data\s+de\s+disponibilizacao\s*:\s*([\d\/-]+)/i
    ),

    dataDivulgacao: metadata.dataDivulgacao,
    dataPublicacao: metadata.dataPublicacao,

    tipoComunicacao: extractValue(
      block,
      /Tipo\s+de\s+comunicacao\s*:\s*([\s\S]*?)\s+Meio\s*:/i
    ),

    meio: extractValue(
      block,
      /Meio\s*:\s*([\s\S]*?)\s+Inteiro\s+teor\s*:/i
    ),

    inteiroTeor: extractSerdijulInteiroTeor(block),

    classe: extractValue(
      block,
      /Classe\s*:\s*([\s\S]*?)\s+Conteudo\s*:/i
    ),

    conteudo: cleanSerdijulExtractedText(
      extractSerdijulConteudo(block),
      orgao
    ),

    comunicacaoId,

    informacoes: cleanSerdijulExtractedText(
      removeComunicacaoId(block),
      orgao
    ),

    partes: extractDiaryPartes(block),
    advogados: extractDiaryAdvogados(block),

    jornal: metadata.jornal,
    tribunal: metadata.tribunal
  };
}

function extractSerdijulInteiroTeor(block: string): string | undefined {
  const inteiroTeor = extractValue(
    block,
    /Inteiro\s+teor\s*:\s*([\s\S]*?)\s+Parte\s*:/i
  );

  if (!inteiroTeor) return undefined;

  return inteiroTeor
    .replace(/\s+/g, "")
    .replace(/https:\s*\/\s*\//i, "https://")
    .trim();
}

function extractSerdijulConteudo(block: string): string | undefined {
  return extractValue(
    block,
    /Conteudo\s*:\s*([\s\S]*?)(?=\s+Intimado\(s\)\s*\/\s*Citado\(s\)|\s+\|\s*comunicacao_id\s*:|$)/i
  );
}

function isValidSerdijulPdfDiaryRecord(record: DiaryRecord): boolean {
  return Boolean(
    record.processo &&
    record.orgao &&
    record.dataDisponibilizacao
  );
}

function parseDefaultPdfDiaryRecords(
  text: string,
  metadata: PdfDiaryMetadata
): DiaryRecord[] {
  const blocks = text
    .split(/(?=Data\s*:\s*\d{2}\/\d{2}\/\d{4})/gi)
    .map(block => block.trim())
    .filter(block =>
      /^Data\s*:\s*\d{2}\/\d{2}\/\d{4}/i.test(block)
    );

  return blocks
    .map(block => parseDefaultPdfDiaryRecord(block, metadata))
    .filter(isValidDefaultPdfDiaryRecord);
}

function parseDefaultPdfDiaryRecord(
  block: string,
  metadata: PdfDiaryMetadata
): DiaryRecord {
  const informacoes = extractValue(
    block,
    /Informacoes\s*:\s*([\s\S]*)$/i
  );

  return {
    layout: "DEFAULT",

    data: extractValue(
      block,
      /Data\s*:\s*(\d{2}\/\d{2}\/\d{4})/i
    ),

    dataPublicacao: extractValue(
      block,
      /Data\s*:\s*(\d{2}\/\d{2}\/\d{4})/i
    ),

    codigo: extractValue(
      block,
      /Codigo\s*:\s*([\s\S]*?)\s+Nome\s+Pesquisado\s*:/i
    ),

    nomePesquisado: extractValue(
      block,
      /Nome\s+Pesquisado\s*:\s*([\s\S]*?)\s+Jornal\s*:/i
    ),

    jornal:
      extractValue(block, /Jornal\s*:\s*([\s\S]*?)\s+Tribunal\s*:/i) ??
      metadata.jornal,

    tribunal:
      extractValue(block, /Tribunal\s*:\s*([\s\S]*?)\s+Vara\s*:/i) ??
      metadata.tribunal,

    vara: extractValue(
      block,
      /Vara\s*:\s*([\s\S]*?)\s+Informacoes\s*:/i
    ),

    informacoes,

    partes: extractDiaryPartes(block),
    advogados: extractDiaryAdvogados(block)
  };
}

function isValidDefaultPdfDiaryRecord(record: DiaryRecord): boolean {
  return Boolean(
    record.data &&
    record.informacoes
  );
}

function cleanSerdijulExtractedText(
  value: string | undefined,
  orgao?: string
): string | undefined {
  if (!value) return undefined;

  let cleaned = removeSerdijulNoise(value);

  if (orgao) {
    const escapedOrgao = escapeRegExp(orgao);

    cleaned = cleaned.replace(
      new RegExp(`\\s*${escapedOrgao}\\s*--\\s*--\\s*`, "gi"),
      " "
    );
  }

  return cleanDiaryValue(
    cleaned
      .replace(/\s*\d+ª\s+Vara\s+do\s+Trabalho\s+de\s+[A-Za-zÀ-ÿ\s]+--\s*--\s*/gi, " ")
      .replace(/\s*--\s*--\s*/g, " ")
  );
}

function escapeRegExp(value: string): string {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}