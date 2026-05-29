import { errorsCodeList } from "@helpers/errorsCode.helpers"
import { AppError } from "@models/errors/appError.models"

export class LoginError extends AppError {
    readonly statusCode: number

    constructor(message: string, statusCode: number) {
        super(message, errorsCodeList.loginError)
        this.statusCode = statusCode
    }
}