import { expect, test } from "@jest/globals";

import { parseSerdijulPjeListRecord } from "../../src/services/pdfDiaryParser/serdijulPjeListParser.services";

test("remove numero de pagina e separadores dos advogados da lista PJe", () => {
    const block = `
      NPU: 1007562-86.2025.4.01.3400
      Polo Ativo: MARIA JOSE DA SILVA
      Polo Passivo: INSTITUTO NACIONAL DO SEGURO SOCIAL - INSS
      Parte a qual se refere a intimacao: INSS
      Advogado ao qual e dirigida a intimacao: -
      OAB do advogado ao qual e dirigida a intimacao: -
      Advogados cadastrados no polo ativo:
      48 -- -- FABIO CORREA RIBEIRO
      Advogados cadastrados no polo passivo: -
      Data e hora da disponibilizacao da Intimacao no Painel:
      06/08/26 18:24
      Identificador do documento: 370977395
      Classe do Processo: PROCEDIMENTO DO JUIZADO ESPECIAL CIVEL
      Assunto: Pessoa com Deficiencia
      Orgao Julgador: 25 Vara Federal de Juizado Especial Civel da SJDF
      Prazo: 10
      Data Limite: 17/08/26 23:59
    `;

    const record = parseSerdijulPjeListRecord(block);

    expect(record.advogados).toEqual(["FABIO CORREA RIBEIRO"]);
  }
);