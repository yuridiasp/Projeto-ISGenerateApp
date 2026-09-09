import { describe, expect, test } from "@jest/globals";

import {
  extractLegacyTJSEProcessNumber,
  extractPublicationProcessNumber,
  isLegacyTJSEPublication,
  resolveDiaryProcessNumbers,
  resolveMainProcessNumber
} from "../../src/services/diaryParser/diaryPublicationParser.services";

describe("diaryPublicationParser", () => {
  test("usa numero antigo quando publicacao TJSE vem do Portal TJNET sem sinal de igual", () => {
    const text = `
      Publicacao Processo: 0059529-66.2026.8.25.0001
      Orgao: 14 Vara Civel de Aracaju
      Data de disponibilizacao: 31/08/2026
      Tipo de comunicacao: Citacao

      Inteiro teor:
      HTTPS: / /WWW.TJSE.JUS.BR /TJNET /CONSULTAS /INTERNET
      /RESPNUMPROCESSO.WSP?TMP.NPRO202611403068

      Conteudo:
      202611403068 (0059529-66.2026.8.25.0001)
      CUMPRIMENTO DE SENTENCA
    `;

    expect(isLegacyTJSEPublication(text)).toBe(true);

    expect(extractLegacyTJSEProcessNumber(text)).toBe("202611403068");

    expect(resolveDiaryProcessNumbers(text)).toEqual({
      processo: "202611403068",
      processoCnj: "0059529-66.2026.8.25.0001"
    });

    expect(resolveMainProcessNumber(text)).toBe("202611403068");
  });

  test("reconhece numero antigo do TJNET quando TMP.NPRO possui sinal de igual", () => {
    const text = `
      Publicacao Processo: 0013344-38.2024.8.25.0001

      Inteiro teor:
      https://www.tjse.jus.br/tjnet/consultas/internet/respnumprocesso.wsp?tmp.npro=201650000294

      Conteudo:
      201650000294 (0013344-38.2024.8.25.0001)
    `;

    expect(isLegacyTJSEPublication(text)).toBe(true);

    expect(extractLegacyTJSEProcessNumber(text)).toBe("201650000294");

    expect(resolveDiaryProcessNumbers(text)).toEqual({
      processo: "201650000294",
      processoCnj: "0013344-38.2024.8.25.0001"
    });
  });

  test("usa numero antigo associado ao CNJ no conteudo como fallback do Portal TJNET", () => {
    const text = `
      Publicacao Processo: 0059529-66.2026.8.25.0001

      Inteiro teor:
      https://www.tjse.jus.br/tjnet/consultas/internet/respnumprocesso.wsp?tmp.npro

      Conteudo:
      202611403068 (0059529-66.2026.8.25.0001)
      CUMPRIMENTO DE SENTENCA
    `;

    expect(isLegacyTJSEPublication(text)).toBe(true);

    expect(extractLegacyTJSEProcessNumber(text)).toBe("202611403068");

    expect(resolveDiaryProcessNumbers(text)).toEqual({
      processo: "202611403068",
      processoCnj: "0059529-66.2026.8.25.0001"
    });
  });

  test("mantem CNJ quando publicacao TJSE vem do Eproc", () => {
    const text = `
      Publicacao Processo: 0059529-66.2026.8.25.0001

      Inteiro teor:
      https://eproc.tjse.jus.br/eproc/

      Conteudo:
      202611403068 (0059529-66.2026.8.25.0001)
      Intimacao disponibilizada no Eproc.
    `;

    expect(isLegacyTJSEPublication(text)).toBe(false);

    expect(resolveDiaryProcessNumbers(text)).toEqual({
      processo: "0059529-66.2026.8.25.0001",
      processoCnj: "0059529-66.2026.8.25.0001"
    });

    expect(resolveMainProcessNumber(text)).toBe("00595296620268250001");
  });

  test("mantem CNJ separado do numero antigo TJSE", () => {
    const text = `
      Publicacao Processo: 0013344-38.2024.8.25.0001

      Inteiro teor:
      https://www.tjse.jus.br/tjnet/consultas/internet/respnumprocesso.wsp?tmp.npro=201650000294

      Conteudo:
      201650000294 (0013344-38.2024.8.25.0001)
    `;

    expect(resolveMainProcessNumber(text)).toBe("201650000294");

    expect(extractPublicationProcessNumber(text)).toBe("00133443820248250001");

    expect(resolveDiaryProcessNumbers(text)).toEqual({
      processo: "201650000294",
      processoCnj: "0013344-38.2024.8.25.0001"
    });
  });

  test("nao aplica regra do TJNET a publicacao da Justica Federal", () => {
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

    expect(resolveDiaryProcessNumbers(text)).toEqual({
      processo: "0011117-46.2025.4.05.8500",
      processoCnj: "0011117-46.2025.4.05.8500"
    });

    expect(resolveMainProcessNumber(text)).toBe("00111174620254058500");
  });

  test("mantem CNJ de outro tribunal mesmo que exista numero de 12 digitos no conteudo", () => {
    const text = `
      Publicacao Processo: 0000730-48.2025.5.20.0003

      Conteudo:
      PROCESSO: 202611403068
      Intimacao trabalhista.
    `;

    expect(resolveDiaryProcessNumbers(text)).toEqual({
      processo: "0000730-48.2025.5.20.0003",
      processoCnj: "0000730-48.2025.5.20.0003"
    });

    expect(resolveMainProcessNumber(text)).toBe("00007304820255200003");
  });
});
