import { iCreateTarefa } from "@models/tarefas"
import { Cliente } from "@models/clientes"
import { iColaborador } from "@models/colaboradores"
import { seletores } from "@models/seletores"

interface createBodyForCreateTaskDTO {
    cliente: Cliente
    colaboradores: iColaborador[]
    tiposTarefas: seletores[]
    cookie: string
}

export function createBodyForCreateTask({ cliente, colaboradores }: createBodyForCreateTaskDTO): iCreateTarefa[] {

    return cliente.compromisso.tarefas.map((tarefa, index) => {
        const isAudiencia = /AUDI[ÊE]NCIA/.test(tarefa.descricao)

        const body: iCreateTarefa = {
            idCO: cliente.compromisso.id,
            idPR: cliente.processo.id,
            agendada: "n",
            idTipoTarefa: tarefa.tipoId,
            dataParaFinalizacao: tarefa.dataParaFinalizacao.toLocaleDateString(),
            descricao: tarefa.descricao,
            idResponsavel: colaboradores.find(colaborador => tarefa.responsavel === colaborador.nome).id,
            idExecutor: colaboradores.find(colaborador => tarefa.executor === colaborador.nome).id,
            acaoColetiva: "False"
        }

        if (cliente.processo.idsCopias?.length) {
            body.idsCopias = cliente.processo.idsCopias
            body.acaoColetiva = cliente.processo.acaoColetiva
        }

        if (isAudiencia && index === 0) {
            body.dataParaFinalizacaoAgendada = tarefa.dataParaFinalizacao.toLocaleDateString()
            body.onde = cliente.compromisso.local
            body.horarioInicial = tarefa.horarioInicial
            body.horarioFinal = tarefa.horarioFinal
            body.agendada = "s"
        }
        
        return body
    })
}