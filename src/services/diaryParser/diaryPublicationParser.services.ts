// src/services/diaryParser/diaryPublicationParser.services.ts

import { DiaryRecord } from "@models/diaryReader/diaryReader.models";
import { extractValue } from "@helpers/diaryRegex.helpers";
import {
  cleanDiaryValue,
  removeComunicacaoId
} from "@helpers/diaryText.helpers";
import { extractDiaryPartes } from "@helpers/diaryPartes.helpers";
import { extractDiaryAdvogados } from "@helpers/diaryAdvogados.helpers";

export function sanitizeProcessNumber(value?: string): string | undefined {
  const sanitized = value?.replace(/\D/g, "") ?? "";

  return sanitized || undefined;
}

function normalizeTJSELegacyText(value: string): string {
  return value.replace(/\s+/g, "");
}

export function isLegacyTJSEPublication(informacoes: string): boolean {
  const normalized = normalizeTJSELegacyText(informacoes);

  return /RESPNUMPROCESSO\.WSP\?TMP\.NPRO/i.test(normalized);
}

export function extractLegacyTJSEProcessNumber(
  informacoes: string
): string | undefined {
  const normalized = normalizeTJSELegacyText(informacoes);

  /*
   * Portal antigo TJSE / TJNET.
   *
   * A extração dos documentos pode produzir:
   *
   * TMP.NPRO=202611403068
   *
   * ou:
   *
   * TMP.NPRO202611403068
   *
   * Por isso o sinal "=" é opcional.
   */
  const fromUrl = normalized.match(
    /RESPNUMPROCESSO\.WSP\?TMP\.NPRO(?:=)?([0-9]{12})(?!\d)/i
  );

  if (fromUrl?.[1]) {
    return fromUrl[1];
  }

  /*
   * Fallback observado nas publicações antigas:
   *
   * 202611403068 (0059529-66.2026.8.25.0001)
   */
  const fromContent = informacoes.match(
    /\b([0-9]{12})\b(?=\s*\(\s*\d{7}-\d{2}\.\d{4}\.8\.25\.\d{4}\s*\))/i
  );

  return fromContent?.[1];
}

export function extractMainTJSEProcessNumberFromInformation(
  informacoes: string
): string | undefined {
  const conteudo =
    extractValue(
      informacoes,
      /Conteudo\s*:\s*([\s\S]*?)(?=\s+\|\s*comunicacao_id\s*:|$)/i
    ) ?? informacoes;

  const bodyPatterns: RegExp[] = [
    /\bPROC\.\s*:\s*([0-9]{12})(?!\d)/i,

    /(?:NRO\.?|Nº|N°|NUMERO|NÚMERO)\s*(?:DO\s+)?PROCESSO\.*\s*:\s*([0-9]{12})(?!\d)/i,

    /\bPROCESSO\.*\s*:\s*([0-9]{12})(?![-.\d])/i,

    /*
     * Alguns formatos antigos iniciam o corpo diretamente
     * pelo número TJSE:
     *
     * 202556501881 PROCEDENCIA......:
     */
    /\b([0-9]{12})\b(?=\s+(?:NUMERO\s+UNICO|NÚMERO\s+ÚNICO|PROCEDENCIA|SITUACAO|REQUERENTE|EXEQUENTE|AUTOR)\b)/i
  ];

  for (const pattern of bodyPatterns) {
    const match = conteudo.match(pattern);

    if (match?.[1]) {
      return sanitizeProcessNumber(match[1]);
    }
  }

  /*
   * Fallback: número interno presente no link do TJSE.
   * Só é usado se o corpo não trouxe o identificador.
   */
  return sanitizeProcessNumber(
    extractValue(
      informacoes,
      /tmp\.npro\s*=\s*([0-9]{12})(?!\d)/i
    )
  );
}

export function extractPublicationProcessNumber(
  informacoes: string
): string | undefined {
  return sanitizeProcessNumber(
    extractValue(
      informacoes,
      /Publicacao\s+Processo\s*:\s*([0-9.-]+)/i
    ) ??
    extractValue(
      informacoes,
      /PUBLICACAO\s+PROCESSO\s*:\s*([0-9.-]+)/i
    )
  );
}

export function extractUniqueCNJProcessNumber(
  informacoes: string
): string | undefined {
  return sanitizeProcessNumber(
    extractValue(
      informacoes,
      /NUMERO\s+UNICO\s*:\s*([0-9.-]+)/i
    ) ??
    extractValue(
      informacoes,
      /NÚMERO\s+ÚNICO\s*:\s*([0-9.-]+)/i
    )
  );
}

export function extractOriginProcessNumber(
  informacoes: string
): string | undefined {
  return sanitizeProcessNumber(
    extractValue(
      informacoes,
      /PROCESSO\s+ORIGEM\.*\s*:\s*([0-9A-Z./-]+)/i
    )
  );
}

