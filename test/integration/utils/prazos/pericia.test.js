describe('Calcular data da tarefa de compromisso de PERÍCIA a partir do tipo de tarefa e prazo interno', () => {
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

    it('Calcular data da tarefa de CONTATAR CLIENTE no compromisso de perícia com menos de 2 semanas da data do evento', () => {
      const dataContatoExpected = new Date("2023-09-05")
      const clienteMock = {
        compromisso: {
          semanas: 0,
          tipoCompromisso: 'PERICIA',
          tarefas: ['CONTATAR CLIENTE', 'SMS E WHATSAPP'],
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