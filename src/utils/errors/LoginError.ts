export class LoginError extends Error {
    statusCode: number

    constructor(message: string, statusCode: number) {
        super(message)
        this.name = "LoginError"
        this.statusCode = statusCode
    }
}