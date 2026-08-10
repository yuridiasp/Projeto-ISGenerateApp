import {
    describe,
    expect,
    test
} from "@jest/globals"

import {
    parseDiaryDate,
    normalizeDiaryRecordsToISAnalysisDTO
} from "../../src/mappers/diaryRecordToISAnalysis.mapper"


describe(
    "diaryRecordToISAnalysis.mapper",
    () => {

        test(
            "interpreta data brasileira textual de cabecalho SERDIJUL",
            () => {

                const result =
                    parseDiaryDate(
                        "07 de agosto de 2026(sexta-feira)"
                    )

                expect(
                    result.isValid()
                ).toBe(true)

                expect(
                    result.format("DD/MM/YYYY")
                ).toBe("07/08/2026")
            }
        )


        test(
            "interpreta data PJe com ano de dois digitos",
            () => {

                const result =
                    parseDiaryDate(
                        "06/08/26 18:24"
                    )

                expect(
                    result.isValid()
                ).toBe(true)

                expect(
                    result.format(
                        "DD/MM/YYYY HH:mm"
                    )
                ).toBe(
                    "06/08/2026 18:24"
                )
            }
        )


        test(
            "nao lança excecao para valor de data invalido",
            () => {

                expect(
                    () =>
                        parseDiaryDate(
                            "valor completamente invalido"
                        )
                ).not.toThrow()

                expect(
                    parseDiaryDate(
                        "valor completamente invalido"
                    ).isValid()
                ).toBe(false)
            }
        )


        test(
            "usa data de disponibilizacao quando data de publicacao e invalida",
            () => {

                const records =
                    normalizeDiaryRecordsToISAnalysisDTO([
                        {
                            layout: "SERDIJUL",

                            processo:
                                "1007562-86.2025.4.01.3400",

                            dataPublicacao:
                                "DATA INVALIDA",

                            dataDisponibilizacao:
                                "06/08/2026",

                            partes: [],
                            advogados: []
                        }
                    ])

                expect(
                    records
                ).toHaveLength(1)

                expect(
                    records[0]
                        .publication_date
                        .isValid()
                ).toBe(true)

                expect(
                    records[0]
                        .publication_date
                        .format("DD/MM/YYYY")
                ).toBe(
                    "06/08/2026"
                )
            }
        )


        test(
            "normaliza registro SERDIJUL PJe com data textual de publicacao",
            () => {

                const records =
                    normalizeDiaryRecordsToISAnalysisDTO([
                        {
                            layout: "SERDIJUL",

                            processo:
                                "1007562-86.2025.4.01.3400",

                            processoCnj:
                                "1007562-86.2025.4.01.3400",

                            dataPublicacao:
                                "07 de agosto de 2026(sexta-feira)",

                            dataDisponibilizacao:
                                "06/08/2026",

                            orgao:
                                "25 Vara Federal de Juizado Especial Civel da SJDF",

                            conteudo:
                                "Intimacao",

                            partes: [
                                "MARIA JOSE DA SILVA"
                            ],

                            advogados: [
                                "FABIO CORREA RIBEIRO"
                            ]
                        }
                    ])

                expect(
                    records
                ).toHaveLength(1)

                expect(
                    records[0]
                        .publication_date
                        .format("DD/MM/YYYY")
                ).toBe(
                    "07/08/2026"
                )

                expect(
                    records[0]
                        .availability_date
                        ?.format("DD/MM/YYYY")
                ).toBe(
                    "06/08/2026"
                )

                expect(
                    records[0].case_number
                ).toBe(
                    "10075628620254013400"
                )
            }
        )

    }
)