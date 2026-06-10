import { DiaryDocumentIdentification, TextReaderRepository } from "@models/diaryReader/diaryReader.models";
import { identifyDiaryDocument } from "@helpers/diaryDocumentIdentifier.helpers";
import { iFileData } from "@services/validateIntimations";

interface CreateDiaryDocumentIdentifierServiceParams {
  pdfTextReaderRepository: TextReaderRepository;
  docxTextReaderRepository: TextReaderRepository;
}

export function createDiaryDocumentIdentifierService({
  pdfTextReaderRepository,
  docxTextReaderRepository
}: CreateDiaryDocumentIdentifierServiceParams) {
  return {
    async identify(file: iFileData): Promise<DiaryDocumentIdentification> {
      const extension = getExtension(file.filePath);
      
      const rawText = await readRawTextByExtension(
        file,
        extension,
        pdfTextReaderRepository,
        docxTextReaderRepository
      );

      return identifyDiaryDocument(file.filePath, rawText);
    }
  };
}

async function readRawTextByExtension(
  file: iFileData,
  extension: string,
  pdfTextReaderRepository: TextReaderRepository,
  docxTextReaderRepository: TextReaderRepository
): Promise<string> {
  if (extension === ".pdf") {
    return pdfTextReaderRepository.readText(file);
  }

  if (extension === ".docx" || extension === ".doc") {
    return docxTextReaderRepository.readText(file);
  }

  throw new Error(`Tipo de arquivo não suportado: ${extension}`);
}

function getExtension(filePath: string): string {
  const lastDotIndex = filePath.lastIndexOf(".");

  if (lastDotIndex === -1) return "";

  return filePath.slice(lastDotIndex).toLowerCase();
}