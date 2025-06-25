import { AxiosResponse } from "axios"
import { JSDOM } from "jsdom"

export function extrairDadosRequisicaoClienteHtml(response: AxiosResponse<any, any>) {

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