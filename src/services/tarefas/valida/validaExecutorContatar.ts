import { Cliente } from "../../../models/cliente/Cliente"
import { iTarefa } from "../../../models/tarefa/iTarefa"
import { requererTarefasContatar } from "../get/getTarefasColaboradores"
import { selectExecutorContatarJudicial } from "../utils/selectExecutorContatarJudicial"

export async function validaExecutorContatar (tarefa: iTarefa, cliente: Cliente, cookie: string) {

    const colaboradores = await Promise.all(await requererTarefasContatar(tarefa, cliente, cookie))
    
    const responsavelExecutorContatar = selectExecutorContatarJudicial(colaboradores, cliente)
    
    return responsavelExecutorContatar
}