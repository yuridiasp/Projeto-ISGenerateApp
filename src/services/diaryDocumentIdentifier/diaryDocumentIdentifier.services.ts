import { DiaryDocumentIdentification, TextReaderRepository } from "@models/diaryReader/diaryReader.models";
import { identifyDiaryDocument } from "@helpers/diaryDocumentIdentifier.helpers";

interface CreateDiaryDocumentIdentifierServiceParams {
  pdfTextReaderRepository: TextReaderRepository;
  docxTextReaderRepository: TextReaderRepository;
}

export function createDiaryDocumentIdentifierService({
  pdfTextReaderRepository,
  docxTextReaderRepository
}: CreateDiaryDocumentIdentifierServiceParams) {
  return {
    async identify(filePath: string): Promise<DiaryDocumentIdentification> {
      const extension = getExtension(filePath);

      const rawText = await readRawTextByExtension(
        filePath,
        extension,
        pdfTextReaderRepository,
        docxTextReaderRepository
      );

      return identifyDiaryDocument(filePath, rawText);
    }
  };
}

async function readRawTextByExtension(
  filePath: string,
  extension: string,
  pdfTextReaderRepository: TextReaderRepository,
  docxTextReaderRepository: TextReaderRepository
): Promise<string> {
  if (extension === ".pdf") {
    return pdfTextReaderRepository.readText(filePath);
  }

  if (extension === ".docx" || extension === ".doc") {
    return docxTextReaderRepository.readText(filePath);
  }

  throw new Error(`Tipo de arquivo não suportado: ${extension}`);
}

function getExtension(filePath: string): string {
  const lastDotIndex = filePath.lastIndexOf(".");

  if (lastDotIndex === -1) return "";

  return filePath.slice(lastDotIndex).toLowerCase();
}