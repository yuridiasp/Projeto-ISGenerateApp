import { createDocxTextReaderRepository } from "@repositories/docxTextReader/docxTextReader.repositories";
import { iFileData } from "@services/validateIntimations";
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

export async function readDiaryFromWordController(file: iFileData) {
  return wordDiaryReaderService.read(file);
}