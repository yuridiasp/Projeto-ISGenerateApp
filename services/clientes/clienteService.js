const { Cliente } = require("../../models/Cliente")
const { buscarDadosProcesso } = require("../processos/getProcessoService")
const { buscarDadosCliente } = require("./getClienteService")

async function createCliente({ publication_date, case_number, related_case_number, description, internal_deadline, fatal_deadline, time, expert_or_defendant, local_adress, executor, separate_task, justification }, cookie) {
    const { idCliente, processo } = await buscarDadosProcesso({ processo: case_number, cookie })
    
    const cliente = await buscarDadosCliente({ id: idCliente, cookie })

    const newCliente = new Cliente({ publication_date, case_number, related_case_number, description, internal_deadline, fatal_deadline, time, expert_or_defendant, local_adress, dataCliente: cliente, dataProcesso: processo })

    cliente.compromisso.tipoCompromisso = validaTipoCompromisso(cliente, descriptionCompromisso)

    return newCliente
}

module.exports = { createCliente }