import { TextReaderRepository } from "@models/diaryReader/diaryReader.models";
import { extractRawTextFromWord } from "@infrastructure/mammoth/mammoth.infrastructure";

export function createDocxTextReaderRepository(): TextReaderRepository {
  return {
    async readText(file): Promise<string> {
      return extractRawTextFromWord(file);
    }
  };
}