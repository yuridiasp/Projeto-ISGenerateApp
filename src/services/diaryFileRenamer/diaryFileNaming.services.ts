import path from "path";

import { DiaryRecord } from "@models/diaryReader";
import { DiaryRenameSource } from "@models/diaryFileRenamer";
import { parseDiaryDate } from "@mappers/diaryRecordToISAnalysis.mapper";

const stateCourtCodes: Record<string, string> = {
  "01": "TJAC",
  "02": "TJAL",
  "03": "TJAP",
  "04": "TJAM",
  "05": "TJBA",
  "06": "TJCE",
  "07": "TJDFT",
  "08": "TJES",
  "09": "TJGO",
  "10": "TJMA",
  "11": "TJMT",
  "12": "TJMS",
  "13": "TJMG",
  "14": "TJPA",
  "15": "TJPB",
  "16": "TJPR",
  "17": "TJPE",
  "18": "TJPI",
  "19": "TJRJ",
  "20": "TJRN",
  "21": "TJRS",
  "22": "TJRO",
  "23": "TJRR",
  "24": "TJSC",
  "25": "TJSE",
  "26": "TJSP",
  "27": "TJTO"
};

const stateNames: Record<string, string> = {
  acre: "AC",
  alagoas: "AL",
  amapa: "AP",
  amazonas: "AM",
  bahia: "BA",
  ceara: "CE",
  "distrito federal": "DF",
  "espirito santo": "ES",
  goias: "GO",
  maranhao: "MA",
  "mato grosso": "MT",
  "mato grosso do sul": "MS",
  "minas gerais": "MG",
  para: "PA",
  paraiba: "PB",
  parana: "PR",
  pernambuco: "PE",
  piaui: "PI",
  "rio de janeiro": "RJ",
  "rio grande do norte": "RN",
  "rio grande do sul": "RS",
  rondonia: "RO",
  roraima: "RR",
  "santa catarina": "SC",
  "sao paulo": "SP",
  sergipe: "SE",
  tocantins: "TO"
};

const defaultSearchedLawyer = "FABIO CORREA RIBEIRO";

function normalizeLawyerName(value?: string): string | undefined {
  if (!value) return undefined;

  const cleaned = value
    .replace(/^(?:DR\.?|DRA\.?)\s+/i, "")
    .replace(/\s*-\s*OAB\b[\s\S]*$/i, "")
    .replace(/\s+OAB\s*[A-Z]{2}[-\s]*[0-9A-Z./-]+[\s\S]*$/i, "")
    .replace(/\s+/g, " ")
    .trim();

  if (!cleaned) return undefined;

  return cleaned
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toUpperCase();
}

function resolveExplicitSearchedLawyer(records: DiaryRecord[]): string | undefined {
  const names = [...new Set(
    records
      .map(record => normalizeLawyerName(record.nomePesquisado))
      .filter((value): value is string => Boolean(value))
  )];

  return names.length === 1 ? names[0] : undefined;
}

function resolveRecurringSearchedLawyer(records: DiaryRecord[]): string | undefined {
  const recordsWithLawyers = records
    .map(record => [...new Set(
      record.advogados
        .map(normalizeLawyerName)
        .filter((value): value is string => Boolean(value))
    )])
    .filter(lawyers => lawyers.length > 0);

  if (!recordsWithLawyers.length) return undefined;

  const occurrences = new Map<string, number>();

  for (const lawyers of recordsWithLawyers) {
    for (const lawyer of lawyers) {
      occurrences.set(lawyer, (occurrences.get(lawyer) ?? 0) + 1);
    }
  }

  const highestOccurrence = Math.max(...occurrences.values());

  const candidates = [...occurrences.entries()]
    .filter(([, count]) => count === highestOccurrence)
    .map(([lawyer]) => lawyer);

  if (candidates.length !== 1) return undefined;

  const minimumOccurrence = Math.ceil(recordsWithLawyers.length * 0.6);

  return highestOccurrence >= minimumOccurrence ? candidates[0] : undefined;
}

export function resolveSearchedLawyer(records: DiaryRecord[]): string | undefined {
  return resolveExplicitSearchedLawyer(records) ?? resolveRecurringSearchedLawyer(records);
}

export function resolveFileLawyerSuffix(records: DiaryRecord[]): string | undefined {
  const lawyer = resolveSearchedLawyer(records);

  if (!lawyer || lawyer === defaultSearchedLawyer) return undefined;

  return lawyer.split(" ")[0];
}

function isSuperiorGroupIdentifier(identifier: string): boolean {
  return [
    "STF",
    "STJ",
    "TST",
    "TSE",
    "STM",
    "TRF1",
    "TRF2",
    "TRF3",
    "TRF4",
    "TRF5",
    "TRF6"
  ].includes(identifier.replace("-2G", ""));
}

