import dotEnv from 'dotenv'

import { iCreateTarefa } from "@models/tarefa/iCreateTarefa"
import { loggedPostRequest } from "@utils/request/postRequest"
import { isTarefaSuccessfullyCreated } from '@services/tarefas/utils/isTarefaSuccessfullyCreated'

dotEnv.config()

export async function createTarefaRepository({ body, cookie } :{ body: iCreateTarefa, cookie: string }) {

    const { URL_CREATE_TAREFA_SISTEMFR } = process.env

    const response =  await loggedPostRequest({ url: URL_CREATE_TAREFA_SISTEMFR, body, cookie })

    return isTarefaSuccessfullyCreated(response)
}