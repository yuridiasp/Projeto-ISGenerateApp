import { Cliente } from "@models/cliente/Cliente"
import { getSelectsTask } from "@services/seletores/seletoresService"
import { createBodyForCreateTask, createTarefaRepository } from "@repositories/tarefas/index"
import { objectID } from "@utils/request/successfulCreationRequestValidation"
import { AppError } from "@models/errors/appError"
import { Result } from "@models/result/result"
import { createEntityKorbilError } from "@models/errors/createEntityKorbilError"
import { iCreateTarefa } from "@models/tarefa/iCreateTarefa"
import { iCompromissoBody } from "@models/compromisso/iCompromissoBody"
import { errorsCodeList } from "@helpers/errorsCode"

export type tSuccessfulRecordCount = {
    successfulRecordCount: number,
    registeredSuccessfully: objectID[],
    failedRegistry: AppError[]
}

export type tResultCreateService = {
    resultCreationTasks: tSuccessfulRecordCount,
    bodys: iCreateTarefa[] | iCompromissoBody[]
}

export async function createTaskService(cliente: Cliente, cookie: string): Promise<Result<tResultCreateService>> {

    const successfulRecordCountInit: tSuccessfulRecordCount = {
        successfulRecordCount: 0,
        registeredSuccessfully: [],
        failedRegistry: [],
    }

    const { colaboradores, tiposTarefas } = await getSelectsTask(cookie)
    
    const bodys = createBodyForCreateTask({ cliente, colaboradores, tiposTarefas, cookie })
    
    const responses = await Promise.all(bodys.map(body => createTarefaRepository({ body, cookie })))

    const resultCreationTasks: tSuccessfulRecordCount = responses.reduce((previous, current) => {
        if(current.success === true) {
            previous.successfulRecordCount++
            previous.registeredSuccessfully.push(current.data)
        } else {
            previous.failedRegistry.push(current.error)
        }
        return previous
    }, successfulRecordCountInit)
    
    const success = responses.length === resultCreationTasks.successfulRecordCount

    if (success)
        return {
            success,
            data: { resultCreationTasks, bodys }
        }

    return {
        success: false,
        error: new createEntityKorbilError(errorsCodeList.createTaskError, "Algumas tarefas não foram registradas.", resultCreationTasks)
    }
}