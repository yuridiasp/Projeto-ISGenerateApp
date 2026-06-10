import { iFileData } from "@services/validateIntimations";
import fs from "fs";
import { PDFParse } from "pdf-parse";

export async function extractRawTextFromPdf(file: iFileData): Promise<string> {
  
  const buffer = fs.readFileSync(file.filePath);

  const parser = new PDFParse({
    data: buffer
  });

  try {
    const result = await parser.getText();

    return result.text;
  } finally {
    await parser.destroy();
  }
}