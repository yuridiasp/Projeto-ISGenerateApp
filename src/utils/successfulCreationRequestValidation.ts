import { AxiosResponse } from "axios"

import { isSessionExpired } from "@utils/auth/checkSessionExpiration"
import { SessionExpiredError } from "@models/errors/sessionExpiredError"
import { Result } from "@models/result/result"

export function successfulCreationRequestValidation(response: AxiosResponse<any, any>, validURL: string, getIdFunction: (url: string) => string): Result<{id: string}> {
    const url = response.request.res.responseUrl

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
        error: new SessionExpiredError()
    }
}