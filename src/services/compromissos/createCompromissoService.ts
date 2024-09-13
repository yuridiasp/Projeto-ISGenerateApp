require("dotenv").config()

import { loggedPostRequest } from "../../utils/request/postRequest"
import { iCompromissoBody } from "src/models/compromisso/iCompromissoBody"

export async function createCompromisso(body: iCompromissoBody, cookie: string) {

    const { URL_CREATE_COMPROMISSO_SISTEMFR } = process.env

    return await loggedPostRequest({ url: URL_CREATE_COMPROMISSO_SISTEMFR, body, cookie })
}