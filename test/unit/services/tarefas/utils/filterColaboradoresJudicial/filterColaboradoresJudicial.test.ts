import { describe, expect, it, beforeEach } from '@jest/globals'

import { filterColaboradoresJudicial } from '../../../../../../src/services/tarefas/index'
import { Cliente } from '../../../../../../src/models/cliente/Cliente'

describe('Function filterColaboradoresJudicial: Filtra colaboradores executores da tarefa', () => {
    let cliente: Cliente = {
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
            acaoColetiva: '',
            idsCopias: [''],
            cidade: "ARACAJU",
            estado: "SERGIPE"
        }
    }

    beforeEach(() => {
        cliente.processo.origem = '201811800803'
        cliente.processo.dependente = '202311800989'
    })

    it('Filtrar colaboradores de responsabilidade de BSB', () => {

        cliente.processo.estado = 'DF'

        const expectedResult = [
            {
                id: '215',
                nome: "JÚLIA ROBERTA DE FÁTIMA SOUSA ARAÚJO",
                interiores: [],
                datasViagem: [],
                tarefas: 0
            },
            {
                id: '223',
                nome: "MATHEUS CAMPELO DA SILVA",
                interiores: [],
                datasViagem: [],
                tarefas: 0
            },
            {
                id: '222',
                nome: "STEFANNY MORAIS DO NASCIMENTO",
                interiores: [],
                datasViagem: [],
                tarefas: 0
            },
        ]

        const resultado = filterColaboradoresJudicial(cliente)

        expect(resultado).toMatchObject(expectedResult)
    })

    it('Filtrar colaboradores de responsabilidade de Estância', () => {
        cliente.cidade = 'ESTANCIA'
        cliente.localAtendido = 'ESTANCIA'
        cliente.processo.estado = 'SE'

        const expectedResult = [
            {
                id: '22',
                nome: "SANDOVAL FILHO CORREIA LIMA FILHO",
                interiores: [],
                datasViagem: [],
                tarefas: 0
            }
        ]

        const resultado = filterColaboradoresJudicial(cliente)

        expect(resultado).toMatchObject(expectedResult)
    })

    it('Filtrar colaboradores de responsabilidade das demais localidades', () => {
        cliente.cidade = 'ARACAJU'
        cliente.localAtendido = 'ARACAJU'
        cliente.processo.estado = 'SE'

        const expectedResult = [
            {
                id: '196',
                nome: "KAUÃ DE CARVALHO NASCIMENTO",
                interiores: [],
                datasViagem: [],
                tarefas: 0
            },
            {
                id: '199',
                nome: "LUCAS NATHAN NOGUEIRA DA SILVA ",
                interiores: ["ESTANCIA", "TOBIAS BARRETO", "PEDRINHAS"],
                datasViagem: [],
                tarefas: 0
            },
            {
                id: '188',
                nome: "VINICIUS SOUSA BOMFIM",
                interiores: ["UMBAUBA", "CARMOPOLIS", "LOTEAMENTO JEOVA (BOTAFOGO)"],
                datasViagem: [],
                tarefas: 0
            },
            {
                id: '94',
                nome: "CARLOS HENRIQUE ESPASIANI",
                interiores: ["CAPELA", "JAPARATUBA", "CONDE/BA", "ALAGOINHAS"],
                datasViagem: [],
                tarefas: 0
            },
            {
                id: '131',
                nome: "ASLEY RODRIGO DE MELO LIMA",
                interiores: [],
                datasViagem: [],
                tarefas: 0
            },
            {
                id: '161',
                nome: "YURI DIAS PEREIRA",
                interiores: [],
                datasViagem: [],
                tarefas: 0
            },
        ]

        const resultado = filterColaboradoresJudicial(cliente)

        expect(resultado).toMatchObject(expectedResult)
    })

    it('Filtrar colaboradores quando responsabilidade não identificada', () => {
        const isMocked = true
        cliente.cidade = 'ARACAJU'
        cliente.localAtendido = 'ARACAJU'
        cliente.processo.estado = 'SE'
        cliente.processo.vara = '7ª VARA FEDERAL'

        const expectedResult = [
            {
                id: '196',
                nome: "KAUÃ DE CARVALHO NASCIMENTO",
                interiores: [],
                datasViagem: [],
                tarefas: 0
            },
            {
                id: '199',
                nome: "LUCAS NATHAN NOGUEIRA DA SILVA ",
                interiores: ["ESTANCIA", "TOBIAS BARRETO", "PEDRINHAS"],
                datasViagem: [],
                tarefas: 0
            },
            {
                id: '188',
                nome: "VINICIUS SOUSA BOMFIM",
                interiores: ["UMBAUBA", "CARMOPOLIS", "LOTEAMENTO JEOVA (BOTAFOGO)"],
                datasViagem: [],
                tarefas: 0
            },
            {
                id: '94',
                nome: "CARLOS HENRIQUE ESPASIANI",
                interiores: ["CAPELA", "JAPARATUBA", "CONDE/BA", "ALAGOINHAS"],
                datasViagem: [],
                tarefas: 0
            },
            {
                id: '131',
                nome: "ASLEY RODRIGO DE MELO LIMA",
                interiores: [],
                datasViagem: [],
                tarefas: 0
            },
            {
                id: '161',
                nome: "YURI DIAS PEREIRA",
                interiores: [],
                datasViagem: [],
                tarefas: 0
            },
            {
                id: '22',
                nome: "SANDOVAL FILHO CORREIA LIMA FILHO",
                interiores: [],
                datasViagem: [],
                tarefas: 0
            }
        ]

        const resultado = filterColaboradoresJudicial(cliente, isMocked)

        expect(resultado).toMatchObject(expectedResult)
    })
})
