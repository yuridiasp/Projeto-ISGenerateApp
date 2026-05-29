import { iFileData } from "@services/validateIntimations/validateIntimations.services";
import { iValidationReport } from "@models/validations/iValidationReport.models";
import { writeExcelFileRepository } from "@repositories/xlsx/excelISFile.repositories";
import { CellObject } from "xlsx-js-style";

interface validationReport { data: (iValidationReport | CellObject[])[], file: iFileData, prefix: string, sheetName?: string, isRecorte?: boolean }

export function generateValidationReport({ data, file, prefix, isRecorte }: validationReport) {
    
    return writeExcelFileRepository ({
        data,
        filePath: file,
        prefix,
        sheetName: "Relatório",
        isRecorte
    })
}