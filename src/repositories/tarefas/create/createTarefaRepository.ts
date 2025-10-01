import dotEnv from 'dotenv'

import { iCreateTarefa } from "@models/tarefas"
import { loggedPostRequest } from "@utils/request/postRequest"
import { isTarefaSuccessfullyCreated } from '@services/tarefas'
import { objectID } from '@utils/request/successfulCreationRequestValidation'

dotEnv.config()

type tcreateTarefaRepositoryResult = { success: true, data: objectID } | { success: false, body: iCreateTarefa }

export async function createTarefaRepository({ body, cookie } :{ body: iCreateTarefa, cookie: string }): Promise<tcreateTarefaRepositoryResult> {

    const { URL_CREATE_TAREFA_SISTEMFR } = process.env

    const response =  await loggedPostRequest({ url: URL_CREATE_TAREFA_SISTEMFR, body, cookie })

    const result = isTarefaSuccessfullyCreated(response)

    if (result.success === false) {
        return { success: false, body }
    }

    return { success: true, data: result.data }
}