import { Cliente } from "../../../models/cliente/Cliente"
import { iTarefa } from "../../../models/tarefa/iTarefa"
import { parametros } from "../../../utils/feriados/parametros"

export function getParametroData (tarefa: iTarefa): number {
    //const arrayAudiencias = ["AUDIÊNCIA DE INSTRUÇÃO E JULGAMENTO", "AUDIÊNCIA UNA", "AUDIÊNCIA DE INSTRUÇÃO", "AUDIÊNCIA INICIAL", "AUDIÊNCIA INAUGURAL"]
    const ehTarefaParaAdmOuSac = ((tarefa.descricao == "CONTATAR CLIENTE") || (tarefa.descricao == "LEMBRAR CLIENTE") || (tarefa.descricao == "SMS E WHATSAPP"))
    // const ehAudiencia = (arrayAudiencias.includes(cliente.compromisso.tipoCompromisso))

    return ehTarefaParaAdmOuSac ? parametros.tarefaContatar : parametros.tarefaAdvogado
}