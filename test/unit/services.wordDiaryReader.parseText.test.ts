import {
    describe,
    expect,
    jest,
    test
} from "@jest/globals"

import {
    createDiaryReaderService
} from "../../src/services/wordDiaryReader/wordDiaryReader.services"

import {
    iFileData
} from "../../src/services/validateIntimations/validateIntimations.services"


const WORD_TEXT = `
    Data Disponibilizacao: 31/05/2026
    Data Publicacao: 01/06/2026
    Codigo: COD123
    Jornal: DJE
    Tribunal: TRT20
    Vara: 1 Vara do Trabalho de Aracaju
    Informacoes: texto da intimacao para teste
`


describe(
    "createDiaryReaderService",
    () => {

        test(
            "parseText processa texto Word ja extraido sem acessar repository",
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
                    createDiaryReaderService({
                        textReaderRepository
                    })

                const records =
                    service.parseText(
                        WORD_TEXT
                    )

                expect(
                    textReaderRepository.readText
                ).not.toHaveBeenCalled()

                expect(records).toHaveLength(1)

                expect(records[0]).toMatchObject({
                    layout: "WORD_CADASTRADO",
                    dataDisponibilizacao:
                        "31/05/2026",
                    dataPublicacao:
                        "01/06/2026",
                    codigo: "COD123",
                    jornal: "DJE",
                    tribunal: "TRT20",
                    vara:
                        "1 Vara do Trabalho de Aracaju"
                })
            }
        )


        test(
            "read continua funcionando e realiza apenas uma leitura",
            async () => {

                const file = {
                    filePath: "diario.docx",
                    fileName: "diario.docx"
                }

                const textReaderRepository = {
                    readText: jest.fn(
                        async (_file: iFileData) => WORD_TEXT
                    )
                }

                const service =
                    createDiaryReaderService({
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
                    .toBe("WORD_CADASTRADO")
            }
        )


        test(
            "parseText retorna lista vazia para texto que nao corresponde ao layout Word",
            () => {

                const service =
                    createDiaryReaderService({
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
                    createDiaryReaderService({
                        textReaderRepository: {
                            readText: jest.fn(
                                async () =>
                                    WORD_TEXT
                            )
                        },
                        logger
                    })

                const records =
                    service.parseText(
                        WORD_TEXT
                    )

                expect(
                    logger.info
                ).toHaveBeenCalledWith(
                    "Blocos encontrados no Word",
                    {
                        total: records.length
                    }
                )
            }
        )

    }
)