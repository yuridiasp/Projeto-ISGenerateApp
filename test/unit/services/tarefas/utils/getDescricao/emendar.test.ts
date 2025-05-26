import { describe, expect, it, beforeEach } from '@jest/globals';

import { getDescricao, getDescricaoMockDTO } from '../../../../../../src/services/tarefas/index'

describe('Function getDescricao: Construir descrição da tarefa em compromisso de Emendar', () => {

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
            prazoFatal: '',
            tarefas: [
                {
                    tipoId: '',
                    dataParaFinalizacao: new Date(),
                    responsavel: '',
                    executor: '',
                    descricao: 'EMENDAR'
                },
                {
                    tipoId: '',
                    dataParaFinalizacao: new Date(),
                    responsavel: '',
                    executor: '',
                    descricao: 'CONTATAR CLIENTE'
                }
            ],
            quantidadeTarefas: 2,
            tipoCompromisso: 'EMENDAR',
            descricao: '202311800989 (ORIGEM 201811800803) - EMENDAR',
            semanas: 0,
            publicacao: '',
            peritoOrReu: '',
            local: '',
            horario: '',
        },
        processo: {
            id: '',
            origem: '',
            dependente: '',
            reu: '',
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
                descricao: 'EMENDAR'
            },
            {
                tipoId: '',
                dataParaFinalizacao: new Date(),
                responsavel: '',
                executor: '',
                descricao: 'CONTATAR CLIENTE'
            }
        ]
    })

    it('Gerar descrição para tarefa "EMENDAR" em compromisso de emendar', () => {

        const getDescricaoMock: getDescricaoMockDTO = {
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
        cliente.compromisso.tarefas = [
            {
                tipoId: '',
                dataParaFinalizacao: new Date(),
                responsavel: '',
                executor: '',
                descricao: 'CONTATAR CLIENTE'
            }
        ]

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