import { fixDiaryEncoding } from "@helpers/diaryEncoding.helpers";

export function normalizeDiaryText(text: string): string {
  return fixDiaryEncoding(text)
    .replace(/\r/g, "")
    .replace(/\t/g, " ")
    .replace(/[ ]{2,}/g, " ")
    .replace(/\n{3,}/g, "\n\n")
    .trim();
}

export function cleanDiaryValue(value?: string): string | undefined {
  if (!value) return undefined;

  return fixDiaryEncoding(value)
    .replace(/\n/g, " ")
    .replace(/[ ]{2,}/g, " ")
    .trim();
}

export function cleanPartyOrLawyerName(value?: string): string | undefined {
  if (!value) return undefined;

  return fixDiaryEncoding(value)
    .replace(/\.{2,}/g, "")
    .replace(/\s{2,}/g, " ")
    .replace(/\s+([,.;:])/g, "$1")
    .trim();
}

export function removeComunicacaoId(text: string): string {
  return fixDiaryEncoding(text)
    .replace(/\|COMUNICACAO_ID:\s*[^|]+\|/gi, "")
    .replace(/\|comunicacao_id:\s*[^|]+\|/gi, "")
    .trim();
}