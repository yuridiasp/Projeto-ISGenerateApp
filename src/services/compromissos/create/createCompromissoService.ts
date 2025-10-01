import { createCompromissoRepository } from "@repositories/compromissos"
import { Cliente } from "@models/clientes"
import { Compromisso, createBodyForCreateCompromisso } from "@repositories/compromissos"
import { getSelectsCompromisso } from "@services/seletores"
import { isCompromissoSuccessfullyCreated } from "@services/compromissos"
import { Result } from "@models/results/result"
import { tSuccessfulRecordCount } from "@services/tarefas"
import { createEntityKorbilError } from "@models/errors"
import { errorsCodeList } from "@helpers/errorsCode"

export async function createCompromissoService (cliente: Cliente, cookie: string): Promise<Result<{ successfulRecordCount: tSuccessfulRecordCount}>> {
    const { tipoCompromisso, prazoFatal, prazoInterno, publicacao, descricaoCompromisso } = cliente.compromisso
    
    const compromisso: Compromisso =  {
        prazoFatal,
        prazoInterno,
        publicacao,
        tipoCompromisso,
        descricaoCompromisso
    }

    const processo = {
        origem: cliente.processo.origem
    }

    const tiposCompromisso = await getSelectsCompromisso(cookie)

    const body = createBodyForCreateCompromisso(compromisso, processo, tiposCompromisso)

    const result = await createCompromissoRepository(body, cookie)
    
    const compromissoResult =  isCompromissoSuccessfullyCreated(result)

    const successfulRecordCountInit: tSuccessfulRecordCount = {
        failedRegistryCommitment: null,
        registeredSuccessfully: [],
        successfulRecordCount: 0
    }

    if (compromissoResult.success === false) {
        return {
            success: false,
            error: new createEntityKorbilError("Houve um erro para registrar o compromisso.", errorsCodeList.createCompromissoError, successfulRecordCountInit)
        }
    } else {
        successfulRecordCountInit.registeredSuccessfully.push(compromissoResult.data)
        return {
            success: true,
            data: {
                successfulRecordCount: successfulRecordCountInit
            }
        }
    }

}