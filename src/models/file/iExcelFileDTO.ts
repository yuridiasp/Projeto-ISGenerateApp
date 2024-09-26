import { iFileData } from "./iFileData"

export interface iExcelFileDTO {
    data: object[]
    filePath: iFileData
    sheetName: string
    prefix?: string
}