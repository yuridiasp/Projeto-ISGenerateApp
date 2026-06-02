import { DiaryRecord, TextReaderRepository } from "@models/diaryReader/diaryReader.models";
import { normalizeDiaryText } from "@helpers/diaryText.helpers";
import { parseWordDiaryRecords } from "../diaryParser/wordDiaryParser.services";

interface CreateDiaryReaderServiceParams {
  textReaderRepository: TextReaderRepository;
  logger?: {
    info(message: string, data?: unknown): void;
  };
}

export function createDiaryReaderService({
  textReaderRepository,
  logger
}: CreateDiaryReaderServiceParams) {
  return {
    async read(filePath: string): Promise<DiaryRecord[]> {
      const rawText = await textReaderRepository.readText(filePath);

      const normalizedText = normalizeDiaryText(rawText);

      const records = parseWordDiaryRecords(normalizedText);

      logger?.info("Blocos encontrados no Word", {
        total: records.length
      });

      return records;
    }
  };
}