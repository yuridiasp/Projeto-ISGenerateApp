import { getSelectsTask } from "../../../services/seletores/seletoresService"
import { createBodyForCreateTask } from "../../../repositories/tarefas/create/createBodyForCreateTask"
import { createTarefaRepository } from "../../../repositories/tarefas/create/createTarefaRepository"
import { Cliente } from "../../../models/cliente/Cliente"

export async function createTaskService(cliente: Cliente, cookie: string) {

    const { colaboradores, tiposTarefas } = await getSelectsTask(cookie)
    
    const bodys = await createBodyForCreateTask({ cliente, colaboradores, tiposTarefas, cookie })

    const responses = await Promise.all(bodys.map(body => createTarefaRepository({ body, cookie })))

    return responses
}