import { SessionExpiredError } from "@models/errors/sessionExpiredError.models"

export function isSessionExpired(responseUrl: string) {
    const isExpired = responseUrl.startsWith(process.env.SESSION_EXPIRED_URL)
    
    if (isExpired)
        return new SessionExpiredError()

    return false
}