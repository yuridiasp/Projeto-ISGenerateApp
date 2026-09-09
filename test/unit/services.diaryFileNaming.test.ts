import {
  describe,
  expect,
  test
} from "@jest/globals";

import { DiaryRecord } from "../../src/models/diaryReader/diaryReader.models";

import {
  buildDiaryFileName,
  resolveFileIdentifier,
  resolveFileLawyerSuffix,
  resolveFilePublicationDate,
  resolveRenameSource,
  resolveSearchedLawyer
} from "../../src/services/diaryFileRenamer/diaryFileNaming.services";

function record(
  partial: Partial<DiaryRecord>
): DiaryRecord {
  return {
    partes: [],
    advogados: [],
    ...partial
  };
}

describe("diaryFileNaming", () => {
  test("gera nome SERDIJUL TST", () => {
      const records = [
        record({
          layout: "SERDIJUL",
          tribunal:
            "TRIBUNAL SUPERIOR DO TRABALHO",
          dataPublicacao:
            "09 de setembro de 2026(quarta-feira)"
        })
      ];

      expect(
        buildDiaryFileName("C:\\docs\\arquivo.pdf", records)
      ).toBe(
        "SERDIJUL TST 09092026.pdf"
      );
    }
  );

  test("gera nome IS TJSE", () => {
      const records = [
        record({
          layout: "DEFAULT",
          tribunal:
            "Tribunal de Justiça do Estado de Sergipe",
          dataPublicacao:
            "08/09/2026"
        })
      ];

      expect(
        buildDiaryFileName("C:\\docs\\arquivo.pdf", records)
      ).toBe(
        "IS TJSE 08092026.pdf"
      );
    }
  );

  test("mantem TST quando arquivo possui somente TST", () => {
      const records = [
        record({
          layout: "SERDIJUL",
          tribunal:
            "TRIBUNAL SUPERIOR DO TRABALHO",
          dataPublicacao:
            "09/09/2026"
        }),
        record({
          layout: "SERDIJUL",
          tribunal:
            "TRIBUNAL SUPERIOR DO TRABALHO",
          dataPublicacao:
            "09/09/2026"
        })
      ];

      expect(resolveFileIdentifier(records)).toBe("TST");
    }
  );

  test("classifica misto STJ e TST como TS", () => {
      const records = [
        record({
          layout: "SERDIJUL",
          tribunal:
            "SUPERIOR TRIBUNAL DE JUSTICA",
          dataPublicacao:
            "09/09/2026"
        }),
        record({
          layout: "SERDIJUL",
          tribunal:
            "TRIBUNAL SUPERIOR DO TRABALHO",
          dataPublicacao:
            "09/09/2026"
        })
      ];

      expect(resolveFileIdentifier(records)).toBe("TS");
    }
  );

  test("classifica TST com TRF1 e TRF5 de segundo grau como TS", () => {
      const records = [
        record({
          layout: "SERDIJUL",
          tribunal:
            "TRIBUNAL SUPERIOR DO TRABALHO",
          dataPublicacao:
            "09/09/2026"
        }),

        record({
          layout: "SERDIJUL",
          tribunal:
            "TRIBUNAL REGIONAL FEDERAL DA 1 REGIAO",
          jornal:
            "DIARIO DO TRIBUNAL REGIONAL FEDERAL DA 1 REGIAO - PJE 2º GRAU",
          dataPublicacao:
            "09/09/2026"
        }),

        record({
          layout: "SERDIJUL",
          tribunal:
            "TRIBUNAL REGIONAL FEDERAL DA 5 REGIAO",
          jornal:
            "DIARIO DO TRIBUNAL REGIONAL FEDERAL DA 5 REGIAO - PJE 2º GRAU",
          dataPublicacao:
            "09/09/2026"
        })
      ];

      expect(resolveFileIdentifier(records)).toBe("TS");
    }
  );

  test("nao cria nome quando existem datas de publicacao diferentes", () => {
      const records = [
        record({
          layout: "SERDIJUL",
          tribunal:
            "TRIBUNAL SUPERIOR DO TRABALHO",
          dataPublicacao:
            "08/09/2026"
        }),

        record({
          layout: "SERDIJUL",
          tribunal:
            "TRIBUNAL SUPERIOR DO TRABALHO",
          dataPublicacao:
            "09/09/2026"
        })
      ];

      expect(
        resolveFilePublicationDate(records)
      ).toBeUndefined();

      expect(
        buildDiaryFileName("C:\\docs\\arquivo.pdf", records)
      ).toBeUndefined();
    }
  );

  test("preserva extensao original", () => {
      const records = [
        record({
          layout: "SERDIJUL",
          tribunal:
            "TRIBUNAL SUPERIOR DO TRABALHO",
          dataPublicacao:
            "09/09/2026"
        })
      ];

      expect(
        buildDiaryFileName("C:\\docs\\arquivo.docx", records)
      ).toBe(
        "SERDIJUL TST 09092026.docx"
      );
    }
  );

  test("identifica origem SERDIJUL e IS", () => {
    expect(
      resolveRenameSource([
        record({
          layout: "SERDIJUL"
        })
      ])
    ).toBe("SERDIJUL");

    expect(
      resolveRenameSource([
        record({
          layout: "DEFAULT"
        })
    ])).toBe("IS");
  })

  test("classifica arquivo misto de TST TRF1 e TRF5 como TS", () => {
    const records = [
      record({ layout: "SERDIJUL", tribunal: "TRIBUNAL SUPERIOR DO TRABALHO" }),
      record({ layout: "SERDIJUL", tribunal: "TRIBUNAL REGIONAL FEDERAL DA 1 REGIAO", jornal: "PJE 1º E 2º GRAU" }),
      record({ layout: "SERDIJUL", tribunal: "TRIBUNAL REGIONAL FEDERAL DA 5 REGIAO", jornal: "PJE 2º GRAU" })
    ];

    expect(resolveFileIdentifier(records)).toBe("TS");
  });

  test("usa data mais recente quando arquivo TS possui mais de uma data de publicacao", () => {
    const records = [
      record({
        layout: "SERDIJUL",
        tribunal: "TRIBUNAL SUPERIOR DO TRABALHO",
        dataPublicacao: "08 de setembro de 2026(terça-feira)"
      }),
      record({
        layout: "SERDIJUL",
        tribunal: "TRIBUNAL REGIONAL FEDERAL DA 1 REGIAO",
        dataPublicacao: "04 de setembro de 2026(sexta-feira)"
      }),
      record({
        layout: "SERDIJUL",
        tribunal: "TRIBUNAL REGIONAL FEDERAL DA 5 REGIAO",
        dataPublicacao: "08 de setembro de 2026(terça-feira)"
      })
    ];

    expect(resolveFilePublicationDate(records)).toBe("08092026");
  });

  test("identifica TJSE pelo CNJ quando metadata do tribunal nao estiver disponivel", () => {
    const records = [
      record({
        layout: "SERDIJUL",
        processo: "202600763249",
        processoCnj: "0034886-78.2025.8.25.0001",
        dataPublicacao: "10 de setembro de 2026(quinta-feira)"
      })
    ];

    expect(resolveFileIdentifier(records)).toBe("TJSE");
    expect(buildDiaryFileName("C:\\docs\\SERDIJUL 28.docx", records))
      .toBe("SERDIJUL TJSE 10092026.docx");
  });

  test("identifica TJSE por CNJ formatado", () => {
    const records = [
      record({
        layout: "SERDIJUL",
        processo: "202610501013",
        processoCnj: "0043687-46.2026.8.25.0001",
        dataPublicacao: "10 de setembro de 2026(quinta-feira)"
      })
    ];

    expect(resolveFileIdentifier(records)).toBe("TJSE");
  });

  test("identifica TJSE por CNJ sanitizado", () => {
    const records = [
      record({
        layout: "SERDIJUL",
        processo: "202610501013",
        processoCnj: "00436874620268250001",
        dataPublicacao: "10 de setembro de 2026(quinta-feira)"
      })
    ];

    expect(resolveFileIdentifier(records)).toBe("TJSE");
  });

  test("identifica TJSE pelo dominio do inteiro teor", () => {
    const records = [
      record({
        layout: "SERDIJUL",
        processo: "202610501013",
        inteiroTeor: "https://www.tjse.jus.br/tjnet/consultas/internet/respnumprocesso.wsp?tmp.npro=202610501013",
        dataPublicacao: "10 de setembro de 2026(quinta-feira)"
      })
    ];

    expect(resolveFileIdentifier(records)).toBe("TJSE");
  });

  test("gera nome do SERDIJUL TJSE mesmo quando tribunal nao esta no metadata", () => {
    const records = [
      record({
        layout: "SERDIJUL",
        processo: "202610501013",
        processoCnj: "00436874620268250001",
        dataPublicacao: "10 de setembro de 2026(quinta-feira)"
      })
    ];

    expect(buildDiaryFileName("C:\\docs\\SERDIJUL 28.docx", records))
      .toBe("SERDIJUL TJSE 10092026.docx");
  });

  test("nao confunde preposicao para com estado do Para", () => {
    const records = [
      record({
        layout: "SERDIJUL",
        tribunal: "JUSTICA FEDERAL DE SERGIPE",
        orgao: "5 Vara Federal SE",
        dataPublicacao: "09/09/2026",
        conteudo: "Ficam as partes intimadas para se manifestarem sobre os laudos periciais."
      })
    ];

    expect(resolveFileIdentifier(records)).toBe("JFSE");
  });

  test("mantem JFSP mesmo quando conteudo possui a palavra para", () => {
    const records = [
      record({
        layout: "SERDIJUL",
        tribunal: "JUSTICA FEDERAL DE SAO PAULO",
        dataPublicacao: "08/09/2026",
        conteudo: "Intime-se a parte para apresentar manifestação."
      })
    ];

    expect(resolveFileIdentifier(records)).toBe("JFSP");
  });

  test("mantem JFGO mesmo quando conteudo possui a palavra para", () => {
    const records = [
      record({
        layout: "SERDIJUL",
        tribunal: "JUSTICA FEDERAL DE GOIAS",
        dataPublicacao: "08/09/2026",
        conteudo: "Prazo concedido para cumprimento da determinação."
      })
    ];

    expect(resolveFileIdentifier(records)).toBe("JFGO");
  });

  test("identifica corretamente Justica Federal do Para", () => {
    const records = [
      record({
        layout: "SERDIJUL",
        tribunal: "JUSTICA FEDERAL DO PARA",
        dataPublicacao: "09/09/2026"
      })
    ];

    expect(resolveFileIdentifier(records)).toBe("JFPA");
  });

  test("gera sufixo VOLNANDY mesmo quando existe outro advogado na publicacao", () => {
    const records = [
      record({
        layout: "SERDIJUL",
        tribunal: "TRIBUNAL REGIONAL DO TRABALHO DE SERGIPE (20 REGIAO)",
        dataPublicacao: "09/09/2026",
        advogados: [
          "VOLNANDY JOSE MENEZES BRITO - OAB SE-6998",
          "GENILSON ALVES DE SOUSA - OAB SE-10979"
        ]
      })
    ];

    expect(resolveFileLawyerSuffix(records)).toBe("VOLNANDY");

    expect(buildDiaryFileName("C:\\docs\\arquivo.pdf", records))
      .toBe("SERDIJUL TRT20 09092026 VOLNANDY.pdf");
  });

  test("ignora advogados que nao fazem parte da lista de pesquisa", () => {
    const records = [
      record({
        advogados: [
          "VOLNANDY JOSE MENEZES BRITO - OAB SE-6998",
          "GENILSON ALVES DE SOUSA - OAB SE-10979"
        ]
      })
    ];

    expect(resolveSearchedLawyer(records)?.canonicalName)
      .toBe("VOLNANDY JOSE MENEZES DE BRITO");
  });

  test("nao acrescenta sufixo quando advogado pesquisado e Fabio", () => {
    const records = [
      record({
        advogados: [
          "FABIO CORREA RIBEIRO - OAB SE-353-A",
          "OUTRO ADVOGADO - OAB SE-1000"
        ]
      })
    ];

    expect(resolveSearchedLawyer(records)?.canonicalName)
      .toBe("FABIO CORREA RIBEIRO");

    expect(resolveFileLawyerSuffix(records)).toBeUndefined();
  });

  test("Fabio sempre tem prioridade sobre outros advogados cadastrados", () => {
    const records = [
      record({
        advogados: [
          "VOLNANDY JOSE MENEZES BRITO - OAB SE-6998",
          "FABIO CORREA RIBEIRO - OAB SE-353-A"
        ]
      })
    ];

    expect(resolveSearchedLawyer(records)?.canonicalName).toBe("FABIO CORREA RIBEIRO");
    expect(resolveFileLawyerSuffix(records)).toBeUndefined();
  });

  test("Fabio tem prioridade mesmo quando nomePesquisado aponta outro advogado", () => {
    const records = [
      record({
        nomePesquisado: "VOLNANDY JOSE MENEZES DE BRITO",
        advogados: [
          "VOLNANDY JOSE MENEZES BRITO",
          "FABIO CORREA RIBEIRO"
        ]
      })
    ];

    expect(resolveSearchedLawyer(records)?.canonicalName).toBe("FABIO CORREA RIBEIRO");
  });

  test("uma ocorrencia de Fabio tem prioridade mesmo que outro advogado apareca mais vezes", () => {
    const records = [
      record({ advogados: ["DIEGO MELO SOBRINHO"] }),
      record({ advogados: ["DIEGO MELO SOBRINHO"] }),
      record({ advogados: ["DIEGO MELO SOBRINHO"] }),
      record({ advogados: ["FABIO CORREA RIBEIRO"] })
    ];

    expect(resolveSearchedLawyer(records)?.canonicalName).toBe("FABIO CORREA RIBEIRO");
    expect(resolveFileLawyerSuffix(records)).toBeUndefined();
  });

  test("reconhece LAIS e KEVEN como nomes pesquisados cadastrados", () => {
    const recordsLais = [
      record({
        advogados: [
          "LAIS FERREIRA DOS SANTOS - OAB SE-1234"
        ]
      })
    ];

    const recordsKeven = [
      record({
        advogados: [
          "KEVEN JOSE DA SILVA - OAB SE-5678"
        ]
      })
    ];

    expect(resolveFileLawyerSuffix(recordsLais)).toBe("LAIS");
    expect(resolveFileLawyerSuffix(recordsKeven)).toBe("KEVEN");
  });
});
