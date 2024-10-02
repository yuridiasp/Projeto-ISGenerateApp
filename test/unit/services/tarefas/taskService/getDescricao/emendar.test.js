describe('Function getDescricao: Construir descrição da tarefa em compromisso de Emendar', () => {
    const { getDescricao } = require("../../../../../../dist/services/tarefas/taskService")

    it('Gerar descrição para tarefa "EMENDAR" em compromisso de emendar', () => {
        const cliente = {
            nome: 'LAILTON DE SOUZA AGUIAR',
            cpf: '085.650.825-04',
            compromisso: {
                descricao: undefined,
                tipoCompromisso: 'EMENDAR',
                quantidadeTarefas: 2,
                tarefas: ['EMENDAR', 'CONTATAR CLIENTE'],
                prazoInterno: undefined,
                horario: undefined,
                peritoOrReu: undefined,
            }
        }
        const getDescricaoMock = {
            fistWordInTarefa: 'EMENDAR',
            localText: undefined,
            numero: '202311800989 (ORIGEM 201811800803)',
            tipoTarefaNormalizado: 'EMENDAR',
            tipoCompromissoNormalizado: 'EMENDAR'
        }

        const resultDescription = getDescricao(cliente.compromisso.tarefas[0], cliente, getDescricaoMock)

        const expectedDescription = '202311800989 (ORIGEM 201811800803) - EMENDAR'

        expect(resultDescription).toBe(expectedDescription)
    })

    it('Gerar descrição para tarefa "CONTATAR CLIENTE" em compromisso de emendar', () => {
        const cliente = {
            nome: 'LAILTON DE SOUZA AGUIAR',
            cpf: '085.650.825-04',
            compromisso: {
                descricao: '202311800989 (ORIGEM 201811800803) - EMENDAR',
                tipoCompromisso: 'EMENDAR',
                quantidadeTarefas: 2,
                tarefas: ['CONTATAR CLIENTE'],
                prazoInterno: undefined,
                horario: undefined,
                peritoOrReu: undefined,
            }
        }
        const getDescricaoMock = {
            fistWordInTarefa: 'EMENDAR',
            localText: undefined,
            numero: '202311800989 (ORIGEM 201811800803)',
            tipoTarefaNormalizado: 'CONTATAR CLIENTE',
            tipoCompromissoNormalizado: 'EMENDAR'
        }

        const resultDescription = getDescricao(cliente.compromisso.tarefas[0], cliente, getDescricaoMock)

        const expectedDescription = '202311800989 (ORIGEM 201811800803) - '

        expect(resultDescription).toBe(expectedDescription)
    })
})