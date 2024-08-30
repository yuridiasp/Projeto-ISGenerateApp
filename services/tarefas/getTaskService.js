require("dotenv").config()

const { loggedPostRequest } = require("../../utils/request/postRequest")

async function getTarefa({
    bsAdvTarefas = 's',
    bsAdvTarefasResponsavel = '',
    bsAdvTarefasExecutor = [],
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
    filtrar: Filtrar, cookie }) {
    
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
        filtrar: Filtrar,
        bsAdvTarefasExecutor
    }

    await loggedPostRequest({ url: URL_GET_TAREFAS_SISTEMFR, body, cookie })
}

module.exports = { getTarefa }