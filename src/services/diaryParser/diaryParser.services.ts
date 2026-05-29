import { DiaryRecord } from "@models/diaryReader/diaryReader.models";
import { extractValue } from "@helpers/diaryRegex.helpers";
import { normalizePdfDiaryMarkers } from "@helpers/pdfDiaryText.helpers";
import { extractDiaryProcessNumber } from "@helpers/diaryProcess.helpers";
import { extractDiaryPartes } from "@helpers/diaryPartes.helpers";
import { extractDiaryAdvogados } from "@helpers/diaryAdvogados.helpers";
import { cleanDiaryValue, removeComunicacaoId } from "@helpers/diaryText.helpers";

export function parsePdfDiaryRecords(text: string): DiaryRecord[] {
  const normalized = normalizePdfDiaryMarkers(text);

  console.log("Tem Publicacao Processo?", /Publicacao\s+Processo\s*:/i.test(normalized));
  console.log(
    "Ocorrencias Publicacao Processo:",
    normalized.match(/Publicacao\s+Processo\s*:/gi)?.length ?? 0
  );
  console.log(
    "Ocorrencias comunicacao_id:",
    normalized.match(/\|\s*comunicacao_id\s*:/gi)?.length ?? 0
  );
  console.log("Trecho inicial normalizado:", normalized.slice(0, 1500));

  if (isSerdijulLayout(normalized)) {
    return parseSerdijulPdfDiaryRecords(normalized);
  }

  return parseDefaultPdfDiaryRecords(normalized);
}

function isSerdijulLayout(text: string): boolean {
  return /Publica(?:c|ç)[aã]o\s+Processo\s*:/i.test(text);
}

function parseDefaultPdfDiaryRecords(text: string): DiaryRecord[] {
  const blocks = text
    .split(/(?=Data:\s*\d{2}\/\d{2}\/\d{4}\s+Código:)/gi)
    .map(block => block.trim())
    .filter(block =>
      /^Data:\s*\d{2}\/\d{2}\/\d{4}\s+Código:/i.test(block)
    );

  return blocks
    .map(parseDefaultPdfDiaryRecord)
    .filter(isValidDefaultPdfDiaryRecord);
}

function parseDefaultPdfDiaryRecord(block: string): DiaryRecord {
  const informacoes = extractValue(
    block,
    /Informações:\s*([\s\S]*)$/i
  );

  const record: DiaryRecord = {
    layout: "DEFAULT",

    data: extractValue(
      block,
      /Data:\s*(\d{2}\/\d{2}\/\d{4})/i
    ),

    codigo: extractValue(
      block,
      /Código:\s*([\s\S]*?)\s+Nome Pesquisado:/i
    ),

    nomePesquisado: extractValue(
      block,
      /Nome Pesquisado:\s*([\s\S]*?)\s+Jornal:/i
    ),

    jornal: extractValue(
      block,
      /Jornal:\s*([\s\S]*?)\s+Tribunal:/i
    ),

    tribunal: extractValue(
      block,
      /Tribunal:\s*([\s\S]*?)\s+Vara:/i
    ),

    vara: extractValue(
      block,
      /Vara:\s*([\s\S]*?)\s+Informações:/i
    ),

    informacoes,
    partes: [],
    advogados: []
  };

  return enrichDefaultPdfDiaryRecord(record);
}

function enrichDefaultPdfDiaryRecord(record: DiaryRecord): DiaryRecord {
  const text = record.informacoes ?? "";

  const comunicacaoId = extractValue(
    text,
    /\|comunicacao_id:\s*([^|]+)\|/i
  );

  const informacoes = record.informacoes
    ? record.informacoes.replace(/\|comunicacao_id:\s*[^|]+\|/i, "").trim()
    : record.informacoes;

  return {
    ...record,
    comunicacaoId,
    informacoes,

    processo: extractDiaryProcessNumber(text),

    orgao:
      extractValue(text, /Orgao:\s*([\s\S]*?)\s+Data de disponibilizacao:/i) ??
      extractValue(text, /ORGAO JULGADOR\.*:\s*([\s\S]*?)\s+RELATOR/i),

    dataDisponibilizacao: extractValue(
      text,
      /Data de disponibilizacao:\s*([\d\/-]+)/i
    ),

    tipoComunicacao: extractValue(
      text,
      /Tipo de comunicacao:\s*([\s\S]*?)\s+Meio:/i
    ),

    meio: extractValue(
      text,
      /Meio:\s*([\s\S]*?)\s+Inteiro teor:/i
    ),

    inteiroTeor: extractValue(
      text,
      /Inteiro teor:\s*(https?:\/\/[^\s]+)/i
    ),

    classe: extractValue(
      text,
      /Classe:\s*([\s\S]*?)\s+Conteudo:/i
    ),

    conteudo: extractValue(text, /Conteudo:\s*([\s\S]*)$/i),

    partes: extractDiaryPartes(text),
    advogados: extractDiaryAdvogados(text)
  };
}

function isValidDefaultPdfDiaryRecord(record: DiaryRecord): boolean {
  return Boolean(
    record.data &&
    record.codigo &&
    record.informacoes
  );
}

function parseSerdijulPdfDiaryRecords(text: string): DiaryRecord[] {
  const blocks = extractSerdijulBlocks(text);

  console.log("Blocos SERDIJUL extraidos:", blocks.length);

  if (blocks.length > 0) {
    console.log("Primeiro bloco SERDIJUL:", blocks[0].slice(0, 1200));
  }

  return blocks
    .map(parseSerdijulPdfDiaryRecord)
    .filter(isValidSerdijulPdfDiaryRecord);
}

function extractSerdijulBlocks(text: string): string[] {
  const startRegex = /Publicacao\s+Processo\s*:/gi;

  const starts = [...text.matchAll(startRegex)].map(match => match.index ?? -1).filter(index => index >= 0);

  if (!starts.length) return [];

  const blocks: string[] = [];

  for (let i = 0; i < starts.length; i++) {
    const start = starts[i];
    const nextStart = starts[i + 1] ?? text.length;

    const block = text.slice(start, nextStart).trim();

    if (block) {
      blocks.push(block);
    }
  }

  return blocks;
}

function parseSerdijulPdfDiaryRecord(block: string): DiaryRecord {
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

  const conteudo = extractSerdijulConteudo(block);

  return {
    layout: "SERDIJUL",

    processo,
    processoCnj: processo,

    orgao,
    vara: orgao,

    dataDisponibilizacao: extractValue(
      block,
      /Data\s+de\s+disponibilizacao\s*:\s*([\d-]+)/i
    ),

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

    conteudo,

    comunicacaoId,

    informacoes: cleanDiaryValue(removeComunicacaoId(block)),

    partes: extractDiaryPartes(block),
    advogados: extractDiaryAdvogados(block),

    jornal: "Diário de Justiça Eletrônico Nacional",
    tribunal: "TRT20"
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
  const conteudo = extractValue(
    block,
    /Conteudo\s*:\s*([\s\S]*?)(?=\s+Intimado\(s\)\s*\/\s*Citado\(s\)|\s+\|\s*comunicacao_id\s*:|$)/i
  );

  return cleanDiaryValue(conteudo);
}

function isValidSerdijulPdfDiaryRecord(record: DiaryRecord): boolean {
  return Boolean(
    record.processo &&
    record.orgao &&
    record.dataDisponibilizacao &&
    record.comunicacaoId
  );
}