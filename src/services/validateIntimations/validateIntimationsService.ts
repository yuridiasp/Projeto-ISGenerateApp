import { FileError } from "@models/errors/fileError"
import { Result } from "@models/results/result"
import { readExcelFile } from "@repositories/xlsx/excelISFile"
import { ValidationError } from "@models/errors/validationError"
import { readWordFile } from "@repositories/word/wordISFile"
import { ISAnalysisDTO } from "@models/clientes/Cliente"
import fs from 'fs'
import { NotFoundError } from "@models/errors"

export interface iFileData {
    filePath: string,
    fileName: string,
    isXlsx?: boolean
}

export async function getObjectValidateIntimationsService({ filePath, fileName }: iFileData): Promise<Result<{ file: ISAnalysisDTO[] }>> {
    // Excel: .xls, .xlsx, .xlsm, .csv
    // Word: .doc, .docx, .dot, .dotx
    const regexToWordFile = /\.(doc|docx|dot|dotx)$/
    const regexToExcekFile = /\.(xls|xlsx|xlsm|csv)$/
    
    if (filePath) {
        try {
            const fileExists = fs.existsSync(filePath)
            if (fileExists) {
                if (regexToExcekFile.test(filePath)) {
                    const resulstXLSX = readExcelFile(filePath)
                    return { success: true, data: { file: resulstXLSX  } }
                } else if (regexToWordFile.test(filePath))
                    return { success: true, data: { file: await readWordFile(filePath, fileName) } }
                return { success: false, error: new ValidationError('Tipo de arquivo inválido.') }
            }
            return { success: false, error: new NotFoundError(fileName) }
        } catch (error) {
            return { success: false, error: new FileError(error) }
        }
    }
    
    return { success: false, error: new ValidationError('Nome ou caminho do arquivo não informado.') }
}