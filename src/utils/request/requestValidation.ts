import { UnknownError } from "@models/errors/unknownError"
import { isSessionExpired } from "@utils/auth/checkSessionExpiration"

export function RequestValidationURL(url: string, validURL: string) {
   //console.log(url, validURL)
    if (url.includes(validURL)) {
        return {
            success: true,
            data: { url }
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