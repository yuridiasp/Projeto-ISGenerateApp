import {
  extractPdfDiaryMetadataAtPosition,
  findSerdijulPjeListBlockStarts,
  isSerdijulPjeListText
} from "@helpers/pdfDiaryText.helpers";
import {
  findSerdijulPautaJulgamentoBlockStarts,
  isSerdijulPautaJulgamentoText
} from "@helpers/pdfDiaryText.helpers"
import {
  isValidSerdijulPautaJulgamentoRecord,
  parseSerdijulPautaJulgamentoRecord
} from "./serdijulPautaJulgamentoParser.services"
import {
  isValidSerdijulPjeListRecord,
  parseSerdijulPjeListRecord
} from "./serdijulPjeListParser.services";
import { DiaryRecord, PdfDiaryMetadata } from "@models/diaryReader/diaryReader.models";
import { extractValue } from "@helpers/diaryRegex.helpers";
import { normalizePdfDiaryMarkers } from "@helpers/pdfDiaryText.helpers";
import { extractDiaryPartes } from "@helpers/diaryPartes.helpers";
import { extractDiaryAdvogados } from "@helpers/diaryAdvogados.helpers";
import { cleanDiaryValue, removeComunicacaoId } from "@helpers/diaryText.helpers";
import { removeSerdijulNoise } from "@helpers/pdfDiaryText.helpers";
import {
  resolveDiaryProcessNumbers,
  resolveMainProcessNumber
} from "@services/diaryParser/diaryPublicationParser.services";

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
  const normalized =
    normalizePdfDiaryMarkers(text);

  if (
    isOutlookIsProcessosLayout(
      normalized
    )
  ) {
    return parseOutlookIsProcessosRecords(
      normalized,
      metadata
    );
  }

  if (
    isSerdijulLayout(
      normalized
    )
  ) {
    return parseSerdijulPdfDiaryRecords(
      normalized,
      metadata
    );
  }

  return parseDefaultPdfDiaryRecords(
    normalized,
    metadata
  );
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
  const {
    processo,
    processoCnj
  } = resolveDiaryProcessNumbers(informacoes);

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
    processoCnj,

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

function isOutlookIsProcessosLayout(
  text: string
): boolean {
  const blockPattern =
    /Data\s*:\s*\d{2}\/\d{2}\/\d{4}[\s\S]{0,500}?Codigo\s*:[\s\S]{0,500}?Nome\s+Pesquisado\s*:[\s\S]{0,500}?Jornal\s*:[\s\S]{0,500}?Tribunal\s*:[\s\S]{0,500}?Vara\s*:[\s\S]{0,500}?Informacoes\s*:/i;

  return blockPattern.test(text);
}

function isSerdijulLayout(
  text: string
): boolean {
  const hasPautaJulgamento = isSerdijulPautaJulgamentoText(text)

  const hasTraditionalLayout =
    /Publicacao\s+Processo\s*:/i
      .test(text);

  const hasPjeListLayout =
    isSerdijulPjeListText(text);

  return (
    hasTraditionalLayout ||
    hasPjeListLayout ||
    hasPautaJulgamento
  )
}

type SerdijulBlockKind =
  | "PUBLICACAO_PROCESSO"
  | "PJE_LIST"
  | "PAUTA_JULGAMENTO"


interface SerdijulBlock {
  kind: SerdijulBlockKind;
  start: number;
  text: string;
}


function parseSerdijulPdfDiaryRecords(
  text: string,
  metadata: PdfDiaryMetadata
): DiaryRecord[] {
  const blocks =
    extractSerdijulBlocks(text);

  const records:
    DiaryRecord[] = [];

  for (const block of blocks) {
    const localMetadata =
      extractPdfDiaryMetadataAtPosition(
        text,
        block.start,
        metadata
    );

    if (block.kind === "PAUTA_JULGAMENTO") {
      const record = parseSerdijulPautaJulgamentoRecord(block.text, localMetadata)

      if (isValidSerdijulPautaJulgamentoRecord(record)) {
        records.push(record)
      }

      continue
    }

    if (
      block.kind ===
      "PJE_LIST"
    ) {
      const record =
        parseSerdijulPjeListRecord(
          block.text,
          localMetadata
        );

      if (
        isValidSerdijulPjeListRecord(
          record
        )
      ) {
        records.push(record);
      }

      continue;
    }

    const record =
      parseSerdijulPdfDiaryRecord(
        block.text,
        localMetadata
      );

    if (
      isValidSerdijulPdfDiaryRecord(
        record
      )
    ) {
      records.push(record);
    }
  }

  return records;
}


function extractSerdijulBlocks(
  text: string
): SerdijulBlock[] {
  const pautaStarts = findSerdijulPautaJulgamentoBlockStarts(text).map(start => ({
    kind:
      "PAUTA_JULGAMENTO" as const,
    start
  }))

  const publicationStarts =
    [
      ...text.matchAll(
        /Publicacao\s+Processo\s*:/gi
      )
    ]
      .map(match => ({
        kind:
          "PUBLICACAO_PROCESSO",

        start:
          match.index ?? -1
      }))
      .filter(
        item =>
          item.start >= 0
      );

  const pjeStarts =
    findSerdijulPjeListBlockStarts(
      text
    )
      .map(start => ({
        kind:
          "PJE_LIST",
        start
      }));

  const starts = [
    ...publicationStarts,
    ...pjeStarts,
    ...pautaStarts
  ]
    .sort(
      (a, b) =>
        a.start - b.start
    )
    .filter(
      (
        item,
        index,
        array
      ) =>
        index === 0 ||
        item.start !==
          array[index - 1].start
    );

  const blocks:
    SerdijulBlock[] = [];

  for (
    let index = 0;
    index < starts.length;
    index++
  ) {
    const current =
      starts[index];

    const next =
      starts[index + 1];

    const end =
      next?.start ??
      text.length;

    const rawBlock =
      text
        .slice(
          current.start,
          end
        )
        .trim();

    if (!rawBlock) {
      continue;
    }

    blocks.push({
      kind: current.kind as SerdijulBlockKind,

      start:
        current.start,

      text:
        current.kind ===
        "PUBLICACAO_PROCESSO"
          ? removeSerdijulNoise(
              rawBlock
            )
          : rawBlock
    });
  }

  return blocks;
}

function parseSerdijulPdfDiaryRecord(
  block: string,
  metadata: PdfDiaryMetadata
): DiaryRecord {

  const { processo, processoCnj } = resolveDiaryProcessNumbers(block);

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
    processoCnj,

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