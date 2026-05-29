import { createDocxTextReaderRepository } from "@repositories/docxTextReader/docxTextReader.repositories";
import { createDiaryReaderService } from "@services/diaryReader/diaryReader.services";

const textReaderRepository = createDocxTextReaderRepository();

const diaryReaderService = createDiaryReaderService({
  textReaderRepository
});

export async function readDiaryFromDocxController(filePath: string) {
  return diaryReaderService.read(filePath);
}