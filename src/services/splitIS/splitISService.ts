import { splitISToExcel } from "@services/fileHandler/fileHandlerExcelService"
import { splitISToWord } from "@services/fileHandler/fileHandlerWordService"
import { iFileData } from "@services/validateIntimations/validateIntimationsService"

export async function getObjectISService ({ endereco, fileName, isXlsx }: iFileData) {
    let obj
    
    if (endereco && fileName) {
        try {
            if (isXlsx)
                obj = { msg: 'Arquivos gerados com sucesso! Acesse a pasta do arquivo original.',value: await splitISToExcel(endereco, fileName) }
            else
                obj = { msg: 'Arquivos gerados com sucesso! Acesse a pasta do arquivo original.',value: await splitISToWord(endereco, fileName) }
        } catch (error) {
            console.error(error)
            obj = { msg: 'Erro! ' + error, value: false }
        }
    } else {
        obj = { msg: 'Erro! Nome ou caminho do arquivo não encontrados.', value: false }
    }

    return obj
}