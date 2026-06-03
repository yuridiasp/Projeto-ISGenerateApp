import { describe, expect, jest, test } from "@jest/globals"

import { createDiaryDocumentIdentifierService } from "../../src/services/diaryDocumentIdentifier/diaryDocumentIdentifier.services"

describe("createDiaryDocumentIdentifierService", () => {
    test("le texto de PDF usando o repositorio de PDF", async () => {
        const pdfRepository = {
            readText: jest.fn(async () => `
                Data : 01/06/2026 Codigo: COD123 Nome Pesquisado: CLIENTE
                Jornal: DJE Tribunal: TRT20 Vara: 1 Vara Informacoes: texto
            `)
        }
        const docxRepository = {
            readText: jest.fn(async () => "")
        }

        const service = createDiaryDocumentIdentifierService({
            pdfTextReaderRepository: pdfRepository,
            docxTextReaderRepository: docxRepository
        })

        const result = await service.identify("entrada.PDF")

        expect(result.layout).toBe("PDF_IS_PROCESSOS")
        expect(pdfRepository.readText).toHaveBeenCalledWith("entrada.PDF")
        expect(docxRepository.readText).not.toHaveBeenCalled()
    })

    test.each(["diario.docx", "diario.DOC"])(
        "le texto de %s usando o repositorio de Word",
        async filePath => {
            const pdfRepository = {
                readText: jest.fn(async () => "")
            }
            const docxRepository = {
                readText: jest.fn(async () => `
                    Data Disponibilizacao: 31/05/2026
                    Data Publicacao: 01/06/2026
                    Codigo: COD123
                    Jornal: DJE
                    Tribunal: TRT20
                    Vara: 1 Vara
                    Informacoes: texto
                `)
            }

            const service = createDiaryDocumentIdentifierService({
                pdfTextReaderRepository: pdfRepository,
                docxTextReaderRepository: docxRepository
            })

            const result = await service.identify(filePath)

            expect(result.layout).toBe("WORD_CADASTRADO")
            expect(docxRepository.readText).toHaveBeenCalledWith(filePath)
            expect(pdfRepository.readText).not.toHaveBeenCalled()
        }
    )

    test("falha para extensao sem leitor suportado", async () => {
        const service = createDiaryDocumentIdentifierService({
            pdfTextReaderRepository: { readText: jest.fn(async () => "") },
            docxTextReaderRepository: { readText: jest.fn(async () => "") }
        })

        await expect(service.identify("entrada.txt"))
            .rejects
            .toThrow(/Tipo de arquivo/)
    })
})
