import { AxiosResponse } from "axios"
import { JSDOM } from "jsdom"

import { extractValueFromSelectClienteForm } from "./extractValueFromSelectProcessForm"

export type FieldsClienteData = {
    parceiro: string,
    localAtendido: string,
    cidade: string,
    estado: string,
    situacao: string,
}

export function extrairDadosRequisicaoClienteHtml(response: AxiosResponse<any, any>) {

    const fieldsClienteForm: FieldsClienteData = {
        parceiro: "#idFornecedor",
        localAtendido: "#idLocalAtendido",
        cidade: "#lstCidade",
        estado: "#lstEstado",
        situacao: "#idSituacao",
    }

    const dom = new JSDOM(response.data)

    const { cidade, estado, localAtendido, parceiro, situacao } = extractValueFromSelectClienteForm(dom, fieldsClienteForm)

    const dataClient = {
        nome: dom.window.document.querySelector("#apelido").getAttribute("value")?.toUpperCase()?.trim(),
        cpf: dom.window.document.querySelector("#cpf").getAttribute("value"),
        parceiro,
        localAtendido,
        cidade,
        estado,
        situacao
    }

    return dataClient
}