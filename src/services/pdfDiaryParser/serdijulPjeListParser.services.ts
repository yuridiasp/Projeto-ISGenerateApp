import {
  DiaryRecord,
  PdfDiaryMetadata
} from "@models/diaryReader/diaryReader.models";

import {
  extractValue
} from "@helpers/diaryRegex.helpers";

import {
  cleanDiaryValue
} from "@helpers/diaryText.helpers";

import {
  removeSerdijulNoise
} from "@helpers/pdfDiaryText.helpers";


export function parseSerdijulPjeListRecord(
  block: string,
  metadata: PdfDiaryMetadata = {}
): DiaryRecord {
  const cleanedBlock =
    trimPjeRecord(
      removePjePageChrome(block)
    );

  const processo =
    extractValue(
      cleanedBlock,
      /\bNPU\s*:\s*(\d{7}-\d{2}\.\d{4}\.\d\.\d{2}\.\d{4})/i
    );

  const orgao =
    extractValue(
      cleanedBlock,
      /Orgao\s+Julgador\s*:\s*([\s\S]*?)\s+Prazo\s*:/i
    );

  const dataDisponibilizacao =
    normalizeShortDate(
      extractValue(
        cleanedBlock,
        /Data\s+e\s+hora\s+da\s+disponibilizacao\s+da\s+Intimacao\s+no\s+Painel\s*:\s*(\d{2}\/\d{2}\/\d{2,4})/i
      )
    );

  const classe =
    extractValue(
      cleanedBlock,
      /Classe\s+do\s+Processo\s*:\s*([\s\S]*?)\s+Assunto\s*:/i
    );

  const informacoes =
    cleanDiaryValue(
      cleanedBlock
    );

  return {
    layout: "SERDIJUL",

    processo,
    processoCnj: processo,

    orgao,
    vara: orgao,

    dataDisponibilizacao,

    dataDivulgacao:
      metadata.dataDivulgacao,

    dataPublicacao:
      metadata.dataPublicacao,

    tipoComunicacao:
      "Intimacao",

    meio:
      "PJe",

    classe,

    conteudo:
      informacoes,

    informacoes,

    partes:
      extractPjeListPartes(
        cleanedBlock
      ),

    advogados:
      extractPjeListAdvogados(
        cleanedBlock
      ),

    jornal:
      metadata.jornal,

    tribunal:
      metadata.tribunal
  };
}


export function isValidSerdijulPjeListRecord(
  record: DiaryRecord
): boolean {
  return Boolean(
    record.processo &&
    record.orgao &&
    record.dataDisponibilizacao
  );
}


function extractPjeListPartes(
  block: string
): string[] {
  const poloAtivo =
    extractValue(
      block,
      /Polo\s+Ativo\s*:\s*([\s\S]*?)\s+Polo\s+Passivo\s*:/i
    );

  const poloPassivo =
    extractValue(
      block,
      /Polo\s+Passivo\s*:\s*([\s\S]*?)\s+Parte\s+a\s+qual\s+se\s+refere\s+a\s+intimacao\s*:/i
    );

  return uniqueValues([
    ...splitValues(poloAtivo),
    ...splitValues(poloPassivo)
  ]);
}


function extractPjeListAdvogados(
  block: string
): string[] {
  const advogadoDirigido =
    extractValue(
      block,
      /Advogado\s+ao\s+qual\s+e\s+dirigida\s+a\s+intimacao\s*:\s*([\s\S]*?)\s+OAB\s+do\s+advogado\s+ao\s+qual\s+e\s+dirigida\s+a\s+intimacao\s*:/i
    );

  const poloAtivo =
    extractValue(
      block,
      /Advogados\s+cadastrados\s+no\s+polo\s+ativo\s*:\s*([\s\S]*?)\s+Advogados\s+cadastrados\s+no\s+polo\s+passivo\s*:/i
    );

  const poloPassivo =
    extractValue(
      block,
      /Advogados\s+cadastrados\s+no\s+polo\s+passivo\s*:\s*([\s\S]*?)\s+Data\s+e\s+hora\s+da\s+disponibilizacao/i
    );

  return uniqueValues([
    ...splitValues(
      advogadoDirigido
    ),

    ...splitValues(
      poloAtivo
    ),

    ...splitValues(
      poloPassivo
    )
  ]);
}


