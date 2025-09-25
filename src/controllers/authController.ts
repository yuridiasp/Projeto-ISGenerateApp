import { ValidationError } from '@models/errors/validationError'
import { iWindows } from '@models/windows/iWindows'
import { loginService, retrieveCredentialsService } from '@services/auth/authService'

export async function loginController(windows: iWindows,username: string, password: string) {
    if (!username || !password) {
        return {
            success: false,
            error: new ValidationError("Nome de usuário e/ou senha não informados.")
        }
    }

    const result = await loginService(windows, username, password)

    return result
}

export function getCredentialsController() {
    const credentials = retrieveCredentialsService()

    if (credentials) {
        console.log(`Credenciais recuperadas: ${credentials.login}`)
    } else {
        console.log('Nenhuma credencial encontrada')
    }
}
