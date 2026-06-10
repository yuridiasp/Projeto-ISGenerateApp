import { createPdfTextReaderRepository } from "@repositories/pdfTextReader/pdfTextReader.repositories";
import { createDocxTextReaderRepository } from "@repositories/docxTextReader/docxTextReader.repositories";
import { createDiaryDocumentIdentifierService } from "@services/diaryDocumentIdentifier/diaryDocumentIdentifier.services";
import { iFileData } from "@services/validateIntimations";

const pdfTextReaderRepository = createPdfTextReaderRepository();
const docxTextReaderRepository = createDocxTextReaderRepository();

const diaryDocumentIdentifierService = createDiaryDocumentIdentifierService({
  pdfTextReaderRepository,
  docxTextReaderRepository
});

export async function identifyDiaryDocumentController(file: iFileData) {
  return diaryDocumentIdentifierService.identify(file);
}