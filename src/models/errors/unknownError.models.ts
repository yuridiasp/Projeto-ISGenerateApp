import { errorsCodeList } from "@helpers/errorsCode.helpers";
import { AppError } from "./appError.models";

export class UnknownError extends AppError {
    constructor() {
        super("Houve um erro desconhecido.", errorsCodeList.unkownError)
    }
}