import { PdfDiaryMetadata } from "@models/diaryReader/diaryReader.models";
import { fixDiaryEncoding } from "./diaryEncoding.helpers";
import { cleanDiaryValue } from "./diaryText.helpers";

export function normalizePdfDiaryText(text: string): string {
  return fixDiaryEncoding(text)
    .replace(/\r/g, "")
    .replace(/\t/g, " ")

    // Corrige links quebrados
    .replace(/https:\s*\/\s*\/\s*/gi, "https://")
    .replace(/\/\s+/g, "/")
    .replace(/\s+\?/g, "?")

    // IMPORTANTE:
    // Não remover números isolados aqui.
    // Isso apagava o "Código: 259" dos PDFs IS Processos.

    .replace(/[ ]{2,}/g, " ")
    .replace(/\n{2,}/g, "\n")
    .trim();
}

export function normalizePdfDiaryMarkers(text: string): string {
  return fixDiaryEncoding(text)
    .replace(/\r/g, "")
    .replace(/\t/g, " ")

    // Marcadores gerais do layout IS Processos / Outlook
    .replace(/C[oó]digo\s*:/gi, "Codigo:")
    .replace(/Código\s*:/gi, "Codigo:")
    .replace(/Informa(?:ç|c)[oõ]es\s*:/gi, "Informacoes:")
    .replace(/Informações\s*:/gi, "Informacoes:")
    .replace(/Informa├º├Áes\s*:/gi, "Informacoes:")

    // Marcadores internos DJN / SERDIJUL
    .replace(/Publica(?:c|ç)[aã]o\s+Processo\s*:/gi, "Publicacao Processo:")
    .replace(/\bOrg[aã]o\s*:/gi, "Orgao:")
    .replace(/Data\s+de\s+disponibiliza(?:c|ç)[aã]o\s*:/gi, "Data de disponibilizacao:")
    .replace(/Tipo\s+de\s+comunica(?:c|ç)[aã]o\s*:/gi, "Tipo de comunicacao:")
    .replace(/Meio\s*:/gi, "Meio:")
    .replace(/Inteiro\s+teor\s*:/gi, "Inteiro teor:")
    .replace(/\bParte\s*:/gi, "Parte:")
    .replace(/\bAdvogado\s*:/gi, "Advogado:")
    .replace(/\bClasse\s*:/gi, "Classe:")
    .replace(/Conte[uú]do\s*:/gi, "Conteudo:")
    .replace(/\|\s*comunicacao_id\s*:\s*/gi, "|comunicacao_id: ")

    // Marcadores SERDIJUL / listas PJe
    .replace(/\bNPU\s*:/gi, "NPU:")
    .replace(/Polo\s+Ativo\s*:/gi, "Polo Ativo:")
    .replace(/Polo\s+Passivo\s*:/gi, "Polo Passivo:")
    .replace(
      /Data\s+e\s+hora\s+da\s+disponibiliza(?:c|ç)[aã]\s*o\s+da\s+Intima(?:c|ç)[aã]o\s+no\s+Painel\s*:/gi,
      "Data e hora da disponibilizacao da Intimacao no Painel:"
    )
    .replace(
      /Identificador\s+do\s+documento\s*:/gi,
      "Identificador do documento:"
    )
    .replace(
      /Classe\s+do\s+Processo\s*:/gi,
      "Classe do Processo:"
    )
    .replace(
      /Org[aã]o\s+Julgador\s*:/gi,
      "Orgao Julgador:"
    )
    .replace(
      /Data\s+Limite\s*:/gi,
      "Data Limite:"
    )

    // Links
    .replace(/https:\s*\/\s*\/\s*/gi, "https://")
    .replace(/\/\s+/g, "/")
    .replace(/\s+\?/g, "?")

    // Junta linhas para facilitar regex.
    .replace(/\n+/g, " ")
    .replace(/[ ]{2,}/g, " ")
    .trim();
}

export function removeSerdijulNoise(text: string): string {
  return fixDiaryEncoding(text)
    // Cabeçalhos SERDIJUL/TRT
    .replace(
      /DI[ÁAÃ]RIO\s+DO\s+TRIBUNAL\s+REGIONAL\s+DO\s+TRABALHO\s+DE\s+SERGIPE\s*\(20ª\s+REGI[AÃ]O\)\s*-\s*DJN/gi,
      " "
    )

    // Rodapé SERDIJUL
    .replace(/Rua\s+S[aã]o\s+Cristov[aã]o,[\s\S]*?serdijul@globo\.com/gi, " ")
    .replace(/Tel:\s*\(\d+\)\s*[\d-]+\s*-\s*Cel:\s*[\d-]+\s*-\s*[\d-]+\.?/gi, " ")
    .replace(/serdijulsergipe@gmail\.com\s*-\s*serdijul@globo\.com/gi, " ")

    // Paginação segura, apenas padrão "x of y"
    .replace(/\s+\d+\s+of\s+\d+\s+/gi, " ")

    .replace(/[ ]{2,}/g, " ")
    .replace(/\n{2,}/g, "\n")
    .trim();
}

