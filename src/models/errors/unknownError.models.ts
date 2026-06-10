import { errorsCodeList } from "@helpers/errorsCode.helpers";
import { AppError } from "./appError.models";

export class UnknownError extends AppError {
    constructor(error?: string) {
        super("Houve um erro desconhecido. --- " + error, errorsCodeList.unkownError)
    }
}