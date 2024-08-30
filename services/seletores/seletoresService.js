const { JSDOM } = require("jsdom")
require("dotenv").config()

const { loggedGetRequest } = require("../../utils/request/getRequest")

function getTiposSelect(dom, id) {
    const select = dom.window.document.querySelector(id)
    const tiposSelect = Array.from(select.options).map(option => ({ id: option.value, nome: option.textContent.trim() }))

    return tiposSelect
}

async function getSelectsTask(cookie) {
    const idSelectTiposColaboradores = "#bsAdvTarefasExecutor"
    const idSelectTiposTarefas = "#bsAdvTarefasTipo"
    const { URL_GET_TAREFAS_SISTEMFR } = process.env
    const response = await loggedGetRequest({ url: URL_GET_TAREFAS_SISTEMFR, cookie })
    const result = await response.text()

    const dom = new JSDOM(result)
    
    const colaboradores = getTiposSelect(dom, idSelectTiposColaboradores)
    const tiposTarefas = getTiposSelect(dom, idSelectTiposTarefas)

    return { colaboradores, tiposTarefas }
}

async function getSelectsCompromisso(cookie) {
    const idSelectTiposCompromissos = "#bsAdvCompromissosTipo"
    const { URL_COMPROMISSOS_SISTEMFR } = process.env
    const response = await loggedGetRequest({ url: URL_COMPROMISSOS_SISTEMFR, cookie })
    const result = await response.text()

    const dom = new JSDOM(result)

    const tipoCompromissos = getTiposSelect(dom, idSelectTiposCompromissos)

    return tipoCompromissos
}

module.exports = { getSelectsTask, getSelectsCompromisso }