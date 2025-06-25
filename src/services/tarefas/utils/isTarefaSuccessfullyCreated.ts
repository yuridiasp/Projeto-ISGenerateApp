import { AxiosResponse } from "axios"

import { Result } from "@models/result/result"
import { successfulCreationRequestValidation } from "@utils/successfulCreationRequestValidation"
import { getTarefaCreatedId } from "@services/tarefas/index"

export type idTarefa = { id: string }

export function isTarefaSuccessfullyCreated(response: AxiosResponse<any, any>): Result<idTarefa> {
    const validUrl = "msg=add"

    return successfulCreationRequestValidation(response, validUrl, getTarefaCreatedId)
}