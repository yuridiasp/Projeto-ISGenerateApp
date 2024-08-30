require('dotenv').config()
const axios = require('axios')
const { LoginError } = require('../../utils/errors/LoginError')
const statusCode = require('../../utils/request/statusCode')
const { loggedPostRequest } = require('../../utils/request/postRequest')

async function login(cookie) {
    const { URL_LOGIN_SISTEMFR, LOGIN, SENHA, URL_HOME_SISTEMFR, URL_LOGIN_FAIL_SISTEMFR } = process.env

    const credentials = {
        login: LOGIN,
        senha: SENHA
    }

    const response = await loggedPostRequest({ url: URL_LOGIN_SISTEMFR, body: credentials, cookie })

    if (response.request.res.responseUrl === URL_LOGIN_FAIL_SISTEMFR) {
        throw new LoginError("Dados não encontrados!", statusCode.UNAUTHORIZED)
    }

    if (response.request.res.responseUrl !== URL_HOME_SISTEMFR) {
        throw new LoginError("Login não realizado", statusCode.FORBIDDEN)
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

async function getCookieLoginSistemFR() {

    try {
        const cookie = await setCookieLoginForm()

        await login(cookie)

        return cookie
    } catch (error) {
        console.log(error)
        return null
    }
}

module.exports = { getCookieLoginSistemFR }