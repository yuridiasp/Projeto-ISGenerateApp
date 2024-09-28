import { iWindows } from "../../models/windows/iWindows"
import { getIntimations } from "../../controllers/controllers"
import { createCliente, createClienteDTO } from "../clientes/clienteService"
import { createCompromissoService } from "../compromissos/compromissoService"
import { createTaskService } from "../tarefas/taskService"
import { updateViewRegistrationIntimations } from "../../utils/viewHelpers/viewHelpers"
import { iFileData } from "../../models/file/iFileData"

export async function handleIntimationsRegistration(windows: iWindows, cookie: string, file: iFileData) {
    const { msg, value: intimations } = getIntimations(file)

    if (!intimations) {
        throw new Error(msg)
    }

    console.log(msg)

    const resultados = await Promise.all(intimations.map((intimation: createClienteDTO) =>
        createCliente({ ...intimation }, cookie)
            .then(async cliente => {
                await createCompromissoService(cliente, cookie)
                return await createTaskService({ cliente, cookie })
            })
            .then(resultadoCadastro => updateViewRegistrationIntimations(resultadoCadastro, windows))
    ))

    console.log(resultados)

    return 'Sucesso!'
}
