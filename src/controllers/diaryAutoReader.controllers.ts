import { createPdfTextReaderRepository } from "@repositories/pdfTextReader/pdfTextReader.repositories";
import { createDocxTextReaderRepository } from "@repositories/docxTextReader/docxTextReader.repositories";

import { createDiaryDocumentIdentifierService } from "@services/diaryDocumentIdentifier/diaryDocumentIdentifier.services";
import { createDiaryReaderService } from "@services/wordDiaryReader/wordDiaryReader.services";
import { createPdfDiaryReaderService } from "@services/pdfDiaryReader/pdfDiaryReader.services";

const pdfTextReaderRepository = createPdfTextReaderRepository();
const docxTextReaderRepository = createDocxTextReaderRepository();

const diaryDocumentIdentifierService = createDiaryDocumentIdentifierService({
  pdfTextReaderRepository,
  docxTextReaderRepository
});

const wordDiaryReaderService = createDiaryReaderService({
  textReaderRepository: docxTextReaderRepository,
  logger: {
    info(message, data) {
      console.log(message, data);
    }
  }
});

const pdfDiaryReaderService = createPdfDiaryReaderService({
  textReaderRepository: pdfTextReaderRepository,
  logger: {
    info(message, data) {
      console.log(message, data);
    }
  }
});

export async function readDiaryAutomaticallyController(filePath: string) {
  const identification = await diaryDocumentIdentifierService.identify(filePath);

  console.log("Documento identificado:", identification);

  switch (identification.layout) {
    case "WORD_CADASTRADO":
      return wordDiaryReaderService.read(filePath);

    case "PDF_IS_PROCESSOS":
    case "SERDIJUL":
    case "PDF_DEFAULT":
      return pdfDiaryReaderService.read(filePath);

    default:
      throw new Error(
        `Não foi possível identificar o layout do documento. Tipo: ${identification.fileType}. Extensão: ${identification.extension}.`
      );
  }
}