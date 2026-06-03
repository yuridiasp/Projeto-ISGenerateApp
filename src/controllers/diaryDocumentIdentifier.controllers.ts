import { createPdfTextReaderRepository } from "@repositories/pdfTextReader/pdfTextReader.repositories";
import { createDocxTextReaderRepository } from "@repositories/docxTextReader/docxTextReader.repositories";
import { createDiaryDocumentIdentifierService } from "@services/diaryDocumentIdentifier/diaryDocumentIdentifier.services";

const pdfTextReaderRepository = createPdfTextReaderRepository();
const docxTextReaderRepository = createDocxTextReaderRepository();

const diaryDocumentIdentifierService = createDiaryDocumentIdentifierService({
  pdfTextReaderRepository,
  docxTextReaderRepository
});

export async function identifyDiaryDocumentController(filePath: string) {
  return diaryDocumentIdentifierService.identify(filePath);
}