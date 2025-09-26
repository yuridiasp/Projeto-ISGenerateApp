import { iWindows } from "@models/windows/iWindows"
import { createClienteService } from "../clientes/index"
import { createCompromissoService } from "../compromissos/index"
import { updateViewRegistrationIntimations } from "@utils/viewHelpers/viewHelpers"
import { ISAnalysisDTO } from "@models/cliente/Cliente"
import { getObjectValidateIntimationsService, iFileData } from "../validateIntimations/validateIntimationsService"
import { createTaskService, tResultCreateService } from "../tarefas"
import { EmptyFileError } from "@models/errors/emptyFileError"
import { getSelectsTask } from "@services/seletores/seletoresService"
import { taskFactory } from "@services/tarefas/create/taskFactory"
import { getListaTarefasCompromissoJudicial } from "@services/tarefas/get/getListaTarefasCompromissoJudicial"
import { Result } from "@models/result/result"
import { RecordResultsWithError } from "@models/errors/recordResultsWithError"

export async function handleIntimationsRegistrationService(windows: iWindows, cookie: string, file: iFileData): Promise<Result<tResultCreateService[]>> {
    const result = await getObjectValidateIntimationsService(file)
    
    if (result.success === false) {
        return {
            success: false,
            error: result.error
        }
    }

    if(!result.data.file.length) {
        return {
            success: false,
            error: new EmptyFileError()
        }
    }

    const { tiposTarefas } = await getSelectsTask(cookie)

    const resultados = await Promise.all(result.data.file.map((intimation: ISAnalysisDTO) =>
        createClienteService({ ...intimation }, cookie)
            .then(async cliente => {
                const resultCompromisso = await createCompromissoService(cliente, cookie)

                if (resultCompromisso.success === false) {
                    return resultCompromisso
                }

                cliente.compromisso.id = resultCompromisso.data.resultCreationTasks.registeredSuccessfully[0].id

                const listaTarefasCompromisso = getListaTarefasCompromissoJudicial(cliente)

                cliente.compromisso.quantidadeTarefas = listaTarefasCompromisso.length

                cliente.compromisso.tarefas = await taskFactory(cliente, listaTarefasCompromisso, cookie, tiposTarefas)

                return await createTaskService(cliente, cookie)
            })
            .then(resultadoCadastro => {

                if (resultadoCadastro.success !== false) {
                    updateViewRegistrationIntimations(resultadoCadastro, windows.mainWindow)
                }

                return resultadoCadastro
            })
    ))

    const isError = resultados.find(resultado => !resultado.success)

    if (!!isError) {
        return {
            success: false,
            error: new RecordResultsWithError()
        }
    }

    return { success: true, data: [] }
}