function normalize(value?: string): string {
  return value?.normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/\s+/g, " ").trim().toLowerCase() ?? "";
}

function getRecordText(record: DiaryRecord): string {
  return [record.tribunal, record.jornal, record.vara, record.orgao].filter(Boolean).join(" ");
}

const validUfs = new Set([
  "AC", "AL", "AP", "AM", "BA", "CE", "DF", "ES", "GO", "MA", "MT", "MS",
  "MG", "PA", "PB", "PR", "PE", "PI", "RJ", "RN", "RS", "RO", "RR", "SC",
  "SP", "SE", "TO"
]);

function resolveStateAbbreviation(text: string): string | undefined {
  const normalized = normalize(text);

  const courtCode = normalized.match(/\b(?:tj|jf)([a-z]{2})\b/i);
  if (courtCode?.[1]) {
    const uf = courtCode[1].toUpperCase();
    if (validUfs.has(uf)) return uf;
  }

  const federalUnit = normalized.match(/\b(?:vara federal|turma recursal)\s+([a-z]{2})\b/i);
  if (federalUnit?.[1]) {
    const uf = federalUnit[1].toUpperCase();
    if (validUfs.has(uf)) return uf;
  }

  for (const [state, uf] of Object.entries(stateNames)) {
    const escapedState = state.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

    const patterns = [
      new RegExp(`\\bjustica federal\\s+(?:do|da|de)\\s+${escapedState}\\b`, "i"),
      new RegExp(`\\btribunal de justica(?:\\s+do\\s+estado)?\\s+(?:do|da|de)\\s+${escapedState}\\b`, "i"),
      new RegExp(`\\btribunal regional do trabalho\\s+(?:do|da|de)\\s+${escapedState}\\b`, "i"),
      new RegExp(`\\bsecao judiciaria\\s+(?:do|da|de)\\s+${escapedState}\\b`, "i")
    ];

    if (patterns.some(pattern => pattern.test(normalized))) return uf;
  }

  return undefined;
}

export function resolveRecordState(record: DiaryRecord): string | undefined {
  return resolveStateAbbreviation(getRecordText(record));
}

function resolveFederalJustice(text: string): string | undefined {
  const normalized = normalize(text);

  if (!normalized.includes("justica federal")) return undefined;

  const state = resolveStateAbbreviation(text);
  return state ? `JF${state}` : undefined;
}

function resolveNationalCourt(text: string): string | undefined {
  const normalized = normalize(text);

  if (normalized.includes("tribunal superior do trabalho") || /\btst\b/i.test(normalized)) return "TST";
  if (normalized.includes("superior tribunal de justica") || /\bstj\b/i.test(normalized)) return "STJ";
  if (normalized.includes("supremo tribunal federal") || /\bstf\b/i.test(normalized)) return "STF";
  if (normalized.includes("tribunal superior eleitoral") || /\btse\b/i.test(normalized)) return "TSE";
  if (normalized.includes("superior tribunal militar") || /\bstm\b/i.test(normalized)) return "STM";

  return undefined;
}

function resolveTRT(text: string): string | undefined {
  const normalized = normalize(text);

  const direct = normalized.match(/\btrt\s*[- ]?(\d{1,2})\b/i);
  if (direct?.[1]) return `TRT${Number(direct[1])}`;

  if (!normalized.includes("tribunal regional do trabalho")) return undefined;

  const region = normalized.match(/(\d{1,2})\s*(?:a|ª|o)?\s*regiao/i);
  return region?.[1] ? `TRT${Number(region[1])}` : undefined;
}

function resolveTRF(text: string): string | undefined {
  const normalized = normalize(text);

  const direct = normalized.match(/\btrf\s*[- ]?(\d)\b/i);
  if (direct?.[1]) return `TRF${direct[1]}`;

  if (!normalized.includes("tribunal regional federal")) return undefined;

  const region = normalized.match(/(\d)\s*(?:a|ª)?\s*regiao/i);
  return region?.[1] ? `TRF${region[1]}` : undefined;
}

function resolveStateCourt(text: string): string | undefined {
  const normalized = normalize(text);

  const direct = normalized.match(/\btj([a-z]{2})\b/i);
  if (direct?.[1]) return `TJ${direct[1].toUpperCase()}`;

  if (!normalized.includes("tribunal de justica")) return undefined;

  const state = resolveStateAbbreviation(text);
  return state ? `TJ${state}` : undefined;
}

