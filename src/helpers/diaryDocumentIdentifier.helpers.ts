import path from "path";
import { DiaryDocumentIdentification, DiaryDocumentLayout, DiaryFileType } from "@models/diaryReader/diaryReader.models";
import { fixDiaryEncoding } from "./diaryEncoding.helpers";

export function identifyDiaryDocument(
  filePath: string,
  rawText: string
): DiaryDocumentIdentification {
  const extension = path.extname(filePath).toLowerCase();

  const fileType = identifyFileType(extension);

  const normalizedText = normalizeTextForIdentification(rawText);

  const layout = identifyDocumentLayout(fileType, normalizedText);

  const reasons = getIdentificationReasons(fileType, layout, normalizedText);

  return {
    fileType,
    layout,
    extension,
    confidence: calculateConfidence(layout, reasons),
    reasons
  };
}

function identifyFileType(extension: string): DiaryFileType {
  if (extension === ".pdf") return "PDF";
  if (extension === ".docx") return "DOCX";
  if (extension === ".doc") return "DOC";

  return "UNKNOWN";
}

function normalizeTextForIdentification(text: string): string {
  return fixDiaryEncoding(text)
    .replace(/\r/g, "")
    .replace(/\t/g, " ")
    .replace(/C[oó]digo\s*:/gi, "Codigo:")
    .replace(/Código\s*:/gi, "Codigo:")
    .replace(/Informa(?:ç|c)[oõ]es\s*:/gi, "Informacoes:")
    .replace(/Informações\s*:/gi, "Informacoes:")
    .replace(/Data\s+Disponibiliza(?:ção|cao)\s*:/gi, "Data Disponibilizacao:")
    .replace(/Data\s+Publica(?:ção|cao)\s*:/gi, "Data Publicacao:")
    .replace(/Publica(?:c|ç)[aã]o\s+Processo\s*:/gi, "Publicacao Processo:")
    .replace(/\bOrg[aã]o\s*:/gi, "Orgao:")
    .replace(/Data\s+de\s+disponibiliza(?:c|ç)[aã]o\s*:/gi, "Data de disponibilizacao:")
    .replace(/Tipo\s+de\s+comunica(?:c|ç)[aã]o\s*:/gi, "Tipo de comunicacao:")
    .replace(/\n+/g, " ")
    .replace(/[ ]{2,}/g, " ")
    .trim();
}

function identifyDocumentLayout(
  fileType: DiaryFileType,
  text: string
): DiaryDocumentLayout {
  if (isWordCadastradoLayout(text)) {
    return "WORD_CADASTRADO";
  }

  if (fileType === "PDF" && isPdfIsProcessosLayout(text)) {
    return "PDF_IS_PROCESSOS";
  }

  if (fileType === "PDF" && isSerdijulLayout(text)) {
    return "SERDIJUL";
  }

  if (fileType === "PDF" && isPdfDefaultLayout(text)) {
    return "PDF_DEFAULT";
  }

  return "UNKNOWN";
}

function isWordCadastradoLayout(text: string): boolean {
  return (
    /Data\s+Disponibilizacao\s*:/i.test(text) &&
    /Data\s+Publicacao\s*:/i.test(text) &&
    /Codigo\s*:/i.test(text) &&
    /Jornal\s*:/i.test(text) &&
    /Tribunal\s*:/i.test(text) &&
    /Vara\s*:/i.test(text) &&
    /Informacoes\s*:/i.test(text)
  );
}

function isPdfIsProcessosLayout(text: string): boolean {
  return (
    /Data\s*:\s*\d{2}\/\d{2}\/\d{4}/i.test(text) &&
    /Codigo\s*:/i.test(text) &&
    /Nome\s+Pesquisado\s*:/i.test(text) &&
    /Jornal\s*:/i.test(text) &&
    /Tribunal\s*:/i.test(text) &&
    /Vara\s*:/i.test(text) &&
    /Informacoes\s*:/i.test(text)
  );
}

function isSerdijulLayout(text: string): boolean {
  const hasPublicacaoProcesso =
    /Publicacao\s+Processo\s*:/i.test(text);

  const hasExternalWordStructure =
    /Data\s+Disponibilizacao\s*:/i.test(text) &&
    /Data\s+Publicacao\s*:/i.test(text) &&
    /Codigo\s*:/i.test(text) &&
    /Jornal\s*:/i.test(text) &&
    /Tribunal\s*:/i.test(text);

  const hasExternalPdfIsProcessosStructure =
    /Data\s*:\s*\d{2}\/\d{2}\/\d{4}/i.test(text) &&
    /Codigo\s*:/i.test(text) &&
    /Nome\s+Pesquisado\s*:/i.test(text) &&
    /Jornal\s*:/i.test(text) &&
    /Tribunal\s*:/i.test(text);

  return (
    hasPublicacaoProcesso &&
    !hasExternalWordStructure &&
    !hasExternalPdfIsProcessosStructure
  );
}

function isPdfDefaultLayout(text: string): boolean {
  return (
    /Data\s*:\s*\d{2}\/\d{2}\/\d{4}/i.test(text) &&
    /Jornal\s*:/i.test(text) &&
    /Tribunal\s*:/i.test(text)
  );
}

function getIdentificationReasons(
  fileType: DiaryFileType,
  layout: DiaryDocumentLayout,
  text: string
): string[] {
  const reasons: string[] = [];

  reasons.push(`Tipo físico identificado: ${fileType}`);

  if (/Data\s+Disponibilizacao\s*:/i.test(text)) {
    reasons.push("Encontrado marcador: Data Disponibilização");
  }

  if (/Data\s+Publicacao\s*:/i.test(text)) {
    reasons.push("Encontrado marcador: Data Publicação");
  }

  if (/Data\s*:\s*\d{2}\/\d{2}\/\d{4}/i.test(text)) {
    reasons.push("Encontrado marcador: Data no formato dd/mm/aaaa");
  }

  if (/Codigo\s*:/i.test(text)) {
    reasons.push("Encontrado marcador: Código");
  }

  if (/Nome\s+Pesquisado\s*:/i.test(text)) {
    reasons.push("Encontrado marcador: Nome Pesquisado");
  }

  if (/Jornal\s*:/i.test(text)) {
    reasons.push("Encontrado marcador: Jornal");
  }

  if (/Tribunal\s*:/i.test(text)) {
    reasons.push("Encontrado marcador: Tribunal");
  }

  if (/Vara\s*:/i.test(text)) {
    reasons.push("Encontrado marcador: Vara");
  }

  if (/Informacoes\s*:/i.test(text)) {
    reasons.push("Encontrado marcador: Informações");
  }

  if (/Publicacao\s+Processo\s*:/i.test(text)) {
    reasons.push("Encontrado marcador interno: Publicação Processo");
  }

  reasons.push(`Layout identificado: ${layout}`);

  return reasons;
}

function calculateConfidence(
  layout: DiaryDocumentLayout,
  reasons: string[]
): "HIGH" | "MEDIUM" | "LOW" {
  if (layout === "UNKNOWN") return "LOW";

  if (reasons.length >= 7) return "HIGH";

  if (reasons.length >= 4) return "MEDIUM";

  return "LOW";
}