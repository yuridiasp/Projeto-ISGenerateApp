const { JSDOM } = require("jsdom")

const { loggedGetRequest } = require("../../utils/request/getRequest")

function extrairDadosRequisicaoClienteHtml(response) {

    const dom = new JSDOM(response)
    
    const selectParceiro = dom.window.document.querySelector("#idFornecedor")
    const indexParceiro = selectParceiro.selectedIndex
    const parceiro = indexParceiro === -1 ? "" : selectParceiro.options[indexParceiro].innerText.toUpperCase()

    const selectLocalAtendido = dom.window.document.querySelector("#idLocalAtendido")
    const indexLocalAtendido = selectLocalAtendido.selectedIndex
    const localAtendido = indexLocalAtendido === -1 ? "" : selectLocalAtendido.options[indexLocalAtendido].innerText.toUpperCase()

    const selectCidade = dom.window.document.querySelector("#lstCidade")
    const indexCidade = selectCidade.selectedIndex
    const cidade = indexCidade === -1 ? "" : selectCidade.options[indexCidade].innerText.toUpperCase()

    const selectEstado = dom.window.document.querySelector("#lstEstado")
    const indexEstado = selectEstado.selectedIndex
    const estado = indexEstado === -1 ? "" : selectEstado.options[indexEstado].value.toUpperCase()

    const selectSituacao = dom.window.document.querySelector("#idSituacao")
    const indexSituacao = selectSituacao.selectedIndex
    const situacao = indexSituacao === -1 ? "" : selectSituacao.options[indexSituacao].innerText.toUpperCase()

    const dataClient = {
        nome: dom.window.document.querySelector("#apelido").value.toUpperCase(),
        cpf: dom.window.document.querySelector("#cpf").value.toUpperCase(),
        parceiro,
        localAtendido,
        cidade,
        estado,
        situacao
    }

    return dataClient

}

async function requestDataCliente(id, cookie) {
    const { URL_GET_CLIENTE_SISTEMFR } = process.env

    const url = `${URL_GET_CLIENTE_SISTEMFR}${id}`
    
    const response = await loggedGetRequest({ url, cookie })

    return extrairDadosRequisicaoClienteHtml(response)
}


async function buscarDadosCliente({ id, cookie }) {
    const cliente = await requestDataCliente(id, cookie)

    return { id, ...cliente }
}

module.exports = { buscarDadosCliente }