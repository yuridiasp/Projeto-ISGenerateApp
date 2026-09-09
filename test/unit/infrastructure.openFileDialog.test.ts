import {
  beforeEach,
  describe,
  expect,
  jest,
  test
} from "@jest/globals";

import path from "path";
import { dialog } from "electron";

import {
  openFileDialog,
  openFolderDialog,
  openMultipleFilesDialog
} from "../../src/infrastructure/dialog/openFile.infrastructure";

import {
  getLastDialogDirectory,
  saveLastDialogDirectory
} from "../../src/infrastructure/dialog/dialogHistory.infrastructure";

import { iWindows } from "../../src/models/windows/iWindows.models";

jest.mock("electron", () => ({
  dialog: {
    showOpenDialog: jest.fn()
  }
}));

jest.mock(
  "../../src/infrastructure/dialog/dialogHistory.infrastructure",
  () => ({
    getLastDialogDirectory: jest.fn(),
    saveLastDialogDirectory: jest.fn()
  })
);

describe("openFile.infrastructure", () => {
  const windows = {} as iWindows;

  beforeEach(() => {
    jest.clearAllMocks();

    jest.mocked(getLastDialogDirectory).mockReturnValue(undefined);
  });

  test("salva diretorio pai quando um arquivo e selecionado", async () => {
    const filePath = path.join("arquivos", "validar-cadastro", "publicacoes.pdf");

    jest.mocked(dialog.showOpenDialog).mockResolvedValue({
      canceled: false,
      filePaths: [filePath]
    });

    await openFileDialog(windows, "reconcilePublicationsWithSystem");

    expect(saveLastDialogDirectory).toHaveBeenCalledWith(
      "reconcilePublicationsWithSystem",
      path.dirname(filePath)
    );
  });

  test("salva a propria pasta quando uma pasta e selecionada", async () => {
    const folderPath = path.join("arquivos", "intimacoes");

    jest.mocked(dialog.showOpenDialog).mockResolvedValue({
      canceled: false,
      filePaths: [folderPath]
    });

    await openFolderDialog(windows, "countIntimationsByFolder");

    expect(saveLastDialogDirectory).toHaveBeenCalledWith(
      "countIntimationsByFolder",
      folderPath
    );
  });

  test("nao altera historico quando dialogo de arquivo e cancelado", async () => {
    jest.mocked(dialog.showOpenDialog).mockResolvedValue({
      canceled: true,
      filePaths: []
    });

    await openFileDialog(windows, "reconcileAnalysesWithSystem");

    expect(saveLastDialogDirectory).not.toHaveBeenCalled();
  });

  test("nao altera historico quando dialogo de pasta e cancelado", async () => {
    jest.mocked(dialog.showOpenDialog).mockResolvedValue({
      canceled: true,
      filePaths: []
    });

    await openFolderDialog(windows, "countIntimationsByFolder");

    expect(saveLastDialogDirectory).not.toHaveBeenCalled();
  });

  test("salva diretorio do primeiro arquivo em selecao multipla", async () => {
    const firstFile = path.join("arquivos", "comparacao", "arquivo-a.pdf");

    const secondFile = path.join("arquivos", "comparacao", "arquivo-b.xlsx");

    jest.mocked(dialog.showOpenDialog).mockResolvedValue({
      canceled: false,
      filePaths: [
        firstFile,
        secondFile
      ]
    });

    await openMultipleFilesDialog(windows, "comparePublications");

    expect(saveLastDialogDirectory).toHaveBeenCalledWith(
      "comparePublications",
      path.dirname(firstFile)
    );

    expect(saveLastDialogDirectory).toHaveBeenCalledTimes(1);
  });

  test("usa ultima pasta do contexto como defaultPath ao abrir arquivo", async () => {
    const lastDirectory = path.join("arquivos", "validar-cadastro");

    jest.mocked(getLastDialogDirectory).mockReturnValue(
      lastDirectory
    );

    jest.mocked(dialog.showOpenDialog).mockResolvedValue({
      canceled: true,
      filePaths: []
    });

    await openFileDialog(windows, "reconcilePublicationsWithSystem");

    expect(getLastDialogDirectory).toHaveBeenCalledWith(
      "reconcilePublicationsWithSystem"
    );

    expect(dialog.showOpenDialog).toHaveBeenCalledWith(
      expect.objectContaining({
        properties: ["openFile"],
        defaultPath: lastDirectory
      })
    );
  });

  test("usa ultima pasta do contexto como defaultPath ao abrir pasta", async () => {
    const lastDirectory = path.join("arquivos", "contador");

    jest.mocked(getLastDialogDirectory).mockReturnValue(
      lastDirectory
    );

    jest.mocked(dialog.showOpenDialog).mockResolvedValue({
      canceled: true,
      filePaths: []
    });

    await openFolderDialog(windows, "countIntimationsByFolder");

    expect(dialog.showOpenDialog).toHaveBeenCalledWith(
      expect.objectContaining({
        properties: ["openDirectory"],
        defaultPath: lastDirectory
      })
    );
  });

  test("cada contexto consulta seu proprio diretorio", async () => {
    const analysesDirectory =
      path.join("arquivos", "analises");

    const publicationsDirectory =
      path.join("arquivos", "publicacoes");

    jest.mocked(getLastDialogDirectory).mockImplementation(context => {
      if (
        context ===
        "reconcileAnalysesWithSystem"
      ) {
        return analysesDirectory;
      }

      if (
        context ===
        "reconcilePublicationsWithSystem"
      ) {
        return publicationsDirectory;
      }

      return undefined;
    });

    jest.mocked(dialog.showOpenDialog).mockResolvedValue({
      canceled: true,
      filePaths: []
    });

    await openFileDialog(windows, "reconcileAnalysesWithSystem");

    expect(dialog.showOpenDialog).toHaveBeenLastCalledWith(
      expect.objectContaining({
        defaultPath: analysesDirectory
      })
    );

    await openFileDialog(windows, "reconcilePublicationsWithSystem");

    expect(dialog.showOpenDialog).toHaveBeenLastCalledWith(
      expect.objectContaining({
        defaultPath:
          publicationsDirectory
      })
    );
  });

  test("restringe renomeacao a PDF DOC e DOCX", async () => {
      jest
        .mocked(
          dialog.showOpenDialog
        )
        .mockResolvedValue({
          canceled: true,
          filePaths: []
        });

      await openMultipleFilesDialog(windows, "renameDiaryFiles");

      expect(dialog.showOpenDialog).toHaveBeenCalledWith(
        expect.objectContaining({
          properties: [
            "openFile",
            "multiSelections"
          ],

          filters: [
            expect.objectContaining({
              extensions: [
                "pdf",
                "doc",
                "docx"
              ]
            })
          ]
        })
      );
    }
  );
});
