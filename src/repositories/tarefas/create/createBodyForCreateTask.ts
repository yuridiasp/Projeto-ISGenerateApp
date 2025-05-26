import { iCreateTarefa } from "../../../models/tarefa/iCreateTarefa";
import { iTarefa } from "../../../models/tarefa/iTarefa";
import { Cliente } from "../../../models/cliente/Cliente";
import { iColaborador } from "../../../models/colaborador/iColaborador";
import { seletores } from "../../../models/seletores/iSeletores";
import { removeAcentuacaoString } from "../../../utils/textFormatting/textFormatting";
import { calcularDataTarefa } from "../../../utils/prazos/prazos";
import { getDescricao } from "../../../services/tarefas/utils/getDescricao";
import { getResponsavelExecutor } from "../../../services/tarefas/get/getResponsavelExecutor";
import { atualizaHoraFinal } from "../../../services/tarefas/utils/atualizaHoraFinal";
import { getParametroData } from "../../../services/tarefas/utils/getParametroData";
import { getTipoTarefa } from "../../../services/tarefas/utils/getTipoTarefa";

interface createBodyForCreateTaskDTO {
    cliente: Cliente
    colaboradores: iColaborador[]
    tiposTarefas: seletores[]
    cookie: string
    createBodyForCreateTaskMock?: createBodyForCreateTaskMockDTO
}

interface createBodyForCreateTaskMockDTO {
    getParametroData: (tarefa: iTarefa) => number,
    calcularDataTarefa: (tarefa: iTarefa) => Date,
    getDescricao: (tarefa: iTarefa) => string,
    getTipoTarefa: (tarefa: iTarefa) => string,
    getResponsavelExecutor: (tarefa: iTarefa) => ({
        responsavel: string;
        executor: string;
    })
}

export async function createBodyForCreateTask({ cliente, colaboradores, tiposTarefas, cookie, createBodyForCreateTaskMock }: createBodyForCreateTaskDTO): Promise<iCreateTarefa[]> {

    const { tarefas } = cliente.compromisso

    return await Promise.all(tarefas.map(async tarefa => {
        const isAudiencia = removeAcentuacaoString(tarefa.descricao).search("AUDIENCIA") === 0
        const parametro = createBodyForCreateTaskMock ? createBodyForCreateTaskMock.getParametroData(tarefa) : getParametroData(tarefa, cliente)
        const dataTarefa = createBodyForCreateTaskMock ? createBodyForCreateTaskMock.calcularDataTarefa(tarefa) : calcularDataTarefa(parametro, cliente)
        const descricaoTarefa = createBodyForCreateTaskMock ? createBodyForCreateTaskMock.getDescricao(tarefa) : getDescricao(tarefa, cliente)
        const idTipoTarefa = createBodyForCreateTaskMock ? createBodyForCreateTaskMock.getTipoTarefa(tarefa) : getTipoTarefa(tarefa, tiposTarefas)
    
        const { responsavel, executor } = createBodyForCreateTaskMock ? createBodyForCreateTaskMock.getResponsavelExecutor(tarefa) : await getResponsavelExecutor(tarefa, cliente, cookie)
        
        const executorTask = colaboradores.find(colaborador => colaborador.nome.toUpperCase().trim() === executor.toUpperCase().trim() )
        const responsavelTask = colaboradores.find(colaborador => colaborador.nome.toUpperCase().trim() === responsavel.toUpperCase().trim() )

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