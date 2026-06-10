// src\services\diaryParser\wordDiaryParser.services.ts

import { DiaryRecord } from "@models/diaryReader/diaryReader.models";
import { extractValue, extractRawValue } from "@helpers/diaryRegex.helpers";
import {
  cleanDiaryValue,
  normalizeDiaryText
} from "@helpers/diaryText.helpers";
import { enrichRecordWithInternalPublication } from "./diaryPublicationParser.services";

export function parseWordDiaryRecords(text: string): DiaryRecord[] {
  const normalized = normalizeDiaryText(text);

  if (isWordCadastradoLayout(normalized)) {
    return parseWordCadastradoRecords(normalized);
  }

  return [];
}

function isWordCadastradoLayout(text: string): boolean {
  return (
    /Data\s+Disponibiliza(?:ção|cao)\s*:/i.test(text) &&
    /Data\s+Publica(?:ção|cao)\s*:/i.test(text) &&
    /C[oó]digo\s*:/i.test(text) &&
    /Jornal\s*:/i.test(text) &&
    /Tribunal\s*:/i.test(text) &&
    /Vara\s*:/i.test(text) &&
    /Informa(?:ç|c)[oõ]es\s*:/i.test(text)
  );
}

function parseWordCadastradoRecords(text: string): DiaryRecord[] {
  const blocks = text
    .split(/(?=Data\s+Disponibiliza(?:ção|cao)\s*:)/gi)
    .map(block => block.trim())
    .filter(block =>
      /^Data\s+Disponibiliza(?:ção|cao)\s*:/i.test(block) &&
      /Informa(?:ç|c)[oõ]es\s*:/i.test(block)
    );

  return blocks
    .map(parseWordCadastradoRecord)
    .filter(isValidWordCadastradoRecord);
}

function parseWordCadastradoRecord(block: string): DiaryRecord {
  const informacoes = extractRawValue(
    block,
    /Informa(?:ç|c)[oõ]es\s*:\s*([\s\S]*)$/i
  );

  const baseRecord: DiaryRecord = {
    layout: "WORD_CADASTRADO",

    dataDisponibilizacao: extractValue(
      block,
      /Data\s+Disponibiliza(?:ção|cao)\s*:\s*([\d/.-]+)/i
    ),

    dataPublicacao: extractValue(
      block,
      /Data\s+Publica(?:ção|cao)\s*:\s*([\d/.-]+)/i
    ),

    codigo: extractValue(
      block,
      /C[oó]digo\s*:\s*([\s\S]*?)\s+Jornal\s*:/i
    ),

    jornal: extractValue(
      block,
      /Jornal\s*:\s*([\s\S]*?)\s+Tribunal\s*:/i
    ),

    tribunal: extractValue(
      block,
      /Tribunal\s*:\s*([\s\S]*?)\s+Vara\s*:/i
    ),

    vara: extractValue(
      block,
      /Vara\s*:\s*([\s\S]*?)\s+Informa(?:ç|c)[oõ]es\s*:/i
    ),

    informacoes: cleanDiaryValue(informacoes),

    partes: [],
    advogados: []
  };

  return enrichRecordWithInternalPublication(
    baseRecord,
    informacoes ?? ""
  );
}

function isValidWordCadastradoRecord(record: DiaryRecord): boolean {
  return Boolean(
    record.dataDisponibilizacao &&
    record.dataPublicacao &&
    record.codigo &&
    record.jornal &&
    record.tribunal &&
    record.vara &&
    record.informacoes
  );
}