import { AppError } from "./appError";

export class SessionExpiredError extends AppError {

    constructor() {
        super("Sessão expirada. Necessário realizar novo login.", 'SESSION_EXPIRED_ERROR')
    }
}
