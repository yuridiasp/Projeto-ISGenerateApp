import { Cliente } from "src/models/cliente/Cliente"
import { removeAcentuacaoString } from "../textFormatting/textFormatting"
import { isFeriado } from "../feriados/feriados"

type isFeriadoFunctionMock = (date: Date) =>  { isHoliday: boolean }

interface mockContarDiasDTO {
    date: Date
    isFeriado: isFeriadoFunctionMock
}

interface mockNormalizedStringDTO {
    tipoCompromissoNormalizado: string
    tarefaAtualNormalizada: string
}

interface calcularDataTarefaMock {
    hoje: Date
    prazoFatal: Date
}

export function extrairDataPrazoFatalInput (prazoFatal: string): number[] {
    const [ dia, mes, ano ] = prazoFatal.split('/')
    
    return [ Number(dia), Number(mes)-1, Number(ano)]
}

export function contarDias(dataInterno: Date, parametro: number, cliente: Cliente, mockContarDias?: mockContarDiasDTO, hojeMock?: Date ): { uteis: number, todosDias: number} {
    let contaTodos = 0,
        contaUteis = 0,
        domingos = 0,
        date = mockContarDias ? mockContarDias.date : hojeMock || new Date()

    if (date.toDateString() == dataInterno.toDateString())
        return { uteis: 0, todosDias: 0}

    while (date < dataInterno) {
        date.setDate(date.getDate() + 1)
        const { isHoliday } = mockContarDias ? mockContarDias.isFeriado(date) : isFeriado(date, parametro, cliente)
        const weekDay = date.getDay()
        const sundayIndex = 0
        const saturdayIndex = 6

        if (weekDay == sundayIndex) {
            domingos++
        }

        if ((weekDay > sundayIndex && weekDay < saturdayIndex) && (!isHoliday)) {
            contaUteis++
        }

        contaTodos++
    }

    cliente.compromisso.semanas = domingos

    return { uteis: contaUteis, todosDias: contaTodos}
}

export function calculaIntervaloTarefasJudicial(dias: number, cliente: Cliente, mockNormalizedString?: mockNormalizedStringDTO) {
    const { tipoCompromisso, tarefas, semanas, quantidadeTarefas } = cliente.compromisso,
        { estado } = cliente.processo,
        contDois = {
            outros: ["EMENDAR","DADOS PERICIA SOCIAL","DADOS COMPLEMENTARES"],
            calculo: ["MANIFESTACAO SOBRE CALCULOS", "MANIFESTACAO SOBRE CALCULO", 'PLANILHA'],
            financeiro: ["RPV TRF1 BRASILIA", "RPV TRF1 GOIAS", "RPV TRF5 ARACAJU", "RPV TRF5 ESTANCIA", "RPV TRF1 BAHIA", "RECEBIMENTO DE PRECATORIO", "RECEBIMENTO DE ALVARA"],
            adm: ['DECISAO ANTECIPACAO PERICIA']
        },
        contTres = "PERICIA",
        contQuatro = ["AUDIENCIA DE CONCILIACAO", "AUDIENCIA CONCILIATORIA", "AUDIENCIA DE INTERROGATORIO"],
        contCinco = ["AUDIENCIA DE INSTRUCAO", "AUDIENCIA INAUGURAL", "AUDIENCIA INICIAL", "AUDIENCIA DE INSTRUCAO E JULGAMENTO", "AUDIENCIA UNA"],
        tipoCompromissoNormalizado = mockNormalizedString ? mockNormalizedString.tipoCompromissoNormalizado : removeAcentuacaoString(tipoCompromisso),
        tarefaAtualNormalizada = mockNormalizedString ? mockNormalizedString.tarefaAtualNormalizada : removeAcentuacaoString(tarefas[0].descricao),
        isDFOrGO = estado === 'GO' || estado === 'DF'

    if (((contCinco.includes(tipoCompromisso) && dias > 11) || (contQuatro.includes(tipoCompromissoNormalizado) && dias > 10) || (tipoCompromissoNormalizado.search(contTres) === 0) && dias > 10)) {
        if (semanas >= 2) {
            if (tarefaAtualNormalizada === 'ANALISE')
                return dias-1
            if ((tarefaAtualNormalizada === 'CONTATAR CLIENTE' || tarefaAtualNormalizada === 'SMS E WHATSAPP')) {
                if (!isDFOrGO) {
                    return dias-2
                }
                else {
                    if (tarefaAtualNormalizada === 'CONTATAR CLIENTE') {
                        return dias-3
                    }
                    if (tarefaAtualNormalizada === 'SMS E WHATSAPP') {
                        if (contQuatro.includes(tipoCompromissoNormalizado))
                            return dias-7
                        return dias-2
                    }
                }
            }
            if (tarefaAtualNormalizada === 'LEMBRAR CLIENTE')
                return 2
            if (tarefaAtualNormalizada === 'ATO ORDINATORIO')
                return dias-1
        }
    }
    else {
        const isCourtHearingOrExpertise = (contCinco.includes(tipoCompromissoNormalizado) || contQuatro.includes(tipoCompromissoNormalizado) || tipoCompromissoNormalizado.search(contTres) === 0)

        if (isCourtHearingOrExpertise) {
            if (tarefas.length === quantidadeTarefas && tipoCompromissoNormalizado.search(contTres) === -1)
                return 0
            else
                if (tarefaAtualNormalizada === 'LEMBRAR CLIENTE')
                    return 2
            if (isDFOrGO) {
                if (tarefaAtualNormalizada === 'CONTATAR CLIENTE')
                    return dias-1
            }
            return dias-1
        }
    }
    
    if (contDois.outros.includes(tipoCompromissoNormalizado)) {
        if (tarefaAtualNormalizada === 'CONTATAR CLIENTE') {
            return dias-1
        }
    }

    const isAttorneyTask = tarefaAtualNormalizada.includes('ADVOGADO')

    if (contDois.calculo.includes(tipoCompromissoNormalizado)) {
        if (isAttorneyTask) {
            return 0
        }
        
        return 2
    }

    if (contDois.adm.includes(tipoCompromissoNormalizado)) {
        if (isAttorneyTask) {
            return 0
        }

        return dias-1
    }

    if (contDois.financeiro.includes(tipoCompromissoNormalizado)) {

        const isFinanceTask = tipoCompromissoNormalizado.includes('RPV') || tipoCompromissoNormalizado.includes('PRECATORIO')

        if (isFinanceTask && isAttorneyTask) {
            return dias-5
        }

        return 0
    }

    return 0
}

