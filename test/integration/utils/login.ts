import dotEnv from '@dotenvx/dotenvx'
import { loginService } from "../../../src/services/auth/authService"

dotEnv.config()

export async function login () {
    const { LOGIN, SENHA } = process.env
    const result = await loginService(LOGIN, SENHA)

    if(result.success) {
        return result.data.cookie
    }
    
    return null
}