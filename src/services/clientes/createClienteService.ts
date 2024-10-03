import { validaTipoCompromisso } from "../../utils/compromissos/validarTipoCompromisso"
import { buscarDadosProcesso } from "../processos/getProcessoService"
import { getClienteByID } from "./getClienteService"
import { Cliente, ISAnalysisDTO } from "../../models/cliente/Cliente"

export async function createCliente(ISAnalysis: ISAnalysisDTO, cookie: string) {
    const { idCliente, processo } = await buscarDadosProcesso({ processo: ISAnalysis.case_number, cookie })
    
    const cliente = await getClienteByID(idCliente, cookie)

    const newCliente = new Cliente(ISAnalysis, cliente, processo)

    newCliente.compromisso.tipoCompromisso = validaTipoCompromisso(newCliente, ISAnalysis.description)

    return newCliente
}