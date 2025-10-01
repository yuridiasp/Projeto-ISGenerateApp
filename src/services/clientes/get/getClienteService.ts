import { iDataCliente } from "@models/clientes"
import { Result } from "@models/results"
import { extrairDadosRequisicaoClienteHtml, extrairIdBuscaClienteByCPFHtml } from "@services/clientes"
import { loggedGetRequest } from "@utils/request/getRequest"
import { loggedPostRequest } from "@utils/request/postRequest"
import { RequestValidationURL } from "@utils/request/requestValidation"

export async function getClienteByID(id: string, cookie: string): Promise<Result<{ dataCliente: iDataCliente}>> {
    const { URL_GET_CLIENTE_SISTEMFR } = process.env
    
    const url = `${URL_GET_CLIENTE_SISTEMFR}${id}`
    
    const response = await loggedGetRequest({ url, cookie })

    const isValidResult = RequestValidationURL(response.request.res.responseUrl, url)

    if(isValidResult.success) {
        return {
            success: true,
            data: { dataCliente: extrairDadosRequisicaoClienteHtml(response) }
        }
    }

    return {
        success: false,
        error: isValidResult.error
    }
}

export async function getIdClienteByCPF(cpf: string, cookie: string): Promise<Result<{ idCliente: string }>> {
    const { URL_FORM_SEARCH_CLIENTE_SISTEMFR } = process.env

    const body = {
        bsAdvClientes: 's',
        bsAdvClientesCPF: cpf,
        filtrar: 'Filtrar'
    }
    
    const response = await loggedPostRequest({ url: URL_FORM_SEARCH_CLIENTE_SISTEMFR, body, cookie })

    const isValidResult = RequestValidationURL(response.request.res.responseUrl, URL_FORM_SEARCH_CLIENTE_SISTEMFR)

    if(isValidResult.success) {
        return {
            success: true,
            data: { idCliente: extrairIdBuscaClienteByCPFHtml(response) }
        }
    }

    return {
        success: false,
        error: isValidResult.error
    }
}