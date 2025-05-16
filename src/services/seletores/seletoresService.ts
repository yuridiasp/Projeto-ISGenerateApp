import { JSDOM } from "jsdom"
require("dotenv").config()

import { loggedGetRequest } from "../../utils/request/getRequest"
import { AxiosResponse } from "axios"
import { seletores } from "src/models/seletores/iSeletores"

function getTiposSelect(dom: JSDOM, id: string): seletores[] {
    const select: HTMLSelectElement  = dom.window.document.querySelector(id)
    const tiposSelect = Array.from(select.options).map(option => ({ id: option.value, nome: option.textContent.trim() }))
    
    return tiposSelect
}

export async function getSelectsTask(cookie: string) {
    const idSelectTiposColaboradores = "#bsAdvTarefasExecutor"
    const idSelectTiposTarefas = "#bsAdvTarefasTipo"
    const { URL_GET_TAREFAS_SISTEMFR } = process.env
    const response: AxiosResponse<any, any> = await loggedGetRequest({ url: URL_GET_TAREFAS_SISTEMFR, cookie })
    const result = await response.data.text()

    const dom = new JSDOM(result)
    
    const colaboradores = getTiposSelect(dom, idSelectTiposColaboradores)
    const tiposTarefas = getTiposSelect(dom, idSelectTiposTarefas)

    return { colaboradores, tiposTarefas }
}

export async function getSelectsCompromisso(cookie: string) {
    const idSelectTiposCompromissos = "#bsAdvCompromissosTipo"
    const { URL_COMPROMISSOS_SISTEMFR } = process.env
    const response: AxiosResponse<any, any> = await loggedGetRequest({ url: URL_COMPROMISSOS_SISTEMFR, cookie })
    const result = response.data

    const dom = new JSDOM(result)

    const tipoCompromissos = getTiposSelect(dom, idSelectTiposCompromissos)

    return tipoCompromissos
}