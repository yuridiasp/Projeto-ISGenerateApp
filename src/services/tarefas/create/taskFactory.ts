import { Cliente } from "@models/clientes"
import { seletores } from "@models/seletores"
import { parametros } from "@utils/feriados/parametros"
import { atualizaHoraFinal } from "@services/tarefas"
import { calcularDataTarefa } from "@utils/prazos/calcularDataTarefa"
import { getResponsavelExecutor } from "@services/tarefas"
import { iTarefa } from "@models/tarefas"
import { getDescricao } from "@services/tarefas"
import { getTipoTarefa } from "@services/tarefas"

export async function taskFactory (cliente: Cliente, tarefas: string[], cookie: string, tiposTarefas: seletores[]) {

    return await Promise.all(tarefas.map(async (tarefa, indexTarefa) => {
        const arrayAudiencias = ["AUDIÊNCIA DE INSTRUÇÃO E JULGAMENTO", "AUDIÊNCIA UNA", "AUDIÊNCIA DE INSTRUÇÃO", "AUDIÊNCIA INICIAL", "AUDIÊNCIA INAUGURAL"],
            ehTarefaParaAdmOuSac = (tarefa === "CONTATAR CLIENTE" || tarefa === "LEMBRAR CLIENTE"|| tarefa == "SMS E WHATSAPP"),
            isAudienciaComTestemunha = arrayAudiencias.includes(cliente.compromisso.tipoCompromisso)

        const parametro = ehTarefaParaAdmOuSac || isAudienciaComTestemunha ? parametros.tarefaContatar : parametros.tarefaAdvogado

        const horarioInicial = cliente.compromisso.horario,
            horarioFinal = atualizaHoraFinal(cliente.compromisso.horario),
            dataParaFinalizacao = calcularDataTarefa(parametro, cliente, tarefas, indexTarefa)

        const { responsavel, executor } = await getResponsavelExecutor(tarefa, cliente, cookie, dataParaFinalizacao)

        const objectTask: iTarefa = {
            dataParaFinalizacao,
            descricao: getDescricao(tarefa, cliente, tarefas),
            executor,
            responsavel,
            tipoId: getTipoTarefa(tarefa, tiposTarefas),
            horarioInicial,
            horarioFinal
        }

        if (indexTarefa === 0) cliente.compromisso.descricao = objectTask.descricao

        return objectTask
    }))
}