export function resolveMainProcessNumber(
  informacoes: string
): string | undefined {
  const publicationProcess = extractValue(
    informacoes,
    /Publicacao\s+Processo\s*:\s*([0-9.-]+)/i
  );

  const uniqueCnj = extractValue(
    informacoes,
    /N[ÚU]MERO\s+ÚNICO\s*:\s*([0-9.-]+)/i
  );

  const processoCnj = publicationProcess ?? uniqueCnj;

  /*
   * Quando não há CNJ explícito, preservamos os fallbacks
   * anteriores para formatos legados.
   */
  if (!processoCnj) {
    return (
      extractLegacyTJSEProcessNumber(informacoes) ??
      extractMainTJSEProcessNumberFromInformation(informacoes) ??
      extractOriginProcessNumber(informacoes)
    );
  }

  /*
   * Tribunais diferentes do TJSE usam o CNJ da publicação.
   */
  if (!isTJSEProcessNumber(processoCnj)) {
    return sanitizeProcessNumber(processoCnj);
  }

  /*
   * TJSE sem indicação do antigo Portal TJNET:
   * considera-se publicação do fluxo moderno/Eproc
   * e mantém-se o CNJ.
   */
  if (!isLegacyTJSEPublication(informacoes)) {
    return sanitizeProcessNumber(processoCnj);
  }

  /*
   * TJSE antigo/TJNET:
   * prioriza o número antigo de 12 dígitos.
   */
  return (
    extractLegacyTJSEProcessNumber(informacoes) ??
    sanitizeProcessNumber(processoCnj)
  );
}

export function extractMainTJSEProcessNumber(informacoes: string): string | undefined {
  return (
    extractValue(
      informacoes,
      /(?:NRO\.?|Nº|N°|NUMERO|NÚMERO)\s*(?:DO\s+)?PROCESSO\.*\s*:\s*([0-9]{8,})/i
    ) ??
    extractValue(
      informacoes,
      /PROCESSO\.*\s*:\s*([0-9]{8,})(?![-.\d])/i
    )
  );
}

export function extractCNJProcessNumber(informacoes: string): string | undefined {
  return (
    extractValue(informacoes, /NUMERO\s+UNICO\s*:\s*([0-9.-]+)/i) ??
    extractValue(informacoes, /NÚMERO\s+ÚNICO\s*:\s*([0-9.-]+)/i)
  );
}

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
  const processo = resolveMainProcessNumber(informacoes);

  const processoCnj =
    extractPublicationProcessNumber(informacoes) ??
    extractUniqueCNJProcessNumber(informacoes);

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
    processoCnj,

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
  const processo = resolveMainProcessNumber(informacoes);

  return {
    ...baseRecord,

    processo,
    processoCnj: processo,
    processoOrigem: extractOriginProcessNumber(informacoes),

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

export function resolveDiaryProcessNumbers(informacoes: string): {
  processo?: string;
  processoCnj?: string;
} {
  const publicationProcess = extractValue(
    informacoes,
    /Publicacao\s+Processo\s*:\s*([0-9.-]+)/i
  );

  const uniqueCnj = extractValue(
    informacoes,
    /N[ÚU]MERO\s+ÚNICO\s*:\s*([0-9.-]+)/i
  );

  const processoCnj = publicationProcess ?? uniqueCnj;

  /*
   * Mantém suporte aos formatos antigos que eventualmente
   * não tragam Publicacao Processo ou NUMERO UNICO.
   */
  if (!processoCnj) {
    return {
      processo:
        extractLegacyTJSEProcessNumber(informacoes) ??
        extractMainTJSEProcessNumberFromInformation(informacoes),
      processoCnj: undefined
    };
  }

  /*
   * Fora do TJSE, Publicacao Processo permanece sendo
   * o identificador principal.
   */
  if (!isTJSEProcessNumber(processoCnj)) {
    return {
      processo: processoCnj,
      processoCnj
    };
  }

  /*
   * TJSE moderno/Eproc:
   * o processo principal é o próprio CNJ.
   */
  if (!isLegacyTJSEPublication(informacoes)) {
    return {
      processo: processoCnj,
      processoCnj
    };
  }

  /*
   * TJSE antigo/TJNET:
   * utiliza o número de 12 dígitos.
   */
  const legacyProcess =
    extractLegacyTJSEProcessNumber(informacoes);

  return {
    processo: legacyProcess ?? processoCnj,
    processoCnj
  };
}

export function isTJSEProcessNumber(value?: string): boolean {
  if (!value) return false;

  return /^\d{7}-\d{2}\.\d{4}\.8\.25\.\d{4}$/.test(value.trim());
}