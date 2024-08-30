const { removeAcentuacaoString } = require("../textFormatting/textFormatting")

function extrairDataPrazoFatalInput (prazoFatal) {
    const data = prazoFatal.split('/')
    return [data[0], Number(data[1])-1, data[2]]
}

function contarDias(dataInterno, parametro, cliente) {
    let contaTodos = 0,
        contaUteis = 0,
        domingos = 0,
        date = new Date()

    if (date.toDateString() == dataInterno.toDateString())
        return 0

    while (date < dataInterno) {
        date.setDate(date.getDate() + 1)
        const { isHoliday } = isFeriado(date, parametro)
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

function calculaIntervaloTarefasJudicial(dias, cliente) {
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
        tipoCompromissoNormalizado = removeAcentuacaoString(tipoCompromisso),
        tarefaAtualNormalizada = removeAcentuacaoString(tarefas[0]),
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

function dataContato(intervalo, internalDeadline, param) {
    let today = new Date(),
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
            const { isHoliday } = isFeriado(date, param)
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

    return date.toLocaleDateString()
}

/**
 * 
 * @param {number} parametro - Um número para cálculo de prazo: 1 - Tarefas para contatar; 2 - Tarefas para advogado
 * @param {object} cliente - Um objeto que representa o cliente
 * @param {string} cliente.id
 * @param {string} cliente.nome
 * @param {string} cliente.cpf
 * @param {string} cliente.cidade
 * @param {string} cliente.estado
 * @param {string} cliente.localAtendido
 * @param {string} cliente.parceiro
 * @param {object} cliente.compromisso
 * @param {string} cliente.compromisso.id
 * @param {string} cliente.compromisso.prazoInterno
 * @param {string} cliente.compromisso.prazoFatal
 * @param {string} cliente.compromisso.tarefas
 * @param {string} cliente.compromisso.quantidadeTarefas
 * @param {string} cliente.compromisso.tipoCompromisso
 * @param {string} cliente.compromisso.descricao
 * @param {string} cliente.compromisso.semanas
 * @param {string} cliente.compromisso.publicacao
 * @param {string} cliente.compromisso.peritoOrReu
 * @param {string} cliente.compromisso.local
 * @param {string} cliente.compromisso.horario
 * @param {object} cliente.processo
 * @param {string} cliente.processo.id
 * @param {string} cliente.processo.origem
 * @param {string} cliente.processo.dependente
 * @param {string} cliente.processo.reu
 * @param {string} cliente.processo.responsavel
 * @param {string} cliente.processo.natureza
 * @param {string} cliente.processo.merito
 * @param {string} cliente.processo.cidade
 * @param {string} cliente.processo.estado
 * @param {string} cliente.processo.vara
 * @returns {string} Uma string de data no formato DD/MM/AAAA
 */
function calcularDataTarefa(parametro, cliente) {
    const [ diaPrazoInterno, mesPrazoInterno, anoPrazoInterno ] = extrairDataPrazoFatalInput(cliente.compromisso.prazoFatal)
    const dataInterno = new Date(anoPrazoInterno, mesPrazoInterno, diaPrazoInterno)
    const { uteis } = contarDias(dataInterno, parametro, cliente)
    const intervalo = calculaIntervaloTarefasJudicial(uteis, cliente)
    const dataTarefa = dataContato(intervalo, dataInterno, parametro)
    
    return dataTarefa
}

module.exports = { calcularDataTarefa }