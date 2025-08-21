import { AxiosResponse } from "axios"
import { JSDOM } from "jsdom"

import { DataProcesso, extractValueFromSelectProcessForm } from "@services/processos/index"

export type FieldsProcessData = {
    acaoColetiva: string
    responsavel: string
    natureza: string
    merito: string
    cidade: string
    estado: string
    vara: string
}

export function extrairDadosRequisicaoProcessoHtml(response: AxiosResponse<any, any>): DataProcesso {

    const dom = new JSDOM(response.data)

    const fieldsProcessForm: FieldsProcessData = {
        acaoColetiva: "#acaoColetiva",
        responsavel: "#idResponsavel",
        natureza: "#idNatureza",
        merito: "#idMerito",
        cidade: "#lstCidade",
        estado: "#lstEstado",
        vara: "#idVara",
    }

    const { acaoColetiva, cidade, estado, merito, natureza, responsavel, vara } = extractValueFromSelectProcessForm(dom, fieldsProcessForm)
    
    const idClienteInput: HTMLInputElement = dom.window.document.querySelector("#fdt-form > input[type=hidden]:nth-child(2)")
    const idProcessoInput: HTMLInputElement = dom.window.document.querySelector("#fdt-form > input[type=hidden]:nth-child(1)")
    const numeroProcessoInput: HTMLInputElement = dom.window.document.querySelector("#numero")
    const reuInput: HTMLInputElement = dom.window.document.querySelector("#nomeReu")

    return {
        idCliente: idClienteInput.value,
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