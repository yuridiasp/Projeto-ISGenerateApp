import XLSX from 'xlsx-js-style'
import { CellObject, WorkSheet } from 'xlsx-js-style'
import fs from 'fs'
import path from 'path'

import { buildXlsxPath } from '@utils/directory/directory.utils'
import { iExcelFileDTO } from '@models/files'
import { Result } from '@models/results'
import { ValidationError } from '@models/errors'
import { excelDateToJsDate } from '@utils/date/excelDateToJsDate.utils'
import { removeCaracteresProcesso } from '@utils/text/textFormatting.utils'
import { iValidationReport } from '@models/validations'
import dayjs from 'dayjs'
import { timezone } from '@helpers/timezone.helpers'
import { dateTimeFormat } from '@helpers/dateTimeFormat.helpers'
import { ISAnalysisDTO } from '@models/handleIntimationsReport/handleIntimationsReport.models';

type ResultWriteEFile = {
    newFilePath?: string,
    result: boolean
}

export type lineXlsxIS = {
    availability_date: string,
    publication_date: string,
    code: string,
    journal: string,
    tribunal: string,
    court: string,
    information: string,
    case_number: string,
    related_case_number: string,
    description: string,
    internal_deadline: string,
    fatal_deadline: string,
    time: string,
    expert_or_defendant: string,
    local_adress: string,
    executor: string,
    separate_task: string,
    justification: string,
    'DATA PUBLIC'?: string,
    'NRO. PROCESSO'?: string,
    'DATA DISP'?: string,
    isRecorte: boolean,
}

const EXCEL_CELL_TEXT_LIMIT = 32767
const TRUNCATED_CELL_SUFFIX = '\n...[texto truncado para respeitar o limite de 32.767 caracteres do Excel]'

function normalizePathForComparison(filePath: string): string {
    return path.resolve(filePath).toLowerCase()
}

function buildSafeXlsxOutputPath(
    requestedFilePath: string,
    protectedPaths: string[] = []
): string {
    const directory = path.dirname(requestedFilePath)
    const extension = path.extname(requestedFilePath) || '.xlsx'
    const baseName = path.basename(requestedFilePath, extension) || 'arquivo'

    const protectedPathSet = new Set(
        protectedPaths
            .filter(Boolean)
            .map(normalizePathForComparison)
    )

    let counter = 0
    let candidatePath = ''

    do {
        const suffix = counter === 0 ? '' : ` (${counter})`
        candidatePath = path.resolve(directory, `${baseName}${suffix}${extension}`)
        counter++
    } while (
        protectedPathSet.has(normalizePathForComparison(candidatePath)) ||
        fs.existsSync(candidatePath)
    )

    return candidatePath
}

function truncateExcelText(value: string): string {
    if (value.length <= EXCEL_CELL_TEXT_LIMIT) {
        return value
    }

    const maxContentLength = EXCEL_CELL_TEXT_LIMIT - TRUNCATED_CELL_SUFFIX.length
    return value.slice(0, Math.max(0, maxContentLength)) + TRUNCATED_CELL_SUFFIX
}

function sanitizePrimitiveCellValue(value: unknown): unknown {
    if (typeof value !== 'string') {
        return value
    }

    return truncateExcelText(value)
}

function sanitizeJsonRows<T extends Record<string, unknown>>(rows: T[]): T[] {
    return rows.map((row) => {
        const sanitizedRow: Record<string, unknown> = {}

        Object.entries(row).forEach(([key, value]) => {
            sanitizedRow[key] = sanitizePrimitiveCellValue(value)
        })

        return sanitizedRow as T
    })
}

function sanitizeCellObject(cell: CellObject | string | number | boolean | Date | null | undefined): CellObject | string | number | boolean | Date | null | undefined {
    if (!cell || cell instanceof Date) {
        return cell
    }

    if (typeof cell === 'string') {
        return truncateExcelText(cell)
    }

    if (typeof cell !== 'object') {
        return cell
    }

    const sanitizedCell = { ...cell } as CellObject & Record<string, unknown>

    if (typeof sanitizedCell.v === 'string') {
        sanitizedCell.v = truncateExcelText(sanitizedCell.v)
    }

    if (typeof sanitizedCell.w === 'string') {
        sanitizedCell.w = truncateExcelText(sanitizedCell.w)
    }

    if (typeof sanitizedCell.h === 'string') {
        sanitizedCell.h = truncateExcelText(sanitizedCell.h)
    }

    return sanitizedCell
}

