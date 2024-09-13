import { validaTipoCompromisso } from "../../utils/compromissos/validarTipoCompromisso"
import { buscarDadosProcesso } from "../processos/getProcessoService"
import { buscarDadosCliente } from "./getClienteService"
import { Cliente } from "../../models/cliente/Cliente"

export interface createClienteDTO {
    publication_date: string
    case_number: string
    related_case_number: string
    description: string
    internal_deadline: string
    fatal_deadline: string
    time: string
    expert_or_defendant: string
    local_adress: string
    executor: string
    separate_task: string
    justification: string
}

export async function createCliente({ publication_date, case_number, related_case_number, description, internal_deadline, fatal_deadline, time, expert_or_defendant, local_adress, executor, separate_task, justification }: createClienteDTO, cookie: string) {
    const { idCliente, processo } = await buscarDadosProcesso({ processo: case_number, cookie })
    
    const cliente = await buscarDadosCliente(idCliente, cookie)

    const newCliente = new Cliente({ publication_date, case_number, related_case_number, description, internal_deadline, fatal_deadline, time, expert_or_defendant, local_adress, dataCliente: cliente, dataProcesso: processo })

    newCliente.compromisso.tipoCompromisso = validaTipoCompromisso(newCliente, description)

    return newCliente
}