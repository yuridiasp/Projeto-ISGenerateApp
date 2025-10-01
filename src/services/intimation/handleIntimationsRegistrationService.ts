import { iWindows } from "@models/windows"
import { createClienteService } from "@services/clientes"
import { createCompromissoService } from "@services/compromissos"
import { updateViewRegistrationIntimations } from "@utils/viewHelpers/viewHelpers"
import { ISAnalysisDTO } from "@models/clientes/Cliente"
import { getObjectValidateIntimationsService, iFileData } from "@services/validateIntimations"
import { createTaskService, tSuccessfulRecordCount } from "@services/tarefas"
import { createEntityKorbilError, EmptyFileError } from "@models/errors"
import { getSelectsTask } from "@services/seletores"
import { taskFactory } from "@services/tarefas"
import { getListaTarefasCompromissoJudicial } from "@services/tarefas"
import { Result } from "@models/results"
import { RecordResultsWithError } from "@models/errors"
import { errorsCodeList } from "@helpers/errorsCode"
import { iCompromissoBody } from "@models/compromissos"
import { iCreateTarefa } from "@models/tarefas"
import { AppError } from "@models/errors/appError"
import { objectID } from "@utils/request/successfulCreationRequestValidation"

export type tCreateTaskResult = {
    success: false,
    data?: {
        bodys: {
            compromisso: iCompromissoBody,
            tarefas: iCreateTarefa[]
        }
    },
    error: AppError
} | {
    success: true,
    data: {
        bodys: {
            compromisso: objectID[],
            tarefas: objectID[]
        }
    }
}

export type tHandleIntimation = {
    registered: tCreateTaskResult[],
    unregisteredCommitments: tCreateTaskResult[],
    unregisteredTasks: tCreateTaskResult[]
}

export async function handleIntimationsRegistrationService(windows: iWindows, cookie: string, file: iFileData): Promise<Result<tHandleIntimation>> {
    const result = await getObjectValidateIntimationsService(file)
    
    if (result.success === false) {
        return {
            success: false,
            error: result.error
        }
    }
    console.log(result.data.file)
    if(!result.data.file.length) {
        return {
            success: false,
            error: new EmptyFileError()
        }
    }

    const { tiposTarefas } = await getSelectsTask(cookie)

    const createTaskResult = await Promise.all(result.data.file.map((intimation: ISAnalysisDTO) =>
        createClienteService({ ...intimation }, cookie)
            .then(async (resultCliente): Promise<tCreateTaskResult> => {
                if (resultCliente.success === false)
                    return { success: false, error: resultCliente.error }

                const resultCompromisso = await createCompromissoService(resultCliente.data.cliente, cookie)

                if (resultCompromisso.success === false) {
                    const error = resultCompromisso.error as createEntityKorbilError
                    return {
                        success: false,
                        error: resultCompromisso.error,
                        data: {
                            bodys: {
                                compromisso: error.data.failedRegistryCommitment,
                                tarefas: null
                            }
                        }
                    }
                }

                resultCliente.data.cliente.compromisso.id = resultCompromisso.data.successfulRecordCount.registeredSuccessfully[0].id

                const listaTarefasCompromisso = getListaTarefasCompromissoJudicial(resultCliente.data.cliente)

                resultCliente.data.cliente.compromisso.quantidadeTarefas = listaTarefasCompromisso.length

                resultCliente.data.cliente.compromisso.tarefas = await taskFactory(resultCliente.data.cliente, listaTarefasCompromisso, cookie, tiposTarefas)

                const resultTarefa = await createTaskService(resultCliente.data.cliente, cookie) as Result<tSuccessfulRecordCount>

                if(resultTarefa.success === false) {
                    const error = resultTarefa.error as createEntityKorbilError
                    return {
                        success: false,
                        error: resultTarefa.error,
                        data: {
                            bodys: {
                                compromisso: resultCompromisso.data.successfulRecordCount.failedRegistryCommitment,
                                tarefas: error.data.failedRegistryTask
                            }
                        }
                    }
                }

                return {
                    success: true,
                    data: {
                        bodys: {
                            compromisso: resultCompromisso.data.successfulRecordCount.registeredSuccessfully,
                            tarefas: resultTarefa.data.registeredSuccessfully
                        }
                    }
                }
            })
            .then(resultadoCadastro => {
                if (resultadoCadastro.success !== false) {
                    updateViewRegistrationIntimations(resultadoCadastro, windows.mainWindow)
                }

                return resultadoCadastro
            })
    ))

    const HandleIntimationResult: tHandleIntimation = {
        registered: [],
        unregisteredCommitments: [],
        unregisteredTasks: []
    }

    let containsErrors = false

    const results = createTaskResult.reduce((previous, current) => {
        if(current.success === false) {
            containsErrors = true
            if(current.error.code === errorsCodeList.createCompromissoError) {
                previous.unregisteredCommitments.push(current)
            } else
                previous.unregisteredTasks.push(current)
        } else
            previous.registered.push(current)

        return previous
    }, HandleIntimationResult)

    if (containsErrors) {
        return {
            success: false,
            error: new RecordResultsWithError(createTaskResult)
        }
    }

    return {
        success: true,
        data: results
    }
}