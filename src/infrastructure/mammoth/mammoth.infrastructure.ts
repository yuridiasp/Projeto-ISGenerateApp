import { iFileData } from "@services/validateIntimations";
import mammoth from "mammoth";

export async function extractRawTextFromDocx(file: iFileData): Promise<string> {
  const result = await mammoth.extractRawText({ path: file.filePath });

  return result.value;
}