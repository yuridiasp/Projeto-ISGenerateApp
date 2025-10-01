import { iFileData } from "@services/validateIntimations"

export interface iExcelFileDTO {
    data: object[]
    filePath: iFileData
    sheetName: string
    prefix?: string
}