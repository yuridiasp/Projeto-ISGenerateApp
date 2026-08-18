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

    test("extrai registros SERDIJUL tradicionais e PJe NPU no mesmo PDF preservando a ordem", () => {
        const text = `
        DIÁRIO DO TRIBUNAL SUPERIOR DO TRABALHO - DJN
        Edição nº Data da Divulgação: 06 de agosto de 2026(quinta-feira)
        Data da Publicação: 07 de agosto de 2026(sexta-feira)
        Publicações

        Publicacao Processo: 0000730-48.2025.5.20.0003
        Orgao: Presidencia - Admissibilidade
        Data de disponibilizacao: 06-08-2026
        Tipo de comunicacao: Intimacao
        Meio: Diario de Justica Eletronico Nacional
        Inteiro teor: https://example.com/1
        Parte: CLIENTE TST
        Advogado: FABIO CORREA RIBEIRO
        Classe: AGRAVO DE INSTRUMENTO
        Conteudo: Decisao publicada
        |comunicacao_id: 1|

        DIÁRIO DO TRIBUNAL REGIONAL FEDERAL DA 1ª REGIÃO - PJE 1º E 2º GRAU
        Edição nº Data da Divulgação: 06 de agosto de 2026(quinta-feira)
        Data da Publicação: 06 de agosto de 2026(quinta-feira)
        Publicações

        NPU: 1007562-86.2025.4.01.3400
        Polo Ativo: MARIA JOSE DA SILVA
        Polo Passivo: INSTITUTO NACIONAL DO SEGURO SOCIAL - INSS
        Parte a qual se refere a intimacao: INSTITUTO NACIONAL DO SEGURO SOCIAL - INSS
        Advogado ao qual e dirigida a intimacao: -
        OAB do advogado ao qual e dirigida a intimacao: -
        Advogados cadastrados no polo ativo: FABIO CORREA RIBEIRO
        Advogados cadastrados no polo passivo: -
        Data e hora da disponibilizaca o da Intimacao no Painel: 06/08/26 18:24
        Identificador do documento: 370977395
        Classe do Processo: PROCEDIMENTO DO JUIZADO ESPECIAL CIVEL
        Assunto: Pessoa com Deficiencia
        Orgao Julgador: 25 Vara Federal de Juizado Especial Civel da SJDF
        Prazo: 10
        Data Limite: 17/08/26 23:59

        DIÁRIO DO TRIBUNAL REGIONAL FEDERAL DA 2ª REGIÃO - DJN
        Edição nº Data da Divulgação: 06 de agosto de 2026(quinta-feira)
        Data da Publicação: 07 de agosto de 2026(sexta-feira)
        Publicações

        Publicacao Processo: 5006818-28.2025.4.02.5006
        Orgao: 2º Nucleo de Justica 4.0 - RJ
        Data de disponibilizacao: 06/08/2026
        Tipo de comunicacao: Intimacao
        Meio: Diario de Justica Eletronico Nacional
        Inteiro teor: https://example.com/2
        Parte: HELIO SANTOS SILENCIO
        Advogado: FABIO CORREA RIBEIRO
        Classe: CUMPRIMENTO DE SENTENCA
        Conteudo: Intimacao realizada
        |comunicacao_id: 2|
        `;

        const records =
        parsePdfDiaryRecords(text);

        expect(records)
        .toHaveLength(3);

        expect(
        records.map(
            record =>
            record.processo
        )
        ).toEqual([
        "0000730-48.2025.5.20.0003",
        "1007562-86.2025.4.01.3400",
        "5006818-28.2025.4.02.5006"
        ]);

        expect(records[1])
        .toMatchObject({
            layout: "SERDIJUL",

            processo:
            "1007562-86.2025.4.01.3400",

            dataDisponibilizacao:
            "06/08/2026",

            orgao:
            "25 Vara Federal de Juizado Especial Civel da SJDF",

            tipoComunicacao:
            "Intimacao",

            classe:
            "PROCEDIMENTO DO JUIZADO ESPECIAL CÍVEL"
        });

        expect(
        records[1].partes
        ).toEqual(
        expect.arrayContaining([
            "MARIA JOSE DA SILVA",
            "INSTITUTO NACIONAL DO SEGURO SOCIAL - INSS"
        ])
        );

        expect(
        records[1].advogados
        ).toContain(
        "FABIO CORREA RIBEIRO"
        );

        expect(
        records[0].tribunal
        ).toMatch(
        /TRIBUNAL SUPERIOR DO TRABALHO/i
        );

        expect(
        records[1].tribunal
        ).toMatch(
        /TRIBUNAL REGIONAL FEDERAL DA 1/i
        );

        expect(
        records[2].tribunal
        ).toMatch(
        /TRIBUNAL REGIONAL FEDERAL DA 2/i
        );
    });

    test("extrai pauta de julgamento SERDIJUL", () => {
        const text = `
        DIÁRIO DO TRIBUNAL REGIONAL DO TRABALHO DE SERGIPE (20ª REGIÃO)

        Edição nº 4532
        Data da Divulgação: 07 de agosto de 2026(sexta-feira)
        Data da Publicação: 10 de agosto de 2026(segunda-feira)

        Publicações

        Pauta Pauta de Julgamento
        Pauta da Ordinaria Virtual de Julgamento do(a) Primeira Turma

        0000 - Processo Nº
        RORSum-0000258-83.2026.5.20.0012
        Complemento Processo Eletronico - PJE
        Relator VILMA LEITE MACHADO AMORIM
        Revisor VILMA LEITE MACHADO AMORIM
        RECORRENTE LEONARDO SOUSA ALMEIDA DE LIMA
        ADVOGADO FABIO CORREA RIBEIRO
        (OAB: 353-A/SE)
        RECORRIDO LUCAS COMERCIO VAREJISTA DE PECAS E PNEUS LTDA
        ADVOGADO GUSTAVO LUIS CORREA BITENCOURT
        (OAB: 35140/SC)
        Intimado(s) / Citado(s):
        - LEONARDO SOUSA ALMEIDA DE LIMA
        - LUCAS COMERCIO VAREJISTA DE PECAS E PNEUS LTDA
        `

        const records =
        parsePdfDiaryRecords(
            text
        )

        expect(records)
        .toHaveLength(1)

        expect(records[0])
        .toMatchObject({
            layout:
            "SERDIJUL",

            processo:
            "0000258-83.2026.5.20.0012",

            classe:
            "RORSum",

            tipoComunicacao:
            "Pauta de Julgamento"
        })

        expect(
        records[0].advogados
        ).toEqual(
        expect.arrayContaining([
            "FABIO CORREA RIBEIRO",
            "GUSTAVO LUIS CORREA BITENCOURT"
        ])
        )

        expect(
        records[0].partes
        ).toEqual(
        expect.arrayContaining([
            "LEONARDO SOUSA ALMEIDA DE LIMA",
            "LUCAS COMERCIO VAREJISTA DE PECAS E PNEUS LTDA"
        ])
        )
    })
})
