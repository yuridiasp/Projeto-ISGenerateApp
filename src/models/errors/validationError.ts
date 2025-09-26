import { errorsCodeList } from "@helpers/errorsCode";
import { AppError } from "@models/errors/appError";

export class ValidationError extends AppError {

    constructor(message: string) {
        super(message, errorsCodeList.validationError)
    }
}
