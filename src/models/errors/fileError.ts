import { AppError } from "./appError";

export class FileError extends AppError {
    
    constructor(resource: string) {
        super(`${resource}`, 'FILE_ERROR')
    }
}
