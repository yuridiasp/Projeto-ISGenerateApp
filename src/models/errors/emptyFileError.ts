import { errorsCodeList } from "@helpers/errorsCode";
import { AppError } from "@models/errors/appError";

export class EmptyFileError extends AppError {
    
    constructor(message: string = "O arquivo não pode estar vazio.") {
        super(message, errorsCodeList.emptyFileError)
    }
}
