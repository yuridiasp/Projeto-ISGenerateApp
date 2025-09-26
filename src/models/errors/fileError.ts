import { errorsCodeList } from "@helpers/errorsCode";
import { AppError } from "@models/errors/appError";

export class FileError extends AppError {
    
    constructor(message: string) {
        super(message, errorsCodeList.fileError)
    }
}
