import { dialog } from "electron";
import path from "path";

import { iWindows } from "@models/windows/iWindows.models";
import { DialogContext } from "@models/dialogHistory";
import {
  getLastDialogDirectory,
  saveLastDialogDirectory
} from "./dialogHistory.infrastructure";

async function showDialog(
  windows: iWindows,
  options: Electron.OpenDialogOptions
) {
  if (windows.mainWindow) {
    return dialog.showOpenDialog(
      windows.mainWindow,
      options
    );
  }

  return dialog.showOpenDialog(options);
}

export async function openFileDialog(
  windows: iWindows,
  context: DialogContext
) {
  const result = await showDialog(windows, {
    properties: ["openFile"],
    defaultPath: getLastDialogDirectory(context),
    filters: [
      {
        name: "Documentos compativeis",
        extensions: [
          "xlsx",
          "doc",
          "docx",
          "xhtml",
          "pdf"
        ]
      }
    ]
  });

  if (!result.canceled && result.filePaths[0]) {
    saveLastDialogDirectory(
      context,
      path.dirname(result.filePaths[0])
    );
  }

  return result;
}

export async function openFolderDialog(
  windows: iWindows,
  context: DialogContext
) {
  const result = await showDialog(windows, {
    properties: ["openDirectory"],
    defaultPath: getLastDialogDirectory(context)
  });

  if (!result.canceled && result.filePaths[0]) {
    saveLastDialogDirectory(
      context,
      result.filePaths[0]
    );
  }

  return result;
}

export async function openMultipleFilesDialog(
  windows: iWindows,
  context: DialogContext
) {
  const result = await showDialog(windows, {
    properties: ["openFile", "multiSelections"],
    defaultPath: getLastDialogDirectory(context),
    filters: [
      {
        name: "Documentos compatíveis",
        extensions: [
          "xlsx",
          "xls",
          "xlsm",
          "csv",
          "doc",
          "docx",
          "pdf"
        ]
      }
    ]
  });

  if (!result.canceled && result.filePaths[0]) {
    saveLastDialogDirectory(
      context,
      path.dirname(result.filePaths[0])
    );
  }

  return result;
}