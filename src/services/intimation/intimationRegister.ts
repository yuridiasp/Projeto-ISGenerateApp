import { iWindows } from "../../models/windows/iWindows"
import { createCliente } from "../clientes/createClienteService"
import { createCompromissoService } from "../compromissos/index"
import { updateViewRegistrationIntimations } from "../../utils/viewHelpers/viewHelpers"
import { ISAnalysisDTO } from "../../models/cliente/Cliente"
import { getObjectValidateIntimationsService, iFileData } from "../validateIntimations/validateIntimationsService"
import { createTaskService } from "../tarefas"
import { EmptyFileError } from "../../models/errors/emptyFileError"
import { Result } from "../../models/result/result"

export async function handleIntimationsRegistrationService(windows: iWindows, cookie: string, file: iFileData): Promise<Result<{}>> {
    const result = getObjectValidateIntimationsService(file)

    if (!result.success) {
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

    const resultados = await Promise.all(result.data.file.map((intimation: ISAnalysisDTO) =>
        createCliente({ ...intimation }, cookie)
            .then(async cliente => {
                const result = await createCompromissoService(cliente, cookie)

                if (result.success) {
                    cliente.compromisso.id = result.data.id
                    return await createTaskService(cliente, cookie)
                }

                return result
            })
            .then(resultadoCadastro => {
                updateViewRegistrationIntimations(resultadoCadastro, windows)

                return resultadoCadastro
            })
    ))

    return { success: true, data: resultados }
}
