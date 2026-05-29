import { errorsCodeList } from "@helpers/errorsCode.helpers";
import { AppError } from "@models/errors/appError.models";

export class EmptyFileError extends AppError {
    
    constructor(message: string = "O arquivo não pode estar vazio.") {
        super(message, errorsCodeList.emptyFileError)
    }
}
