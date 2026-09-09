import { ValidationError } from "@models/errors";
import { renameDiaryFilesService } from "@services/diaryFileRenamer";
import { iFileData } from "@services/validateIntimations";

export async function renameDiaryFilesController(
  event: Electron.IpcMainInvokeEvent,
  files: iFileData[]
) {
  if (!files?.length) {
    return {
      success: false,
      error: new ValidationError("Selecione pelo menos um arquivo para renomear.")
    };
  }

  try {
    const result =
      await renameDiaryFilesService(files);

    return {
      success: true,
      data: result
    };
  } catch (error) {
    return {
      success: false,
      error
    };
  }
}
