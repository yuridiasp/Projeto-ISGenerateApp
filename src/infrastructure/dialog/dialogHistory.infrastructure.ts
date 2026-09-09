import { app } from "electron";
import fs from "fs";
import path from "path";

import { DialogContext, DialogHistory } from "@models/dialogHistory";

function getHistoryFilePath(): string {
  return path.join(app.getPath("userData"), "dialog-history.json");
}

function readHistory(): DialogHistory {
  const filePath = getHistoryFilePath();

  try {
    if (!fs.existsSync(filePath)) {
      return {};
    }

    return JSON.parse(fs.readFileSync(filePath, "utf8")) as DialogHistory;
  } catch {
    return {};
  }
}

function writeHistory(history: DialogHistory): void {
  fs.writeFileSync(
    getHistoryFilePath(),
    JSON.stringify(history, null, 2),
    "utf8"
  );
}

export function getLastDialogDirectory(
  context: DialogContext
): string | undefined {
  const directory = readHistory()[context];

  if (!directory || !fs.existsSync(directory)) {
    return undefined;
  }

  return directory;
}

export function saveLastDialogDirectory(
  context: DialogContext,
  directory: string
): void {
  if (!directory) return;

  const history = readHistory();

  history[context] = directory;

  writeHistory(history);
}
