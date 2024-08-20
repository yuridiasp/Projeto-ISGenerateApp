class LoginError extends Error {
    constructor(message, statusCode) {
        super(message)
        this.name = "LoginError"
        this.statusCode = statusCode
    }
}

module.exports = { LoginError }