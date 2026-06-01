import { describe, expect, test } from "@jest/globals"

import { parsePdfDiaryRecords } from "../../src/services/pdfDiaryParser/pdfDiaryParser.services"

describe("parsePdfDiaryRecords", () => {
    test("extrai registro do layout Outlook/IS Processos com dados de publicacao", () => {
        const text = `
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

        const result = parsePdfDiaryRecords(text, {
            dataDivulgacao: "31/05/2026",
            dataPublicacao: "01/06/2026"
        })

        expect(result).toHaveLength(1)
        expect(result[0]).toMatchObject({
            layout: "DEFAULT",
            data: "01/06/2026",
            dataPublicacao: "01/06/2026",
            codigo: "COD123",
            processo: "0001234-56.2026.5.20.0001",
            orgao: "1 Vara do Trabalho",
            comunicacaoId: "456",
            conteudo: "Despacho publicado"
        })
        expect(result[0].partes).toContain("CLIENTE TESTE")
        expect(result[0].advogados).toContain("JOAO SILVA OAB SE 123")
        expect(result[0].informacoes).not.toContain("comunicacao_id")
    })

    test("descarta blocos incompletos", () => {
        const result = parsePdfDiaryRecords("Data : 01/06/2026 Codigo: COD123")

        expect(result).toEqual([])
    })
})
