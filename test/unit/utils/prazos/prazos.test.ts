import { describe, expect, beforeEach, it } from '@jest/globals';

import { extrairDataPrazoFatalInput, contarDias, calculaIntervaloTarefasJudicial, dataContato } from "../../../../src/utils/prazos/prazos"

describe('Unit Tests: Testar módulo de prazos', () => {

    let dataContatoExpected, dataInicial, dataFinal
    let parametroMock, diasUteis, todosDias, contagemSemanas, intervalo
    let clienteMock, mockCalculaIntervaloTarefasJudicial, isFeriadoMockImplementation, mockContarDias

    beforeEach(() => {
        // Redefinindo as datas
        dataContatoExpected = new Date("2023-09-05")
        dataInicial = new Date('2023-09-01')
        dataFinal = new Date('2023-09-10')
    
        // Redefinindo os valores numéricos e outros mocks
        parametroMock = 1
        diasUteis = 5
        todosDias = 9
        contagemSemanas = 1
        intervalo = 4
    
        // Redefinindo o objeto clienteMock
        clienteMock = {
          compromisso: {
            tipoCompromisso: 'EMENDAR',
            tarefas: ["CONTATAR CLIENTE"],
            semanas: contagemSemanas,
            quantidadeTarefas: 2
          },
          processo: {
            estado: 'SE'
          }
        }
    
        // Mock para cálculo de intervalo de tarefas judiciais
        mockCalculaIntervaloTarefasJudicial = {
          tipoCompromissoNormalizado: clienteMock.compromisso.tipoCompromisso,
          tarefaAtualNormalizada: clienteMock.compromisso.tarefas[0]
        }
    
        // Implementação mock de isFeriado
        isFeriadoMockImplementation = (date => {
          return { isHoliday: date.getDate() === 7 && date.getMonth() === 8 }
        })
    
        // Mock de contar dias
        mockContarDias = {
          date: dataInicial,
          isFeriado: isFeriadoMockImplementation
        }
    })
    

    it('function extrairDataPrazoFatalInput: Separar dia, mês e ano de uma string de data do tipo DD/MM/AAAA', () => {
        const day = 23
        const month = 9
        const year = 2024
        const [ resultDay, resultMonth, resultYear ] = extrairDataPrazoFatalInput(`${day}/${month}/${year}`)
    
        expect(resultDay).toBe(day)
        expect(resultMonth).toBe(month - 1)
        expect(resultYear).toBe(year)
    })
    
    it('function contarDias: Contar dias úteis e totais entre dois intervalos de datas', () => {
        
        const resultado = contarDias(dataFinal, parametroMock, clienteMock, mockContarDias)
        
        expect(resultado.uteis).toBe(diasUteis)
        expect(resultado.todosDias).toBe(todosDias)
        expect(clienteMock.compromisso.semanas).toBe(contagemSemanas)
    })
    
    it('function calculaIntervaloTarefasJudicial: Calcula intervalo entre o dia de hoje e a data de execução da tarefa', () => {
        const resultado = calculaIntervaloTarefasJudicial(diasUteis, clienteMock, mockCalculaIntervaloTarefasJudicial)

        expect(resultado).toBe(intervalo)
    })

    it('function dataContato: A partir da data do intervalo, calcular a data da execução da tarefa', () => {
        const resultado = dataContato(intervalo, dataFinal, parametroMock, clienteMock, mockContarDias)

        expect(resultado.toLocaleDateString()).toBe(dataContatoExpected.toLocaleDateString())
    })
})