import { createCompromissoRepository } from "@repositories/compromissos/create/createCompromissoRepository"
import { Cliente } from "@models/cliente/Cliente"
import { Compromisso, createBodyForCreateCompromisso } from "@repositories/compromissos/create/createBodyForCreateCompromisso"
import { getSelectsCompromisso } from "@services/seletores/seletoresService"
import { isCompromissoSuccessfullyCreated } from "@services/compromissos/index"
import { Result } from "@models/result/result"
import { tResultCreateService, tSuccessfulRecordCount } from "@services/tarefas"
import { createEntityKorbilError } from "@models/errors/createEntityKorbilError"
import { AppError } from "@models/errors/appError"
import { objectID } from "@utils/request/successfulCreationRequestValidation"

export async function createCompromissoService (cliente: Cliente, cookie: string): Promise<Result<tResultCreateService>> {
    const { tipoCompromisso, prazoFatal, prazoInterno, publicacao } = cliente.compromisso
    
    const compromisso: Compromisso =  {
        prazoFatal,
        prazoInterno,
        publicacao,
        tipoCompromisso
    }

    const processo = {
        origem: cliente.processo.origem
    }

    const tiposCompromisso = await getSelectsCompromisso(cookie)

    const body = createBodyForCreateCompromisso(compromisso, processo, tiposCompromisso)

    const result = await createCompromissoRepository(body, cookie)
    
    const compromissoResult =  isCompromissoSuccessfullyCreated(result)

    const tSuccessfulRecordCount: tSuccessfulRecordCount = {
        failedRegistry: [],
        registeredSuccessfully: [],
        successfulRecordCount: 0
    }

    if (compromissoResult.success === false) {
        return {
            success: false,
            error: new createEntityKorbilError("Houve um erro para registrar o compromisso.", "CREATE_COMPROMISSO_ERROR", tSuccessfulRecordCount)
        }
    } else {
        tSuccessfulRecordCount.registeredSuccessfully.push(compromissoResult.data)
        return {
            success: true,
            data: {
                resultCreationTasks: tSuccessfulRecordCount,
                bodys: [body]
            }
        }
    }

}