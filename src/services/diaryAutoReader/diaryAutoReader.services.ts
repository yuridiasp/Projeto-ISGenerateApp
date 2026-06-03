import { DiaryRecord } from "@models/diaryReader/diaryReader.models";
import { identifyDiaryDocumentController } from "@controllers/diaryDocumentIdentifier.controllers";
import { readDiaryFromWordController } from "@controllers/wordDiaryReader.controllers";
import { readDiaryFromPdfController } from "@controllers/pdfDiaryReader.controllers";

export async function readDiaryAutomatically(filePath: string): Promise<DiaryRecord[]> {
  const identification = await identifyDiaryDocumentController(filePath);

  switch (identification.layout) {
    case "WORD_CADASTRADO":
      return readDiaryFromWordController(filePath);

    case "PDF_IS_PROCESSOS":
    case "SERDIJUL":
    case "PDF_DEFAULT":
      return readDiaryFromPdfController(filePath);

    default:
      throw new Error(
        `Não foi possível identificar o layout do documento. Tipo: ${identification.fileType}. Extensão: ${identification.extension}.`
      );
  }
}