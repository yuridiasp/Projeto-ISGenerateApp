import { removeAcentuacaoString } from "@utils/text/textFormatting"
import { Cliente } from "@models/clientes/Cliente"
import { validaEsferaProcesso, validaExecutorContatar, validaResponsavelTj, validaResponsavelFederal } from "@services/tarefas/index"

export async function getResponsavelExecutor(tarefa: string, cliente: Cliente, cookie: string, dataParaFinalizacao: Date) {

    const isTaskCalculo = removeAcentuacaoString(cliente.compromisso.tipoCompromisso).includes("CALCULO") && removeAcentuacaoString(tarefa).includes("CALCULO")
    const isTaskContatar = tarefa == "CONTATAR CLIENTE"
    const isTaskLembrar = tarefa == "LEMBRAR CLIENTE"
    const isTaskWhatsapp = tarefa == "SMS E WHATSAPP"
    const isDFOrGO = cliente.processo.estado === "DF" || cliente.processo.estado === "GO"

    if ((isTaskContatar || isTaskLembrar) || (isDFOrGO && (isTaskContatar || isTaskLembrar)) || isTaskCalculo) {
        const responsavelExecutorContatar = validaExecutorContatar(dataParaFinalizacao, cliente.processo.estado, cliente.localAtendido, cliente.parceiro, cliente.processo.vara, cookie) //TODO: Implementar algum jeito de obter um objeto Date referente a data de execução da tarefa
        return responsavelExecutorContatar
    }

    const isEstadualProcess = validaEsferaProcesso(cliente)

    const responsavelExecutor = isEstadualProcess ? validaResponsavelTj(tarefa, cliente, cliente.processo.origem.length) : validaResponsavelFederal(tarefa, cliente, cliente.processo.origem.length)

    return responsavelExecutor
}