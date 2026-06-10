import { FileError } from "@models/errors/fileError.models"
import { Result } from "@models/results/result.models"
import { readExcelFile } from "@repositories/xlsx/excelISFile.repositories"
import { ValidationError } from "@models/errors/validationError.models"
import { readWordFile } from "@repositories/word/wordISFile.repositories"
import fs from 'fs'
import { NotFoundError } from "@models/errors"
import { ISAnalysisDTO } from "@models/handleIntimationsReport/handleIntimationsReport.models";
import { normalizeDiaryRecordsToISAnalysisDTO } from "@mappers/diaryRecordToISAnalysis.mapper";
import { readDiaryAutomatically } from "@services/diaryAutoReader/diaryAutoReader.services";
import { repairBrokenDiaryRecords } from "@mappers/repairBrokenDiaryRecords.mapper";

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
            console.log(error)
            return { success: false, error: new FileError(error as string) }
        }
    }
    
    return { success: false, error: new ValidationError('Nome ou caminho do arquivo não informado.') }
}

export async function getOjectValidatePublicationService(file: iFileData): Promise<Result<{ file: ISAnalysisDTO[] }>> {
    if (file.filePath) {
        try {
            const fileExists = fs.existsSync(file.filePath)
            
            if (fileExists) {
                const diaryRecords = await readDiaryAutomatically(file)

                const repairedDiaryRecords = repairBrokenDiaryRecords(diaryRecords)
                
                const normalizedAnalyses = normalizeDiaryRecordsToISAnalysisDTO(repairedDiaryRecords, { validateMode: "PUB_VAL" })

                return { success: true, data: { file: normalizedAnalyses }}
            }
            return { success: false, error: new NotFoundError(file.fileName) }
        } catch (error) {
            console.log(error)
            return { success: false, error: new FileError(error as string) }
        }
    }
    
    return { success: false, error: new ValidationError('Nome ou caminho do arquivo não informado.') }
}