export function dataContato(intervalo: number, internalDeadline: Date, param: number, cliente: Cliente, dataContatoMock?: mockContarDiasDTO, hojeMock?: Date) {
    let today = dataContatoMock ? dataContatoMock.date : hojeMock || new Date(),
        endInterval = Number(intervalo),
        date
        

    today.setHours(0, 0, 0, 0)
    
    if (intervalo > 0) {
        const sundayIndex = 0
        const saturdayIndex = 6
        let businessDayCount = 0

        date = new Date(internalDeadline)

        while (businessDayCount < endInterval) {
            date.setDate(date.getDate() -1)
            const { isHoliday } = dataContatoMock ? dataContatoMock.isFeriado(date) : isFeriado(date, param, cliente)
            const weekDay = date.getDay()
            const isSunday = weekDay === sundayIndex
            const isSaturday = weekDay === saturdayIndex
            const isBusinessDay = !isSunday && !isSaturday && !isHoliday

            if (isBusinessDay) {
                ++businessDayCount
            }
        }
    } else {
        date = internalDeadline
    }

    if (date < today) {
        date = today
    }

    return date
}

export function calcularDataTarefa(parametro: number, cliente: Cliente, calcularDataTarefaMock?: calcularDataTarefaMock) {
    const dateString = calcularDataTarefaMock ? calcularDataTarefaMock.prazoFatal.toLocaleDateString() : cliente.compromisso.prazoFatal
    const [ diaPrazoInterno, mesPrazoInterno, anoPrazoInterno ] = extrairDataPrazoFatalInput(dateString)
    const dataInterno = new Date(anoPrazoInterno, mesPrazoInterno, diaPrazoInterno)
    const { uteis } = contarDias(dataInterno, parametro, cliente, null, calcularDataTarefaMock ? new Date(calcularDataTarefaMock.hoje): null)
    const intervalo = calculaIntervaloTarefasJudicial(uteis, cliente)
    const dataTarefa = dataContato(intervalo, dataInterno, parametro, cliente, null, calcularDataTarefaMock ? new Date(calcularDataTarefaMock.hoje): null)
    
    return dataTarefa
}