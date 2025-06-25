import { removeAcentuacaoString } from "@utils/textFormatting/textFormatting"
import { iTarefa } from "@models/tarefa/iTarefa"
import { Cliente } from "@models/cliente/Cliente"
import { validaEsferaProcesso, validaExecutorContatar, validaResponsavelTj, validaResponsavelFederal } from "@services/tarefas/index"

export async function getResponsavelExecutor(tarefa: iTarefa, cliente: Cliente, cookie: string) {

    const isTaskCalculo = removeAcentuacaoString(cliente.compromisso.tipoCompromisso).includes("CALCULO") && removeAcentuacaoString(tarefa.descricao).includes("CALCULO")
    const isTaskContatar = tarefa.descricao == "CONTATAR CLIENTE"
    const isTaskLembrar = tarefa.descricao == "LEMBRAR CLIENTE"
    const isTaskWhatsapp = tarefa.descricao == "SMS E WHATSAPP"
    const isDFOrGO = cliente.processo.estado === "DF" || cliente.processo.estado === "GO"

    if ((isTaskContatar || isTaskLembrar) || (isDFOrGO && (isTaskContatar || isTaskLembrar)) || isTaskCalculo) {
        const responsavelExecutorContatar = validaExecutorContatar(tarefa, cliente, cookie) //TODO: Implementar algum jeito de obter um objeto Date referente a data de execução da tarefa
        return responsavelExecutorContatar
    }

    const isEstadualProcess = validaEsferaProcesso(cliente)

    const responsavelExecutor = isEstadualProcess ? validaResponsavelTj(tarefa.descricao, cliente, cliente.processo.origem.length) : validaResponsavelFederal(tarefa.descricao, cliente, cliente.processo.origem.length)

    return responsavelExecutor
}