function sanitizeAoaRows(rows: CellObject[][]): CellObject[][] {
    return rows.map((row) => row.map((cell) => sanitizeCellObject(cell) as CellObject))
}

function sanitizeWorksheetCells(worksheet: WorkSheet): WorkSheet {
    Object.keys(worksheet).forEach((cellAddress) => {
        if (cellAddress.startsWith('!')) {
            return
        }

        const cell = worksheet[cellAddress] as CellObject | undefined

        if (!cell) {
            return
        }

        const sanitizedCell = sanitizeCellObject(cell) as CellObject
        worksheet[cellAddress] = sanitizedCell
    })

    return worksheet
}

export function readExcelFile(path: string): ISAnalysisDTO[] {
    const workbook = XLSX.readFile(path)

    const sheetName = workbook.SheetNames[0]
    const worksheet = workbook.Sheets[sheetName]

    const data = XLSX.utils.sheet_to_json(worksheet) as unknown as lineXlsxIS[]

    return data.map((line) => ({
        availability_date: line.availability_date ? dayjs.tz(line.availability_date, dateTimeFormat, timezone) : excelDateToJsDate(line['DATA DISP'] as string),
        publication_date: line.publication_date ? dayjs.tz(line.publication_date, dateTimeFormat, timezone) : excelDateToJsDate(line['DATA PUBLIC'] as string),
        case_number: line.case_number || removeCaracteresProcesso(line['NRO. PROCESSO'] as string),
        related_case_number: line.related_case_number,
        description: line.description,
        internal_deadline: line.internal_deadline,
        fatal_deadline: line.fatal_deadline,
        time: line.time,
        expert_or_defendant: line.expert_or_defendant,
        local_adress: line.local_adress,
        dataCliente: undefined,
        dataProcesso: undefined,
        executor: line.executor,
        separate_task: line.separate_task,
        justification: line.justification,
        paragraph: [
            line?.case_number,
            line?.related_case_number,
            line?.description,
            line?.internal_deadline,
            line?.fatal_deadline,
            line?.time,
            line?.expert_or_defendant,
            line?.local_adress,
            line?.executor,
            line?.separate_task,
            line?.justification,
        ].join(' - '),
        validateMode: "RECORTE",
        objectRecorte: line
    } as ISAnalysisDTO))
}

function toValidSheetName(name: string): string {
    return name.replace(/[:\\/?*\[\]]/g, ' ').slice(0, 31) || 'Planilha1'
}

function createWorksheet(isRecorte: boolean, data: (iValidationReport | CellObject[])[]): WorkSheet {
    if (!isRecorte) {
        const sanitizedData = sanitizeJsonRows(data as unknown as Record<string, unknown>[])
        return sanitizeWorksheetCells(XLSX.utils.json_to_sheet(sanitizedData))
    }

    const dataRecorte = data as unknown as CellObject[][]
    const sanitizedDataRecorte = sanitizeAoaRows(dataRecorte)

    return sanitizeWorksheetCells(XLSX.utils.aoa_to_sheet(sanitizedDataRecorte))
}

export function writeExcelFileRepository({ data, filePath: { filePath, fileName }, sheetName, prefix = '', isRecorte }: iExcelFileDTO): Result<ResultWriteEFile> {
    if (!data.length) {
        return {
            success: false,
            error: new ValidationError('Todas as intimações foram cadastradas! Nenhum arquivo de relatório gerado.')
        }
    }

    if (isRecorte === undefined) {
        return {
            success: false,
            error: new ValidationError("isRecorte ausente.")
        }
    }

    const requestedFilePath = buildXlsxPath(filePath, fileName, prefix)
    const newFilePath = buildSafeXlsxOutputPath(requestedFilePath, [filePath])
    const safeSheetName = toValidSheetName(sheetName)

    const workbook = XLSX.utils.book_new()
    const worksheet = createWorksheet(isRecorte, data)

    XLSX.utils.book_append_sheet(workbook, worksheet, safeSheetName)

    const workbookBuffer = XLSX.write(workbook, {
        bookType: 'xlsx',
        type: 'buffer'
    }) as Buffer

    fs.writeFileSync(newFilePath, workbookBuffer, { flag: 'wx' })

    return {
        success: true,
        data: {
            newFilePath,
            result: true
        }
    }
}
