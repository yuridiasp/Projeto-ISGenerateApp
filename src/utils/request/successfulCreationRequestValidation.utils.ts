import { AxiosResponse } from "axios"

import { Result } from "@models/results/result.models"
import { RequestValidationURL } from "./requestValidation.utils"
import { SessionExpiredError } from "@models/errors";

export type objectID = { id: string }

export function successfulCreationRequestValidation(url: string, validURL: string, getIdFunction: (url: string) => string): Result<objectID> {

    const isValidResult = RequestValidationURL(url, validURL)

    if(isValidResult.success === true)
        return {
            success: true,
            data: { id: getIdFunction(url) }
        }

    return {
        success: false,
        error: isValidResult.error
    }
}