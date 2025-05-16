import { AppError } from "./appError";


export class ValidationError extends AppError {

    constructor(message: string) {
        super(message, 'VALIDATION_ERROR')
    }
}
