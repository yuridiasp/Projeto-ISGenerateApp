import { TextReaderRepository } from "@models/diaryReader/diaryReader.models";
import { extractRawTextFromPdf } from "@infrastructure/pdfParse/pdfParse.infrastructure";

export function createPdfTextReaderRepository(): TextReaderRepository {
  return {
    async readText(filePath: string): Promise<string> {
      return extractRawTextFromPdf(filePath);
    }
  };
}