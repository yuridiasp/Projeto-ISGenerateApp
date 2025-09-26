import { errorsCodeList } from "@helpers/errorsCode";
import { AppError } from "@models/errors/appError";

export class NotFoundError extends AppError {
    
    constructor(resource: string) {
        super(`${resource} não encontrado.`, errorsCodeList.notFound)
    }
}
