import { iWindows } from "../../models/windows/iWindows"
import { createCliente } from "../clientes/createClienteService"
import { createCompromissoService } from "../compromissos/index"
import { updateViewRegistrationIntimations } from "../../utils/viewHelpers/viewHelpers"
import { ISAnalysisDTO } from "../../models/cliente/Cliente"
import { getObjectValidateIntimationsService, iFileData } from "../validateIntimations/validateIntimationsService"
import { createTaskService } from "../tarefas"

export async function handleIntimationsRegistrationService(windows: iWindows, cookie: string, file: iFileData) {
    const { msg, value: intimations } = getObjectValidateIntimationsService(file)

    if (!intimations) {
        throw new Error(msg)
    }

    const resultados = await Promise.all(intimations.map((intimation: ISAnalysisDTO) =>
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
                return updateViewRegistrationIntimations(resultadoCadastro, windows)
            })
    ))

    console.log(resultados)

    return 'Sucesso!'
}
