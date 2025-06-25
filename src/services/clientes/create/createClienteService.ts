import { validaTipoCompromisso } from "@utils/compromissos/validarTipoCompromisso"
import { getProcessoService } from "@services/processos/index"
import { getClienteByID } from "@services/clientes/get/getClienteService"
import { Cliente, ISAnalysisDTO } from "@models/cliente/Cliente"

export async function createClienteService(ISAnalysis: ISAnalysisDTO, cookie: string) {
    const result = await getProcessoService({ processo: ISAnalysis.case_number, cookie })

    if(result.success === false) {
        //TODO: Construir caso de falha
        return
    }

    const { idCliente, processo } = result.data
    
    const cliente = await getClienteByID(idCliente, cookie)

    const newCliente = new Cliente(ISAnalysis, cliente, processo)

    newCliente.compromisso.tipoCompromisso = validaTipoCompromisso(newCliente, ISAnalysis.description)

    return newCliente
}