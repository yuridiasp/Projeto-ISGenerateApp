describe('Calcular data da tarefa de compromisso de AUDIÊNCIA a partir do tipo de tarefa e prazo interno', () => {
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

    it('Calcular data da tarefa de compromisso de AUDIÊNCIA no compromisso de Audiência e com menos de 2 semanas da data do evento', () => {
        const clienteMock = {
            compromisso: {
                tipoCompromisso: 'AUDIENCIA DE INSTRUCAO',
                tarefas: [
                    
                    { descricao: 'AUDIENCIA DE INSTRUCAO' },
                    { descricao: 'CONTATAR CLIENTE' },
                    { descricao: 'SMS E WHATSAPP' },
                    { descricao: 'ANALISE' }
                ],
                semanas: 1,
                quantidadeTarefas: 4
            },
            processo: {
                estado: 'SE'
            }
        }

        const resultado = calcularDataTarefa(parametroMock, clienteMock, calcularDataTarefaMock)
        expect(resultado.toLocaleDateString()).toBe(dataFinal.toLocaleDateString())
    })

    it('Calcular data da tarefa de compromisso de CONTATAR CLIENTE no compromisso de Audiência e com menos de 2 semanas da data do evento', () => {
        const dataContatoExpected = new Date("2023-09-05")
        const clienteMock = {
            compromisso: {
                tipoCompromisso: 'AUDIENCIA DE INSTRUCAO',
                tarefas: [
                    { descricao: 'CONTATAR CLIENTE' },
                    { descricao: 'SMS E WHATSAPP' },
                    { descricao: 'ANALISE' }
                ],
                semanas: 1,
                quantidadeTarefas: 4
            },
            processo: {
                estado: 'SE'
            }
        }

        const resultado = calcularDataTarefa(parametroMock, clienteMock, calcularDataTarefaMock)
        expect(resultado.toLocaleDateString()).toBe(dataContatoExpected.toLocaleDateString())
    })

    it('Calcular data da tarefa de compromisso de SMS E WHATSAPP no compromisso de Audiência e com menos de 2 semanas da data do evento', () => {
        const dataContatoExpected = new Date("2023-09-05")
        const clienteMock = {
            compromisso: {
                tipoCompromisso: 'AUDIENCIA DE INSTRUCAO',
                tarefas: [
                    { descricao: 'SMS E WHATSAPP' },
                    { descricao: 'ANALISE' }
                ],
                semanas: 1,
                quantidadeTarefas: 4
            },
            processo: {
                estado: 'SE'
            }
        }

        const resultado = calcularDataTarefa(parametroMock, clienteMock, calcularDataTarefaMock)
        expect(resultado.toLocaleDateString()).toBe(dataContatoExpected.toLocaleDateString())
    })

    it('Calcular data da tarefa de compromisso de ANÁLISE no compromisso de Audiência e com menos de 2 semanas da data do evento', () => {
        const dataContatoExpected = new Date("2023-09-05")
        const clienteMock = {
            compromisso: {
                tipoCompromisso: 'AUDIENCIA DE INSTRUCAO',
                tarefas: [
                    { descricao: 'ANALISE' }
                ],
                semanas: 1,
                quantidadeTarefas: 4
            },
            processo: {
                estado: 'SE'
            }
        }

        const resultado = calcularDataTarefa(parametroMock, clienteMock, calcularDataTarefaMock)
        expect(resultado.toLocaleDateString()).toBe(dataContatoExpected.toLocaleDateString())
    })
})