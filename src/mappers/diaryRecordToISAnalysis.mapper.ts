import dayjs, { Dayjs } from "dayjs"
import customParseFormat from "dayjs/plugin/customParseFormat"
import utc from "dayjs/plugin/utc"
import timezonePlugin from "dayjs/plugin/timezone"

import { timezone } from "@helpers/index";
import { iDataCliente } from "@models/clientes";
import { DiaryRecord } from "@models/diaryReader";
import { ISAnalysisDTO } from "@models/handleIntimationsReport/handleIntimationsReport.models";
import { iProcesso } from "@models/processos";
import { sanitizeProcessNumber } from "@helpers/sanitizeProcessNumber.helpers";

dayjs.extend(utc)
dayjs.extend(timezonePlugin)
dayjs.extend(customParseFormat)

type NormalizeDiaryRecordsOptions = {
    validateMode: "DEFAULT" | "RECORTE" | "PUB_VAL"
}

const acceptedDateFormats = [
    "DD/MM/YYYY",
    "DD-MM-YYYY",
    "YYYY-MM-DD",
    "YYYY/MM/DD",
    "DD/MM/YYYY HH:mm:ss",
    "DD-MM-YYYY HH:mm:ss",
    "YYYY-MM-DD HH:mm:ss",
    "DD/MM/YYYY HH:mm",
    "DD-MM-YYYY HH:mm",
    "YYYY-MM-DD HH:mm"
]

function invalidDayjs(): Dayjs {
    return dayjs("")
}

export function parseDiaryDate(value?: string): Dayjs {
    if (!value || !value.trim()) {
        return invalidDayjs()
    }
    
    const normalizedValue = value.trim()

    for (const format of acceptedDateFormats) {
        const parsedDate = dayjs.tz(
            normalizedValue,
            format,
            timezone
        )

        if (parsedDate.isValid()) {
            return parsedDate
        }
    }

    const fallbackDate = dayjs(normalizedValue)

    if (fallbackDate.isValid()) {
        return fallbackDate.tz(timezone)
    }

    return invalidDayjs()
}

function normalizeText(value?: string): string {
    return value
        ?.replace(/\s+/g, " ")
        .trim() ?? ""
}

function getPublicationDate(record: DiaryRecord): Dayjs {
    const publicationDate =
        record.dataPublicacao ||
        record.dataDisponibilizacao ||
        record.dataDivulgacao ||
        record.data

    const fixedPublicationDate = isInvalidDiaryDateValue(publicationDate)
        ? extractAvailabilityDateFromInformation(record)
        : publicationDate

    const parsedDate = parseDiaryDate(fixedPublicationDate)

    return parsedDate.isValid()
        ? parsedDate
        : parseDiaryDate(record.data)
}

function removePdfPageBreakMarkers(value?: string): string {
    return value
        ?.replace(/--\s*\d+\s+of\s+\d+\s*--/gi, " ")
        .replace(/\s+/g, " ")
        .trim() ?? ""
}

function extractAvailabilityDateFromInformation(record: DiaryRecord): string | undefined {
    const information = removePdfPageBreakMarkers(record.informacoes)

    const match = information.match(
        /data\s+de\s+disponibiliza[cç][aã]o\s*:\s*(\d{2}\/\d{2}\/\d{4})/i
    )

    return match?.[1]
}

function isInvalidDiaryDateValue(value?: string): boolean {
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

function getAvailabilityDate(record: DiaryRecord): Dayjs | undefined {
    const availabilityDate =
        record.dataDisponibilizacao ||
        record.dataDivulgacao ||
        record.data

    const fixedAvailabilityDate = isInvalidDiaryDateValue(availabilityDate)
        ? extractAvailabilityDateFromInformation(record)
        : availabilityDate

    if (!fixedAvailabilityDate) {
        return undefined
    }

    const parsedDate = parseDiaryDate(fixedAvailabilityDate)

    return parsedDate.isValid()
        ? parsedDate
        : undefined
}

function getCaseNumber(record: DiaryRecord): string {
    return sanitizeProcessNumber(
        record.processoCnj ||
        record.processo ||
        record.processoOrigem
    )
}

function getRelatedCaseNumber(record: DiaryRecord): string {
    return sanitizeProcessNumber(record.processoOrigem)
}

function getDescription(record: DiaryRecord): string {
    return normalizeText(
        record.conteudo ||
        record.informacoes ||
        record.tipoComunicacao ||
        record.classe
    )
}

function getParagraph(record: DiaryRecord): string {
    return [
        record.informacoes,
        record.conteudo,
        record.inteiroTeor
    ]
        .filter(Boolean)
        .map((item) => removePdfPageBreakMarkers(normalizeText(item)))
        .join(" ")
}

export function normalizeDiaryRecordsToISAnalysisDTO(
    records: DiaryRecord[],
    options: NormalizeDiaryRecordsOptions = { validateMode: "DEFAULT" }
): ISAnalysisDTO[] {
    return records.map((record): ISAnalysisDTO => {
        const caseNumber = getCaseNumber(record)

        return {
            availability_date: getAvailabilityDate(record),
            publication_date: getPublicationDate(record),

            case_number: caseNumber,
            related_case_number: getRelatedCaseNumber(record),

            description: getDescription(record),

            internal_deadline: "",
            fatal_deadline: "",
            time: "",

            expert_or_defendant: normalizeText(record.nomePesquisado),
            local_adress: normalizeText(record.vara || record.orgao || record.tribunal),

            dataCliente: {} as iDataCliente,
            dataProcesso: {} as iProcesso,

            executor: "",
            separate_task: "",
            justification: "",

            paragraph: getParagraph(record),

            validateMode: options.validateMode ?? "DEFAULT"
        }
    })
}