import { AxiosResponse } from "axios"
import { JSDOM } from "jsdom"

import { loggedGetRequest } from "../../utils/request/getRequest"
import { loggedPostRequest } from "src/utils/request/postRequest"

function extrairIdBuscaClienteByCPFHtml(response: AxiosResponse<any, any>) {
    const dom = new JSDOM(response.data)

    const a: HTMLAnchorElement = dom.window.document.querySelector("body > section > section > div.fdt-espaco > div > div.fdt-pg-conteudo > div.table-responsive > table > tbody > tr > td.fdt-acao > div > div > a:nth-child(1)")

    return a.href.split('idPK=')[1]
}

function extrairDadosRequisicaoClienteHtml(response: AxiosResponse<any, any>) {

    const dom = new JSDOM(response.data)
    
    const selectParceiro: HTMLSelectElement = dom.window.document.querySelector("#idFornecedor")
    const indexParceiro = selectParceiro.selectedIndex
    const parceiro = indexParceiro === -1 ? "" : selectParceiro.options[indexParceiro].innerText.toUpperCase()

    const selectLocalAtendido: HTMLSelectElement = dom.window.document.querySelector("#idLocalAtendido")
    const indexLocalAtendido = selectLocalAtendido.selectedIndex
    const localAtendido = indexLocalAtendido === -1 ? "" : selectLocalAtendido.options[indexLocalAtendido].innerText.toUpperCase()

    const selectCidade: HTMLSelectElement = dom.window.document.querySelector("#lstCidade")
    const indexCidade = selectCidade.selectedIndex
    const cidade = indexCidade === -1 ? "" : selectCidade.options[indexCidade].innerText.toUpperCase()

    const selectEstado: HTMLSelectElement = dom.window.document.querySelector("#lstEstado")
    const indexEstado = selectEstado.selectedIndex
    const estado = indexEstado === -1 ? "" : selectEstado.options[indexEstado].value.toUpperCase()

    const selectSituacao: HTMLSelectElement = dom.window.document.querySelector("#idSituacao")
    const indexSituacao = selectSituacao.selectedIndex
    const situacao = indexSituacao === -1 ? "" : selectSituacao.options[indexSituacao].innerText.toUpperCase()
    
    const nomeClienteInput: HTMLInputElement = dom.window.document.querySelector("#apelido")
    const cpfInput: HTMLInputElement = dom.window.document.querySelector("#cpf")

    const dataClient = {
        nome: nomeClienteInput.value.toUpperCase(),
        cpf: cpfInput.value.toUpperCase(),
        parceiro,
        localAtendido,
        cidade,
        estado,
        situacao
    }

    return dataClient

}

async function requestDataClienteByID(id: string, cookie: string) {
    const { URL_GET_CLIENTE_SISTEMFR } = process.env

    const url = `${URL_GET_CLIENTE_SISTEMFR}${id}`
    
    const response = await loggedGetRequest({ url, cookie })

    return extrairDadosRequisicaoClienteHtml(response)
}

async function requestDataClienteByCPF(cpf: string, cookie: string) {
    const { URL_FORM_SEARCH_CLIENTE_SISTEMFR } = process.env

    const body = {
        bsAdvClientes: 's',
        bsAdvClientesCPF: cpf,
        filtrar: 'Filtrar'
    }
    
    const response = await loggedPostRequest({ url: URL_FORM_SEARCH_CLIENTE_SISTEMFR, body, cookie })

    return extrairIdBuscaClienteByCPFHtml(response)
}


export async function getClienteByID(id: string, cookie: string) {
    const cliente = await requestDataClienteByID(id, cookie)

    return { id, ...cliente }
}

export async function getIdClienteByCPF(id: string, cookie: string) {
    const idCliente = await requestDataClienteByCPF (id, cookie)

    return idCliente
}