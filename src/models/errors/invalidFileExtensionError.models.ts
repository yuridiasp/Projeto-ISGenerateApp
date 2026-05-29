import { errorsCodeList } from "@helpers/errorsCode.helpers";
import { AppError } from "@models/errors/appError.models";

export class InvalidFileExtensionError extends AppError {
    constructor(message: string = "Extensão de arquivo inválida.") {
        super(message, errorsCodeList.invalidFileExtensionError)
    }
}
