import { AxiosResponse } from "axios"
import { Result } from "@models/results"
import { getCompromissoCreatedId } from "@services/compromissos"
import { objectID, successfulCreationRequestValidation } from "@utils/request/successfulCreationRequestValidation"

export function isCompromissoSuccessfullyCreated(response: AxiosResponse<any, any>): Result<objectID> {
    const validUrl = process.env.VALID_URL_CREATE_COMPROMISSO
    
    return successfulCreationRequestValidation(response.request.res.responseUrl, validUrl, getCompromissoCreatedId)
}