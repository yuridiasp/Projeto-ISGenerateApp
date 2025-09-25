require('dotenv').config()

import { LoginError } from '@models/errors/LoginError'
import { HttpStatusCodes } from '@helpers/statusCode'
import { loggedPostRequest } from '@utils/request/postRequest'
import { Result } from '@models/result/result'
import { getRequest } from '@utils/request/getRequest'
import { iWindows } from '@models/windows/iWindows'

export interface credential {
    login: string,
    senha: string
}

export type Cookie = {
    cookie: string
}

export async function login(cookie: string, credentials: credential = { login: process.env.LOGIN, senha: process.env.SENHA }): Promise<Result<Cookie>> {
    const { URL_LOGIN_SISTEMFR, URL_HOME_SISTEMFR, URL_LOGIN_FAIL_SISTEMFR } = process.env

    const response = await loggedPostRequest({ url: URL_LOGIN_SISTEMFR, body: credentials, cookie })
    
    if (response.request.res.responseUrl === URL_LOGIN_FAIL_SISTEMFR) {
        return {
            success: false,
            error: new LoginError("Dados não encontrados!", HttpStatusCodes.UNAUTHORIZED)
        }
    }

    if (response.request.res.responseUrl !== URL_HOME_SISTEMFR) {
        return {
            success: false, 
            error: new LoginError("Login não realizado", HttpStatusCodes.FORBIDDEN)
        }
    }

    return {
        success: true,
        data: { cookie }
    }
}

async function setCookieLoginForm(): Promise<Result<Cookie>> {
    try {
        const response = await getRequest(process.env.URL_FORM_LOGIN_SISTEMFR)

        return {
            success: true,
            data: { cookie: response.headers['set-cookie'][0].split(';')[0]}
        }
    } catch (error) {
        console.error('Erro ao obter o cookie do formulário de login:', error)
        return {
            success: false,
            error
        }
    }
}

export async function getCookieLoginService(windows: iWindows, credentials?: credential): Promise<Result<Cookie>> {

    const resultCookie = await setCookieLoginForm()

    if (resultCookie.success === true) {
        const resultLogin = await login(resultCookie.data.cookie, credentials)

        if (resultLogin.success === false)
            return resultLogin

        return resultLogin
    }

    return resultCookie
}