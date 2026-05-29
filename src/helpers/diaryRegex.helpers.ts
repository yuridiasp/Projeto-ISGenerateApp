import { cleanDiaryValue } from "@helpers/diaryText.helpers";

export function extractValue(
  text: string,
  regex: RegExp
): string | undefined {
  const match = text.match(regex);

  if (!match) return undefined;

  return cleanDiaryValue(match[1]);
}

export function extractRawValue(
  text: string,
  regex: RegExp
): string | undefined {
  const match = text.match(regex);

  if (!match) return undefined;

  return match[1]?.trim();
}

export function extractAllValues(
  text: string,
  regex: RegExp
): string[] {
  return [...text.matchAll(regex)]
    .map(match => cleanDiaryValue(match[1]))
    .filter(Boolean) as string[];
}