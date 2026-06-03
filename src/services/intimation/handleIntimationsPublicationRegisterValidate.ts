import { actionFunctionArgs } from "@middlewares/executeWithLogin.middlewares";
import { DiaryRecord } from "@models/diaryReader";
import { Result } from "@models/results";
import { createPdfTextReaderRepository } from "@repositories/pdfTextReader/pdfTextReader.repositories";
import { createPdfDiaryReaderService } from "@services/pdfDiaryReader/pdfDiaryReader.services";

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

export async function handleIntimationPublicationRegisterService({ cookie, filePath, window }: actionFunctionArgs): Promise<Result<tHandlePublication>> {
    const registro = await pdfDiaryReaderService.read(filePath as string);
    
    return {
        success: true,
        data: {
            result: registro
        }
    }
}