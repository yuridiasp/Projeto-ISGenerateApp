import { cleanDiaryValue, cleanPartyOrLawyerName } from "./diaryText.helpers";

export function extractDiaryAdvogados(text: string): string[] {
  const advogados = new Set<string>();

  const advogadoDjnRegex =
    /\bAdvogado:\s*([\s\S]*?)(?=\s+Advogado:|\s+Classe:|\s+Conteudo:|\s+Conteúdo:|$)/gi;

  for (const match of text.matchAll(advogadoDjnRegex)) {
    const value = cleanDiaryValue(match[1]);
    const cleaned = cleanPartyOrLawyerName(value);

    if (cleaned) {
      advogados.add(cleaned);
    }
  }

  const advogadoTjseRegex =
    /\b(?:ADVOGADO|ADV\.)\s*[-:]\s*([\s\S]*?OAB\s*[:\s]*[A-Z]{2}[-\s]*[0-9A-Z./-]+)(?=\s+(?:REQUERENTE|REQUERIDO|AUTOR|REU|RECLAMANTE|RECLAMADO|EXEQUENTE|EXECUTADO|EMBARGANTE|EMBARGADO|AGRAVANTE|AGRAVADO|RECORRENTE|RECORRIDO|IMPETRANTE|IMPETRADO|INVENTARIANTE|INVENTARIADO|HERDEIRO|INTERESSADO|DEF\.|DEFENSOR|PROCURADOR|CERTIFICO|ATO ORDINATORIO|DECISAO|DECISÃO|SENTENCA|SENTENÇA|NOS TERMOS|EMENTA|$))/gi;

  for (const match of text.matchAll(advogadoTjseRegex)) {
    const value = cleanPartyOrLawyerName(match[1]);

    if (value) {
      advogados.add(value);
    }
  }

  const outrosRegex =
    /\b(?:DEF\.|DEFENSOR|PROCURADOR ESTADUAL|PROCURADOR)\.*\s*[-:]?\s*([\s\S]*?)(?=\s+(?:REQUERENTE|REQUERIDO|AUTOR|REU|RECLAMANTE|RECLAMADO|ADVOGADO|ADV\.|CERTIFICO|ATO ORDINATORIO|DECISAO|DECISÃO|SENTENCA|SENTENÇA|NOS TERMOS|$))/gi;

  for (const match of text.matchAll(outrosRegex)) {
    const value = cleanPartyOrLawyerName(match[1]);

    if (value) {
      advogados.add(value);
    }
  }

  return [...advogados];
}