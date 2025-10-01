import { loggedGetRequest } from "@utils/request/getRequest"
import { extrairDadosRequisicaoProcessoColetivoDemaisEnvolvidosHtml } from "@services/processos"
import { iProcesso } from "@models/processos"
import { getIdClienteByCPF } from "@services/clientes"

export async function getIdsProcessoColetivo (cookie: string, dataProcesso: { idCliente: string, processo: iProcesso }) {
    const { URL_GET_DEMAIS_ENVOLVIDOS_COLETIVO } = process.env

    const url = `${URL_GET_DEMAIS_ENVOLVIDOS_COLETIVO}${dataProcesso.processo.id}`

    const response = await loggedGetRequest({ url, cookie })

    const cpfsDemaisEnvolvidos = await extrairDadosRequisicaoProcessoColetivoDemaisEnvolvidosHtml(response)

    return await Promise.all(cpfsDemaisEnvolvidos.map(async cpf => await getIdClienteByCPF(cpf, cookie)))
}