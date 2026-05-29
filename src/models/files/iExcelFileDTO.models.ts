import { iValidationReport } from "@models/validations"
import { iFileData } from "@services/validateIntimations"
import { CellObject } from "xlsx-js-style"

export interface iExcelFileDTO {
    data: (iValidationReport | CellObject[])[]
    filePath: iFileData
    sheetName: string
    prefix?: string,
    isRecorte?: boolean
}