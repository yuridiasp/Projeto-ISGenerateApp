import { FileError } from "@models/errors/fileError"
import { Result } from "@models/result/result"
import { readExcelFile } from "@repositories/xlsx/excelISFile"
import { ValidationError } from "@models/errors/validationError"

export interface iFileData {
    endereco: string,
    fileName: string
}

export function getObjectValidateIntimationsService({ endereco }: iFileData): Result<{ file: unknown[] }> {
    
    if (endereco) {
        try {
            return { success: true, data: { file: readExcelFile(endereco) } }
        } catch (error) {
            return { success: false, error: new FileError(error) }
        }
    } 
    
    return { success: false, error: new ValidationError('Nome ou caminho do arquivo não informado.') }
}