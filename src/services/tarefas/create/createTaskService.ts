import { Cliente } from "@models/cliente/Cliente"
import { getSelectsTask } from "@services/seletores/seletoresService"
import { createBodyForCreateTask, createTarefaRepository } from "@repositories/tarefas/index"

export async function createTaskService(cliente: Cliente, cookie: string) {

    const { colaboradores, tiposTarefas } = await getSelectsTask(cookie)
    
    const bodys = await createBodyForCreateTask({ cliente, colaboradores, tiposTarefas, cookie })

    const responses = await Promise.all(bodys.map(body => createTarefaRepository({ body, cookie })))

    return responses
}