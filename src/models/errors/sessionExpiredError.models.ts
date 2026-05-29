import { errorsCodeList } from "@helpers/errorsCode.helpers";
import { AppError } from "./appError.models";

export class SessionExpiredError extends AppError {

    constructor() {
        super("Sessão expirada. Necessário realizar novo login.", errorsCodeList.sessionExpiredError)
    }
}
