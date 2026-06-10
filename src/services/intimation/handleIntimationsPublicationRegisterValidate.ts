import { actionFunctionArgs } from "@middlewares/executeWithLogin.middlewares";
import { DiaryRecord } from "@models/diaryReader";
import { Result } from "@models/results";
import { createPdfTextReaderRepository } from "@repositories/pdfTextReader/pdfTextReader.repositories";
import { createPdfDiaryReaderService } from "@services/pdfDiaryReader/pdfDiaryReader.services";
import { iFileData } from "@services/validateIntimations";

const textReaderRepository = createPdfTextReaderRepository();

const pdfDiaryReaderService = createPdfDiaryReaderService({
  textReaderRepository,
  logger: {
    info(message, data) {
      console.log(message, data);
    }
  }
});

export type tHandlePublication = {
    result: DiaryRecord[]
}

export async function handleIntimationPublicationRegisterService({ cookie, file, window }: actionFunctionArgs): Promise<Result<tHandlePublication>> {
    const registro = await pdfDiaryReaderService.read(file as iFileData);
    
    return {
        success: true,
        data: {
            result: registro
        }
    }
}