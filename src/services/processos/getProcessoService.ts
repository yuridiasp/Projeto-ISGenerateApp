import { AxiosResponse } from "axios"
import { JSDOM } from "jsdom"

import { loggedGetRequest } from "../../utils/request/getRequest"
import { getCadastroProcesso } from "./getCadatroProcessoService"
import { iProcesso } from "../../models/processo/iProcesso"
import { getIdClienteByCPF } from "../clientes/getClienteService"

function extrairDadosRequisicaoProcessoHtml(response: AxiosResponse<any, any>) {

    const dom = new JSDOM(response.data)

    const selectAcaoColetiva: HTMLSelectElement = dom.window.document.querySelector("#acaoColetiva")
    const indexAcaoColetiva = selectAcaoColetiva.selectedIndex
    const acaoColetiva = indexAcaoColetiva === -1 ? "" : selectAcaoColetiva.options[indexAcaoColetiva].textContent.toUpperCase()
    
    const selectResponsavelProcesso: HTMLSelectElement = dom.window.document.querySelector("#idResponsavel")
    const indexResponsavelProcesso = selectResponsavelProcesso.selectedIndex
    const responsavel = indexResponsavelProcesso === -1 ? "" : selectResponsavelProcesso.options[indexResponsavelProcesso].textContent.toUpperCase()
    
    const selectNaturezaProcesso: HTMLSelectElement = dom.window.document.querySelector("#idNatureza")
    const indexNaturezaProcesso = selectNaturezaProcesso.selectedIndex
    const natureza = indexNaturezaProcesso === -1 ? "" : selectNaturezaProcesso.options[indexNaturezaProcesso].textContent.toUpperCase()
    
    const selectMeritoProcesso: HTMLSelectElement = dom.window.document.querySelector("#idMerito")
    const indexMeritoProcesso = selectMeritoProcesso.selectedIndex
    const merito = indexMeritoProcesso === -1 ? "" : selectMeritoProcesso.options[indexMeritoProcesso].textContent.toUpperCase()
    
    const selectCidadeProcesso: HTMLSelectElement = dom.window.document.querySelector("#lstCidade")
    const indexCidadeProcesso = selectCidadeProcesso.selectedIndex
    const cidade = indexCidadeProcesso === -1 ? "" : selectCidadeProcesso.options[indexCidadeProcesso].textContent.toUpperCase()
    
    const selectEstadoProcesso: HTMLSelectElement = dom.window.document.querySelector("#lstEstado")
    const indexEstadoProcesso = selectEstadoProcesso.selectedIndex
    const estado = indexEstadoProcesso === -1 ? "" : selectEstadoProcesso.options[indexEstadoProcesso].value.toUpperCase()
    
    const selectVaraProcesso: HTMLSelectElement = dom.window.document.querySelector("#idVara")
    const indexVaraProcesso = selectVaraProcesso.selectedIndex
    const vara = indexVaraProcesso === -1 ? "" : selectVaraProcesso.options[indexVaraProcesso].textContent.toUpperCase()
    
    const idClienteInput: HTMLInputElement = dom.window.document.querySelector("#fdt-form > input[type=hidden]:nth-child(2)")
    const idProcessoInput: HTMLInputElement = dom.window.document.querySelector("#fdt-form > input[type=hidden]:nth-child(1)")
    const numeroProcessoInput: HTMLInputElement = dom.window.document.querySelector("#numero")
    const reuInput: HTMLInputElement = dom.window.document.querySelector("#nomeReu")
    
    const dataProcesso: iProcesso = {
        id: idProcessoInput.value.toUpperCase(),
        origem: numeroProcessoInput.value.toUpperCase(),
        reu: reuInput.value.toUpperCase(),
        responsavel,
        natureza,
        merito,
        cidade,
        estado,
        vara,
        acaoColetiva
    }

    return { idCliente: idClienteInput.value.toUpperCase(), processo: dataProcesso }
}

async function extrairDadosRequisicaoProcessoColetivoDemaisEnvolvidosHtml(response: AxiosResponse<any, any>) {
    let demaisEnvolvidos: string[] = []

    const dom = new JSDOM(response.data)

    const tableRows = dom.window.document.querySelectorAll("#demaisEnvolvidos > div > table > tbody > tr > td:nth-child(4)")

    if (tableRows.length) {
        demaisEnvolvidos = Array.from(tableRows).map(tr => tr.textContent)
    }

    return demaisEnvolvidos
}

async function getIdsProcessoColetivo (cookie: string, dataProcesso: { idCliente: string, processo: iProcesso }) {
    const { URL_GET_DEMAIS_ENVOLVIDOS_COLETIVO } = process.env

    const url = `${URL_GET_DEMAIS_ENVOLVIDOS_COLETIVO}${dataProcesso.processo.id}`

    const response = await loggedGetRequest({ url, cookie })

    const cpfsDemaisEnvolvidos = await extrairDadosRequisicaoProcessoColetivoDemaisEnvolvidosHtml(response)

    return await Promise.all(cpfsDemaisEnvolvidos.map(async cpf => await getIdClienteByCPF(cpf, cookie)))
}

async function requestDataProcesso(id: string, cookie: string) {
    const { URL_GET_PROCESSO_SISTEMFR } = process.env
    
    const url = `${URL_GET_PROCESSO_SISTEMFR}${id}`

    const response = await loggedGetRequest({ url, cookie })

    const dataProcesso = extrairDadosRequisicaoProcessoHtml(response)

    if (dataProcesso.processo.acaoColetiva === "COLETIVA") {
        dataProcesso.processo.idsCopias = await getIdsProcessoColetivo(cookie, dataProcesso)
    }

    return dataProcesso
}


function getIdProcesso(url: string) {
    return url.split("idPR=")[1]
}

export async function buscarDadosProcesso({ processo, cookie }: { processo: string, cookie: string }) {
    const { url } = await getCadastroProcesso(processo, cookie)
    const id = getIdProcesso(url)

    return await requestDataProcesso(id, cookie)
}