import { errorsCodeList } from "@helpers/errorsCode";
import { AppError } from "@models/errors/appError";

export class ValidationError extends AppError {
    fileLength: number

    constructor(message: string, fileLength: number = undefined) {
        super(message, errorsCodeList.validationError)
        this.fileLength = fileLength
    }
}
