import {
  afterEach,
  beforeEach,
  describe,
  expect,
  jest,
  test
} from "@jest/globals";

import fs from "fs";

import {
  getObjectValidateIntimationsService,
  getOjectValidatePublicationService
} from "../../src/services/validateIntimations/validateIntimations.services";

import {
  readExcelFile
} from "../../src/repositories/xlsx/excelISFile.repositories";

import {
  readWordFile
} from "../../src/repositories/word/wordISFile.repositories";

import {
  readDiaryAutomatically
} from "../../src/services/diaryAutoReader/diaryAutoReader.services";

import {
  repairBrokenDiaryRecords
} from "../../src/mappers/repairBrokenDiaryRecords.mapper";

import {
  normalizeDiaryRecordsToISAnalysisDTO
} from "../../src/mappers/diaryRecordToISAnalysis.mapper";


jest.mock(
  "../../src/repositories/xlsx/excelISFile.repositories",
  () => ({
    readExcelFile: jest.fn()
  })
);

jest.mock(
  "../../src/repositories/word/wordISFile.repositories",
  () => ({
    readWordFile: jest.fn()
  })
);

jest.mock(
  "../../src/services/diaryAutoReader/diaryAutoReader.services",
  () => ({
    readDiaryAutomatically: jest.fn()
  })
);

jest.mock(
  "../../src/mappers/repairBrokenDiaryRecords.mapper",
  () => ({
    repairBrokenDiaryRecords: jest.fn()
  })
);

jest.mock(
  "../../src/mappers/diaryRecordToISAnalysis.mapper",
  () => ({
    normalizeDiaryRecordsToISAnalysisDTO: jest.fn()
  })
);


describe("validateIntimations - roteamento por finalidade", () => {
  beforeEach(() => {
    jest.clearAllMocks();

    jest.spyOn(fs, "existsSync")
      .mockReturnValue(true);
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  test("VALIDAR CADASTRO envia Excel do Recorte para readExcelFile", async () => {
    const file = {
      filePath: "C:\\temp\\recorte.xlsx",
      fileName: "recorte.xlsx"
    };

    const recorteRecords = [
      {
        case_number: "000123456789",
        validateMode: "RECORTE"
      }
    ];

    jest.mocked(readExcelFile)
      .mockReturnValue(recorteRecords as any);

    const result =
      await getOjectValidatePublicationService(file);

    expect(result).toEqual({
      success: true,
      data: {
        file: recorteRecords
      }
    });

    expect(readExcelFile)
      .toHaveBeenCalledWith(file.filePath);

    expect(readDiaryAutomatically)
      .not.toHaveBeenCalled();

    expect(readWordFile)
      .not.toHaveBeenCalled();
  });

  test("VALIDAR ANALISE nao aceita Excel do Recorte Digital", async () => {
    const file = {
      filePath: "C:\\temp\\recorte.xlsx",
      fileName: "recorte.xlsx"
    };

    const result =
      await getObjectValidateIntimationsService(file);

    expect(result.success).toBe(false);

    expect(readExcelFile)
      .not.toHaveBeenCalled();

    expect(readWordFile)
      .not.toHaveBeenCalled();

    expect(readDiaryAutomatically)
      .not.toHaveBeenCalled();
  });

  test("VALIDAR ANALISE continua processando DOCX analisado", async () => {
    const file = {
      filePath: "C:\\temp\\analise.docx",
      fileName: "analise.docx"
    };

    const analyses = [
      {
        case_number: "000123456789",
        description: "SENTENCA"
      }
    ];

    jest.mocked(readWordFile)
      .mockResolvedValue(analyses as any);

    const result =
      await getObjectValidateIntimationsService(file);

    expect(result).toEqual({
      success: true,
      data: {
        file: analyses
      }
    });

    expect(readWordFile)
      .toHaveBeenCalledWith(
        file.filePath,
        file.fileName
      );

    expect(readExcelFile)
      .not.toHaveBeenCalled();
  });

  test("VALIDAR CADASTRO continua usando DiaryReader para publicacoes nao Excel", async () => {
    const file = {
      filePath: "C:\\temp\\publicacoes.pdf",
      fileName: "publicacoes.pdf"
    };

    const diaryRecords = [
      {
        layout: "SERDIJUL",
        processo: "0001234-56.2026.5.20.0001"
      }
    ];

    const repairedRecords = [
      {
        ...diaryRecords[0]
      }
    ];

    const normalizedRecords = [
      {
        case_number: "00012345620265200001",
        validateMode: "PUB_VAL"
      }
    ];

    jest.mocked(readDiaryAutomatically)
      .mockResolvedValue(diaryRecords as any);

    jest.mocked(repairBrokenDiaryRecords)
      .mockReturnValue(repairedRecords as any);

    jest.mocked(normalizeDiaryRecordsToISAnalysisDTO)
      .mockReturnValue(normalizedRecords as any);

    const result =
      await getOjectValidatePublicationService(file);

    expect(result).toEqual({
      success: true,
      data: {
        file: normalizedRecords
      }
    });

    expect(readDiaryAutomatically)
      .toHaveBeenCalledWith(file);

    expect(repairBrokenDiaryRecords)
      .toHaveBeenCalledWith(diaryRecords);

    expect(normalizeDiaryRecordsToISAnalysisDTO)
      .toHaveBeenCalledWith(
        repairedRecords,
        {
          validateMode: "PUB_VAL"
        }
      );

    expect(readExcelFile)
      .not.toHaveBeenCalled();
  });
});