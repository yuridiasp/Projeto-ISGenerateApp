import { Cliente } from "@models/clientes/Cliente"
import { getDateFromDateString } from "@utils/prazos/getDateFromDateString"
import { contarDias } from "@utils/prazos/contarDias"
import { calculaIntervaloTarefasJudicial } from "@utils/prazos/calculaIntervaloTarefasJudicial"
import { dataContato } from "@utils/prazos/dataContato"

export function calcularDataTarefa(parametro: number, cliente: Cliente, tarefas: string[], indexTarefa: number) {
    const prazoInterno = getDateFromDateString(cliente.compromisso.prazoInterno)
    const dataProcess: Pick<Cliente["processo"], "cidade" | "origem" | "natureza" | "estado"> = cliente.processo
    const { uteis, semanas } = contarDias(prazoInterno, parametro, dataProcess)
    cliente.compromisso.semanas = semanas
    const intervalo = calculaIntervaloTarefasJudicial(uteis, cliente, tarefas, indexTarefa)
    const dataTarefa = dataContato(intervalo, prazoInterno, parametro, dataProcess)
    
    return dataTarefa
}