import { iWindows } from "../../models/windows/iWindows"
import { createCliente } from "../clientes/createClienteService"
import { createCompromissoService } from "../compromissos/index"
import { updateViewRegistrationIntimations } from "../../utils/viewHelpers/viewHelpers"
import { ISAnalysisDTO } from "../../models/cliente/Cliente"
import { getObjectValidateIntimationsService, iFileData } from "../validateIntimations/validateIntimationsService"
import { createTaskService } from "../tarefas"
import { EmptyFileError } from "../../models/errors/emptyFileError"

export async function handleIntimationsRegistrationService(windows: iWindows, cookie: string, file: iFileData) {
    const result = getObjectValidateIntimationsService(file)
    
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

    //TODO: Preencher estrutura de compromisso
    //TODO: Preencher estrutura de cliente
    //TODO: Preencher estrutura de processo
    //TODO: Prencher estrutura de tarefa

    const resultados = await Promise.all(result.data.file.map((intimation: ISAnalysisDTO) =>
        createCliente({ ...intimation }, cookie)
            .then(async cliente => {
                const result = await createCompromissoService(cliente, cookie)

                if (result.success === false) {
                    return {
                        success: false,
                        error: result.error
                    }
                }

                cliente.compromisso.id = result.data.id

                return await createTaskService(cliente, cookie)
            })
            .then(resultadoCadastro => {
                updateViewRegistrationIntimations(resultadoCadastro, windows)

                return resultadoCadastro
            })
    ))

    return { success: true, data: resultados }
}
