import { DiaryTask } from "@models/diaryReader/diaryReader.models";
import { cleanDiaryValue, removeComunicacaoId } from "./diaryText.helpers";
import { fixDiaryEncoding } from "./diaryEncoding.helpers";

interface InternalControlResult {
  informacoes?: string;
  tarefas: DiaryTask[];
  statusInterno?: string;
}

export function parseInternalOfficeControl(text: string): InternalControlResult {
  const tarefas: DiaryTask[] = [];
  let statusInterno: string | undefined;

  let workingText = fixDiaryEncoding(text);

  workingText = removeComunicacaoId(workingText);

  const lines = workingText
    .split(/\n/g)
    .map(line => cleanDiaryValue(line))
    .filter(Boolean) as string[];

  const infoLines: string[] = [];

  for (const line of lines) {
    if (/^OK$/i.test(line)) {
      statusInterno = "OK";
      continue;
    }

    if (isTaskLine(line)) {
      tarefas.push(parseTaskLine(line));
      continue;
    }

    infoLines.push(line);
  }

  let informacoes = infoLines.join(" ");

  if (/\s+OK$/i.test(informacoes)) {
    statusInterno = "OK";
    informacoes = informacoes.replace(/\s+OK$/i, "").trim();
  }

  return {
    informacoes: cleanDiaryValue(informacoes),
    tarefas,
    statusInterno
  };
}

function isTaskLine(line: string): boolean {
  return /^[0-9]{10,}\s*(?:\(ORIGEM\s+[0-9A-Z./-]+\))?\s*-/i.test(line);
}

function parseTaskLine(line: string): DiaryTask {
  const regex =
    /^([0-9]{10,})(?:\s*\(ORIGEM\s+([0-9A-Z./-]+)\))?\s*-\s*([\s\S]*?)\s*-\s*\(([\s\S]*?)\)\s*[-–]\s*([\s\S]*)$/i;

  const match = line.match(regex);

  if (!match) {
    return { raw: line };
  }

  return {
    processo: cleanDiaryValue(match[1]),
    origem: cleanDiaryValue(match[2]),
    descricao: cleanDiaryValue(match[3]),
    prazo: cleanDiaryValue(match[4]),
    responsavel: cleanDiaryValue(match[5]),
    raw: line
  };
}