export function extractPdfDiaryMetadata(text: string): PdfDiaryMetadata {
  const fixed = fixDiaryEncoding(text);

  return {
    jornal: extractPdfDiaryJornal(fixed),
    tribunal: extractPdfDiaryTribunal(fixed),
    dataDivulgacao: extractPdfDiaryDataDivulgacao(fixed),
    dataPublicacao: extractPdfDiaryDataPublicacao(fixed)
  };
}

export function extractPdfDiaryMetadataAtPosition(
  text: string,
  position: number,
  fallback: PdfDiaryMetadata = {}
): PdfDiaryMetadata {
  const previousText =
    text.slice(0, position);

  const headerRegex =
    /DI[ÁAÃ]RIO\s+DO\s+TRIBUNAL/gi;

  const headers = [
    ...previousText.matchAll(
      headerRegex
    )
  ];

  const lastHeader =
  headers.length > 0
    ? headers[headers.length - 1]
    : undefined;

  if (
    !lastHeader ||
    lastHeader.index === undefined
  ) {
    return fallback;
  }

  const sectionText =
    text.slice(
      lastHeader.index,
      position
    );

  const local =
    extractPdfDiaryMetadata(
      sectionText
    );

  return {
    jornal:
      local.jornal ??
      fallback.jornal,

    tribunal:
      local.tribunal ??
      fallback.tribunal,

    dataDivulgacao:
      local.dataDivulgacao ??
      fallback.dataDivulgacao,

    dataPublicacao:
      local.dataPublicacao ??
      fallback.dataPublicacao
  };
}

function normalizePdfMetadataText(
  text: string
): string {
  return fixDiaryEncoding(text)
    .replace(/\r/g, "")
    .replace(/\n+/g, " ")
    .replace(/[ ]{2,}/g, " ")
    .trim();
}

function extractPdfDiaryJornal(
  text: string
): string | undefined {
  const fixed =
    normalizePdfMetadataText(text);

  const match = fixed.match(
    /(DI[ÁAÃ]RIO\s+DO\s+TRIBUNAL[\s\S]*?)(?=\s+Edi(?:ç|c)[aã]o\s+n[º°o]?)/i
  );

  return cleanDiaryValue(
    match?.[1]
  );
}

function extractPdfDiaryTribunal(
  text: string
): string | undefined {
  const jornal =
    extractPdfDiaryJornal(text);

  if (!jornal) {
    return undefined;
  }

  const tribunal = jornal
    .replace(
      /^DI[ÁAÃ]RIO\s+DO\s+/i,
      ""
    )
    .replace(
      /^DIARIO\s+DO\s+/i,
      ""
    )
    .replace(
      /\s*-\s*DJN\s*$/i,
      ""
    )
    .replace(
      /\s*-\s*PJE\s+1[º°]?\s+E\s+2[º°]?\s+GRAU\s*$/i,
      ""
    )
    .trim();

  return cleanDiaryValue(
    tribunal
  );
}

function extractPdfDiaryDataDivulgacao(
  text: string
): string | undefined {
  const fixed =
    normalizePdfMetadataText(text);

  const match = fixed.match(
    /Data\s+da\s+Divulga(?:ç|c)[aã]o\s*:\s*([\s\S]*?)(?=\s+Data\s+da\s+Publica(?:ç|c)[aã]o\s*:)/i
  );

  return cleanDiaryValue(
    match?.[1]
  );
}

function extractPdfDiaryDataPublicacao(
  text: string
): string | undefined {
  const fixed =
    normalizePdfMetadataText(text);

  const match = fixed.match(
    /Data\s+da\s+Publica(?:ç|c)[aã]o\s*:\s*([\s\S]*?)(?=\s+(?:Publica(?:ç|c)[oõ]es\b|CADERNO\b|Sr\.\s+Advogado\b|Publicacao\s+Processo\s*:|NPU\s*:)|$)/i
  );

  return cleanDiaryValue(
    match?.[1]
  );
}

export function isSerdijulPjeListText(
  text: string
): boolean {
  const normalized = fixDiaryEncoding(text)
    .replace(/\r/g, "")
    .replace(/\n+/g, " ")
    .replace(/[ ]{2,}/g, " ")
    .trim();

  const hasNpu =
    /\bNPU\s*:\s*\d{7}-\d{2}\.\d{4}\.\d\.\d{2}\.\d{4}/i
      .test(normalized);

  return (
    hasNpu &&
    /Polo\s+Ativo\s*:/i.test(normalized) &&
    /Polo\s+Passivo\s*:/i.test(normalized) &&
    /Identificador\s+do\s+documento\s*:/i
      .test(normalized) &&
    /Classe\s+do\s+Processo\s*:/i
      .test(normalized) &&
    /Org[aã]o\s+Julgador\s*:/i
      .test(normalized) &&
    /Prazo\s*:/i.test(normalized) &&
    /Data\s+Limite\s*:/i.test(normalized)
  );
}


export function findSerdijulPjeListBlockStarts(
  text: string
): number[] {
  const regex =
    /\bNPU\s*:\s*\d{7}-\d{2}\.\d{4}\.\d\.\d{2}\.\d{4}/gi;

  return [...text.matchAll(regex)]
    .map(match => match.index ?? -1)
    .filter(index => index >= 0);
}