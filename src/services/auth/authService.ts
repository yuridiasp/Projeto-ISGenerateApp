import { storeCredentials, retrieveCredentials } from '../../repositories/auth/authRepository';
import { encrypt, decrypt } from '../../utils/crypto/cryptoUtils';
import { getCookieLoginService } from '../login/loginService';

export async function loginService(username: string, password: string) {
    
    const loginSuccessful = await getCookieLoginService({ login: username, senha: password })

    if (loginSuccessful) {
        const encryptedPassword = encrypt(password)

        await storeCredentials(username, encryptedPassword)
    }

    return loginSuccessful
}

export function retrieveCredentialsService() {
    const { login, encryptedPassword } = retrieveCredentials()

    if (login && encryptedPassword) {
        const decryptedPassword = decrypt(encryptedPassword)

        return { login, senha: decryptedPassword }
    }
    
    return null
}
