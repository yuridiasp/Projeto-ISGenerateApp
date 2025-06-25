import { AppError } from "@models/errors/appError";

export class FileError extends AppError {
    
    constructor(resource: string) {
        super(`${resource}`, 'FILE_ERROR')
    }
}
