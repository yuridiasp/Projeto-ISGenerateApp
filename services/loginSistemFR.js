require('dotenv').config()
const axios = require('axios')

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
        console.error('Erro ao obter o cookie do formulário de login:', error);
        throw error;
    }
}

async function getCookieLoginSistemFR() {
    const { URL_LOGIN_SISTEMFR, LOGIN, SENHA, URL_HOME_SISTEMFR } = process.env
    const credentials = {
        login: LOGIN,
        senha: SENHA
    }

    try {
        const cookie = await setCookieLoginForm()
        const response = await axios.post(URL_LOGIN_SISTEMFR, new URLSearchParams(credentials).toString(), {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Cookie': cookie,
                'Connection': 'close'
            },
            withCredentials: true
        })

        if (response.request.res.responseUrl !== URL_HOME_SISTEMFR) {
            throw new Error("Login não realizado")
        }

        return cookie
    } catch (error) {
        console.error('Erro ao realizar login:', error)
        throw error
    }
}

module.exports = { getCookieLoginSistemFR }