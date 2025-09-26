import { FileError } from "@models/errors/fileError"
import { Result } from "@models/result/result"
import { readExcelFile } from "@repositories/xlsx/excelISFile"
import { ValidationError } from "@models/errors/validationError"
import { readWordFile } from "@repositories/word/wordISFile"

export interface iFileData {
    filePath: string,
    fileName: string,
    isXlsx?: boolean
}

export async function getObjectValidateIntimationsService({ filePath, fileName }: iFileData): Promise<Result<{ file: unknown[] }>> {
    // Excel: .xls, .xlsx, .xlsm, .csv
    // Word: .doc, .docx, .dot, .dotx
    const regexToWordFile = /\.(doc|docx|dot|dotx)$/
    const regexToExcekFile = /\.(xls|xlsx|xlsm|csv)$/
    
    if (filePath) {
        try {
            if (regexToExcekFile.test(filePath)) {
                const resulstXLSX = readExcelFile(filePath)
                return { success: true, data: { file: resulstXLSX  } }
            } else if (regexToWordFile.test(filePath))
                return { success: true, data: { file: await readWordFile(filePath, fileName) as unknown as unknown[] } }
            return { success: false, error: new ValidationError('Tipo de arquivo inválido.') }
        } catch (error) {
            return { success: false, error: new FileError(error) }
        }
    }
    
    return { success: false, error: new ValidationError('Nome ou caminho do arquivo não informado.') }
}