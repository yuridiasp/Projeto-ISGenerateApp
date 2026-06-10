import { DiaryRecord } from "@models/diaryReader/diaryReader.models";
import { identifyDiaryDocumentController } from "@controllers/diaryDocumentIdentifier.controllers";
import { readDiaryFromWordController } from "@controllers/wordDiaryReader.controllers";
import { readDiaryFromPdfController } from "@controllers/pdfDiaryReader.controllers";
import { iFileData } from "@services/validateIntimations";

export async function readDiaryAutomatically(file: iFileData): Promise<DiaryRecord[]> {
  const identification = await identifyDiaryDocumentController(file);
  
  switch (identification.layout) {
    case "WORD_CADASTRADO":
      return readDiaryFromWordController(file);

    case "PDF_IS_PROCESSOS":
    case "SERDIJUL":
    case "PDF_DEFAULT":
      return readDiaryFromPdfController(file);

    default:
      throw new Error(
        `Não foi possível identificar o layout do documento. Tipo: ${identification.fileType}. Extensão: ${identification.extension}.`
      );
  }
}