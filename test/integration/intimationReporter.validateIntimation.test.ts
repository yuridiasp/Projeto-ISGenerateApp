import path from 'path'
import { describe, expect, it, beforeAll, jest, afterAll } from '@jest/globals'
import fs from 'fs'

import { dayjsConfig } from '../../src/config/dayjsConfig'

dayjsConfig()

import { HandleIntimationsReportResult, handleIntimationsReportService } from '../../src/services/intimation/handleIntimationsReportService'
import { iWindows } from "../../src/models/windows/iWindows"
import { login } from './utils/login'
import { ValidationError } from '../../src/models/errors/validationError'
import { getFileData } from './utils/getFileData'
import { Result } from "../../src/models/results/result"
const timeout = 10000


describe("Validar cadastro de intimações a partir de um documento Word", () => {
    const files = ["PREV30092025", "PREV30092025 - Cadastrados", "RECORTE DIGITAL_BA-GO-DF - DISP 01-10-2025"]
    const send = jest.fn();
    const windows: iWindows = {
        mainWindow: { webContents: { send } } as any,
        sobreWindow: null,
        loginWindow: null
    }

    let cookie: string
    
    beforeAll(async () => { jest.clearAllMocks(); cookie = await login() }, timeout)

    afterAll(() => {
        files.forEach(file => {
            const [ fileNameReport, fileData ] = getFileData(file)
            const filePath = path.join(path.dirname(fileData.filePath), fileNameReport)
            const fileExists = fs.existsSync(filePath)
    
            if(fileExists) {
                try {
                    ///fs.unlinkSync(filePath)
                } catch (error) {
                    console.log("Erro ao remover arquivo: ", error)
                }
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
                message: 'Encontrado 5 intimações sem cadastro. Exportado relatório no caminho: C:\\Users\\yuri\\Documents\\GitHub\\ISGenerateApp\\doc\\RELATORIO-REGISTRO-INTIMACAO-PREV30092025.xlsx',     
                newFilePath: 'C:\\Users\\yuri\\Documents\\GitHub\\ISGenerateApp\\doc\\RELATORIO-REGISTRO-INTIMACAO-PREV30092025.xlsx'
            }
        })
    }, timeout)

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
    }, timeout)

    it("Arquivo de relatório do Recorte Digital", async () => {
        const [ fileNameReport, fileData ] = getFileData(files[2], ".xlsx")

        const result: Result<HandleIntimationsReportResult> = await handleIntimationsReportService(windows, cookie, fileData)
        
        expect(result).toEqual({
            success: true,
            data: {
                message: 'Encontrado 2 intimações sem cadastro. Exportado relatório no caminho: C:\\Users\\yuri\\Documents\\GitHub\\ISGenerateApp\\doc\\RECORTE DIGITAL_BA-GO-DF - DISP 01-10-2025.xlsx',     
                newFilePath: 'C:\\Users\\yuri\\Documents\\GitHub\\ISGenerateApp\\doc\\RECORTE DIGITAL_BA-GO-DF - DISP 01-10-2025.xlsx'
            }
        })
    }, timeout)
})