import path from 'path'
import { describe, expect, it, beforeAll, jest, afterAll } from '@jest/globals'
import fs from 'fs'

import { handleIntimationsReportService } from '../../src/services/intimation/handleIntimationsReportService'
import { iWindows } from "../../src/models/windows/iWindows"
import { login } from './utils/login'
import { ValidationError } from '../../src/models/errors/validationError'
import { getFileData } from './utils/getFileData'

describe("Validar cadastro de intimações a partir de um documento Word", () => {
    const files = ["TRT15092025", "PREV26092025"]
    const send = jest.fn();
    const windows: iWindows = {
        mainWindow: { webContents: { send } } as any,
        sobreWindow: null,
        loginWindow: null
    }

    let cookie: string
    
    beforeAll(async () => { jest.clearAllMocks(); cookie = await login() })

    afterAll(() => {
        files.forEach(file => {
            const [ fileNameReport, fileData ] = getFileData(file)
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
    })

    it("Arquivo que contém intimação não lançada", async () => {
        const [ fileNameReport, fileData ] = getFileData(files[0])
        const result = await handleIntimationsReportService(windows, cookie, fileData)

        const filePath = path.join(path.dirname(fileData.filePath), fileNameReport)
        const fileExists = fs.existsSync(filePath)

        expect(fileExists).toBeTruthy()
        expect(windows.mainWindow?.webContents.send).toHaveBeenCalled()
        expect(result).toEqual({
            success: true,
            data: {
                message: 'Encontrado 1 intimação sem cadastro. Exportado relatório no caminho: C:\\Users\\yuri\\Documents\\GitHub\\ISGenerateApp\\doc\\RELATORIO-REGISTRO-INTIMACAO-TRT15092025.xlsx',     
                newFilePath: 'C:\\Users\\yuri\\Documents\\GitHub\\ISGenerateApp\\doc\\RELATORIO-REGISTRO-INTIMACAO-TRT15092025.xlsx'
            }
        })
    }, 10000)

    it("Arquivo com todas as intimações lançadas", async () => {
        const [ fileNameReport, fileData ] = getFileData(files[1])

        const result = await handleIntimationsReportService(windows, cookie, fileData)

        const filePath = path.join(path.dirname(fileData.filePath), fileNameReport)
        const fileExists = fs.existsSync(filePath)

        expect(windows.mainWindow?.webContents.send).toHaveBeenCalled()
        expect(fileExists).toBeFalsy()
        expect(result).toEqual({
            success: false,
            error: new ValidationError('Todas as intimações foram cadastradas! Nenhum arquivo de relatório gerado.')
        })
    })
})