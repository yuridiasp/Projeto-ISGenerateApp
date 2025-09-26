import { errorsCodeList } from "@helpers/errorsCode";
import { AppError } from "./appError";

export class RecordResultsWithError extends AppError {
    constructor(message: string = "Houve erros no registro das intimações.") {
        super(message, errorsCodeList.recordResultsWithError)
    }
}