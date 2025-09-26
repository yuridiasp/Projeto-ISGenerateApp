import { AxiosResponse } from "axios"

import { Result } from "@models/result/result"
import { objectID, successfulCreationRequestValidation } from "@utils/request/successfulCreationRequestValidation"
import { getTarefaCreatedId } from "@services/tarefas/index"

export function isTarefaSuccessfullyCreated(response: AxiosResponse<any, any>): Result<objectID> {
    const validUrl = "msg=add"

    return successfulCreationRequestValidation(response, validUrl, getTarefaCreatedId)
}