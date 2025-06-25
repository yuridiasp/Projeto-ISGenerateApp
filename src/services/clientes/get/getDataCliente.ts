import { loggedGetRequest } from "@utils/request/getRequest"
import { loggedPostRequest } from "@utils/request/postRequest"
import { extrairDadosRequisicaoClienteHtml, extrairIdBuscaClienteByCPFHtml } from "@services/clientes/index"

export async function getDataClienteByID(id: string, cookie: string) {
    const { URL_GET_CLIENTE_SISTEMFR } = process.env

    const url = `${URL_GET_CLIENTE_SISTEMFR}${id}`
    
    const response = await loggedGetRequest({ url, cookie })

    return extrairDadosRequisicaoClienteHtml(response)
}

export async function getDataClienteByCPF(cpf: string, cookie: string) {
    const { URL_FORM_SEARCH_CLIENTE_SISTEMFR } = process.env

    const body = {
        bsAdvClientes: 's',
        bsAdvClientesCPF: cpf,
        filtrar: 'Filtrar'
    }
    
    const response = await loggedPostRequest({ url: URL_FORM_SEARCH_CLIENTE_SISTEMFR, body, cookie })

    return extrairIdBuscaClienteByCPFHtml(response)
}