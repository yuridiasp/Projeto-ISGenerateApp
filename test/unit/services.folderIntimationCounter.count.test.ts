import fs from "fs"
import os from "os"
import path from "path"
import { afterEach, describe, expect, jest, test } from "@jest/globals"

import { ValidationError } from "../../src/models/errors"
import { createFolderIntimationCounterService } from "../../src/services/folderIntimationCounter"

const tempFolders: string[] = []

function createTempFolder() {
    const folderPath = fs.mkdtempSync(path.join(os.tmpdir(), "isgea-folder-counter-"))
    tempFolders.push(folderPath)

    return folderPath
}

function createFile(folderPath: string, fileName: string) {
    const filePath = path.join(folderPath, fileName)
    fs.writeFileSync(filePath, "")

    return filePath
}

function createRecords(length: number) {
    return Array.from({ length }, () => ({
        partes: [],
        advogados: []
    }))
}

describe("createFolderIntimationCounterService", () => {
    afterEach(() => {
        tempFolders.splice(0).forEach(folderPath => {
            fs.rmSync(folderPath, { recursive: true, force: true })
        })
    })

    test("conta intimacoes por arquivo usando leitores existentes por extensao", async () => {
        const folderPath = createTempFolder()
        const pdfPath = createFile(folderPath, "publicacoes.pdf")
        const wordPath = createFile(folderPath, "analises.docx")
        const excelPath = createFile(folderPath, "recorte.xlsx")
        const unsupportedPath = createFile(folderPath, "observacoes.txt")
        fs.mkdirSync(path.join(folderPath, "subpasta"))

        const readDiaryFile = jest.fn(async file => {
            if (file.filePath === pdfPath) {
                return createRecords(2)
            }

            if (file.filePath === wordPath) {
                return createRecords(1)
            }

            return []
        })
        const readExcelFile = jest.fn(() => createRecords(3) as any)

        const service = createFolderIntimationCounterService({
            readDiaryFile,
            readExcelFile
        })

        const result = await service.count(folderPath)

        expect(result.success).toBe(true)
        if (!result.success) return

        expect(result.data).toMatchObject({
            folderPath,
            totalFiles: 4,
            countedFiles: 3,
            unsupportedFiles: 1,
            failedFiles: 0,
            totalIntimations: 6
        })

        const filesByPath = new Map(
            result.data.files.map(file => [file.filePath, file])
        )

        expect(filesByPath.get(pdfPath)).toMatchObject({
            fileName: "publicacoes.pdf",
            extension: ".pdf",
            intimationCount: 2,
            status: "COUNTED"
        })
        expect(filesByPath.get(wordPath)).toMatchObject({
            fileName: "analises.docx",
            extension: ".docx",
            intimationCount: 1,
            status: "COUNTED"
        })
        expect(filesByPath.get(excelPath)).toMatchObject({
            fileName: "recorte.xlsx",
            extension: ".xlsx",
            intimationCount: 3,
            status: "COUNTED"
        })
        expect(filesByPath.get(unsupportedPath)).toMatchObject({
            fileName: "observacoes.txt",
            extension: ".txt",
            intimationCount: 0,
            status: "UNSUPPORTED"
        })
        expect(readDiaryFile).toHaveBeenCalledWith(expect.objectContaining({
            fileName: "publicacoes.pdf",
            filePath: pdfPath,
            isXlsx: false
        }))
        expect(readDiaryFile).toHaveBeenCalledWith(expect.objectContaining({
            fileName: "analises.docx",
            filePath: wordPath,
            isXlsx: false
        }))
        expect(readExcelFile).toHaveBeenCalledWith(excelPath)
    })

    test("mantem resultado dos demais arquivos quando um leitor falha", async () => {
        const folderPath = createTempFolder()
        const okPath = createFile(folderPath, "ok.pdf")
        const errorPath = createFile(folderPath, "erro.docx")

        const readDiaryFile = jest.fn(async file => {
            if (file.filePath === errorPath) {
                throw new Error("Falha ao ler documento")
            }

            return createRecords(2)
        })

        const service = createFolderIntimationCounterService({
            readDiaryFile
        })

        const result = await service.count(folderPath)

        expect(result.success).toBe(true)
        if (!result.success) return

        expect(result.data).toMatchObject({
            totalFiles: 2,
            countedFiles: 1,
            failedFiles: 1,
            totalIntimations: 2
        })

        const filesByPath = new Map(
            result.data.files.map(file => [file.filePath, file])
        )

        expect(filesByPath.get(okPath)).toMatchObject({
            status: "COUNTED",
            intimationCount: 2
        })
        expect(filesByPath.get(errorPath)).toMatchObject({
            status: "ERROR",
            intimationCount: 0,
            error: "Falha ao ler documento"
        })
    })

    test("retorna erro de validacao quando o caminho informado nao e uma pasta", async () => {
        const folderPath = createTempFolder()
        const filePath = createFile(folderPath, "arquivo.pdf")

        const service = createFolderIntimationCounterService()

        const result = await service.count(filePath)

        expect(result.success).toBe(false)
        if (result.success) return

        expect(result.error).toBeInstanceOf(ValidationError)
        expect(result.error.message).toContain("nao e uma pasta")
    })
})
