import { retrieveCredentialsService } from '@services/auth'

export function getCredentialsController() {
    const credentials = retrieveCredentialsService()

    if (credentials) {
        console.log(`Credenciais recuperadas: ${credentials.login}`)
    } else {
        console.log('Nenhuma credencial encontrada')
    }
}
