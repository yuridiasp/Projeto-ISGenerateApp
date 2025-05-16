import { AppError } from "./appError";

export class NotFoundError extends AppError {
    
    constructor(resource: string) {
        super(`${resource} não encontrado.`, 'NOT_FOUND')
    }
}
