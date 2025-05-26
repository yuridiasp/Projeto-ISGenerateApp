import { describe, expect, it, beforeEach } from '@jest/globals'

import { getDescricao } from '../../../../../../src/services/tarefas/index'

describe('Function getDescricao: Construir descrição da tarefa em compromisso de Audiência', () => {

    let cliente = {
        id: '',
        nome: 'LAILTON DE SOUZA AGUIAR',
        cpf: '085.650.825-04',
        cidade: '',
        estado: 'SE',
        localAtendido: 'ARACAJU',
        parceiro: '',
        situacao: '',
        compromisso: {
            id: '',
            prazoInterno: 'DD/MM/AAAA',
            prazoFatal: 'DD/MM/AAAA',
            tarefas: [
                {
                    tipoId: '',
                    dataParaFinalizacao: new Date(),
                    responsavel: '',
                    executor: '',
                    descricao: 'AUDIÊNCIA DE INSTRUÇÃO'
                },
                {
                    tipoId: '',
                    dataParaFinalizacao: new Date(),
                    responsavel: '',
                    executor: '',
                    descricao: 'CONTATAR CLIENTE'
                },
                {
                    tipoId: '',
                    dataParaFinalizacao: new Date(),
                    responsavel: '',
                    executor: '',
                    descricao: 'SMS E WHATSAPP'
                },
                {
                    tipoId: '',
                    dataParaFinalizacao: new Date(),
                    responsavel: '',
                    executor: '',
                    descricao: 'LEMBRAR CLIENTE'
                },
                {
                    tipoId: '',
                    dataParaFinalizacao: new Date(),
                    responsavel: '',
                    executor: '',
                    descricao: 'ANÁLISE'
                }
            ],
            quantidadeTarefas: 5,
            tipoCompromisso: 'AUDIÊNCIA DE INSTRUÇÃO',
            descricao: '202311800989 (ORIGEM 201811800803) - AUDIÊNCIA DE INSTRUÇÃO DE LAILTON DE SOUZA AGUIAR (085.650.825-04) X NOME_DO_RÉU, NO DIA DD/MM/AAAA ÀS ${cliente.compromisso.horario}, LOCAL: LOCAL_DO_EVENTO',
            semanas: 2,
            publicacao: 'DD/MM/AAAA',
            peritoOrReu: 'NOME_DO_RÉU',
            local: 'LOCAL_DO_EVENTO',
            horario: 'HH:MM',
        },
        processo: {
            id: '',
            origem: '201811800803',
            dependente: '202311800989',
            reu: 'NOME_DO_RÉU',
            responsavel: '',
            natureza: 'TRABALHISTA',
            merito: '',
            vara: '',
            acao: '',
            idsCopias: [],
            cidade: "ARACAJU",
            estado: "SERGIPE"
        }
    }

    beforeEach(() => {
        cliente.compromisso.tarefas = [
            {
                tipoId: '',
                dataParaFinalizacao: new Date(),
                responsavel: '',
                executor: '',
                descricao: 'AUDIÊNCIA DE INSTRUÇÃO'
            },
            {
                tipoId: '',
                dataParaFinalizacao: new Date(),
                responsavel: '',
                executor: '',
                descricao: 'CONTATAR CLIENTE'
            },
            {
                tipoId: '',
                dataParaFinalizacao: new Date(),
                responsavel: '',
                executor: '',
                descricao: 'SMS E WHATSAPP'
            },
            {
                tipoId: '',
                dataParaFinalizacao: new Date(),
                responsavel: '',
                executor: '',
                descricao: 'LEMBRAR CLIENTE'
            },
            {
                tipoId: '',
                dataParaFinalizacao: new Date(),
                responsavel: '',
                executor: '',
                descricao: 'ANÁLISE'
            }
        ]
    })

    it('Gerar descrição para tarefa "AUDIÊNCIA" em compromisso de audiência', () => {

        const getDescricaoMock = {
            fistWordInTarefa: 'AUDIENCIA',
            localText: 'LOCAL_DO_EVENTO',
            numero: '202311800989 (ORIGEM 201811800803)',
            tipoTarefaNormalizado: 'AUDIENCIA',
            tipoCompromissoNormalizado: 'AUDIENCIA'
        }

        const resultDescription = getDescricao(cliente.compromisso.tarefas[0], cliente, getDescricaoMock)

        const expectedDescription = '202311800989 (ORIGEM 201811800803) - AUDIÊNCIA DE INSTRUÇÃO DE LAILTON DE SOUZA AGUIAR (085.650.825-04) X NOME_DO_RÉU, NO DIA DD/MM/AAAA ÀS ${cliente.compromisso.horario}, LOCAL: LOCAL_DO_EVENTO'

        expect(resultDescription).toBe(expectedDescription)
    })

    it('Gerar descrição para tarefa "CONTATAR CLIENTE" em compromisso de audiência', () => {
        cliente.compromisso.tarefas = [
            {
                tipoId: '',
                dataParaFinalizacao: new Date(),
                responsavel: '',
                executor: '',
                descricao: 'CONTATAR CLIENTE'
            },
            {
                tipoId: '',
                dataParaFinalizacao: new Date(),
                responsavel: '',
                executor: '',
                descricao: 'SMS E WHATSAPP'
            },
            {
                tipoId: '',
                dataParaFinalizacao: new Date(),
                responsavel: '',
                executor: '',
                descricao: 'LEMBRAR CLIENTE'
            },
            {
                tipoId: '',
                dataParaFinalizacao: new Date(),
                responsavel: '',
                executor: '',
                descricao: 'ANÁLISE'
            }
        ]

        const getDescricaoMock = {
            fistWordInTarefa: 'CONTATAR',
            localText: 'LOCAL_DO_EVENTO',
            numero: '202311800989 (ORIGEM 201811800803)',
            tipoTarefaNormalizado: 'CONTATAR CLIENTE',
            tipoCompromissoNormalizado: 'AUDIENCIA'
        }

        const resultDescription = getDescricao(cliente.compromisso.tarefas[0], cliente, getDescricaoMock)

        const expectedDescription = '202311800989 (ORIGEM 201811800803) - AUDIÊNCIA DE INSTRUÇÃO DE LAILTON DE SOUZA AGUIAR (085.650.825-04) X NOME_DO_RÉU, NO DIA DD/MM/AAAA ÀS ${cliente.compromisso.horario}, LOCAL: LOCAL_DO_EVENTO'

        expect(resultDescription).toBe(expectedDescription)
    })

    it('Gerar descrição para tarefa "SMS E WHATSAPP" em compromisso de audiência', () => {
        cliente.compromisso.tarefas = [
            {
                tipoId: '',
                dataParaFinalizacao: new Date(),
                responsavel: '',
                executor: '',
                descricao: 'SMS E WHATSAPP'
            },
            {
                tipoId: '',
                dataParaFinalizacao: new Date(),
                responsavel: '',
                executor: '',
                descricao: 'LEMBRAR CLIENTE'
            },
            {
                tipoId: '',
                dataParaFinalizacao: new Date(),
                responsavel: '',
                executor: '',
                descricao: 'ANÁLISE'
            }
        ]

        const getDescricaoMock = {
            fistWordInTarefa: 'SMS',
            localText: 'LOCAL_DO_EVENTO',
            numero: '202311800989 (ORIGEM 201811800803)',
            tipoTarefaNormalizado: 'SMS E WHATSAPP',
            tipoCompromissoNormalizado: 'AUDIENCIA'
        }

        const resultDescription = getDescricao(cliente.compromisso.tarefas[0], cliente, getDescricaoMock)

        const expectedDescription = '202311800989 (ORIGEM 201811800803) - AUDIÊNCIA DE INSTRUÇÃO DE LAILTON DE SOUZA AGUIAR (085.650.825-04) X NOME_DO_RÉU, NO DIA DD/MM/AAAA ÀS ${cliente.compromisso.horario}, LOCAL: LOCAL_DO_EVENTO'

        expect(resultDescription).toBe(expectedDescription)
    })

    it('Gerar descrição para tarefa "LEMBRAR CLIENTE" em compromisso de audiência', () => {
        cliente.compromisso.tarefas = [
            {
                tipoId: '',
                dataParaFinalizacao: new Date(),
                responsavel: '',
                executor: '',
                descricao: 'LEMBRAR CLIENTE'
            },
            {
                tipoId: '',
                dataParaFinalizacao: new Date(),
                responsavel: '',
                executor: '',
                descricao: 'ANÁLISE'
            }
        ]

        const getDescricaoMock = {
            fistWordInTarefa: 'LEMBRAR',
            localText: 'LOCAL_DO_EVENTO',
            numero: '202311800989 (ORIGEM 201811800803)',
            tipoTarefaNormalizado: 'LEMBRAR CLIENTE',
            tipoCompromissoNormalizado: 'AUDIENCIA'
        }

        const resultDescription = getDescricao(cliente.compromisso.tarefas[0], cliente, getDescricaoMock)

        const expectedDescription = '202311800989 (ORIGEM 201811800803) - AUDIÊNCIA DE INSTRUÇÃO DE LAILTON DE SOUZA AGUIAR (085.650.825-04) X NOME_DO_RÉU, NO DIA DD/MM/AAAA ÀS ${cliente.compromisso.horario}, LOCAL: LOCAL_DO_EVENTO'

        expect(resultDescription).toBe(expectedDescription)
    })

    it('Gerar descrição para tarefa "ANÁLISE" em compromisso de audiência', () => {
        cliente.compromisso.tarefas = [
            {
                tipoId: '',
                dataParaFinalizacao: new Date(),
                responsavel: '',
                executor: '',
                descricao: 'ANÁLISE'
            }
        ]
        const getDescricaoMock = {
            fistWordInTarefa: 'ANALISE',
            localText: 'LOCAL_DO_EVENTO',
            numero: '202311800989 (ORIGEM 201811800803)',
            tipoTarefaNormalizado: 'ANALISE',
            tipoCompromissoNormalizado: 'AUDIENCIA'
        }

        const resultDescription = getDescricao(cliente.compromisso.tarefas[0], cliente, getDescricaoMock)

        const expectedDescription = '202311800989 (ORIGEM 201811800803) - VERIFICAR NECESSIDADE DE TESTEMUNHAS'

        expect(resultDescription).toBe(expectedDescription)
    })

})