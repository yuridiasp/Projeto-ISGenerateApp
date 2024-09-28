import { splitISToExcel } from "../fileHandler/fileHandlerExcelService"

export async function getObjectISService ({ endereco, fileName }: { endereco: string, fileName: string }) {
    let obj
    
    if (endereco && fileName) {
        try {
            obj = { msg: 'Arquivos gerados com sucesso! Acesse a pasta do arquivo original.',value: await splitISToExcel(endereco, fileName) }
        } catch (error) {
            obj = { msg: 'Erro! ' + error, value: false }
        }
    } else {
        obj = { msg: 'Erro! Nome ou caminho do arquivo não encontrados.', value: false }
    }

    return obj
}