import { Cliente } from "@models/cliente/Cliente"
import { seletores } from "@models/seletores/iSeletores"
import { parametros } from "@utils/feriados/parametros"
import { atualizaHoraFinal } from "../utils/atualizaHoraFinal"
import { calcularDataTarefa } from "@utils/prazos/calcularDataTarefa"
import { getResponsavelExecutor } from "../get/getResponsavelExecutor"
import { iTarefa } from "@models/tarefa/iTarefa"
import { getDescricao } from "../utils/getDescricao"
import { getTipoTarefa } from "../utils/getTipoTarefa"

export async function taskFactory (cliente: Cliente, tarefas: string[], cookie: string, tiposTarefas: seletores[]) {

    return await Promise.all(tarefas.map(async (tarefa, indexTarefa) => {
        const arrayAudiencias = ["AUDIÊNCIA DE INSTRUÇÃO E JULGAMENTO", "AUDIÊNCIA UNA", "AUDIÊNCIA DE INSTRUÇÃO", "AUDIÊNCIA INICIAL", "AUDIÊNCIA INAUGURAL"],
            ehTarefaParaAdmOuSac = (tarefa === "CONTATAR CLIENTE" || tarefa === "LEMBRAR CLIENTE"|| tarefa == "SMS E WHATSAPP"),
            isAudienciaComTestemunha = arrayAudiencias.includes(cliente.compromisso.tipoCompromisso)

        const parametro = ehTarefaParaAdmOuSac || isAudienciaComTestemunha ? parametros.tarefaContatar : parametros.tarefaAdvogado

        const horarioInicial = cliente.compromisso.horario,
            horarioFinal = atualizaHoraFinal(cliente.compromisso.horario),
            dataParaFinalizacao = calcularDataTarefa(parametro, cliente, indexTarefa)

        const { responsavel, executor } = await getResponsavelExecutor(tarefa, cliente, cookie, dataParaFinalizacao)

        const objectTask: iTarefa = {
            dataParaFinalizacao,
            descricao: getDescricao(tarefa, cliente),
            executor,
            responsavel,
            tipoId: getTipoTarefa(tarefa, tiposTarefas),
            horarioInicial,
            horarioFinal
        }

        return objectTask
    }))
}