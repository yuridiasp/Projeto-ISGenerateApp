import { describe, expect, it, beforeEach } from '@jest/globals';

import { getDescricao } from "../../../../../../src/services/tarefas/taskService"

describe('Function getDescricao: Construir descrição da tarefa em compromisso de Perícia', () => {

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
                }
            ],
            quantidadeTarefas: 3,
            tipoCompromisso: 'PERICIA MÉDICA',
            descricao: '311800989 (ORIGEM 201811800803) - PERICIA MÉDICA DE LAILTON DE SOUZA AGUIAR (085.650.825-04), NO DIA DD/MM/AAAA ÀS HH:MM, PERITO: PERITO QUALQUER, LOCAL: CLÍNICA CLIMAGEM',
            semanas: 2,
            publicacao: '',
            peritoOrReu: 'PERITO QUALQUER',
            local: '',
            horario: 'HH:MM',
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
            }
        ]
    })

    it('Gerar descrição para tarefa "CONTATAR CLIENTE" em compromisso de perícia', () => {
        
        const getDescricaoMock = {
            fistWordInTarefa: 'CONTATAR',
            localText: 'CLÍNICA CLIMAGEM',
            numero: '202311800989 (ORIGEM 201811800803)',
            tipoTarefaNormalizado: 'CONTATAR CLIENTE',
            tipoCompromissoNormalizado: 'PERICIA MEDICA'
        }

        const resultDescription = getDescricao(cliente.compromisso.tarefas[0], cliente, getDescricaoMock)

        const expectedDescription = '202311800989 (ORIGEM 201811800803) - PERICIA MÉDICA DE LAILTON DE SOUZA AGUIAR (085.650.825-04), NO DIA DD/MM/AAAA ÀS HH:MM, PERITO: PERITO QUALQUER, LOCAL: CLÍNICA CLIMAGEM'

        expect(resultDescription).toBe(expectedDescription)
    })

    it('Gerar descrição para tarefa "SMS E WHATSAPP" em compromisso de perícia', () => {
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
            }
        ]

        const getDescricaoMock = {
            fistWordInTarefa: 'SMS',
            localText: 'CLÍNICA CLIMAGEM',
            numero: '202311800989 (ORIGEM 201811800803)',
            tipoTarefaNormalizado: 'SMS E WHATSAPP',
            tipoCompromissoNormalizado: 'PERICIA MEDICA'
        }

        const resultDescription = getDescricao(cliente.compromisso.tarefas[0], cliente, getDescricaoMock)

        const expectedDescription = '202311800989 (ORIGEM 201811800803) - PERICIA MÉDICA DE LAILTON DE SOUZA AGUIAR (085.650.825-04), NO DIA DD/MM/AAAA ÀS HH:MM, PERITO: PERITO QUALQUER, LOCAL: CLÍNICA CLIMAGEM'

        expect(resultDescription).toBe(expectedDescription)
    })

    it('Gerar descrição para tarefa "LEMBRAR CLIENTE" em compromisso de perícia', () => {
        cliente.compromisso.tarefas = [
            {
                tipoId: '',
                dataParaFinalizacao: new Date(),
                responsavel: '',
                executor: '',
                descricao: 'LEMBRAR CLIENTE'
            }
        ]

        const getDescricaoMock = {
            fistWordInTarefa: 'LEMBRAR',
            localText: 'CLÍNICA CLIMAGEM',
            numero: '202311800989 (ORIGEM 201811800803)',
            tipoTarefaNormalizado: 'LEMBRAR CLIENTE',
            tipoCompromissoNormalizado: 'PERICIA MEDICA'
        }

        const resultDescription = getDescricao(cliente.compromisso.tarefas[0], cliente, getDescricaoMock)

        const expectedDescription = '202311800989 (ORIGEM 201811800803) - PERICIA MÉDICA DE LAILTON DE SOUZA AGUIAR (085.650.825-04), NO DIA DD/MM/AAAA ÀS HH:MM, PERITO: PERITO QUALQUER, LOCAL: CLÍNICA CLIMAGEM'

        expect(resultDescription).toBe(expectedDescription)
    })

    it('Gerar descrição para tarefa "ATO ORDINATÓRIO" em compromisso de perícia', () => {
        cliente.compromisso.quantidadeTarefas = 4
        cliente.compromisso.tarefas = [
            {
                tipoId: '',
                dataParaFinalizacao: new Date(),
                responsavel: '',
                executor: '',
                descricao: 'ATO ORDINATÓRIO'
            }
        ]

        const getDescricaoMock = {
            fistWordInTarefa: 'ATO',
            localText: 'CLÍNICA CLIMAGEM',
            numero: '202311800989 (ORIGEM 201811800803)',
            tipoTarefaNormalizado: 'ATO ORDINATORIO',
            tipoCompromissoNormalizado: 'PERICIA MEDICA'
        }

        const resultDescription = getDescricao(cliente.compromisso.tarefas[0], cliente, getDescricaoMock)

        const expectedDescription = '202311800989 (ORIGEM 201811800803) - ATO ORDINATÓRIO (PERÍCIA DESIGNADA)'

        expect(resultDescription).toBe(expectedDescription)
    })
})