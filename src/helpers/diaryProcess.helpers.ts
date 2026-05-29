import { extractValue } from "./diaryRegex.helpers";

export function extractDiaryProcessNumber(text: string): string | undefined {
  return (
    extractValue(text, /NRO\.\s*PROCESSO\.*\s*:\s*([0-9]+)/i) ??
    extractValue(text, /PROC\.\s*:\s*([0-9]+)/i) ??
    extractValue(text, /PUBLICACAO\s+PROCESSO:\s*([^\s]+)/i) ??
    extractValue(text, /PUBLICAÇÃO\s+PROCESSO:\s*([^\s]+)/i) ??
    extractValue(text, /NUMERO\s+UNICO:\s*([0-9.-]+)/i) ??
    extractValue(text, /NÚMERO\s+ÚNICO:\s*([0-9.-]+)/i)
  );
}