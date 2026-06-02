import { DiaryRecord } from "@models/diaryReader/diaryReader.models";
import { extractValue } from "@helpers/diaryRegex.helpers";
import {
  cleanDiaryValue,
  removeComunicacaoId
} from "@helpers/diaryText.helpers";
import { extractDiaryPartes } from "@helpers/diaryPartes.helpers";
import { extractDiaryAdvogados } from "@helpers/diaryAdvogados.helpers";
import { extractDiaryProcessNumber } from "@helpers/diaryProcess.helpers";

export function enrichRecordWithInternalPublication(
  baseRecord: DiaryRecord,
  informacoes: string
): DiaryRecord {
  if (hasPublicacaoProcesso(informacoes)) {
    return enrichRecordWithPublicacaoProcesso(baseRecord, informacoes);
  }

  return enrichRecordWithLegacyInformation(baseRecord, informacoes);
}

export function hasPublicacaoProcesso(text: string): boolean {
  return /Publicacao\s+Processo\s*:/i.test(text) ||
    /PUBLICACAO\s+PROCESSO\s*:/i.test(text);
}

function enrichRecordWithPublicacaoProcesso(
  baseRecord: DiaryRecord,
  informacoes: string
): DiaryRecord {
  const processo = extractDiaryProcessNumber(informacoes);

  const orgao =
    extractValue(
      informacoes,
      /Orgao\s*:\s*([\s\S]*?)\s+Data\s+de\s+disponibilizacao\s*:/i
    ) ??
    extractValue(
      informacoes,
      /ORGAO\s*:\s*([\s\S]*?)\s+DATA\s+DE\s+DISPONIBILIZACAO\s*:/i
    );

  const comunicacaoId =
    extractValue(
      informacoes,
      /\|\s*comunicacao_id\s*:\s*([^|]+)\|/i
    ) ??
    extractValue(
      informacoes,
      /\|\s*COMUNICACAO_ID\s*:\s*([^|]+)\|/i
    );

  const conteudo =
    extractValue(
      informacoes,
      /Conteudo\s*:\s*([\s\S]*?)(?=\s+\|\s*comunicacao_id\s*:|$)/i
    ) ??
    extractValue(
      informacoes,
      /CONTEUDO\s*:\s*([\s\S]*?)(?=\s+\|\s*COMUNICACAO_ID\s*:|$)/i
    );

  return {
    ...baseRecord,

    processo,
    processoCnj: processo,

    orgao,
    vara: orgao ?? baseRecord.vara,

    dataDisponibilizacao:
      extractValue(
        informacoes,
        /Data\s+de\s+disponibilizacao\s*:\s*([\d\/-]+)/i
      ) ??
      extractValue(
        informacoes,
        /DATA\s+DE\s+DISPONIBILIZACAO\s*:\s*([\d\/-]+)/i
      ) ??
      baseRecord.dataDisponibilizacao,

    tipoComunicacao:
      extractValue(
        informacoes,
        /Tipo\s+de\s+comunicacao\s*:\s*([\s\S]*?)\s+Meio\s*:/i
      ) ??
      extractValue(
        informacoes,
        /TIPO\s+DE\s+COMUNICACAO\s*:\s*([\s\S]*?)\s+MEIO\s*:/i
      ),

    meio:
      extractValue(
        informacoes,
        /Meio\s*:\s*([\s\S]*?)\s+Inteiro\s+teor\s*:/i
      ) ??
      extractValue(
        informacoes,
        /MEIO\s*:\s*([\s\S]*?)\s+INTEIRO\s+TEOR\s*:/i
      ),

    inteiroTeor:
      extractValue(
        informacoes,
        /Inteiro\s+teor\s*:\s*([\s\S]*?)\s+Parte\s*:/i
      ) ??
      extractValue(
        informacoes,
        /INTEIRO\s+TEOR\s*:\s*([\s\S]*?)\s+PARTE\s*:/i
      ),

    classe:
      extractValue(
        informacoes,
        /Classe\s*:\s*([\s\S]*?)\s+Conteudo\s*:/i
      ) ??
      extractValue(
        informacoes,
        /CLASSE\s*:\s*([\s\S]*?)\s+CONTEUDO\s*:/i
      ),

    conteudo: cleanDiaryValue(conteudo),

    comunicacaoId,

    informacoes: cleanDiaryValue(
      removeComunicacaoId(informacoes)
    ),

    partes: extractDiaryPartes(informacoes),
    advogados: extractDiaryAdvogados(informacoes)
  };
}

function enrichRecordWithLegacyInformation(
  baseRecord: DiaryRecord,
  informacoes: string
): DiaryRecord {
  const processoCnj =
    extractValue(informacoes, /NUMERO\s+UNICO\s*:\s*([0-9.-]+)/i) ??
    extractValue(informacoes, /NÚMERO\s+ÚNICO\s*:\s*([0-9.-]+)/i);

  const processo =
    processoCnj ??
    extractDiaryProcessNumber(informacoes);

  return {
    ...baseRecord,

    processo,
    processoCnj,

    processoOrigem: extractValue(
      informacoes,
      /PROCESSO\s+ORIGEM\.*\s*:\s*([0-9A-Z./-]+)/i
    ),

    orgao: extractValue(
      informacoes,
      /ORGAO\s+JULGADOR\.*\s*:\s*([\s\S]*?)\s+RELATOR/i
    ),

    classe: extractValue(
      informacoes,
      /<\s*IDENTIFICACAO\s+DO\s+PROCESSO\s*>\s*[\d\s-]*\s*([A-ZÀ-Ú\s]+?)\s+NRO\.\s*PROCESSO/i
    ),

    conteudo: cleanDiaryValue(informacoes),

    informacoes: cleanDiaryValue(informacoes),

    partes: extractDiaryPartes(informacoes),
    advogados: extractDiaryAdvogados(informacoes)
  };
}