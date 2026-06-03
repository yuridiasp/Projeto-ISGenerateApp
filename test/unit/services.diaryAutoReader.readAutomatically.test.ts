import { describe, expect, jest, test, beforeEach } from "@jest/globals"

import { identifyDiaryDocumentController } from "../../src/controllers/diaryDocumentIdentifier.controllers"
import { readDiaryFromWordController } from "../../src/controllers/wordDiaryReader.controllers"
import { readDiaryFromPdfController } from "../../src/controllers/pdfDiaryReader.controllers"
import { readDiaryAutomatically } from "../../src/services/diaryAutoReader/diaryAutoReader.services"

jest.mock("../../src/controllers/diaryDocumentIdentifier.controllers", () => ({
    identifyDiaryDocumentController: jest.fn()
}))

jest.mock("../../src/controllers/wordDiaryReader.controllers", () => ({
    readDiaryFromWordController: jest.fn()
}))

jest.mock("../../src/controllers/pdfDiaryReader.controllers", () => ({
    readDiaryFromPdfController: jest.fn()
}))

describe("readDiaryAutomatically", () => {
    const identifyMock = jest.mocked(identifyDiaryDocumentController)
    const readWordMock = jest.mocked(readDiaryFromWordController)
    const readPdfMock = jest.mocked(readDiaryFromPdfController)

    beforeEach(() => {
        jest.clearAllMocks()
    })

    test("roteia documento Word cadastrado para o leitor Word", async () => {
        const records = [{ partes: ["CLIENTE"], advogados: [], layout: "WORD_CADASTRADO" }]

        identifyMock.mockResolvedValueOnce({
            fileType: "DOCX",
            layout: "WORD_CADASTRADO",
            extension: ".docx",
            confidence: "HIGH",
            reasons: []
        })
        readWordMock.mockResolvedValueOnce(records)

        await expect(readDiaryAutomatically("diario.docx")).resolves.toBe(records)

        expect(readWordMock).toHaveBeenCalledWith("diario.docx")
        expect(readPdfMock).not.toHaveBeenCalled()
    })

    test.each(["PDF_IS_PROCESSOS", "SERDIJUL", "PDF_DEFAULT"] as const)(
        "roteia layout %s para o leitor PDF",
        async layout => {
            const records = [{ partes: [], advogados: [], layout }]

            identifyMock.mockResolvedValueOnce({
                fileType: "PDF",
                layout,
                extension: ".pdf",
                confidence: "HIGH",
                reasons: []
            })
            readPdfMock.mockResolvedValueOnce(records)

            await expect(readDiaryAutomatically("diario.pdf")).resolves.toBe(records)

            expect(readPdfMock).toHaveBeenCalledWith("diario.pdf")
            expect(readWordMock).not.toHaveBeenCalled()
        }
    )

    test("falha quando o layout nao pode ser identificado", async () => {
        identifyMock.mockResolvedValueOnce({
            fileType: "UNKNOWN",
            layout: "UNKNOWN",
            extension: ".txt",
            confidence: "LOW",
            reasons: []
        })

        await expect(readDiaryAutomatically("entrada.txt"))
            .rejects
            .toThrow(/layout do documento/)
    })
})
