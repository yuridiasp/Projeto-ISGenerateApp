import fs from "fs";
import path from "path";

import { iFileData } from "@services/validateIntimations";
import { readDiaryAutomatically } from "@services/diaryAutoReader/diaryAutoReader.services";

import {
  DiaryFileRenameResult,
  DiaryFileRenameSummary
} from "@models/diaryFileRenamer";

import {
  buildDiaryFileName,
  resolveFileIdentifier,
  resolveFilePublicationDate,
  resolveRenameSource
} from "./diaryFileNaming.services";

function normalizePath(value: string): string {
  return path.resolve(value).toLowerCase();
}

export async function renameDiaryFile(
  file: iFileData
): Promise<DiaryFileRenameResult> {
  try {
    if (!fs.existsSync(file.filePath)) {
      return {
        originalPath: file.filePath,
        originalName: file.fileName,
        status: "ERROR",
        reason: "Arquivo não encontrado."
      };
    }

    const records = await readDiaryAutomatically(file);

    if (!records.length) {
      return {
        originalPath: file.filePath,
        originalName: file.fileName,
        status: "INVALID",
        reason: "Nenhuma publicação foi identificada."
      };
    }

    const source =
      resolveRenameSource(records);

    const identifier =
      resolveFileIdentifier(records);

    const publicationDate =
      resolveFilePublicationDate(records);

    const newName =
      buildDiaryFileName(file.filePath, records);

    if (!newName) {
      const missing: string[] = [];

      if (!source) missing.push("origem");
      if (!identifier) missing.push("tribunal/região");
      if (!publicationDate) missing.push("data de publicação");

      return {
        originalPath: file.filePath,
        originalName: file.fileName,
        source,
        identifier,
        publicationDate,
        status: "INVALID",
        reason: `Não foi possível determinar: ${missing.join(", ")}.`
      };
    }

    const newPath = path.join(path.dirname(file.filePath), newName);

    if (
      normalizePath(newPath) ===
      normalizePath(file.filePath)
    ) {
      return {
        originalPath: file.filePath,
        originalName: file.fileName,
        newPath,
        newName,
        source,
        identifier,
        publicationDate,
        status: "ALREADY_NAMED"
      };
    }

    const canonicalPath = path.join(path.dirname(file.filePath), newName);

    if (normalizePath(canonicalPath) === normalizePath(file.filePath)) {
      return {
        originalPath: file.filePath,
        originalName: file.fileName,
        newPath: canonicalPath,
        newName,
        source,
        identifier,
        publicationDate,
        status: "ALREADY_NAMED"
      };
    }

    const destination = resolveAvailableDestinationPath(file.filePath, newName);

    fs.renameSync(file.filePath, destination.newPath);

    return {
      originalPath: file.filePath,
      originalName: file.fileName,
      newPath: destination.newPath,
      newName: destination.newName,
      source,
      identifier,
      publicationDate,
      status: "RENAMED"
    };
  } catch (error) {
    return {
      originalPath: file.filePath,
      originalName: file.fileName,
      status: "ERROR",
      reason:
        error instanceof Error
          ? error.message
          : String(error)
    };
  }
}

export async function renameDiaryFilesService(
  files: iFileData[]
): Promise<DiaryFileRenameSummary> {
  const results: DiaryFileRenameResult[] = [];

  for (const file of files) {
    results.push(await renameDiaryFile(file));
  }

  return {
    total: results.length,

    renamed: results.filter(item => item.status === "RENAMED").length,

    skipped: results.filter(item => item.status === "ALREADY_NAMED").length,

    errors: results.filter(item => item.status === "ERROR" || item.status === "INVALID").length,

    files: results
  };
}

function resolveAvailableDestinationPath(filePath: string, desiredName: string): {
  newPath: string;
  newName: string;
} {
  const directory = path.dirname(filePath);
  const extension = path.extname(desiredName);
  const baseName = path.basename(desiredName, extension);

  let sequence = 0;
  let newName = desiredName;
  let newPath = path.join(directory, newName);

  while (fs.existsSync(newPath)) {
    sequence++;
    newName = `${baseName} (${sequence})${extension}`;
    newPath = path.join(directory, newName);
  }

  return { newPath, newName };
}
