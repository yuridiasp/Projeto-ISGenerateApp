import XLSX from 'xlsx'

import { buildXlsxPath } from '../../utils/directory/directory'
import { iExcelFileDTO } from '../../models/file/iExcelFileDTO'
import { Result } from '../../models/result/result'
import { ValidationError } from '../../models/errors/validationError'

type ResultWriteEFile = {
    newFilePath?: string,
    result: boolean
}

type lineXlsxIS = {availability_date: string, publication_date: string, code: string, journal: string, tribunal: string, court: string, information: string, case_number: string, related_case_number: string, description: string, internal_deadline: string, fatal_deadline: string, time: string, expert_or_defendant: string, local_adress: string, executor: string, separate_task: string, justification: string}

export function readExcelFile(endereco: string) {
    
    const workbook = XLSX.readFile(endereco)
    
    const sheetName = workbook.SheetNames[0]
    const worksheet = workbook.Sheets[sheetName]
    
    const data = XLSX.utils.sheet_to_json(worksheet)
    
    return data.map((line: lineXlsxIS) => ({ ...line, paragraph: [
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
    ].join(" - ") }))
}

function toValidSheetName(name: string) {
  // Máx 31 chars e sem: : \ / ? * [ ]
  return name.replace(/[:\\/?*\[\]]/g, " ").slice(0, 31) || "Planilha1";
}

export function writeExcelFileRepository({ data, filePath: { endereco, fileName  }, sheetName, prefix = ''}: iExcelFileDTO): Result<ResultWriteEFile> {
    
    if (data.length) {
        const newFilePath = buildXlsxPath(endereco, fileName, prefix);
        const safeSheetName = toValidSheetName(sheetName);

        const worksheet = XLSX.utils.json_to_sheet(data)
    
        const workbook = XLSX.utils.book_new()
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