function splitValues(
  value?: string
): string[] {
  if (!value) {
    return [];
  }

  return value
    .split(
      /\s*\/\s*|\s*;\s*/
    )
    .map(item =>
      cleanPjeListItem(item)
    )
    .filter(
      (
        item
      ): item is string =>
        Boolean(
          item &&
          item !== "-" &&
          item !== "--"
        )
    );
}


function uniqueValues(
  values: string[]
): string[] {
  return [
    ...new Set(
      values.map(value =>
        value.trim()
      )
    )
  ];
}


function normalizeShortDate(
  value?: string
): string | undefined {
  if (!value) {
    return undefined;
  }

  const normalized =
    value
      .replace(/-/g, "/")
      .trim();

  const shortDate =
    normalized.match(
      /^(\d{2})\/(\d{2})\/(\d{2})$/
    );

  if (!shortDate) {
    return normalized;
  }

  return [
    shortDate[1],
    shortDate[2],
    `20${shortDate[3]}`
  ].join("/");
}


function trimPjeRecord(
  block: string
): string {
  const endMatch =
    block.match(
      /Data\s+Limite\s*:\s*\d{2}\/\d{2}\/\d{2,4}\s+\d{2}\s*:\s*\d{2}/i
    );

  if (
    !endMatch ||
    endMatch.index === undefined
  ) {
    return block.trim();
  }

  return block
    .slice(
      0,
      endMatch.index +
        endMatch[0].length
    )
    .trim();
}


function removePjePageChrome(
  block: string
): string {
  return removeSerdijulNoise(
    block
  )
    /*
     * Remove número de página deixado
     * imediatamente antes do cabeçalho
     * da página seguinte.
     */
    .replace(
      /\s+\d{1,4}\s+(?=DI[ÁAÃ]RIO\s+DO\s+TRIBUNAL)/gi,
      " "
    )

    /*
     * Cabeçalho do tribunal.
     */
    .replace(
      /DI[ÁAÃ]RIO\s+DO\s+TRIBUNAL[\s\S]*?(?=\s+Edi(?:ç|c)[aã]o\s+n[º°o]?)/gi,
      " "
    )

    /*
     * Linha de edição/divulgação/publicação.
     */
    .replace(
      /Edi(?:ç|c)[aã]o\s+n[º°o]?\s+Data\s+da\s+Divulga(?:ç|c)[aã]o\s*:[\s\S]*?\bPublica(?:ç|c)[oõ]es\b/gi,
      " "
    )

    /*
     * Cabeçalho do Caderno PJe.
     */
    .replace(
      /CADERNO\s+\d+\s*#?\s*LISTAS\s+DE\s+INTIMACOES\s+DISPONIBILIZADAS\s+NO\s+PJE\s+DE\s+[12][º°]?\s+GRAU/gi,
      " "
    )

    .replace(
      /[ ]{2,}/g,
      " "
    )

    .trim();
}

function cleanPjeListItem(
  value: string
): string | undefined {
  const cleaned = cleanDiaryValue(
    value
      /*
       * Exemplo real do PDF:
       * "48 -- -- FABIO CORREA RIBEIRO"
       */
      .replace(
        /^\s*\d{1,4}\s+(?:--\s*)+/,
        ""
      )

      /*
       * Remove separadores residuais sem
       * número de página.
       */
      .replace(
        /^\s*(?:--\s*)+/,
        ""
      )

      /*
       * Remove separadores finais.
       */
      .replace(
        /\s*(?:--\s*)+$/,
        ""
      )

      .trim()
  );

  return cleaned;
}