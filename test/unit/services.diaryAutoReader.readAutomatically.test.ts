import {
    beforeEach,
    describe,
    expect,
    jest,
    test
} from "@jest/globals"

import {
    DiaryDocumentInspection
} from "../../src/models/diaryReader/diaryReader.models"
import {
    iFileData
} from "../../src/services/validateIntimations/validateIntimations.services"

const mockInspect = jest.fn<(_file: iFileData) => Promise<DiaryDocumentInspection>>()

const mockWordParseText = jest.fn()
const mockWordRead = jest.fn()

const mockPdfParseText = jest.fn()
const mockPdfRead = jest.fn()


jest.mock(
    "../../src/repositories/pdfTextReader/pdfTextReader.repositories",
    () => ({
        createPdfTextReaderRepository: () => ({
            readText: jest.fn()
        })
    })
)


jest.mock(
    "../../src/repositories/docxTextReader/docxTextReader.repositories",
    () => ({
        createDocxTextReaderRepository: () => ({
            readText: jest.fn()
        })
    })
)


jest.mock(
    "../../src/services/diaryDocumentIdentifier/diaryDocumentIdentifier.services",
    () => ({
        createDiaryDocumentIdentifierService: () => ({
            inspect: (file: iFileData) =>
                mockInspect(file)
        })
    })
)


jest.mock(
    "../../src/services/wordDiaryReader/wordDiaryReader.services",
    () => ({
        createDiaryReaderService: () => ({
            read: (...args: unknown[]) =>
                mockWordRead(...args),

            parseText: (...args: unknown[]) =>
                mockWordParseText(...args)
        })
    })
)


jest.mock(
    "../../src/services/pdfDiaryReader/pdfDiaryReader.services",
    () => ({
        createPdfDiaryReaderService: () => ({
            read: (...args: unknown[]) =>
                mockPdfRead(...args),

            parseText: (...args: unknown[]) =>
                mockPdfParseText(...args)
        })
    })
)


import {
    readDiaryAutomatically
} from "../../src/services/diaryAutoReader/diaryAutoReader.services"


describe(
    "readDiaryAutomatically",
    () => {

        beforeEach(() => {
            jest.clearAllMocks()
        })


        test(
            "reutiliza rawText identificado para documento Word sem reler o arquivo",
            async () => {

                const file = {
                    filePath: "diario.docx",
                    fileName: "diario.docx"
                }

                const rawText =
                    "TEXTO BRUTO DO DOCUMENTO WORD"

                const records = [
                    {
                        partes: ["CLIENTE"],
                        advogados: [],
                        layout:
                            "WORD_CADASTRADO" as const
                    }
                ]

                mockInspect.mockResolvedValueOnce({
                    identification: {
                        fileType: "DOCX",
                        layout: "WORD_CADASTRADO",
                        extension: ".docx",
                        confidence: "HIGH",
                        reasons: []
                    },

                    rawText
                })

                mockWordParseText
                    .mockReturnValueOnce(records)

                const result =
                    await readDiaryAutomatically(file)

                expect(result).toBe(records)

                expect(
                    mockInspect
                ).toHaveBeenCalledTimes(1)

                expect(
                    mockInspect
                ).toHaveBeenCalledWith(file)

                expect(
                    mockWordParseText
                ).toHaveBeenCalledTimes(1)

                expect(
                    mockWordParseText
                ).toHaveBeenCalledWith(rawText)

                /*
                 * O ponto principal:
                 * depois de inspect(), o reader não
                 * deve abrir o arquivo novamente.
                 */
                expect(
                    mockWordRead
                ).not.toHaveBeenCalled()

                expect(
                    mockPdfRead
                ).not.toHaveBeenCalled()

                expect(
                    mockPdfParseText
                ).not.toHaveBeenCalled()
            }
        )


        test.each([
            "PDF_IS_PROCESSOS",
            "SERDIJUL",
            "PDF_DEFAULT"
        ] as const)(
            "reutiliza rawText e roteia layout %s para o parser PDF",
            async layout => {

                const file = {
                    filePath: "diario.pdf",
                    fileName: "diario.pdf"
                }

                const rawText =
                    `TEXTO PDF ${layout}`

                const records = [
                    {
                        partes: [],
                        advogados: [],
                        layout
                    }
                ]

                mockInspect.mockResolvedValueOnce({
                    identification: {
                        fileType: "PDF",
                        layout,
                        extension: ".pdf",
                        confidence: "HIGH",
                        reasons: []
                    },

                    rawText
                })

                mockPdfParseText
                    .mockReturnValueOnce(records)

                const result =
                    await readDiaryAutomatically(file)

                expect(result).toBe(records)

                expect(
                    mockInspect
                ).toHaveBeenCalledTimes(1)

                expect(
                    mockPdfParseText
                ).toHaveBeenCalledTimes(1)

                expect(
                    mockPdfParseText
                ).toHaveBeenCalledWith(rawText)

                /*
                 * read(file) faria uma segunda
                 * extração do documento.
                 */
                expect(
                    mockPdfRead
                ).not.toHaveBeenCalled()

                expect(
                    mockWordRead
                ).not.toHaveBeenCalled()

                expect(
                    mockWordParseText
                ).not.toHaveBeenCalled()
            }
        )


        test(
            "falha quando o layout nao pode ser identificado",
            async () => {

                const file = {
                    filePath: "entrada.pdf",
                    fileName: "entrada.pdf"
                }

                mockInspect.mockResolvedValueOnce({
                    identification: {
                        fileType: "PDF",
                        layout: "UNKNOWN",
                        extension: ".pdf",
                        confidence: "LOW",
                        reasons: []
                    },

                    rawText: "texto desconhecido"
                })

                await expect(
                    readDiaryAutomatically(file)
                )
                    .rejects
                    .toThrow(/layout do documento/i)

                expect(
                    mockWordParseText
                ).not.toHaveBeenCalled()

                expect(
                    mockPdfParseText
                ).not.toHaveBeenCalled()

                expect(
                    mockWordRead
                ).not.toHaveBeenCalled()

                expect(
                    mockPdfRead
                ).not.toHaveBeenCalled()
            }
        )

    }
)
