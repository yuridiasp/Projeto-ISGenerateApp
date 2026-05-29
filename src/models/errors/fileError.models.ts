import { errorsCodeList } from "@helpers/errorsCode.helpers";
import { AppError } from "@models/errors/appError.models";

export class FileError extends AppError {
    
    constructor(message: string) {
        super(message, errorsCodeList.fileError)
    }
}
