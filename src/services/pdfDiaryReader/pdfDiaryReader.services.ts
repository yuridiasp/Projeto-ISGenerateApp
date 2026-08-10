import {
  DiaryRecord,
  TextReaderRepository
} from "@models/diaryReader/diaryReader.models";

import {
  extractPdfDiaryMetadata,
  normalizePdfDiaryText
} from "@helpers/pdfDiaryText.helpers";

import {
  parsePdfDiaryRecords
} from "@services/pdfDiaryParser/pdfDiaryParser.services";

import {
  iFileData
} from "@services/validateIntimations";

interface CreatePdfDiaryReaderServiceParams {
  textReaderRepository: TextReaderRepository;
  logger?: {
    info(
      message: string,
      data?: unknown
    ): void;
  };
}

export function createPdfDiaryReaderService({
  textReaderRepository,
  logger
}: CreatePdfDiaryReaderServiceParams) {

  function parseText(
    rawText: string
  ): DiaryRecord[] {

    const metadata =
      extractPdfDiaryMetadata(rawText);

    const normalizedText =
      normalizePdfDiaryText(rawText);

    const records =
      parsePdfDiaryRecords(
        normalizedText,
        metadata
      );

    logger?.info(
      "Blocos encontrados no PDF",
      {
        total: records.length
      }
    );

    return records;
  }

  return {

    async read(
      file: iFileData
    ): Promise<DiaryRecord[]> {

      const rawText =
        await textReaderRepository.readText(file);

      return parseText(rawText);
    },

    parseText
  };
}