import { TextReaderRepository } from "@models/diaryReader/diaryReader.models";
import { extractRawTextFromPdf } from "@infrastructure/pdfParse/pdfParse.infrastructure";

export function createPdfTextReaderRepository(): TextReaderRepository {
  return {
    async readText(file): Promise<string> {
      return extractRawTextFromPdf(file);
    }
  };
}