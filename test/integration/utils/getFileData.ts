import path from "path"
import { iFileData } from "../../../src/services/validateIntimations/validateIntimationsService"

type valideExtensions = ".doc" | ".docx" | ".xlsx"

export function getFileData(fileName: string, extension: valideExtensions = ".docx", isReport = true): [string, iFileData] {
    const fileNameAnalise = fileName + extension
    const fileNameDoc = isReport ? `RELATORIO-REGISTRO-INTIMACAO-${fileName}.xlsx` : fileNameAnalise
    const fileData: iFileData = {
        fileName,
        filePath: path.resolve(__dirname, "..", "..","..", "doc", fileNameAnalise),
        isXlsx: extension === ".xlsx"
    }

    return [ fileNameDoc, fileData ]
}

export function getFileDataSplit(publicationStr: string, extension: valideExtensions = ".docx"): [string, iFileData][] {
    const fileNames = [ `PREV${publicationStr}`, `TRT${publicationStr}`, `CIV${publicationStr}`, `JFSE${publicationStr}`]
    return fileNames.map(fileName => {
        const fileData: iFileData = {
            fileName,
            filePath: path.resolve(__dirname, "..", "..","..", "doc", fileName + extension),
            isXlsx: false
        }

        return [ fileName, fileData ]
    })
}