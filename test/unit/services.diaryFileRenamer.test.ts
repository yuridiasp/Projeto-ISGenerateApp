import {
  afterEach,
  beforeEach,
  describe,
  expect,
  jest,
  test
} from "@jest/globals";

import fs from "fs";
import path from "path";

import {
  readDiaryAutomatically
} from "../../src/services/diaryAutoReader/diaryAutoReader.services";

import {
  renameDiaryFile,
  renameDiaryFilesService
} from "../../src/services/diaryFileRenamer/diaryFileRenamer.services";

jest.mock(
  "../../src/services/diaryAutoReader/diaryAutoReader.services",
  () => ({
    readDiaryAutomatically:
      jest.fn()
  })
);

describe("diaryFileRenamer", () => {
    beforeEach(() => {
      jest.clearAllMocks();

      jest
        .spyOn(fs, "renameSync")
        .mockImplementation(() => {});
    });

    afterEach(() => {
      jest.restoreAllMocks();
    });

    test("renomeia arquivo quando nome pode ser determinado", async () => {
        const file = {
          filePath:
            "C:\\docs\\original.pdf",
          fileName:
            "original.pdf",
          isXlsx: false
        };

        jest
          .spyOn(fs, "existsSync")
          .mockImplementation(
            value =>
              String(value) ===
              file.filePath
          );

        jest
          .mocked(
            readDiaryAutomatically
          )
          .mockResolvedValue([
            {
              layout: "SERDIJUL",
              tribunal:
                "TRIBUNAL SUPERIOR DO TRABALHO",
              dataPublicacao:
                "09/09/2026",
              partes: [],
              advogados: []
            }
          ]);

        const result =
          await renameDiaryFile(file);

        const expectedPath =
          path.join(
            path.dirname(file.filePath),
            "SERDIJUL TST 09092026.pdf"
          );

        expect(result.status).toBe("RENAMED");

        expect(result.newName).toBe(
          "SERDIJUL TST 09092026.pdf"
        );

        expect(fs.renameSync).toHaveBeenCalledWith(
          file.filePath,
          expectedPath
        );
      }
    );

    test("acrescenta sequencial quando o nome de destino ja existe", async () => {
    const originalPath = "C:\\docs\\arquivo.pdf";
    const canonicalPath = path.join(path.dirname(originalPath), "SERDIJUL TST 09092026.pdf");
    const firstCopyPath = path.join(path.dirname(originalPath), "SERDIJUL TST 09092026 (1).pdf");

    jest.spyOn(fs, "existsSync").mockImplementation(value => {
      const currentPath = String(value);
      return currentPath === originalPath || currentPath === canonicalPath;
    });

    jest.mocked(readDiaryAutomatically).mockResolvedValue([
      {
        layout: "SERDIJUL",
        tribunal: "TRIBUNAL SUPERIOR DO TRABALHO",
        dataPublicacao: "09/09/2026",
        partes: [],
        advogados: []
      }
    ]);

    const result = await renameDiaryFile({
      filePath: originalPath,
      fileName: "arquivo.pdf"
    });

    expect(result.status).toBe("RENAMED");
    expect(result.newName).toBe("SERDIJUL TST 09092026 (1).pdf");
    expect(fs.renameSync).toHaveBeenCalledWith(originalPath, firstCopyPath);
  });

    test("retorna ALREADY_NAMED quando arquivo ja possui nome correto", async () => {
        const file = {
          filePath:
            "C:\\docs\\SERDIJUL TST 09092026.pdf",
          fileName:
            "SERDIJUL TST 09092026.pdf"
        };

        jest
          .spyOn(fs, "existsSync")
          .mockReturnValue(true);

        jest
          .mocked(
            readDiaryAutomatically
          )
          .mockResolvedValue([
            {
              layout: "SERDIJUL",
              tribunal:
                "TRIBUNAL SUPERIOR DO TRABALHO",
              dataPublicacao:
                "09/09/2026",
              partes: [],
              advogados: []
            }
          ]);

        const result =
          await renameDiaryFile(file);

        expect(result.status).toBe(
          "ALREADY_NAMED"
        );

        expect(fs.renameSync).not.toHaveBeenCalled();
      }
    );

    test("retorna ERROR quando arquivo nao existe", async () => {
        jest
          .spyOn(fs, "existsSync")
          .mockReturnValue(false);

        const result =
          await renameDiaryFile({
            filePath:
              "C:\\docs\\inexistente.pdf",
            fileName:
              "inexistente.pdf"
          });

        expect(result.status).toBe("ERROR");

        expect(readDiaryAutomatically).not.toHaveBeenCalled();
      }
    );

    test("retorna INVALID quando nao consegue determinar nome", async () => {
        jest
          .spyOn(fs, "existsSync")
          .mockReturnValue(true);

        jest
          .mocked(
            readDiaryAutomatically
          )
          .mockResolvedValue([
            {
              layout: "SERDIJUL",
              tribunal:
                "TRIBUNAL DESCONHECIDO",
              dataPublicacao:
                "09/09/2026",
              partes: [],
              advogados: []
            }
          ]);

        const result =
          await renameDiaryFile({
            filePath:
              "C:\\docs\\arquivo.pdf",
            fileName:
              "arquivo.pdf"
          });

        expect(result.status).toBe("INVALID");

        expect(fs.renameSync).not.toHaveBeenCalled();
      }
    );

    test("gera resumo para varios arquivos", async () => {
      const files = [
        {
          filePath: "C:\\docs\\a.pdf",
          fileName: "a.pdf"
        },
        {
          filePath: "C:\\docs\\b.pdf",
          fileName: "b.pdf"
        }
      ];

      jest.spyOn(fs, "existsSync").mockImplementation(value => {
        const currentPath = String(value);
        return files.some(file => file.filePath === currentPath);
      });

      jest.mocked(readDiaryAutomatically).mockResolvedValue([
        {
          layout: "SERDIJUL",
          tribunal: "TRIBUNAL SUPERIOR DO TRABALHO",
          dataPublicacao: "09/09/2026",
          partes: [],
          advogados: []
        }
      ]);

      const result = await renameDiaryFilesService(files);

      expect(result.total).toBe(2);
      expect(result.renamed).toBe(2);
      expect(result.skipped).toBe(0);
      expect(result.errors).toBe(0);
      expect(result.files).toHaveLength(2);
    });

    test("avanca a numeracao enquanto existirem arquivos com o mesmo nome", async () => {
      const originalPath = "C:\\docs\\arquivo.pdf";
      const directory = path.dirname(originalPath);
      const canonicalPath = path.join(directory, "SERDIJUL TST 09092026.pdf");
      const copy1Path = path.join(directory, "SERDIJUL TST 09092026 (1).pdf");
      const copy2Path = path.join(directory, "SERDIJUL TST 09092026 (2).pdf");

      jest.spyOn(fs, "existsSync").mockImplementation(value => {
        const currentPath = String(value);

        return [
          originalPath,
          canonicalPath,
          copy1Path
        ].includes(currentPath);
      });

      jest.mocked(readDiaryAutomatically).mockResolvedValue([
        {
          layout: "SERDIJUL",
          tribunal: "TRIBUNAL SUPERIOR DO TRABALHO",
          dataPublicacao: "09/09/2026",
          partes: [],
          advogados: []
        }
      ]);

      const result = await renameDiaryFile({
        filePath: originalPath,
        fileName: "arquivo.pdf"
      });

      expect(result.status).toBe("RENAMED");
      expect(result.newName).toBe("SERDIJUL TST 09092026 (2).pdf");
      expect(fs.renameSync).toHaveBeenCalledWith(originalPath, copy2Path);
    });
});
