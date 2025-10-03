import { loggedGetRequest } from '../../../src/utils/request/getRequest'

export async function excluirCompromisso(idCompromisso: string, cookie: string) {
    if(!idCompromisso)
        return
    
    const url = process.env.URL_GET_EXCLUIR_COMPROMISSO + idCompromisso

    return await loggedGetRequest({ url, cookie })
}