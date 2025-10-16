import { iFileData } from "@services/validateIntimations/validateIntimationsService";
import { iValidationReport } from "@models/validations/iValidationReport";
import { writeExcelFileRepository } from "@repositories/xlsx/excelISFile";
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