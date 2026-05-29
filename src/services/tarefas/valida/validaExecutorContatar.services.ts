import { requererTarefasContatar, selectExecutorContatarJudicial } from "@services/tarefas/index"

export async function validaExecutorContatar (dataParaFinalizacao: Date, estadoProcesso: string, localAtendido: string, parceiro: string, vara: string, cookie: string) {

    const colaboradores = await Promise.all(await requererTarefasContatar(dataParaFinalizacao, estadoProcesso, localAtendido, parceiro, vara, cookie))
    
    const responsavelExecutorContatar = selectExecutorContatarJudicial(colaboradores, localAtendido, estadoProcesso)
    
    return responsavelExecutorContatar
}