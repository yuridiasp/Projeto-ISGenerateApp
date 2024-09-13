import { iFileData } from "../../models/file/iFileData";
import { iValidationReport } from "../../models/validation/iValidationReport";
import { writeExcelFileService } from "../../repositories/xlsx/excelISFile";

interface validationReport { data: iValidationReport[], file: iFileData, prefix: string, sheetName?: string }

export function generateValidationReport({ data, file, prefix }: validationReport) {
    return writeExcelFileService({
        data,
        filePath: file,
        prefix,
        sheetName: "Relatório"
    })
}