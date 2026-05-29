import { errorsCodeList } from "@helpers/errorsCode.helpers";
import { AppError } from "@models/errors/appError.models";

export class NotFoundError extends AppError {
    
    constructor(resource: string) {
        super(`${resource} não encontrado.`, errorsCodeList.notFound)
    }
}
