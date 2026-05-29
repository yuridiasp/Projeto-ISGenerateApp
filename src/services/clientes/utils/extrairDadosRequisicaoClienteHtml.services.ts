import { AxiosResponse } from "axios"
import { JSDOM } from "jsdom"

import { extractValueFromSelectClienteForm } from "@services/clientes"
import { iDataCliente } from "@models/clientes"

export type FieldsClienteData = {
    parceiro: string,
    localAtendido: string,
    cidade: string,
    estado: string,
    situacao: string,
}

export function extrairDadosRequisicaoClienteHtml(response: AxiosResponse<any, any>): iDataCliente {

    const fieldsClienteForm: FieldsClienteData = {
        parceiro: "#idFornecedor",
        localAtendido: "#idLocalAtendido",
        cidade: "#lstCidade",
        estado: "#lstEstado",
        situacao: "#idSituacao",
    }

    const dom = new JSDOM(response.data)

    const { cidade, estado, localAtendido, parceiro, situacao } = extractValueFromSelectClienteForm(dom, fieldsClienteForm)

    const dataClient: iDataCliente = {
        id: null,
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