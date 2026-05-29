import { TextReaderRepository } from "@models/diaryReader/diaryReader.models";
import { extractRawTextFromDocx } from "@infrastructure/mammoth/mammoth.infrastructure";

export function createDocxTextReaderRepository(): TextReaderRepository {
  return {
    async readText(filePath: string): Promise<string> {
      return extractRawTextFromDocx(filePath);
    }
  };
}