import { describe, expect, test } from "@jest/globals"

import { identifyDiaryDocument } from "../../src/helpers/diaryDocumentIdentifier.helpers"

describe("identifyDiaryDocument", () => {
    test("identifica PDF exportado pelo IS Processos", () => {
        const text = `
            Data : 01/06/2026
            Codigo: COD123
            Nome Pesquisado: CLIENTE TESTE
            Jornal: DJE
            Tribunal: TRT20
            Vara: 1 Vara
            Informacoes: Publicacao do processo
        `

        const result = identifyDiaryDocument("intimacoes.pdf", text)

        expect(result).toMatchObject({
            fileType: "PDF",
            layout: "PDF_IS_PROCESSOS",
            extension: ".pdf",
            confidence: "HIGH"
        })
        expect(result.reasons).toEqual(expect.arrayContaining([
            expect.stringContaining("Tipo"),
            expect.stringContaining("Layout")
        ]))
    })

    test("identifica PDF SERDIJUL quando existe marcador interno sem estrutura externa", () => {
        const text = `
            Publicacao Processo: 0001234-56.2026.5.20.0001
            Orgao: 1 Vara do Trabalho
            Tipo de comunicacao: Intimacao
            Conteudo: despacho publicado
        `

        const result = identifyDiaryDocument("serdijul.PDF", text)

        expect(result).toMatchObject({
            fileType: "PDF",
            layout: "SERDIJUL",
            extension: ".pdf"
        })
        expect(result.reasons).toEqual(expect.arrayContaining([
            expect.stringContaining("Publica")
        ]))
    })

    test("identifica documento Word cadastrado com marcadores normalizados", () => {
        const text = `
            Data Disponibilizacao: 31/05/2026
            Data Publicacao: 01/06/2026
            Codigo: COD123
            Jornal: DJE
            Tribunal: TRT20
            Vara: 1 Vara
            Informacoes: texto da intimacao
        `

        const result = identifyDiaryDocument("diario.docx", text)

        expect(result).toMatchObject({
            fileType: "DOCX",
            layout: "WORD_CADASTRADO",
            extension: ".docx",
            confidence: "HIGH"
        })
    })

    test("retorna desconhecido para extensao e texto sem marcadores suficientes", () => {
        const result = identifyDiaryDocument("notas.txt", "conteudo livre")

        expect(result).toMatchObject({
            fileType: "UNKNOWN",
            layout: "UNKNOWN",
            extension: ".txt",
            confidence: "LOW"
        })
    })
})
