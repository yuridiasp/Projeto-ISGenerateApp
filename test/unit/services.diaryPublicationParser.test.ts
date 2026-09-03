import { describe, expect, test } from "@jest/globals";

import {
  extractMainTJSEProcessNumberFromInformation,
  extractPublicationProcessNumber,
  resolveDiaryProcessNumbers,
  resolveMainProcessNumber
} from "../../src/services/diaryParser/diaryPublicationParser.services";

describe("diaryPublicationParser", () => {
  test("prioriza numero interno TJSE do corpo sobre CNJ e tmp.npro", () => {
    const text = `
      Publicacao Processo: 0013344-38.2024.8.25.0001

      Inteiro teor:
      https://www.tjse.jus.br/teste?tmp.npro=999999999999

      Conteudo:
      EXECUCAO DE TITULO EXTRAJUDICIAL
      PROC.: 201650000294
      NUMERO UNICO: 0013344-38.2024.8.25.0001
    `;

    expect(
      resolveMainProcessNumber(text)
    ).toBe("201650000294");
  });

  test("mantem CNJ separado do numero principal TJSE", () => {
    const text = `
      Publicacao Processo: 0013344-38.2024.8.25.0001

      Conteudo:
      PROC.: 201650000294
      NUMERO UNICO: 0013344-38.2024.8.25.0001
    `;

    expect(
      resolveMainProcessNumber(text)
    ).toBe("201650000294");

    expect(
      extractPublicationProcessNumber(text)
    ).toBe("00133443820248250001");
  });

  test("usa CNJ quando nao existe numero interno TJSE", () => {
    const text = `
      Publicacao Processo: 5006405-28.2026.8.25.0084

      Conteudo:
      Intimacao disponibilizada no sistema.
    `;

    expect(
      resolveMainProcessNumber(text)
    ).toBe("50064052820268250084");
  });

  test("nao usa numero interno TJSE em publicacao da Justica Federal", () => {
    const text = `
      Publicacao Processo: 0011117-46.2025.4.05.8500
      Orgao: 5 Vara Federal SE
      Data de disponibilizacao: 01/09/2026
      Tipo de comunicacao: Intimacao

      Conteudo:
      PROCESSO: 200800142128
      SENTENCA
      INSTITUTO NACIONAL DO SEGURO SOCIAL - INSS
    `;

    expect(
      resolveDiaryProcessNumbers(text)
    ).toEqual({
      processo: "0011117-46.2025.4.05.8500",
      processoCnj: "0011117-46.2025.4.05.8500"
    });

    expect(
      resolveMainProcessNumber(text)
    ).toBe("00111174620254058500");
  });
});