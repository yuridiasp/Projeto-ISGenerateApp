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

export async function readDiaryFromPdfController(file: iFileData) {
  return pdfDiaryReaderService.read(file);
}