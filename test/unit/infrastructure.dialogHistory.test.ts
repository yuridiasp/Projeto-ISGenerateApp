import { afterEach, beforeEach, describe, expect, jest, test } from "@jest/globals";
import fs from "fs";
import os from "os";
import path from "path";
import { app } from "electron";

import {
  getLastDialogDirectory,
  saveLastDialogDirectory
} from "../../src/infrastructure/dialog/dialogHistory.infrastructure";

jest.mock("electron", () => ({
  app: {
    getPath: jest.fn()
  }
}));

describe("dialogHistory.infrastructure", () => {
  let tempUserData: string;

  beforeEach(() => {
    jest.clearAllMocks();

    tempUserData = fs.mkdtempSync(
      path.join(os.tmpdir(), "isgea-dialog-history-")
    );

    jest.mocked(app.getPath).mockReturnValue(tempUserData);
  });

  afterEach(() => {
    fs.rmSync(tempUserData, {
      recursive: true,
      force: true
    });
  });

  test("mantem diretorios independentes por contexto", () => {
    const analysesDirectory = path.join(
      tempUserData,
      "analises"
    );

    const publicationsDirectory = path.join(
      tempUserData,
      "publicacoes"
    );

    fs.mkdirSync(analysesDirectory);
    fs.mkdirSync(publicationsDirectory);

    saveLastDialogDirectory(
      "reconcileAnalysesWithSystem",
      analysesDirectory
    );

    saveLastDialogDirectory(
      "reconcilePublicationsWithSystem",
      publicationsDirectory
    );

    expect(
      getLastDialogDirectory(
        "reconcileAnalysesWithSystem"
      )
    ).toBe(analysesDirectory);

    expect(
      getLastDialogDirectory(
        "reconcilePublicationsWithSystem"
      )
    ).toBe(publicationsDirectory);
  });

  test("ignora diretorio salvo que nao existe mais", () => {
    const missingDirectory = path.join(
      tempUserData,
      "pasta-removida"
    );

    const historyFile = path.join(
      tempUserData,
      "dialog-history.json"
    );

    fs.writeFileSync(
      historyFile,
      JSON.stringify({
        reconcileAnalysesWithSystem:
          missingDirectory
      }),
      "utf8"
    );

    expect(
      getLastDialogDirectory(
        "reconcileAnalysesWithSystem"
      )
    ).toBeUndefined();
  });

  test("persiste diretorio em arquivo para ser recuperado apos reinicio", async () => {
    const directory = path.join(
      tempUserData,
      "validar-cadastro"
    );

    fs.mkdirSync(directory);

    saveLastDialogDirectory(
      "reconcilePublicationsWithSystem",
      directory
    );

    const historyFile = path.join(
      tempUserData,
      "dialog-history.json"
    );

    expect(
      fs.existsSync(historyFile)
    ).toBe(true);

    const savedData = JSON.parse(
      fs.readFileSync(historyFile, "utf8")
    );

    expect(savedData).toMatchObject({
      reconcilePublicationsWithSystem:
        directory
    });

    jest.resetModules();

    jest.doMock("electron", () => ({
      app: {
        getPath: jest.fn(
          () => tempUserData
        )
      }
    }));

    const reloadedInfrastructure =
      await import(
        "../../src/infrastructure/dialog/dialogHistory.infrastructure"
      );

    expect(
      reloadedInfrastructure
        .getLastDialogDirectory(
          "reconcilePublicationsWithSystem"
        )
    ).toBe(directory);
  });

  test("tolera arquivo JSON corrompido sem quebrar o app", () => {
    const historyFile = path.join(
      tempUserData,
      "dialog-history.json"
    );

    fs.writeFileSync(
      historyFile,
      "{ arquivo-json-invalido",
      "utf8"
    );

    expect(() =>
      getLastDialogDirectory(
        "comparePublications"
      )
    ).not.toThrow();

    expect(
      getLastDialogDirectory(
        "comparePublications"
      )
    ).toBeUndefined();
  });

  test("preserva outros contextos ao atualizar apenas um deles", () => {
    const analysesDirectory = path.join(
      tempUserData,
      "analises"
    );

    const publicationsDirectory = path.join(
      tempUserData,
      "publicacoes"
    );

    const newAnalysesDirectory = path.join(
      tempUserData,
      "novas-analises"
    );

    fs.mkdirSync(analysesDirectory);
    fs.mkdirSync(publicationsDirectory);
    fs.mkdirSync(newAnalysesDirectory);

    saveLastDialogDirectory(
      "reconcileAnalysesWithSystem",
      analysesDirectory
    );

    saveLastDialogDirectory(
      "reconcilePublicationsWithSystem",
      publicationsDirectory
    );

    saveLastDialogDirectory(
      "reconcileAnalysesWithSystem",
      newAnalysesDirectory
    );

    expect(
      getLastDialogDirectory(
        "reconcileAnalysesWithSystem"
      )
    ).toBe(newAnalysesDirectory);

    expect(
      getLastDialogDirectory(
        "reconcilePublicationsWithSystem"
      )
    ).toBe(publicationsDirectory);
  });
});