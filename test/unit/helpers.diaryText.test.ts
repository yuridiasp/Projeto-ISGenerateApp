import { describe, test, expect } from "@jest/globals"

import { cleanDiaryValue } from "../../src/helpers/diaryText.helpers"
import { extractPdfDiaryMetadata, isLegacySerdijulText } from "../../src/helpers/pdfDiaryText.helpers"
import { resolveFileIdentifier, resolveFilePublicationDate } from "../../src/services/diaryFileRenamer";
import { DiaryRecord } from "../../src/models/diaryReader"

function record(partial: Partial<DiaryRecord>): DiaryRecord {
  return {
    partes: [],
    advogados: [],
    ...partial
  } as DiaryRecord;
}

describe("helpers.diaryText", () => {  
    test("remove separadores extensos de underline sem alterar identificadores validos", () => {
        expect(cleanDiaryValue("09 de setembro de 2026(quarta-feira) __________________ Publicações"))
        .toBe("09 de setembro de 2026(quarta-feira) Publicações");
        
        expect(cleanDiaryValue("|comunicacao_id: 12345|"))
        .toBe("|comunicacao_id: 12345|");
    });

    test("extrai metadata da Justica Federal", () => {
        const metadata = extractPdfDiaryMetadata(`
            DIÁRIO DA JUSTIÇA FEDERAL DO CEARÁ - DJN
            Edição nº
            Data da Divulgação: 04 de setembro de 2026(sexta-feira)
            Data da Publicação: 08 de setembro de 2026(terça-feira)
            Publicações
        `);
    
        expect(metadata.tribunal).toMatch(/JUSTIÇA FEDERAL DO CEARÁ/i);
        expect(metadata.dataDivulgacao).toBe("04 de setembro de 2026(sexta-feira)");
        expect(metadata.dataPublicacao).toBe("08 de setembro de 2026(terça-feira)");
    });

    test("extrai somente a data de publicacao ignorando separadores", () => {
        const metadata = extractPdfDiaryMetadata(`
            DIARIO DO TRIBUNAL DE JUSTICA DE SERGIPE
            Edição nº
            Data da Divulgação: 08 de setembro de 2026(terça-feira)
            Data da Publicação: 09 de setembro de 2026(quarta-feira)
            ______________________________________________________________________
            Publicações
        `);
        
        expect(metadata.dataPublicacao).toBe("09 de setembro de 2026(quarta-feira)");
    });

    test("gera JFCE para Justica Federal do Ceara", () => {
        const records = [
            record({
                layout: "SERDIJUL",
                tribunal: "JUSTICA FEDERAL DO CEARA",
                dataPublicacao: "08 de setembro de 2026(terça-feira)"
            })
        ];

        expect(resolveFileIdentifier(records)).toBe("JFCE");
    });

    test("agrupa diferentes tribunais do mesmo estado pela UF", () => {
        const records = [
            record({
                layout: "SERDIJUL",
                tribunal: "TRIBUNAL REGIONAL DO TRABALHO DA BAHIA (5 REGIAO)"
            }),
            record({
                layout: "SERDIJUL",
                tribunal: "JUSTICA FEDERAL DA BAHIA"
            }),
            record({
                layout: "SERDIJUL",
                tribunal: "TRIBUNAL DE JUSTICA DA BAHIA"
            })
        ];

        expect(resolveFileIdentifier(records)).toBe("BA");
    });

    test("usa data de divulgacao quando data de publicacao nao existe", () => {
        const records = [
            record({
                layout: "SERDIJUL",
                tribunal: "TRIBUNAL DE JUSTICA DE SERGIPE",
                dataDivulgacao: "08 de setembro de 2026(terça-feira)"
            })
        ];

        expect(resolveFilePublicationDate(records)).toBe("08092026");
    });

    test("nao classifica SERDIJUL tradicional como legado apenas por conter processo TJSE antigo no corpo", () => {
        const text = `
            DIARIO DO TRIBUNAL DE JUSTICA DE SERGIPE
            Data da Divulgação: 12 de agosto de 2026
            Data da Publicação: 13 de agosto de 2026

            Publicacao Processo: 0013344-38.2024.8.25.0001
            Orgao: 1 Vara Civel
            Data de disponibilizacao: 12/08/2026
            Conteudo:
            PROCESSO....: 202410201440
            NUMERO UNICO: 0013344-38.2024.8.25.0001
        `;

        expect(isLegacySerdijulText(text)).toBe(false);
    });

    test("identifica SERDIJUL legado sem marcador Publicacao Processo", () => {
        const text = `
            DIARIO DO TRIBUNAL DE JUSTICA DE SERGIPE
            Data da Divulgação: 08 de setembro de 2026
            Edição nº 6804

            DEPARTAMENTO DE PRECATORIOS
            PRECATORIO NRO.
            PROCESSO....: 202400153138
            NUMERO UNICO: 0015165-80.2024.8.25.0000
        `;

        expect(isLegacySerdijulText(text)).toBe(true);
    });
})
