import { errorsCodeList } from "@helpers/errorsCode";
import { AppError } from "./appError";

export class SessionExpiredError extends AppError {

    constructor() {
        super("Sessão expirada. Necessário realizar novo login.", errorsCodeList.sessionExpiredError)
    }
}
