import { iCreateTarefa } from "@models/tarefa/iCreateTarefa";
import { Cliente } from "@models/cliente/Cliente";
import { iColaborador } from "@models/colaborador/iColaborador";
import { seletores } from "@models/seletores/iSeletores";
import { calcularDataTarefa } from "@utils/prazos/calcularDataTarefa";
import { getDescricao } from "@services/tarefas/utils/getDescricao";
import { getResponsavelExecutor } from "@services/tarefas/get/getResponsavelExecutor";
import { atualizaHoraFinal } from "@services/tarefas/utils/atualizaHoraFinal";
import { getParametroData } from "@services/tarefas/utils/getParametroData";
import { getTipoTarefa } from "@services/tarefas/utils/getTipoTarefa";

interface createBodyForCreateTaskDTO {
    cliente: Cliente
    colaboradores: iColaborador[]
    tiposTarefas: seletores[]
    cookie: string
}

export async function createBodyForCreateTask({ cliente, colaboradores, tiposTarefas, cookie }: createBodyForCreateTaskDTO): Promise<iCreateTarefa[]> {

    return await Promise.all(cliente.compromisso.tarefas.map(async (tarefa, indexTarefa) => {
        const isAudiencia = /AUDI[ÊE]NCIA/.test(tarefa.descricao)
        const parametro = getParametroData(tarefa)
        const dataTarefa = calcularDataTarefa(parametro, cliente, indexTarefa)
        const descricaoTarefa = getDescricao(tarefa, cliente)
        const idTipoTarefa = getTipoTarefa(tarefa, tiposTarefas)
    
        const { responsavel, executor } = await getResponsavelExecutor(tarefa, cliente, cookie)
        
        const executorTask = colaboradores.find(colaborador => colaborador.nome.toUpperCase().trim() === executor.toUpperCase().trim())
        const responsavelTask = colaboradores.find(colaborador => colaborador.nome.toUpperCase().trim() === responsavel.toUpperCase().trim())

        const dataParaFinalizacao = dataTarefa.toLocaleDateString()

        const body: iCreateTarefa = {
            idCO: cliente.compromisso.id,
            idPR: cliente.processo.id,
            agendada: "n",
            idTipoTarefa,
            dataParaFinalizacao,
            descricao: descricaoTarefa,
            idResponsavel: responsavelTask.id,
            idExecutor: executorTask.id,
            acaoColetiva: "False"
        }

        if (cliente.processo.idsCopias?.length) {
            body.idsCopias = cliente.processo.idsCopias
            body.acaoColetiva = cliente.processo.acaoColetiva
        }

        if (isAudiencia) {
            body.dataParaFinalizacaoAgendada = dataParaFinalizacao,
            body.onde = cliente.compromisso.local,
            body.horarioInicial = cliente.compromisso.horario,
            body.horarioFinal = atualizaHoraFinal(cliente.compromisso.horario)
            body.agendada = "s"
        }
        
        return body
    }))
}