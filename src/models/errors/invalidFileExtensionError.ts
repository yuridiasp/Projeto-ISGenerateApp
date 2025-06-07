import { AppError } from "./appError";

export class InvalidFileExtensionError extends AppError {
    constructor(message: string = "Extensão de arquivo inválida.") {
        super(message, "INVALID_FILE_EXTENSION_ERROR")
    }
}
