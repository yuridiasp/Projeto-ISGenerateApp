import { iCreateTarefa } from "@models/tarefa/iCreateTarefa";
import { Cliente } from "@models/cliente/Cliente";
import { iColaborador } from "@models/colaborador/iColaborador";
import { seletores } from "@models/seletores/iSeletores";

interface createBodyForCreateTaskDTO {
    cliente: Cliente
    colaboradores: iColaborador[]
    tiposTarefas: seletores[]
    cookie: string
}

export function createBodyForCreateTask({ cliente }: createBodyForCreateTaskDTO): iCreateTarefa[] {

    return cliente.compromisso.tarefas.map((tarefa) => {
        const isAudiencia = /AUDI[ÊE]NCIA/.test(tarefa.descricao)

        const body: iCreateTarefa = {
            idCO: cliente.compromisso.id,
            idPR: cliente.processo.id,
            agendada: "n",
            idTipoTarefa: tarefa.tipoId,
            dataParaFinalizacao: tarefa.dataParaFinalizacao.toLocaleDateString(),
            descricao: tarefa.descricao,
            idResponsavel: tarefa.responsavel,
            idExecutor: tarefa.executor,
            acaoColetiva: "False"
        }

        if (cliente.processo.idsCopias?.length) {
            body.idsCopias = cliente.processo.idsCopias
            body.acaoColetiva = cliente.processo.acaoColetiva
        }

        if (isAudiencia) {
            body.dataParaFinalizacaoAgendada = tarefa.dataParaFinalizacao.toLocaleDateString()
            body.onde = cliente.compromisso.local
            body.horarioInicial = tarefa.horarioFinal
            body.horarioFinal = tarefa.horarioFinal
            body.agendada = "s"
        }
        
        return body
    })
}