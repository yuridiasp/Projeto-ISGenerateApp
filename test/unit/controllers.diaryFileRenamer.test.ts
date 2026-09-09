import {
  describe,
  expect,
  jest,
  test
} from "@jest/globals";

import {
  renameDiaryFilesService
} from "../../src/services/diaryFileRenamer";

import {
  renameDiaryFilesController
} from "../../src/controllers/renameDiaryFiles.controllers";

jest.mock(
  "../../src/services/diaryFileRenamer",
  () => ({
    renameDiaryFilesService:
      jest.fn()
  })
);

describe("renameDiaryFilesController", () => {
    test("rejeita lista vazia", async () => {
        const result =
          await renameDiaryFilesController({} as Electron.IpcMainInvokeEvent, []);

        expect(result.success).toBe(false);

        expect(renameDiaryFilesService).not.toHaveBeenCalled();
      }
    );

    test("encaminha arquivos para o service", async () => {
        const files = [
          {
            filePath:
              "C:\\docs\\arquivo.pdf",
            fileName:
              "arquivo.pdf"
          }
        ];

        const summary = {
          total: 1,
          renamed: 1,
          skipped: 0,
          errors: 0,
          files: []
        };

        jest
          .mocked(
            renameDiaryFilesService
          )
          .mockResolvedValue(
            summary
          );

        const result =
          await renameDiaryFilesController({} as Electron.IpcMainInvokeEvent, files);

        expect(renameDiaryFilesService).toHaveBeenCalledWith(
          files
        );

        expect(result).toEqual({
          success: true,
          data: summary
        });
      }
    );
  }
);
