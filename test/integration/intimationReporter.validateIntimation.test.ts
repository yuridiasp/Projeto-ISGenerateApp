import path from "path"
import fs from "fs"
import { afterAll, beforeAll, describe, expect, it, jest } from "@jest/globals"

import { dayjsConfig } from "../../src/config/dayjsConfig.config"
import {
    HandleIntimationsReportResult,
    handleIntimationsReportService
} from "../../src/services/intimation/handleIntimationsReport.services"
import { iWindows } from "../../src/models/windows/iWindows.models"
import { Result } from "../../src/models/results/result.models"
import { getObjectValidateIntimationsService } from "../../src/services/validateIntimations/validateIntimations.services"
import { getFileData } from "./utils/getFileData"
import { login } from "./utils/login"

dayjsConfig()

const timeout = 15000

describe("Validar cadastro de intimacoes a partir de um documento Word", () => {
    const files = [
        "PREV30092025",
        "PREV30092025 - Cadastrados",
        "RECORTE DIGITAL_BA-GO-DF - DISP 01-10-2025"
    ]
    const send = jest.fn()
    const windows: iWindows = {
        mainWindow: { webContents: { send } } as any,
        sobreWindow: null,
        loginWindow: null
    }
    const createdReportPaths: string[] = []

    let cookie: string

    beforeAll(async () => {
        jest.clearAllMocks()
        cookie = await login()
    }, timeout)

    afterAll(() => {
        createdReportPaths.forEach(filePath => {
            const fileExists = fs.existsSync(filePath)

            if (fileExists) {
                try {
                    fs.unlinkSync(filePath)
                } catch (error) {
                    console.log("Erro ao remover arquivo: ", error)
                }
            }
        })
    })

    it("Arquivo que contem intimacao nao lancada", async () => {
        const [fileNameReport, fileData] = getFileData(files[0])
        const result = await handleIntimationsReportService({
            window: windows,
            cookie,
            file: fileData,
            funcValObj: getObjectValidateIntimationsService
        })

        const newFilePath = result.data?.newFilePath as string
        createdReportPaths.push(newFilePath)

        expect(windows.mainWindow?.webContents.send).toHaveBeenCalled()
        expect(result.success).toBe(true)
        expect(fs.existsSync(newFilePath)).toBeTruthy()
        expect(path.dirname(newFilePath)).toBe(path.dirname(fileData.filePath))
        expect(path.basename(newFilePath)).toContain(fileNameReport.replace(".xlsx", ""))
        expect(result.data?.message).toContain("Encontrado 5")
        expect(result.data?.message).toContain(newFilePath)
    }, timeout)

    it("Arquivo com todas as intimacoes lancadas", async () => {
        const [, fileData] = getFileData(files[1])

        const result = await handleIntimationsReportService({
            window: windows,
            cookie,
            file: fileData,
            funcValObj: getObjectValidateIntimationsService
        })

        expect(windows.mainWindow?.webContents.send).toHaveBeenCalled()
        expect(result.success).toBe(true)
        expect(result.data?.message).toContain("Todas as")
        expect(result.data?.newFilePath).toBeUndefined()
    }, timeout)

    it("Arquivo de relatorio do Recorte Digital", async () => {
        const [fileNameReport, fileData] = getFileData(files[2], ".xlsx")

        const result: Result<HandleIntimationsReportResult> = await handleIntimationsReportService({
            window: windows,
            cookie,
            file: fileData,
            funcValObj: getObjectValidateIntimationsService
        })

        const newFilePath = result.data?.newFilePath as string
        createdReportPaths.push(newFilePath)

        expect(result.success).toBe(true)
        expect(fs.existsSync(newFilePath)).toBeTruthy()
        expect(path.dirname(newFilePath)).toBe(path.dirname(fileData.filePath))
        expect(path.basename(newFilePath)).toContain(fileNameReport.replace(".xlsx", ""))
        expect(result.data?.message).toContain("Encontrado 2")
        expect(result.data?.message).toContain(newFilePath)
    }, timeout)
})
