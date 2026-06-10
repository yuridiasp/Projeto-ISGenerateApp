import { DiaryRecord } from "@models/diaryReader/diaryReader.models"

const cnjRegex = /\d{7}-\d{2}\.\d{4}\.\d\.\d{2}\.\d{4}/

function normalizeText(value?: string): string {
    return value?.replace(/\s+/g, " ").trim() ?? ""
}

function isInvalidDateValue(value?: string): boolean {
    if (!value) {
        return true
    }

    const normalizedValue = value.trim()

    return (
        !normalizedValue ||
        normalizedValue === "-" ||
        normalizedValue === "--" ||
        normalizedValue.toLowerCase() === "não informado"
    )
}

function getRecordDate(record: DiaryRecord): string | undefined {
    return (
        record.dataDisponibilizacao ||
        record.dataPublicacao ||
        record.dataDivulgacao ||
        record.data
    )
}

function getRecordCaseNumber(record: DiaryRecord): string {
    return normalizeText(
        record.processoCnj ||
        record.processo ||
        record.processoOrigem
    )
}

function getRecordContent(record: DiaryRecord): string {
    return normalizeText(
        [
            record.informacoes,
            record.conteudo,
            record.inteiroTeor
        ]
            .filter(Boolean)
            .join(" ")
    )
}

function hasValidCaseNumber(record: DiaryRecord): boolean {
    const caseNumber = getRecordCaseNumber(record)
    const content = getRecordContent(record)

    return cnjRegex.test(caseNumber) || cnjRegex.test(content)
}

function isProbablyBrokenContinuation(record: DiaryRecord): boolean {
    const date = getRecordDate(record)
    const content = getRecordContent(record)

    const hasInvalidDate = isInvalidDateValue(date)

    const hasContinuationContent =
        content.includes("Tipo de comunicacao") ||
        content.includes("Tipo de comunicação") ||
        content.includes("Meio:") ||
        content.includes("Inteiro teor") ||
        content.includes("Conteudo:") ||
        content.includes("Conteúdo:")

    return hasInvalidDate && hasContinuationContent
}

function shouldMergeWithPrevious(
    previousRecord: DiaryRecord | undefined,
    currentRecord: DiaryRecord
): boolean {
    if (!previousRecord) {
        return false
    }

    if (!isProbablyBrokenContinuation(currentRecord)) {
        return false
    }

    const previousCaseNumber = getRecordCaseNumber(previousRecord)
    const currentCaseNumber = getRecordCaseNumber(currentRecord)

    if (previousCaseNumber && currentCaseNumber) {
        return previousCaseNumber === currentCaseNumber
    }

    return hasValidCaseNumber(previousRecord) && !hasValidCaseNumber(currentRecord)
}

function mergeDiaryRecords(
    previousRecord: DiaryRecord,
    currentRecord: DiaryRecord
): DiaryRecord {
    return {
        ...previousRecord,

        informacoes: normalizeText(
            [
                previousRecord.informacoes,
                currentRecord.informacoes
            ]
                .filter(Boolean)
                .join(" ")
        ),

        conteudo: normalizeText(
            [
                previousRecord.conteudo,
                currentRecord.conteudo
            ]
                .filter(Boolean)
                .join(" ")
        ),

        inteiroTeor: normalizeText(
            [
                previousRecord.inteiroTeor,
                currentRecord.inteiroTeor
            ]
                .filter(Boolean)
                .join(" ")
        ),

        partes: [
            ...(previousRecord.partes ?? []),
            ...(currentRecord.partes ?? [])
        ],

        advogados: [
            ...(previousRecord.advogados ?? []),
            ...(currentRecord.advogados ?? [])
        ],

        tarefas: [
            ...(previousRecord.tarefas ?? []),
            ...(currentRecord.tarefas ?? [])
        ]
    }
}

export function repairBrokenDiaryRecords(records: DiaryRecord[]): DiaryRecord[] {
    const repairedRecords: DiaryRecord[] = []

    for (const record of records) {
        const previousRecord = repairedRecords[repairedRecords.length - 1]

        if (shouldMergeWithPrevious(previousRecord, record)) {
            repairedRecords[repairedRecords.length - 1] = mergeDiaryRecords(
                previousRecord,
                record
            )

            continue
        }

        repairedRecords.push(record)
    }

    return repairedRecords
}