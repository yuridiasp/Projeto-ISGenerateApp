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

    "DD/MM/YY",
    "DD-MM-YY",

    "DD/MM/YYYY HH:mm:ss",
    "DD-MM-YYYY HH:mm:ss",
    "YYYY-MM-DD HH:mm:ss",

    "DD/MM/YYYY HH:mm",
    "DD-MM-YYYY HH:mm",
    "YYYY-MM-DD HH:mm",

    "DD/MM/YY HH:mm",
    "DD-MM-YY HH:mm"
]

const brazilianMonths: Record<string, string> = {
    janeiro: "01",
    fevereiro: "02",
    marco: "03",
    março: "03",
    abril: "04",
    maio: "05",
    junho: "06",
    julho: "07",
    agosto: "08",
    setembro: "09",
    outubro: "10",
    novembro: "11",
    dezembro: "12"
}


function normalizeBrazilianLongDate(
    value: string
): string | undefined {

    const normalized = value
        /*
         * Remove "(sexta-feira)",
         * "(quinta-feira)", etc.
         */
        .replace(/\([^)]*\)\s*$/, "")
        .trim()

    const match = normalized.match(
        /^(\d{1,2})\s+de\s+([A-Za-zÀ-ÿ]+)\s+de\s+(\d{4})$/i
    )

    if (!match) {
        return undefined
    }

    const [, day, monthName, year] = match

    const normalizedMonthName = monthName
        .toLowerCase()

    const month =
        brazilianMonths[normalizedMonthName]

    if (!month) {
        return undefined
    }

    return [
        day.padStart(2, "0"),
        month,
        year
    ].join("/")
}


function normalizeDiaryDateValue(
    value: string
): string {

    const normalizedLongDate =
        normalizeBrazilianLongDate(value)

    if (normalizedLongDate) {
        return normalizedLongDate
    }

    return value
        /*
         * PDFs podem extrair:
         * 06/ 08/ 2026
         */
        .replace(/\s*\/\s*/g, "/")

        .replace(/\s+/g, " ")

        .trim()
}

function invalidDayjs(): Dayjs {
    return dayjs("")
}

export function parseDiaryDate(
    value?: string
): Dayjs {

    if (!value || !value.trim()) {
        return invalidDayjs()
    }

    const normalizedValue =
        normalizeDiaryDateValue(value)

    for (const format of acceptedDateFormats) {

        /*
         * Primeiro validamos SEM timezone.
         *
         * O terceiro argumento true ativa
         * parsing estrito.
         */
        const parsedDate =
            dayjs(
                normalizedValue,
                format,
                true
            )

        if (!parsedDate.isValid()) {
            continue
        }

        /*
         * Somente aplicamos timezone
         * depois de confirmar que a data
         * é válida.
         *
         * true preserva horário/data local.
         */
        return parsedDate.tz(
            timezone,
            true
        )
    }

    /*
     * Compatibilidade com algum formato
     * que Dayjs consiga reconhecer
     * nativamente.
     */
    const fallbackDate =
        dayjs(normalizedValue)

    if (fallbackDate.isValid()) {
        return fallbackDate.tz(
            timezone
        )
    }

    return invalidDayjs()
}

function getFirstValidDiaryDate(
    values: Array<string | undefined>
): Dayjs | undefined {

    for (const value of values) {

        if (
            isInvalidDiaryDateValue(value)
        ) {
            continue
        }

        const parsed =
            parseDiaryDate(value)

        if (parsed.isValid()) {
            return parsed
        }
    }

    return undefined
}

function normalizeText(value?: string): string {
    return value
        ?.replace(/\s+/g, " ")
        .trim() ?? ""
}

function getPublicationDate(
    record: DiaryRecord
): Dayjs {

    const informationDate =
        extractAvailabilityDateFromInformation(
            record
        )

    const parsed =
        getFirstValidDiaryDate([
            record.dataPublicacao,
            record.dataDisponibilizacao,
            record.dataDivulgacao,
            record.data,
            informationDate
        ])

    return (
        parsed ??
        invalidDayjs()
    )
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

function getAvailabilityDate(
    record: DiaryRecord
): Dayjs | undefined {

    const informationDate =
        extractAvailabilityDateFromInformation(
            record
        )

    return getFirstValidDiaryDate([
        record.dataDisponibilizacao,
        record.dataDivulgacao,
        record.data,
        informationDate
    ])
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