import { splitISToExcel } from "@services/fileHandler/fileHandlerExcelService"
import { splitISToWord } from "@services/fileHandler/fileHandlerWordService"
import { iFileData } from "@services/validateIntimations/validateIntimationsService"

export async function splitISService ({ filePath, fileName, isXlsx }: iFileData) {
    let obj
    
    if (filePath && fileName) {
        try {
            if (isXlsx)
                obj = { msg: 'Arquivos gerados com sucesso! Acesse a pasta do arquivo original.',value: await splitISToExcel(filePath, fileName) }
            else
                obj = { msg: 'Arquivos gerados com sucesso! Acesse a pasta do arquivo original.',value: await splitISToWord(filePath, fileName) }
        } catch (error) {
            console.error(error)
            obj = { msg: 'Erro! ' + error, value: false }
        }
    } else {
        obj = { msg: 'Erro! Nome ou caminho do arquivo não encontrados.', value: false }
    }

    return obj
}