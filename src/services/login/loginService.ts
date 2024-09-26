require('dotenv').config()
import axios from 'axios'
import { LoginError } from '../../utils/errors/LoginError'
import { HttpStatusCodes } from '../../utils/request/statusCode'
import { loggedPostRequest } from '../../utils/request/postRequest'

export interface credential {
    login: string,
    senha: string
}

async function login(cookie: string, credentials: credential) {
    const { URL_LOGIN_SISTEMFR, LOGIN, SENHA, URL_HOME_SISTEMFR, URL_LOGIN_FAIL_SISTEMFR } = process.env

    const credentialsYuri = {
        login: LOGIN,
        senha: SENHA
    }

    const response = await loggedPostRequest({ url: URL_LOGIN_SISTEMFR, body: credentials || credentialsYuri, cookie })

    if (response.request.res.responseUrl === URL_LOGIN_FAIL_SISTEMFR) {
        throw new LoginError("Dados não encontrados!", HttpStatusCodes.UNAUTHORIZED)
    }

    if (response.request.res.responseUrl !== URL_HOME_SISTEMFR) {
        throw new LoginError("Login não realizado", HttpStatusCodes.FORBIDDEN)
    }
}

async function setCookieLoginForm() {
    try {
        const response = await axios.get(process.env.URL_FORM_LOGIN_SISTEMFR, {
            withCredentials: true,
            headers: {
                'Connection': 'close'
            }
        })

        return response.headers['set-cookie'][0].split(';')[0]
    } catch (error) {
        console.error('Erro ao obter o cookie do formulário de login:', error)
        throw error
    }
}

export async function getCookieLoginService(credentials?: credential) {

    try {
        const cookie = await setCookieLoginForm()

        await login(cookie, credentials)

        return cookie
    } catch (error) {
        console.log(error)
        return null
    }
}