require("dotenv").config()

import { iCreateTarefa } from "../../models/tarefa/iCreateTarefa"
import { loggedPostRequest } from "../../utils/request/postRequest"

export async function createTarefa({ body, cookie } :{ body: iCreateTarefa, cookie: string }) {

    const { URL_CREATE_TAREFA_SISTEMFR } = process.env

    return await loggedPostRequest({ url: URL_CREATE_TAREFA_SISTEMFR, body, cookie })
}