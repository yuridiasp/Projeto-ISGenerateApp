import { iFileData } from "@services/validateIntimations";
import fs from "fs";
import { PDFParse } from "pdf-parse";

export async function extractRawTextFromPdfBuffer(
  buffer: Buffer
): Promise<string> {
  const parser = new PDFParse({
    data: buffer
  });

  try {
    const result = await parser.getText();

    const text = result.text?.trim() ?? "";

    if (!text) {
      throw new Error(
        "O PDF não possui uma camada de texto reconhecível. " +
        "O documento pode ter sido digitalizado como imagem."
      );
    }

    return result.text;
  } finally {
    await parser.destroy();
  }
}

export async function extractRawTextFromPdf(
  file: iFileData
): Promise<string> {
  const buffer = await fs.promises.readFile(file.filePath);

  return extractRawTextFromPdfBuffer(buffer);
}