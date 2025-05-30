import { describe, expect, beforeEach, it } from '@jest/globals';
import { contarDias } from '../../../../src/utils/prazos/contarDias';
import { calculaIntervaloTarefasJudicial } from '../../../../src/utils/prazos/calculaIntervaloTarefasJudicial';
import { dataContato } from '../../../../src/utils/prazos/dataContato';
import { Cliente } from '../../../../src/models/cliente/Cliente';

describe('Unit Tests: Testar módulo de prazos', () => {
  const clienteFake: Cliente = {
    id: '',
    nome: '',
    cpf: '',
    cidade: '',
    estado: '',
    localAtendido: '',
    parceiro: '',
    situacao: '',
    compromisso: {
      id: '',
      prazoInterno: '',
      prazoFatal: '',
      tarefas: [],
      quantidadeTarefas: 0,
      tipoCompromisso: '',
      descricao: '',
      semanas: 0,
      publicacao: '',
      peritoOrReu: '',
      local: '',
      horario: ''
    },
    processo: {
      id: '',
      origem: '',
      reu: '',
      responsavel: '',
      natureza: '',
      merito: '',
      cidade: '',
      estado: '',
      vara: ''
    }
  }

  let dataContatoExpected: Date, dataInicial: Date, dataFinal: Date
  let parametroMock: number, diasUteis: number, todosDias: number, contagemSemanas: number, intervalo: number
  let mockCalculaIntervaloTarefasJudicial, isFeriadoMockImplementation, mockContarDias

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
      clienteFake.compromisso.tipoCompromisso = 'EMENDAR'
      clienteFake.compromisso.tarefas = [{
          tipoId: '',
          descricao: "CONTATAR CLIENTE",
          dataParaFinalizacao: dataInicial,
          responsavel: '',
          executor: '',
        }]
      clienteFake.compromisso.semanas = contagemSemanas
      clienteFake.compromisso.quantidadeTarefas = 2
      clienteFake.processo.estado = 'SE'

      // Mock para cálculo de intervalo de tarefas judiciais
      mockCalculaIntervaloTarefasJudicial = {
        tipoCompromissoNormalizado: clienteFake.compromisso.tipoCompromisso,
        tarefaAtualNormalizada: clienteFake.compromisso.tarefas[0]
      }

      // Implementação mock de isFeriado
      isFeriadoMockImplementation = ((date: Date) => {
        return { isHoliday: date.getDate() === 7 && date.getMonth() === 8 }
      })

      // Mock de contar dias
      mockContarDias = {
        date: dataInicial,
        isFeriado: isFeriadoMockImplementation
      }
  })

  it('function contarDias: Contar dias úteis e totais entre dois intervalos de datas', () => {
      const resultado = contarDias(dataFinal, parametroMock, clienteFake)
      
      expect(resultado.uteis).toBe(diasUteis)
      expect(resultado.todosDias).toBe(todosDias)
      expect(clienteFake.compromisso.semanas).toBe(contagemSemanas)
  })

  it('function calculaIntervaloTarefasJudicial: Calcula intervalo entre o dia de hoje e a data de execução da tarefa', () => {
      const resultado = calculaIntervaloTarefasJudicial(diasUteis, clienteFake, mockCalculaIntervaloTarefasJudicial)

      expect(resultado).toBe(intervalo)
  })

  it('function dataContato: A partir da data do intervalo, calcular a data da execução da tarefa', () => {
      const resultado = dataContato(intervalo, dataFinal, parametroMock, clienteFake)

      expect(resultado.toLocaleDateString()).toBe(dataContatoExpected.toLocaleDateString())
  })
})