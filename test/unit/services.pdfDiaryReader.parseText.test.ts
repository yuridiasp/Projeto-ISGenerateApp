import {
    describe,
    expect,
    jest,
    test
} from "@jest/globals"

import {
    createPdfDiaryReaderService
} from "../../src/services/pdfDiaryReader/pdfDiaryReader.services"

import {
    iFileData
} from "../../src/services/validateIntimations/validateIntimations.services"


const PDF_TEXT = `
    Data : 01/06/2026 Codigo: COD123 Nome Pesquisado: CLIENTE TESTE Jornal: DJE Tribunal: TRT20 Vara: 1 Vara Informacoes:
    Publicacao Processo: 0001234-56.2026.5.20.0001
    Orgao: 1 Vara do Trabalho
    Data de disponibilizacao: 2026-05-31
    Tipo de comunicacao: Intimacao
    Meio: DJE
    Inteiro teor: https://example.com/doc
    Parte: CLIENTE TESTE
    Advogado: JOAO SILVA OAB SE 123
    Classe: PROCEDIMENTO
    Conteudo: Despacho publicado
    | comunicacao_id: 456 |
`


describe(
    "createPdfDiaryReaderService",
    () => {

        test(
            "parseText processa texto PDF ja extraido sem acessar repository",
            () => {

                const textReaderRepository = {
                    readText: jest.fn(
                        async () => {
                            throw new Error(
                                "repository nao deveria ser chamado"
                            )
                        }
                    )
                }

                const service =
                    createPdfDiaryReaderService({
                        textReaderRepository
                    })

                const records =
                    service.parseText(
                        PDF_TEXT
                    )

                expect(
                    textReaderRepository.readText
                ).not.toHaveBeenCalled()

                expect(records).toHaveLength(1)

                expect(records[0]).toMatchObject({
                    layout: "DEFAULT",
                    data: "01/06/2026",
                    dataPublicacao: "01/06/2026",
                    codigo: "COD123",
                    processo:
                        "00012345620265200001",
                    orgao:
                        "1 Vara do Trabalho",
                    comunicacaoId: "456",
                    conteudo:
                        "Despacho publicado"
                })
            }
        )


        test(
            "read continua funcionando e realiza apenas uma leitura",
            async () => {

                const file = {
                    filePath: "diario.pdf",
                    fileName: "diario.pdf"
                }

                const textReaderRepository = {
                    readText: jest.fn(
                        async (_file: iFileData) =>
                            PDF_TEXT
                    )
                }

                const service =
                    createPdfDiaryReaderService({
                        textReaderRepository
                    })

                const records =
                    await service.read(file)

                expect(
                    textReaderRepository.readText
                ).toHaveBeenCalledTimes(1)

                expect(
                    textReaderRepository.readText
                ).toHaveBeenCalledWith(file)

                expect(records).toHaveLength(1)

                expect(records[0].layout)
                    .toBe("DEFAULT")
            }
        )


        test(
            "parseText retorna lista vazia para texto que nao corresponde a layout PDF conhecido",
            () => {

                const service =
                    createPdfDiaryReaderService({
                        textReaderRepository: {
                            readText: jest.fn(
                                async () => ""
                            )
                        }
                    })

                const records =
                    service.parseText(
                        "documento sem marcadores conhecidos"
                    )

                expect(records).toEqual([])
            }
        )


        test(
            "parseText registra quantidade de blocos quando logger foi informado",
            () => {

                const logger = {
                    info: jest.fn()
                }

                const service =
                    createPdfDiaryReaderService({
                        textReaderRepository: {
                            readText: jest.fn(
                                async () =>
                                    PDF_TEXT
                            )
                        },
                        logger
                    })

                const records =
                    service.parseText(
                        PDF_TEXT
                    )

                expect(
                    logger.info
                ).toHaveBeenCalledWith(
                    "Blocos encontrados no PDF",
                    {
                        total: records.length
                    }
                )
            }
        )

    }
)
