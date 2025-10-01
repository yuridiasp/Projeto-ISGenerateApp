import { Cliente } from "@models/clientes"
import { getSelectsTask } from "@services/seletores"
import { createBodyForCreateTask, createTarefaRepository } from "@repositories/tarefas"
import { objectID } from "@utils/request/successfulCreationRequestValidation"
import { Result } from "@models/results"
import { createEntityKorbilError } from "@models/errors"
import { iCreateTarefa } from "@models/tarefas"
import { iCompromissoBody } from "@models/compromissos"
import { errorsCodeList } from "@helpers/errorsCode"

export type tSuccessfulRecordCount = {
    successfulRecordCount: number,
    registeredSuccessfully: objectID[],
    failedRegistryTask?: iCreateTarefa[]
    failedRegistryCommitment?: iCompromissoBody
}

export async function createTaskService(cliente: Cliente, cookie: string): Promise<Result<{ successfulRecordCount: tSuccessfulRecordCount}>> {

    const successfulRecordCountInit: tSuccessfulRecordCount = {
        successfulRecordCount: 0,
        registeredSuccessfully: [],
        failedRegistryTask: [],
    }

    const { colaboradores, tiposTarefas } = await getSelectsTask(cookie)
    
    const bodys = createBodyForCreateTask({ cliente, colaboradores, tiposTarefas, cookie })
    
    const responses = await Promise.all(bodys.map(body => createTarefaRepository({ body, cookie })))

    const resultCreationTasks: tSuccessfulRecordCount = responses.reduce((previous, current) => {
        if(current.success === true) {
            previous.successfulRecordCount++
            previous.registeredSuccessfully.push(current.data)
        } else {
            previous.failedRegistryTask.push(current.body)
        }
        return previous
    }, successfulRecordCountInit)
    
    const success = responses.length === resultCreationTasks.successfulRecordCount

    if (success)
        return {
            success,
            data: {
                successfulRecordCount: successfulRecordCountInit
            }
        }

    return {
        success: false,
        error: new createEntityKorbilError(errorsCodeList.createTaskError, "Algumas tarefas não foram registradas.", resultCreationTasks)
    }
}