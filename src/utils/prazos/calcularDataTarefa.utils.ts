import { Cliente } from "@models/clientes/Cliente.models"
import { contarDias } from "@utils/prazos/contarDias.utils"
import { calculaIntervaloTarefasJudicial } from "@utils/prazos/calculaIntervaloTarefasJudicial.utils"
import { dataContato } from "@utils/prazos/dataContato.utils"

export function calcularDataTarefa(parametro: number, cliente: Cliente, tarefas: string[], indexTarefa: number) {
    const prazoInterno = cliente.compromisso.prazoInterno.toDate()
    const dataProcess: Pick<Cliente["processo"], "cidade" | "origem" | "natureza" | "estado"> = cliente.processo
    const { uteis, semanas } = contarDias(prazoInterno, parametro, dataProcess)
    cliente.compromisso.semanas = semanas
    const intervalo = calculaIntervaloTarefasJudicial(uteis, cliente, tarefas, indexTarefa)
    const dataTarefa = dataContato(intervalo, prazoInterno, parametro, dataProcess)
    
    return dataTarefa
}