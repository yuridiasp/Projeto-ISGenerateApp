import { AxiosResponse } from "axios"
import { Result } from "../../../models/result/result"
import { getTarefaCreatedId } from "./getTarefaCreatedId"
import { successfulCreationRequestValidation } from "../../../utils/successfulCreationRequestValidation"

export type idTarefa = { id: string }

export function isTarefaSuccessfullyCreated(response: AxiosResponse<any, any>): Result<idTarefa> {
    const validUrl = "msg=add"

    return successfulCreationRequestValidation(response, validUrl, getTarefaCreatedId)
}