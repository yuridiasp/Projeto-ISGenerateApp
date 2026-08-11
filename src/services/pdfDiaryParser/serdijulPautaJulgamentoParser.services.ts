import {
  DiaryRecord,
  PdfDiaryMetadata
} from "@models/diaryReader/diaryReader.models"

import {
  cleanDiaryValue,
  cleanPartyOrLawyerName
} from "@helpers/diaryText.helpers"


export function parseSerdijulPautaJulgamentoRecord(
  block: string,
  metadata: PdfDiaryMetadata = {}
): DiaryRecord {

  const cleanedBlock =
    trimPautaJulgamentoBlock(block)

  const processo =
    extractProcessNumber(
      cleanedBlock
    )

  const classe =
    extractProcessClass(
      cleanedBlock
    )

  return {
    layout: "SERDIJUL",

    processo,
    processoCnj: processo,

    dataDivulgacao:
      metadata.dataDivulgacao,

    dataPublicacao:
      metadata.dataPublicacao,

    tipoComunicacao:
      "Pauta de Julgamento",

    meio:
      "PJE",

    classe,

    conteudo:
      cleanDiaryValue(
        cleanedBlock
      ),

    informacoes:
      cleanDiaryValue(
        cleanedBlock
      ),

    partes:
      extractPautaPartes(
        cleanedBlock
      ),

    advogados:
      extractPautaAdvogados(
        cleanedBlock
      ),

    jornal:
      metadata.jornal,

    tribunal:
      metadata.tribunal
  }
}


export function isValidSerdijulPautaJulgamentoRecord(
  record: DiaryRecord
): boolean {
  return Boolean(
    record.processo &&
    (
      record.dataPublicacao ||
      record.dataDivulgacao
    )
  )
}


function extractProcessNumber(
  block: string
): string | undefined {

  const match =
    block.match(
      /Processo\s+N(?:º|°|o)?\s+[A-Za-zÀ-ÿ0-9._-]+-(\d{7}-\d{2}\.\d{4}\.\d\.\d{2}\.\d{4})/i
    )

  return match?.[1]
}


function extractProcessClass(
  block: string
): string | undefined {

  const match =
    block.match(
      /Processo\s+N(?:º|°|o)?\s+([A-Za-zÀ-ÿ0-9._-]+)-\d{7}-\d{2}\.\d{4}\.\d\.\d{2}\.\d{4}/i
    )

  return cleanDiaryValue(
    match?.[1]
  )
}


function extractPautaAdvogados(
  block: string
): string[] {

  const values =
    new Set<string>()

  const regex =
    /\bADVOGADO\s+([\s\S]*?)\s*\(\s*OAB\s*:\s*[^)]+\)/gi

  for (
    const match of block.matchAll(
      regex
    )
  ) {
    const name =
      cleanPartyOrLawyerName(
        match[1]
      )

    if (name) {
      values.add(name)
    }
  }

  return [
    ...values
  ]
}


function extractPautaPartes(
  block: string
): string[] {

  const match =
    block.match(
      /Intimado\(s\)\s*\/\s*Citado\(s\)\s*:\s*([\s\S]*)$/i
    )

  if (!match?.[1]) {
    return []
  }

  const value =
    match[1]
      .replace(
        /^\s*-\s*/,
        ""
      )
      .trim()

  return [
    ...new Set(
      value
        .split(
          /\s+-\s+/
        )
        .map(item =>
          cleanPartyOrLawyerName(
            item
          )
        )
        .filter(
          (
            item
          ): item is string =>
            Boolean(item)
        )
    )
  ]
}


function trimPautaJulgamentoBlock(
  block: string
): string {

  /*
   * Após a lista de intimados o PDF
   * inclui número de página e rodapé:
   *
   * 2
   * Rua São Cristovão...
   */
  const footerMatch =
    block.match(
      /\s+\d{1,4}\s+Rua\s+S[aã]o\s+Cristov[aã]o,/i
    )

  if (
    !footerMatch ||
    footerMatch.index === undefined
  ) {
    return block.trim()
  }

  return block
    .slice(
      0,
      footerMatch.index
    )
    .trim()
}