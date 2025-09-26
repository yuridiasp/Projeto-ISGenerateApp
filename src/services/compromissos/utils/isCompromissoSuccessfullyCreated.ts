import { AxiosResponse } from "axios"
import { Result } from "@models/result/result"
import { getCompromissoCreatedId } from "./getCompromissoCreatedId"
import { objectID, successfulCreationRequestValidation } from "@utils/request/successfulCreationRequestValidation"

export function isCompromissoSuccessfullyCreated(response: AxiosResponse<any, any>): Result<objectID> {
    const validUrl = "http://fabioribeiro.eastus.cloudapp.azure.com/adv/tarefas/formulario"
    
    return successfulCreationRequestValidation(response, validUrl, getCompromissoCreatedId)
}