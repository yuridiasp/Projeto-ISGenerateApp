import { createCompromissoRepository } from "@repositories/compromissos/create/createCompromissoRepository"
import { Cliente } from "@models/cliente/Cliente"
import { Compromisso, createBodyForCreateCompromisso } from "@repositories/compromissos/create/createBodyForCreateCompromisso"
import { getSelectsCompromisso } from "@services/seletores/seletoresService"
import { isCompromissoSuccessfullyCreated } from "@services/compromissos/index"

export async function createCompromissoService (cliente: Cliente, cookie: string) {
    const { descricao, prazoFatal, prazoInterno, publicacao } = cliente.compromisso

    const compromisso: Compromisso =  {
        prazoFatal,
        prazoInterno,
        publicacao,
        tipoCompromisso: descricao
    }

    const processo = {
        origem: cliente.processo.origem
    }

    const tiposCompromisso = await getSelectsCompromisso(cookie)

    const body = createBodyForCreateCompromisso(compromisso, processo, tiposCompromisso)

    const result = await createCompromissoRepository(body, cookie)

    return isCompromissoSuccessfullyCreated(result)
}