import { Cliente } from "../../models/cliente/Cliente"
import { getDatePrazoFatal } from "./getDatePrazoFatal"
import { contarDias } from "./contarDias"
import { calculaIntervaloTarefasJudicial } from "./calculaIntervaloTarefasJudicial"
import { dataContato } from "./dataContato"

export function calcularDataTarefa(parametro: number, cliente: Cliente, indexTarefa: number) {
    const datePrazoFatal = getDatePrazoFatal(cliente.compromisso.prazoFatal)
    const dataProcess: Pick<Cliente["processo"], "cidade" | "origem" | "natureza" | "estado"> = cliente.processo
    const { uteis, semanas } = contarDias(datePrazoFatal, parametro, dataProcess)
    cliente.compromisso.semanas = semanas
    const intervalo = calculaIntervaloTarefasJudicial(uteis, cliente, indexTarefa)
    const dataTarefa = dataContato(intervalo, datePrazoFatal, parametro, dataProcess)
    
    return dataTarefa
}