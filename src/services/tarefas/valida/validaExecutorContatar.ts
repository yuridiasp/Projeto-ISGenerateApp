import { Cliente } from "@models/cliente/Cliente"
import { requererTarefasContatar, selectExecutorContatarJudicial } from "@services/tarefas/index"

export async function validaExecutorContatar (dataParaFinalizacao: Date, cliente: Cliente, cookie: string) {

    const colaboradores = await Promise.all(await requererTarefasContatar(dataParaFinalizacao, cliente, cookie))
    
    const responsavelExecutorContatar = selectExecutorContatarJudicial(colaboradores, cliente)
    
    return responsavelExecutorContatar
}