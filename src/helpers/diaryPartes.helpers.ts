import { extractAllValues } from "./diaryRegex.helpers";
import { cleanPartyOrLawyerName } from "./diaryText.helpers";

const POLOS = [
  "REQUERENTE",
  "REQUERIDO",
  "AUTOR",
  "REU",
  "RECLAMANTE",
  "RECLAMADO",
  "EXEQUENTE",
  "EXECUTADO",
  "EMBARGANTE",
  "EMBARGADO",
  "AGRAVANTE",
  "AGRAVADO",
  "RECORRENTE",
  "RECORRIDO",
  "IMPETRANTE",
  "IMPETRADO",
  "INVENTARIANTE",
  "INVENTARIADO",
  "HERDEIRO",
  "INTERESSADO"
];

export function extractDiaryPartes(text: string): string[] {
  const partes = new Set<string>();

  for (const parte of extractAllValues(
    text,
    /Parte:\s*([\s\S]*?)(?=\s+Parte:|\s+Advogado:|\s+Classe:|\s+Conteudo:|\s+Conteúdo:|$)/gi
  )) {
    const value = cleanPartyOrLawyerName(parte);

    if (value) {
      partes.add(value);
    }
  }

  const polosPattern = POLOS.join("|");

  for (const polo of POLOS) {
    const regex = new RegExp(
      `\\b${polo}\\s*[-:]\\s*([\\s\\S]*?)(?=\\s+(?:${polosPattern}|ADVOGADO|ADV\\.|DEF\\.|DEFENSOR|PROCURADOR|CERTIFICO|ATO ORDINATORIO|DECISAO|DECISÃO|SENTENCA|SENTENÇA|INTIMACAO|INTIMAÇÃO|NOTIFICACAO|NOTIFICAÇÃO|FICA|NOS TERMOS|CONTEUDO|CONTEÚDO|EMENTA|$))`,
      "gi"
    );

    for (const match of text.matchAll(regex)) {
      const value = cleanPartyOrLawyerName(match[1]);

      if (value) {
        partes.add(`${polo}: ${value}`);
      }
    }
  }

  return [...partes];
}