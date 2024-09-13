import { iFileData } from "../../models/file/iFileData"
import { readExcelFile } from "../../repositories/xlsx/excelISFile"

export function getObjectValidateIntimationsService({ endereco }: iFileData) {
    
    let obj
    
    if (endereco) {
        try {
            obj = { msg: `Arquivo salvo no caminho ${endereco} foi lido com sucesso!`, value: readExcelFile(endereco) }
        } catch (error) {
            obj = { msg: 'Erro! ' + error, value: null }
        }
    } else {
        obj = { msg: 'Erro! Nome ou caminho do arquivo não encontrados.', value: null }
    }

    return obj
}