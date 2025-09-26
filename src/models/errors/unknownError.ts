import { errorsCodeList } from "@helpers/errorsCode";
import { AppError } from "./appError";

export class UnknownError extends AppError {
    constructor() {
        super("Houve um erro desconhecido.", errorsCodeList.unkownError)
    }
}