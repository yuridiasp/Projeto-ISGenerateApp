import { PdfDiaryMetadata } from "@models/diaryReader/diaryReader.models";
import { fixDiaryEncoding } from "./diaryEncoding.helpers";
import { cleanDiaryValue } from "./diaryText.helpers";

export function normalizePdfDiaryText(text: string): string {
  const fixed = fixDiaryEncoding(text)
    .replace(/\r/g, "")
    .replace(/\t/g, " ")

    // Corrige links quebrados
    .replace(/https:\s*\/\s*\/\s*/gi, "https://")
    .replace(/\/\s+/g, "/")
    .replace(/\s+\?/g, "?");

  return removeSerdijulNoise(fixed)
    .replace(/[ ]{2,}/g, " ")
    .replace(/\n{2,}/g, "\n")
    .trim();
}

export function normalizePdfDiaryMarkers(text: string): string {
  return fixDiaryEncoding(text)
    .replace(/\r/g, "")
    .replace(/\t/g, " ")

    .replace(/C[oó]digo\s*:/gi, "Codigo:")
    .replace(/Código\s*:/gi, "Codigo:")

    .replace(/Informa(?:ç|c)[oõ]es\s*:/gi, "Informacoes:")
    .replace(/Informa├º├Áes\s*:/gi, "Informacoes:")

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

    .replace(/https:\s*\/\s*\/\s*/gi, "https://")
    .replace(/\/\s+/g, "/")
    .replace(/\s+\?/g, "?")

    .replace(/\n+/g, " ")
    .replace(/[ ]{2,}/g, " ")
    .trim();
}

export function removeSerdijulNoise(text: string): string {
  return text
    // Cabeçalho principal
    .replace(
      /DIÁRIO DO TRIBUNAL REGIONAL DO TRABALHO DE SERGIPE\s*\(20ª\s*REGIÃO\)\s*-\s*DJN/gi,
      " "
    )
    .replace(
      /DIARIO DO TRIBUNAL REGIONAL DO TRABALHO DE SERGIPE\s*\(20ª\s*REGIAO\)\s*-\s*DJN/gi,
      " "
    )

    // Cabeçalho de edição/publicação
    .replace(/Edição\s*n[ºo]\s*Data\s+da\s+Divulgação:[\s\S]*?Data\s+da\s+Publicação:[^\n]+/gi, " ")
    .replace(/Edicao\s*n[ºo]?\s*Data\s+da\s+Divulgacao:[\s\S]*?Data\s+da\s+Publicacao:[^\n]+/gi, " ")

    // Palavra "Publicações" isolada
    .replace(/\bPublicações\b/gi, " ")
    .replace(/\bPublicacoes\b/gi, " ")

    // Rodapé SERDIJUL
    .replace(/Rua\s+São\s+Cristovão,[\s\S]*?serdijul@globo\.com/gi, " ")
    .replace(/Rua\s+Sao\s+Cristovao,[\s\S]*?serdijul@globo\.com/gi, " ")
    .replace(/Tel:\s*\(\d+\)\s*[\d-]+\s*-\s*Cel:\s*[\d-]+\s*-\s*[\d-]+\.?/gi, " ")
    .replace(/serdijulsergipe@gmail\.com\s*-\s*serdijul@globo\.com/gi, " ")

    // Paginação
    .replace(/\s+\d+\s+of\s+\d+\s+/gi, " ")
    .replace(/\n\s*\d+\s*\n/g, "\n")

    // Espaços
    .replace(/[ ]{2,}/g, " ")
    .replace(/\n{2,}/g, "\n")
    .trim();
}

export function extractPdfDiaryMetadata(text: string): PdfDiaryMetadata {
  const fixedText = fixDiaryEncoding(text);

  return {
    jornal: extractPdfDiaryJornal(fixedText),
    tribunal: extractPdfDiaryTribunal(fixedText),
    dataDivulgacao: extractPdfDiaryDataDivulgacao(fixedText),
    dataPublicacao: extractPdfDiaryDataPublicacao(fixedText)
  };
}

function extractPdfDiaryJornal(text: string): string | undefined {
  const fixed = fixDiaryEncoding(text)
    .replace(/\r/g, "")
    .replace(/\n+/g, " ")
    .replace(/[ ]{2,}/g, " ");

  const match = fixed.match(
    /(DI[ÁA]RIO\s+DO\s+TRIBUNAL[\s\S]*?\(20ª\s+REGIÃO\)\s*-\s*DJN)/i
  );

  return cleanDiaryValue(match?.[1]);
}

function extractPdfDiaryTribunal(text: string): string | undefined {
  const jornal = extractPdfDiaryJornal(text);

  if (!jornal) return undefined;

  const tribunal = jornal
    .replace(/^DI[ÁA]RIO\s+DO\s+/i, "")
    .replace(/\s*-\s*DJN$/i, "")
    .trim();

  return cleanDiaryValue(tribunal);
}

function extractPdfDiaryDataDivulgacao(text: string): string | undefined {
  const match = text.match(
    /Data\s+da\s+Divulga[cç][aã]o:\s*([^\n]+)/i
  );

  return cleanDiaryValue(match?.[1]);
}

function extractPdfDiaryDataPublicacao(text: string): string | undefined {
  const match = text.match(
    /Data\s+da\s+Publica[cç][aã]o:\s*([^\n]+)/i
  );

  return cleanDiaryValue(match?.[1]);
}