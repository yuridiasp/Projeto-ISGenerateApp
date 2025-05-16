import { iFileData } from "../../services/validateIntimations/validateIntimationsService"

export interface iExcelFileDTO {
    data: object[]
    filePath: iFileData
    sheetName: string
    prefix?: string
}