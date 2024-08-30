require("dotenv").config()

const { loggedPostRequest } = require("../../utils/request/postRequest")

async function createCompromisso(body, cookie) {

    const { URL_CREATE_COMPROMISSO_SISTEMFR } = process.env

    return await loggedPostRequest({ url: URL_CREATE_COMPROMISSO_SISTEMFR, body, cookie })
}

module.exports = { createCompromisso }