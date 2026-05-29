import { errorsCodeList } from "@helpers/errorsCode.helpers";
import { AppError } from "@models/errors/appError.models";

export class ValidationError extends AppError {
    fileLength: number

    constructor(message: string, fileLength: number = undefined) {
        super(message, errorsCodeList.validationError)
        this.fileLength = fileLength
    }
}
