import { Cliente } from "@models/cliente/Cliente"
import { getDateFromDateString } from "@utils/prazos/getDateFromDateString"
import { contarDias } from "@utils/prazos/contarDias"
import { calculaIntervaloTarefasJudicial } from "@utils/prazos/calculaIntervaloTarefasJudicial"
import { dataContato } from "@utils/prazos/dataContato"

export function calcularDataTarefa(parametro: number, cliente: Cliente, indexTarefa: number) {
    const datePrazoFatal = getDateFromDateString(cliente.compromisso.prazoFatal)
    const dataProcess: Pick<Cliente["processo"], "cidade" | "origem" | "natureza" | "estado"> = cliente.processo
    const { uteis, semanas } = contarDias(datePrazoFatal, parametro, dataProcess)
    cliente.compromisso.semanas = semanas
    const intervalo = calculaIntervaloTarefasJudicial(uteis, cliente, indexTarefa)
    const dataTarefa = dataContato(intervalo, datePrazoFatal, parametro, dataProcess)
    
    return dataTarefa
}