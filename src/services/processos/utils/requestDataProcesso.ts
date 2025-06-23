import { loggedGetRequest } from "../../../utils/request/getRequest"
import { extrairDadosRequisicaoProcessoHtml } from "./extrairDadosRequisicaoProcessoHtml"
import { getIdsProcessoColetivo } from "../index"

export async function requestDataProcesso(id: string, cookie: string) {
    const { URL_GET_PROCESSO_SISTEMFR } = process.env
    
    const url = `${URL_GET_PROCESSO_SISTEMFR}${id}`

    const response = await loggedGetRequest({ url, cookie })

    const dataProcesso = extrairDadosRequisicaoProcessoHtml(response)

    if (dataProcesso.processo.acaoColetiva === "COLETIVA") {
        dataProcesso.processo.idsCopias = await getIdsProcessoColetivo(cookie, dataProcesso)
    }

    return dataProcesso
}