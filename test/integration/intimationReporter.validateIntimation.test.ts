import path from 'path'
import { describe, expect, it, beforeAll, jest, afterAll } from '@jest/globals'
import fs from 'fs'

import { handleIntimationsReportService } from '../../src/services/intimation/handleIntimationsReportService'
import { iWindows } from "../../src/models/windows/iWindows"
import { iFileData } from "../../src/services/validateIntimations/validateIntimationsService"
import { login } from './utils/login'

describe("Validar cadastro de intimações a partir de um documento Word", () => {
    const fileName = "TRT15092025"
    const fileNameAnalise = fileName + ".docx"
    const fileNameReport = `RELATORIO-REGISTRO-INTIMACAO-${fileName}.xlsx`
    const fileData: iFileData = {
        fileName,
        filePath: path.resolve(__dirname, "..","..", "doc", fileNameAnalise),
        isXlsx: false
    }
    const send = jest.fn();
    const windows: iWindows = {
        mainWindow: { webContents: { send } } as any,
        sobreWindow: null,
        loginWindow: null
    }

    let cookie: string
    
    beforeAll(async () => { cookie = await login()})

    afterAll(() => {
        const filePath = path.join(path.dirname(fileData.filePath), fileNameReport)
        const fileExists = fs.existsSync(filePath)

        if(fileExists) {
            try {
                fs.unlinkSync(filePath)
                console.log("Arquivo removido!")
            } catch (error) {
                console.log("Erro ao remover arquivo: ", error)
            }
        } else {
            console.log("Arquivo não encontrado.")
            console.log("Caminho: ", filePath)
        }
    })

    it("Lê o documento do Word e retorna resultados do cadastro no Korbil", async () => {

        const result = await handleIntimationsReportService(windows, cookie, fileData)

        //console.log(result)

        expect(result).toEqual({
            success: true,
            data: {
                message: 'Encontrado 1 intimação sem cadastro. Exportado relatório no caminho: C:\\Users\\yuri\\Documents\\GitHub\\ISGenerateApp\\doc\\RELATORIO-REGISTRO-INTIMACAO-TRT15092025.xlsx',     
                newFilePath: 'C:\\Users\\yuri\\Documents\\GitHub\\ISGenerateApp\\doc\\RELATORIO-REGISTRO-INTIMACAO-TRT15092025.xlsx'
            }
        })
    })

})