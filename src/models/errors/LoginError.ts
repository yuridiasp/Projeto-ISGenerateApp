import { errorsCodeList } from "@helpers/errorsCode"
import { AppError } from "@models/errors/appError"

export class LoginError extends AppError {
    readonly statusCode: number

    constructor(message: string, statusCode: number) {
        super(message, errorsCodeList.loginError)
        this.statusCode = statusCode
    }
}