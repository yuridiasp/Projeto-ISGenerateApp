import { UnknownError } from "@models/errors/unknownError.models"
import { Result } from "@models/results";
import { isSessionExpired } from "@utils/auth/checkSessionExpiration.utils"

export function RequestValidationURL(url: string, validURL: string): Result<{ url: string }> {
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