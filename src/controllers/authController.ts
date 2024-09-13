import { loginService, retrieveCredentialsService } from '../services/auth/authService'

export async function loginController(username: string = null, password: string = null) {
    const result = await loginService(username, password)

    if (result) {
        console.log('Login bem-sucedido')
    } else {
        console.log('Falha no login')
    }

    return result
}

export function getCredentialsController() {
    const credentials = retrieveCredentialsService()

    if (credentials) {
        console.log(`Credenciais recuperadas: ${credentials.login}`)
    } else {
        console.log('Nenhuma credencial encontrada');
    }
}