export function resolveRenameSource(records: DiaryRecord[]): DiaryRenameSource | undefined {
  if (!records.length) return undefined;

  if (records.every(record => record.layout === "SERDIJUL")) {
    return "SERDIJUL";
  }

  const isLayouts = new Set([
    "WORD_CADASTRADO",
    "PDF_IS_PROCESSOS",
    "PDF_DEFAULT",
    "DEFAULT"
  ]);

  if (records.every(record => !record.layout || isLayouts.has(record.layout))) {
    return "IS";
  }

  return undefined;
}

export function resolveRecordCourtIdentifier(record: DiaryRecord): string | undefined {
  const text = getRecordText(record);

  return resolveFederalJustice(text) ??
    resolveNationalCourt(text) ??
    resolveTRF(text) ??
    resolveTRT(text) ??
    resolveStateCourt(text) ??
    resolveCourtFromRecordEvidence(record);
}

function isSecondDegree(record: DiaryRecord): boolean {
  const text = normalize(getRecordText(record));
  return /\b2\s*(?:o|º)?\s*grau\b/i.test(text) || /\bsegundo\s+grau\b/i.test(text);
}

function resolveGroupingIdentifier(record: DiaryRecord): string | undefined {
  const identifier = resolveRecordCourtIdentifier(record);

  if (identifier?.startsWith("TRF") && isSecondDegree(record)) {
    return `${identifier}-2G`;
  }

  return identifier;
}

export function resolveFileIdentifier(records: DiaryRecord[]): string | undefined {
  const identifiers = [...new Set(
    records.map(resolveGroupingIdentifier).filter((value): value is string => Boolean(value))
  )];

  if (!identifiers.length) return undefined;
  if (identifiers.length === 1) return identifiers[0].replace("-2G", "");

  if (identifiers.every(isSuperiorGroupIdentifier)) {
    return "TS";
  }

  const recordStates = records.map(resolveRecordState);

  if (recordStates.every((state): state is string => Boolean(state))) {
    const states = [...new Set(recordStates)];
    if (states.length === 1) return states[0];
  }

  return undefined;
}

export function resolveFilePublicationDate(records: DiaryRecord[]): string | undefined {
  const dates = records
    .map(record => {
      const rawDate = record.dataPublicacao ?? record.dataDivulgacao ?? record.data;
      const parsed = parseDiaryDate(rawDate);
      return parsed.isValid() ? parsed : undefined;
    })
    .filter((value): value is ReturnType<typeof parseDiaryDate> => Boolean(value));

  if (!dates.length) return undefined;

  const uniqueDates = [...new Map(dates.map(date => [date.format("YYYYMMDD"), date])).values()];

  if (uniqueDates.length === 1) {
    return uniqueDates[0].format("DDMMYYYY");
  }

  const identifier = resolveFileIdentifier(records);

  if (identifier === "TS") {
    return uniqueDates
      .sort((a, b) => b.valueOf() - a.valueOf())[0]
      .format("DDMMYYYY");
  }

  return undefined;
}

export function buildDiaryFileName(originalPath: string, records: DiaryRecord[]): string | undefined {
  const source = resolveRenameSource(records);
  const identifier = resolveFileIdentifier(records);
  const publicationDate = resolveFilePublicationDate(records);

  if (!source || !identifier || !publicationDate) return undefined;

  const extension = path.extname(originalPath);
  const lawyerSuffix = resolveFileLawyerSuffix(records);

  const nameParts = [source, identifier, publicationDate];

  if (lawyerSuffix) nameParts.push(lawyerSuffix);

  return `${nameParts.join(" ")}${extension}`;
}

function resolveStateCourtFromCnj(value?: string): string | undefined {
  if (!value) return undefined;

  const digits = value.replace(/\D/g, "");

  if (digits.length !== 20) return undefined;

  const justice = digits.substring(13, 14);
  const tribunal = digits.substring(14, 16);

  if (justice !== "8") return undefined;

  return stateCourtCodes[tribunal];
}

function resolveCourtFromRecordEvidence(record: DiaryRecord): string | undefined {
  const evidence = normalize(getRecordEvidenceText(record));

  const tjDomain = evidence.match(/\btj([a-z]{2})\.jus\.br\b/i);

  if (tjDomain?.[1]) {
    const uf = tjDomain[1].toUpperCase();

    if (validUfs.has(uf)) {
      return uf === "DF" ? "TJDFT" : `TJ${uf}`;
    }
  }

  return resolveStateCourtFromCnj(record.processoCnj) ??
    resolveStateCourtFromCnj(record.processo);
}

function getRecordEvidenceText(record: DiaryRecord): string {
  return [record.inteiroTeor, record.informacoes, record.conteudo].filter(Boolean).join(" ");
}