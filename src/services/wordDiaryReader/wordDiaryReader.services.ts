import {
    DiaryRecord,
    TextReaderRepository
} from "@models/diaryReader/diaryReader.models"

import {
    normalizeDiaryText
} from "@helpers/diaryText.helpers"

import {
    parseWordDiaryRecords
} from "../diaryParser/wordDiaryParser.services"

import {
    iFileData
} from "@services/validateIntimations"


interface CreateDiaryReaderServiceParams {
    textReaderRepository: TextReaderRepository

    logger?: {
        info(
            message: string,
            data?: unknown
        ): void
    }
}


export function createDiaryReaderService({
    textReaderRepository,
    logger
}: CreateDiaryReaderServiceParams) {

    function parseText(
        rawText: string
    ): DiaryRecord[] {

        const normalizedText =
            normalizeDiaryText(rawText)

        const records =
            parseWordDiaryRecords(
                normalizedText
            )

        logger?.info(
            "Blocos encontrados no Word",
            {
                total: records.length
            }
        )

        return records
    }

    return {
        async read(
            file: iFileData
        ): Promise<DiaryRecord[]> {
            const rawText =
                await textReaderRepository
                    .readText(file)

            return parseText(rawText)
        }, parseText }
}