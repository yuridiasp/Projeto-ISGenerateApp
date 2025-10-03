import XLSX from 'xlsx-js-style'
import { CellObject } from 'xlsx-js-style'

import { buildXlsxPath } from '@utils/directory/directory'
import { iExcelFileDTO } from '@models/files'
import { Result } from '@models/results'
import { ValidationError } from '@models/errors'
import { ISAnalysisDTO } from '@models/clientes'
import { excelDateToJsDate } from '@utils/date/excelDateToJsDate'
import { removeCaracteresProcesso } from '@utils/textFormatting/textFormatting'
import { iValidationReport } from '@models/validations'

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
    'DATA PUBLIC'?: string | Date,
    'NRO. PROCESSO'?: string,
    'DATA DISP'?: string | Date,
    isRecorte: boolean,
}

export function readExcelFile(path: string): ISAnalysisDTO[] {
    const workbook = XLSX.readFile(path)
    
    const sheetName = workbook.SheetNames[0]
    const worksheet = workbook.Sheets[sheetName]
    
    const data = XLSX.utils.sheet_to_json(worksheet) as unknown as lineXlsxIS[]

    return data.map((line) => ({
        availability_date: line.availability_date || excelDateToJsDate(line['DATA DISP'] as string).toLocaleDateString(),
        publication_date: line.publication_date || excelDateToJsDate(line['DATA PUBLIC'] as string).toLocaleDateString(),
        case_number: line.case_number || removeCaracteresProcesso(line['NRO. PROCESSO']),
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
        ].join(" - "),
        isRecorte: !!line['NRO. PROCESSO'],
        objectRecorte: line
    } as ISAnalysisDTO))
}

function toValidSheetName(name: string) {
  // Máx 31 chars e sem: : \ / ? * [ ]
  return name.replace(/[:\\/?*\[\]]/g, " ").slice(0, 31) || "Planilha1";
}

function createWorksheet(isRecorte: boolean, data: (iValidationReport | CellObject[])[]) {
    if (!isRecorte)
        return XLSX.utils.json_to_sheet(data)

    const dataRecorte = data as unknown as CellObject[][]

    return XLSX.utils.aoa_to_sheet(dataRecorte)
}

export function writeExcelFileRepository({ data, filePath: { filePath, fileName  }, sheetName, prefix = '', isRecorte }: iExcelFileDTO): Result<ResultWriteEFile> {
    
    if (data.length) {
        const newFilePath = buildXlsxPath(filePath, fileName, prefix)
        const safeSheetName = toValidSheetName(sheetName)
        
        const workbook = XLSX.utils.book_new()

        const worksheet = createWorksheet(isRecorte, data)
    
        XLSX.utils.book_append_sheet(workbook, worksheet, safeSheetName)
    
        XLSX.writeFile(workbook, newFilePath)

        return {
            success: true,
            data: {
                newFilePath,
                result: true
            }
        }
    }

    return {
        success: false,
        error: new ValidationError('Todas as intimações foram cadastradas! Nenhum arquivo de relatório gerado.')
    }
}