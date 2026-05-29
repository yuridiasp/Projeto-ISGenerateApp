import { Result } from '@models/results/result.models'
import { storeCredentials, retrieveCredentials } from '@repositories/auth/authRepository.repositories'
import { encrypt, decrypt } from '@utils/crypto/cryptoUtils.utils'
import { Cookie, credential, getCookieLoginService } from '@services/login'
import { iWindows } from '@models/windows'

export async function loginService(username: string | undefined, password: string | undefined): Promise<Result<Cookie>> {
    
    const result = JSON.parse(await getCookieLoginService({ login: username, senha: password }))

    if (result.success) {
        const encryptedPassword = encrypt(password)

        await storeCredentials(username, encryptedPassword)
    }

    return result
}

export function retrieveCredentialsService() {
    const result = retrieveCredentials()

    if (result.success) {
        const decryptedPassword = decrypt(result.data.encryptedPassword)

        return { login: result.data.login, senha: decryptedPassword }
    }
    
    return null
}

export function sendCredenctialsService(credentials: credential, windows: iWindows) {
    windows.mainWindow.webContents.send("receive-credentials", JSON.stringify(credentials))
}