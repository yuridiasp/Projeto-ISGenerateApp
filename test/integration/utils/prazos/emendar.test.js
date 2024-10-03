describe('Calcular data da tarefa de compromisso de EMENDAR a partir do tipo de tarefa e prazo interno', () => {
    const { calcularDataTarefa } = require("../../../../dist/utils/prazos/prazos")

    const parametroMock = 1
    let dataInicial
    let dataFinal
    let calcularDataTarefaMock = {
        hoje: dataInicial,
        prazoFatal: dataFinal
    }

    beforeEach(() => {
      dataInicial = new Date('2023-09-01')
      dataFinal = new Date('2023-09-10')
      calcularDataTarefaMock = {
          hoje: dataInicial,
          prazoFatal: dataFinal
      }
    })

    it('Calcular data da tarefa de compromisso de EMENDAR a partir do tipo de tarefa e prazo interno', () => {
      const dataEmendaExpected = new Date('2023-09-10'),
        clienteMock = {
          compromisso: {
            semanas: 0,
            tipoCompromisso: 'EMENDAR',
            tarefas: [
              { descricao: 'EMENDAR' },
              { descricao: 'CONTATAR CLIENTE' }
            ],
            semanas: 1,
            quantidadeTarefas: 2
          },
          processo: {
            estado: 'SE'
          }
        }

      const resultadoEmenda = calcularDataTarefa(parametroMock, clienteMock, calcularDataTarefaMock)
      expect(resultadoEmenda.toLocaleDateString()).toBe(dataEmendaExpected.toLocaleDateString())
    })

    it('Calcular data da tarefa de compromisso de CONTATAR CLIENTE a partir do tipo de tarefa e prazo interno', () => {
      const dataContatoExpected = new Date("2023-09-05"),
        clienteMock = {
          compromisso: {
            semanas: 0,
            tipoCompromisso: 'EMENDAR',
            tarefas: [
              { descricao: 'CONTATAR CLIENTE' }
            ],
            semanas: 1,
            quantidadeTarefas: 2
          },
          processo: {
            estado: 'SE'
          }
        }

      const resultadoContato = calcularDataTarefa(parametroMock, clienteMock, calcularDataTarefaMock)
      expect(resultadoContato.toLocaleDateString()).toBe(dataContatoExpected.toLocaleDateString())
    })
})