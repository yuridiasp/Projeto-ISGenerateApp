import { iFileData } from "@services/validateIntimations/validateIntimationsService";
import { iValidationReport } from "@models/validation/iValidationReport";
import { writeExcelFileRepository } from "@repositories/xlsx/excelISFile";

interface validationReport { data: iValidationReport[], file: iFileData, prefix: string, sheetName?: string }

export function generateValidationReport({ data, file, prefix }: validationReport) {

    return writeExcelFileRepository ({
        data,
        filePath: file,
        prefix,
        sheetName: "Relatório"
    })
}