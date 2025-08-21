import { AxiosResponse } from "axios"
import { Result } from "@models/result/result"
import { getCompromissoCreatedId } from "./getCompromissoCreatedId"
import { successfulCreationRequestValidation } from "@utils/successfulCreationRequestValidation"

export type idCompromisso = { id: string }

export function isCompromissoSuccessfullyCreated(response: AxiosResponse<any, any>): Result<idCompromisso> {
    const validUrl = "http://fabioribeiro.eastus.cloudapp.azure.com/adv/tarefas/formulario"
    
    return successfulCreationRequestValidation(response, validUrl, getCompromissoCreatedId)
}