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

function extractPdfDiaryJornal(text: string): string | undefined {
  const fixed = fixDiaryEncoding(text)
    .replace(/\r/g, "")
    .replace(/\n+/g, " ")
    .replace(/[ ]{2,}/g, " ");

  const match =
    fixed.match(/(DI[ÁAÃ]RIO\s+DO\s+TRIBUNAL[\s\S]*?DJN)/i) ??
    fixed.match(/(DIARIO\s+DO\s+TRIBUNAL[\s\S]*?DJN)/i);

  return cleanDiaryValue(match?.[1]);
}

function extractPdfDiaryTribunal(text: string): string | undefined {
  const jornal = extractPdfDiaryJornal(text);

  if (!jornal) return undefined;

  const tribunal = jornal
    .replace(/^DI[ÁAÃ]RIO\s+DO\s+/i, "")
    .replace(/^DIARIO\s+DO\s+/i, "")
    .replace(/\s*-\s*DJN$/i, "")
    .trim();

  return cleanDiaryValue(tribunal);
}

function extractPdfDiaryDataDivulgacao(text: string): string | undefined {
  const match = text.match(
    /Data\s+da\s+Divulga(?:ç|c)[aã]o:\s*([^\n]+)/i
  );

  return cleanDiaryValue(match?.[1]);
}

function extractPdfDiaryDataPublicacao(text: string): string | undefined {
  const match = text.match(
    /Data\s+da\s+Publica(?:ç|c)[aã]o:\s*([^\n]+)/i
  );

  return cleanDiaryValue(match?.[1]);
}