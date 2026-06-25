import { AxiosResponse } from "axios"
import { Result } from "@models/results"
import { getCompromissoCreatedId } from "@services/compromissos"
import { objectID, successfulCreationRequestValidation } from "@utils/request/successfulCreationRequestValidation.utils"
import { ValidationError } from "@models/errors";

export function isCompromissoSuccessfullyCreated(response: AxiosResponse<any, any>): Result<objectID> {
    const validUrl = process.env.VALID_URL_CREATE_COMPROMISSO

    if (!validUrl)
        return {
            success: false,
            error: new ValidationError("VALID_URL_CREATE_COMPROMISSO ausente nas variáveis de ambiente")
        }
    
    return successfulCreationRequestValidation(response.request.res.responseUrl, validUrl, getCompromissoCreatedId)
}