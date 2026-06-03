import { createDocxTextReaderRepository } from "@repositories/docxTextReader/docxTextReader.repositories";
import { createDiaryReaderService } from "@services/wordDiaryReader/wordDiaryReader.services";

const textReaderRepository = createDocxTextReaderRepository();

const wordDiaryReaderService = createDiaryReaderService({
  textReaderRepository,
  logger: {
    info(message, data) {
      console.log(message, data);
    }
  }
});

export async function readDiaryFromWordController(filePath: string) {
  return wordDiaryReaderService.read(filePath);
}