import dayjs from "dayjs";
import { describe, expect, test } from "@jest/globals";

import { comparePublicationData } from "../../src/services/publicationComparison/publicationComparison.services"

function publication(caseNumber: string, publicationDate: string) {
  return {
    case_number: caseNumber,
    publication_date: dayjs(publicationDate, "DD/MM/YYYY"),
    validateMode: "PUB_VAL" as const,
    related_case_number: "",
    description: "",
    internal_deadline: "",
    fatal_deadline: "",
    time: "",
    expert_or_defendant: "",
    local_adress: "",
    executor: "",
    separate_task: "",
    justification: ""
  };
}

describe("", () => {
    test("considera iguais arquivos com as mesmas publicacoes em ordens diferentes", () => {});

    test("identifica publicacao ausente em um dos arquivos", () => {
        const fileA = {
            file: {
            fileName: "arquivo-a.pdf",
            filePath: "arquivo-a.pdf"
            },
            publications: [
                publication("0001234-56.2026.5.20.0001", "21/08/2026")
            ]
        };

        const fileB = {
            file: {
            fileName: "arquivo-b.pdf",
            filePath: "arquivo-b.pdf"
            },
            publications: []
        };

        const result = comparePublicationData([
            fileA,
            fileB
        ]);

        expect(result.equal).toBe(false);
        expect(result.totalDifferences).toBe(1);

        expect(result.items[0]).toMatchObject({
            caseNumber: "00012345620265200001",
            status: "MISSING"
        });

        expect(result.items[0].files).toEqual([
            expect.objectContaining({
                fileName: "arquivo-a.pdf",
                count: 1
            }),
            expect.objectContaining({
                fileName: "arquivo-b.pdf",
                count: 0
            })
        ]);
    });
    
    test("identifica quantidade diferente da mesma publicacao", () => {});
    
    test("normaliza pontuacao do numero do processo", () => {});
    
    test("compara corretamente tres ou mais arquivos", () => {});
    
    test("considera iguais publicacoes vindas de formatos diferentes", () => {});
    
    test("rejeita comparacao com menos de dois arquivos", () => {});
})