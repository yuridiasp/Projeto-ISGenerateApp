import { AppError } from "@models/errors/appError"

export class LoginError extends AppError {
    readonly statusCode: number

    constructor(message: string, statusCode: number) {
        super(message, "LOGIN_ERROR")
        this.statusCode = statusCode
    }
}