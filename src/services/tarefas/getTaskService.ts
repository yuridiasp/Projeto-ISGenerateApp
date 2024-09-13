require("dotenv").config()

import { iTarefaBusca } from "../../models/tarefa/iTarefaBusca"
import { loggedPostRequest } from "../../utils/request/postRequest"

export async function getTarefa({
    bsAdvTarefas = 's',
    bsAdvTarefasResponsavel = '',
    bsAdvTarefasExecutor,
    bsAdvTarefasDe,
    bsAdvTarefasAte,
    bsAdvTarefasTecnica = '',
    bsAdvTarefasTipo = '',
    bsAdvTarefasStatus = 'p',
    bsAdvTarefasPauta = '',
    bsAdvTarefasCliente = '',
    bsAdvTarefasPreProcesso = '',
    bsAdvTarefasCpf = '',
    bsAdvTarefasCompromisso = '',
    filtrar = 'Filtrar', cookie }: iTarefaBusca) {
    
    const { URL_GET_TAREFAS_SISTEMFR } = process.env

    const body = {
        bsAdvTarefas,
        bsAdvTarefasResponsavel,
        bsAdvTarefasDe,
        bsAdvTarefasAte,
        bsAdvTarefasTecnica,
        bsAdvTarefasTipo,
        bsAdvTarefasStatus,
        bsAdvTarefasPauta,
        bsAdvTarefasCliente,
        bsAdvTarefasPreProcesso,
        bsAdvTarefasCpf,
        bsAdvTarefasCompromisso,
        filtrar,
        bsAdvTarefasExecutor
    }

    return await loggedPostRequest({ url: URL_GET_TAREFAS_SISTEMFR, body, cookie })
}