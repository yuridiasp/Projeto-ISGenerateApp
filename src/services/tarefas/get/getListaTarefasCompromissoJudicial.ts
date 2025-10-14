import { Cliente } from "@models/clientes/Cliente"
import { parametros } from "@utils/feriados/parametros"
import { contarDias } from "@utils/prazos/contarDias"
import { removeAcentuacaoString } from "@utils/text/textFormatting"

export function getListaTarefasCompromissoJudicial(cliente: Cliente) {

    const audiencia = ["CONTATAR CLIENTE","SMS E WHATSAPP","LEMBRAR CLIENTE"],
        audienciaShort = ["CONTATAR CLIENTE","SMS E WHATSAPP"],
        instrucao = ["CONTATAR CLIENTE","SMS E WHATSAPP","LEMBRAR CLIENTE", "ANÁLISE"],
        instrucaoShort = ["CONTATAR CLIENTE","SMS E WHATSAPP","ANÁLISE"]

    const pericia = ["CONTATAR CLIENTE", "SMS E WHATSAPP","LEMBRAR CLIENTE"],
        periciaShort = ["CONTATAR CLIENTE", "SMS E WHATSAPP"],
        periciaDF = ["CONTATAR CLIENTE", "SMS E WHATSAPP","LEMBRAR CLIENTE","ATO ORDINATÓRIO"],
        periciaDFShort = ["CONTATAR CLIENTE", "SMS E WHATSAPP","ATO ORDINATÓRIO"]

    const emendar = ["EMENDAR", "CONTATAR CLIENTE"]

    const tipoCompromissoNormalizado = removeAcentuacaoString(cliente.compromisso.descricaoCompromisso),
        contDoisEmenda = ["EMENDAR","DADOS PERICIA SOCIAL","DADOS COMPLEMENTARES", "DADOS PARA PERICIA SOCIAL", "DADOS COMPLEMENTARES PARA PERÍCIA SOCIAL"],
        contDoisFinanceiro = ["RECEBIMENTO DE ALVARA", "RPV TRF1 BRASILIA", "RPV TRF1 GOIAS", "RPV TRF5 ARACAJU", "RPV TRF5 ESTANCIA", "RPV TRF1 BAHIA", "RECEBIMENTO DE PRECATORIO"],
        contTres = "PERICIA",
        contQuatro = ["AUDIENCIA DE CONCILIACAO", "AUDIENCIA CONCILIATORIA", "AUDIENCIA DE INTERROGATORIO"],
        contCinco = ["AUDIENCIA INAUGURAL", "AUDIENCIA INICIAL","AUDIENCIA DE INSTRUCAO", "AUDIENCIA DE INSTRUCAO E JULGAMENTO", "AUDIENCIA UNA"]
    
    const dataInterno = cliente.compromisso.prazoInterno.toDate()

    const { semanas } = contarDias(dataInterno, parametros.tarefaAdvogado, cliente.processo)

    cliente.compromisso.semanas = semanas
    
    const isDFOrGO = (cliente.processo.estado == "DF" || cliente.processo.estado == "GO")
    const isMoreWeek = cliente.compromisso.semanas > 1
    const hasFiveTasks = contCinco.includes(tipoCompromissoNormalizado)
    const hasFourTasks = contQuatro.includes(tipoCompromissoNormalizado)
    const isPericia = tipoCompromissoNormalizado.search(contTres) === 0
    const hasTwoTasksEmenda = contDoisEmenda.includes(tipoCompromissoNormalizado)
    const hasTwoTasksFinanceiro = contDoisFinanceiro.includes(tipoCompromissoNormalizado)
    
    if (hasFiveTasks && isMoreWeek) {
        instrucao.unshift(cliente.compromisso.tipoCompromisso)
        return instrucao
    }

    if (hasFiveTasks && !isMoreWeek) {
        instrucaoShort.unshift(cliente.compromisso.tipoCompromisso)
        return instrucaoShort
    }

    if (hasFourTasks && isMoreWeek) {
        audiencia.unshift(cliente.compromisso.tipoCompromisso)
        return audiencia
    }

    if (hasFourTasks && !isMoreWeek) {
        audienciaShort.unshift(cliente.compromisso.tipoCompromisso)
        return audienciaShort
    }

    if (isPericia && isDFOrGO && isMoreWeek)
        return periciaDF

    if (isPericia && isDFOrGO && !isMoreWeek)
        return periciaDFShort

    if (isPericia && !isDFOrGO && isMoreWeek)
        return pericia

    if (isPericia && !isDFOrGO && !isMoreWeek)
        return periciaShort

    if (hasTwoTasksEmenda)
        return emendar
    
    if (hasTwoTasksFinanceiro)
        return [cliente.compromisso.tipoCompromisso + " - ADVOGADO", cliente.compromisso.tipoCompromisso + " - FINANCEIRO"]

    return [cliente.compromisso.tipoCompromisso]
}