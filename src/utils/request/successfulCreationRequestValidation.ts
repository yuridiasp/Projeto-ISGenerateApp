import { AxiosResponse } from "axios"

import { isSessionExpired } from "@utils/auth/checkSessionExpiration"
import { Result } from "@models/result/result"
import { UnknownError } from "@models/errors/unknownError"

export type objectID = { id: string }

export function successfulCreationRequestValidation(response: AxiosResponse<any, any>, validURL: string, getIdFunction: (url: string) => string): Result<objectID> {
    const url = response.request.res.responseUrl
    console.log(url)
    if (url.includes(validURL)) {
        return {
            success: true,
            data: { id: getIdFunction(url) }
        }
    }

    const expiredError = isSessionExpired(url)

    if (expiredError) {
        return {
            success: false,
            error: expiredError
        }
    }

    return {
        success: false,
        error: new UnknownError()
    }
}