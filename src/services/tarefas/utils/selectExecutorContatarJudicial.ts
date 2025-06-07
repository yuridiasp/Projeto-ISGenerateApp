import { Cliente } from "../../../models/cliente/Cliente"
import { iColaborador } from "../../../models/colaborador/iColaborador"
import { removeAcentuacaoString } from "../../../utils/textFormatting/textFormatting"

export function selectExecutorContatarJudicial (colaboradores: iColaborador[], cliente: Cliente) {
    let responsavel = 'JULIANO OLIVEIRA DE SOUZA'

    const responsavelInterior = colaboradores.reduce((previous, currrent) => {
        const isReponsavelInterior = currrent.interiores.includes(removeAcentuacaoString(cliente.localAtendido))
        if (isReponsavelInterior) {
            return currrent
        }
        return previous
    }, null)

    if (responsavelInterior) {
        return {responsavel, executor: responsavelInterior.nome}
    }

    const executor = colaboradores.reduce((previous, currrent) => {
        if (previous.tarefas > currrent.tarefas) {
            return currrent
        }
        return previous
    }, colaboradores[0])

    if (executor.nome.includes("SANDOVAL"))
        responsavel =  'SANDOVAL FILHO CORREIA LIMA FILHO'
    else if (cliente.processo.estado === 'GO' || cliente.processo.estado === 'DF') {
        responsavel = 'HENYR GOIS DOS SANTOS'
    }

    return { responsavel, executor: executor.nome }
}