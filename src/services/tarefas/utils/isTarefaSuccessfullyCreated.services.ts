import { AxiosResponse } from "axios"

import { Result } from "@models/results/result.models"
import { objectID, successfulCreationRequestValidation } from "@utils/request/successfulCreationRequestValidation.utils"
import { getTarefaCreatedId } from "@services/tarefas"

export function isTarefaSuccessfullyCreated(response: AxiosResponse<any, any>): Result<objectID> {
    const validUrl = "msg=add"
    
    return successfulCreationRequestValidation(response.request.res.responseUrl, validUrl, getTarefaCreatedId)
}