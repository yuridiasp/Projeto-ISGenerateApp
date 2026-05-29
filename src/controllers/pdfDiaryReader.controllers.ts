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

export async function readDiaryFromPdfController(filePath: string) {
  return pdfDiaryReaderService.read(filePath);
}