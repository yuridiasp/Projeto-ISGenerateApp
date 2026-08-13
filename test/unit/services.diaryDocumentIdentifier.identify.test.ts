import {
    describe,
    expect,
    jest,
    test
} from "@jest/globals"

import {
    createDiaryDocumentIdentifierService
} from "../../src/services/diaryDocumentIdentifier/diaryDocumentIdentifier.services"
import {
    iFileData
} from "../../src/services/validateIntimations/validateIntimations.services"
import {
    identifyDiaryDocument
} from "../../src/helpers/diaryDocumentIdentifier.helpers"


describe(
    "createDiaryDocumentIdentifierService",
    () => {

        test(
            "le texto de PDF usando apenas o repositorio de PDF",
            async () => {

                const file = {
                    filePath: "entrada.PDF",
                    fileName: "entrada.PDF"
                }

                const rawText = `
                    Data : 01/06/2026
                    Codigo: COD123
                    Nome Pesquisado: CLIENTE
                    Jornal: DJE
                    Tribunal: TRT20
                    Vara: 1 Vara
                    Informacoes: texto
                `

                const pdfRepository = {
                    readText: jest.fn(
                        async (_file: iFileData) => rawText
                    )
                }

                const docxRepository = {
                    readText: jest.fn(
                        async (_file: iFileData) => ""
                    )
                }

                const service =
                    createDiaryDocumentIdentifierService({
                        pdfTextReaderRepository:
                            pdfRepository,

                        docxTextReaderRepository:
                            docxRepository
                    })

                const result =
                    await service.identify(file)

                expect(result.layout)
                    .toBe("PDF_IS_PROCESSOS")

                expect(
                    pdfRepository.readText
                ).toHaveBeenCalledTimes(1)

                expect(
                    pdfRepository.readText
                ).toHaveBeenCalledWith(file)

                expect(
                    docxRepository.readText
                ).not.toHaveBeenCalled()
            }
        )


        test(
            "inspect retorna identificacao e o mesmo texto extraido",
            async () => {

                const file = {
                    filePath: "entrada.pdf",
                    fileName: "entrada.pdf"
                }

                const rawText = `
                    Data : 01/06/2026
                    Codigo: COD123
                    Nome Pesquisado: CLIENTE
                    Jornal: DJE
                    Tribunal: TRT20
                    Vara: 1 Vara
                    Informacoes: texto
                `

                const pdfRepository = {
                    readText: jest.fn(
                        async () => rawText
                    )
                }

                const docxRepository = {
                    readText: jest.fn(
                        async () => ""
                    )
                }

                const service =
                    createDiaryDocumentIdentifierService({
                        pdfTextReaderRepository:
                            pdfRepository,

                        docxTextReaderRepository:
                            docxRepository
                    })

                const result =
                    await service.inspect(file)

                expect(result.rawText)
                    .toBe(rawText)

                expect(
                    result.identification
                ).toMatchObject({
                    fileType: "PDF",
                    layout: "PDF_IS_PROCESSOS",
                    extension: ".pdf"
                })

                expect(
                    pdfRepository.readText
                ).toHaveBeenCalledTimes(1)

                expect(
                    docxRepository.readText
                ).not.toHaveBeenCalled()
            }
        )


        test.each([
            "diario.docx",
            "diario.DOC"
        ])(
            "le texto de %s usando apenas o repositorio de Word",
            async filePath => {

                const file = {
                    filePath,
                    fileName: filePath
                }

                const rawText = `
                    Data Disponibilizacao: 31/05/2026
                    Data Publicacao: 01/06/2026
                    Codigo: COD123
                    Jornal: DJE
                    Tribunal: TRT20
                    Vara: 1 Vara
                    Informacoes: texto
                `

                const pdfRepository = {
                    readText: jest.fn(
                        async (_file: iFileData) => ""
                    )
                }

                const docxRepository = {
                    readText: jest.fn(
                        async (_file: iFileData) => rawText
                    )
                }

                const service =
                    createDiaryDocumentIdentifierService({
                        pdfTextReaderRepository:
                            pdfRepository,

                        docxTextReaderRepository:
                            docxRepository
                    })

                const result =
                    await service.inspect(file)

                expect(
                    result.identification.layout
                ).toBe("WORD_CADASTRADO")

                expect(
                    result.rawText
                ).toBe(rawText)

                expect(
                    docxRepository.readText
                ).toHaveBeenCalledTimes(1)

                expect(
                    docxRepository.readText
                ).toHaveBeenCalledWith(file)

                expect(
                    pdfRepository.readText
                ).not.toHaveBeenCalled()
            }
        )


        test(
            "identify preserva compatibilidade e retorna somente a identificacao",
            async () => {

                const file = {
                    filePath: "diario.docx",
                    fileName: "diario.docx"
                }

                const docxRepository = {
                    readText: jest.fn(
                        async () => `
                            Data Disponibilizacao: 31/05/2026
                            Data Publicacao: 01/06/2026
                            Codigo: COD123
                            Jornal: DJE
                            Tribunal: TRT20
                            Vara: 1 Vara
                            Informacoes: texto
                        `
                    )
                }

                const service =
                    createDiaryDocumentIdentifierService({
                        pdfTextReaderRepository: {
                            readText: jest.fn(
                                async () => ""
                            )
                        },

                        docxTextReaderRepository:
                            docxRepository
                    })

                const result =
                    await service.identify(file)

                expect(result).toMatchObject({
                    fileType: "DOCX",
                    layout: "WORD_CADASTRADO",
                    extension: ".docx"
                })

                expect(result)
                    .not
                    .toHaveProperty("rawText")

                expect(
                    docxRepository.readText
                ).toHaveBeenCalledTimes(1)
            }
        )


        test(
            "falha para extensao sem leitor suportado",
            async () => {

                const pdfRepository = {
                    readText: jest.fn(
                        async () => ""
                    )
                }

                const docxRepository = {
                    readText: jest.fn(
                        async () => ""
                    )
                }

                const service =
                    createDiaryDocumentIdentifierService({
                        pdfTextReaderRepository:
                            pdfRepository,

                        docxTextReaderRepository:
                            docxRepository
                    })

                await expect(
                    service.inspect({
                        filePath: "entrada.txt",
                        fileName: "entrada.txt"
                    })
                )
                    .rejects
                    .toThrow(/Tipo de arquivo/i)

                expect(
                    pdfRepository.readText
                ).not.toHaveBeenCalled()

                expect(
                    docxRepository.readText
                ).not.toHaveBeenCalled()
            }
        )

        test("prioriza WORD_CADASTRADO para DOCX com sua estrutura propria", () => {
            const text = `
            Data Disponibilizacao: 12/08/2026
            Data Publicacao: 13/08/2026
            Codigo: 123
            Jornal: TJSE
            Tribunal: TJSE
            Vara: 1 Vara
            Informacoes:
            Publicacao Processo: 0000000-00.2026.8.25.0001
            `;

            const result = identifyDiaryDocument(
            "cadastrados.docx",
            text
            );

            expect(result.layout).toBe(
            "WORD_CADASTRADO"
            );
        });

    }
)