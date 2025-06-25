import { AxiosResponse } from "axios"
import { JSDOM } from "jsdom"

import { DataProcesso, extractValueFromSelect } from "@services/processos/index"

export function extrairDadosRequisicaoProcessoHtml(response: AxiosResponse<any, any>): DataProcesso {

    const dom = new JSDOM(response.data)

    const fields = {
        acaoColetiva: "#acaoColetiva",
        responsavel: "#idResponsavel",
        natureza: "#idNatureza",
        merito: "#idMerito",
        cidade: "#lstCidade",
        estado: "#lstEstado",
        vara: "#idVara",
    }

    extractValueFromSelect(dom, fields)

    const selectAcaoColetiva: HTMLSelectElement = dom.window.document.querySelector("#acaoColetiva")
    const acaoColetiva = selectAcaoColetiva.selectedIndex === -1 ? "" : selectAcaoColetiva.options[selectAcaoColetiva.selectedIndex].textContent.toUpperCase()
    
    const selectResponsavelProcesso: HTMLSelectElement = dom.window.document.querySelector("#idResponsavel")
    const responsavel = selectResponsavelProcesso.selectedIndex === -1 ? "" : selectResponsavelProcesso.options[selectResponsavelProcesso.selectedIndex].textContent.toUpperCase()
    
    const selectNaturezaProcesso: HTMLSelectElement = dom.window.document.querySelector("#idNatureza")
    const natureza = selectNaturezaProcesso.selectedIndex === -1 ? "" : selectNaturezaProcesso.options[selectNaturezaProcesso.selectedIndex].textContent.toUpperCase()
    
    const selectMeritoProcesso: HTMLSelectElement = dom.window.document.querySelector("#idMerito")
    const merito = selectMeritoProcesso.selectedIndex === -1 ? "" : selectMeritoProcesso.options[selectMeritoProcesso.selectedIndex].textContent.toUpperCase()
    
    const selectCidadeProcesso: HTMLSelectElement = dom.window.document.querySelector("#lstCidade")
    const cidade = selectCidadeProcesso.selectedIndex === -1 ? "" : selectCidadeProcesso.options[selectCidadeProcesso.selectedIndex].textContent.toUpperCase()
    
    const selectEstadoProcesso: HTMLSelectElement = dom.window.document.querySelector("#lstEstado")
    const estado = selectEstadoProcesso.selectedIndex === -1 ? "" : selectEstadoProcesso.options[selectEstadoProcesso.selectedIndex].value.toUpperCase()
    
    const selectVaraProcesso: HTMLSelectElement = dom.window.document.querySelector("#idVara")
    const vara = selectVaraProcesso.selectedIndex === -1 ? "" : selectVaraProcesso.options[selectVaraProcesso.selectedIndex].textContent.toUpperCase()
    
    const idClienteInput: HTMLInputElement = dom.window.document.querySelector("#fdt-form > input[type=hidden]:nth-child(2)")
    const idProcessoInput: HTMLInputElement = dom.window.document.querySelector("#fdt-form > input[type=hidden]:nth-child(1)")
    const numeroProcessoInput: HTMLInputElement = dom.window.document.querySelector("#numero")
    const reuInput: HTMLInputElement = dom.window.document.querySelector("#nomeReu")

    return {
        idCliente: idClienteInput.value.toUpperCase(),
        processo: {
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
    }
}