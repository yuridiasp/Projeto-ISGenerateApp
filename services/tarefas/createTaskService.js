require("dotenv").config()

const { loggedPostRequest } = require("../../utils/request/postRequest")

async function createTarefa({ body, cookie }) {

    const { URL_CREATE_TAREFA_SISTEMFR } = process.env

    return await loggedPostRequest({ url: URL_CREATE_TAREFA_SISTEMFR, body, cookie })
}

module.exports = { createTarefa }