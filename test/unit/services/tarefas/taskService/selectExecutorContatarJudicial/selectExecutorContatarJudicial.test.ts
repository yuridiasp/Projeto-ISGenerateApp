import { describe, expect, it, beforeEach } from '@jest/globals'

import { selectExecutorContatarJudicial } from "../../../../../../src/services/tarefas/taskService"

describe('Function selectExecutorContatarJudicial: Selecionar executor da tarefa de acordo com responsabilidade ou disponibilidade', () => {

    const removeAcentuacaoStringMock = (string: string) => {
        return string
    }

    let cliente = {
        id: '',
        nome: '',
        cpf: '',
        cidade: '',
        estado: 'SE',
        localAtendido: 'ARACAJU',
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
        cliente = {
            id: '',
            nome: '',
            cpf: '',
            cidade: '',
            estado: 'SE',
            localAtendido: 'ARACAJU',
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
    })

    const aracaju = [
        {
            id: '196',
            nome: "KAUÃ DE CARVALHO NASCIMENTO",
            interiores: [],
            datasViagem: [],
            tarefas: 10
        },
        {
            id: '199',
            nome: "LUCAS NATHAN NOGUEIRA DA SILVA",
            interiores: ["ESTANCIA", "TOBIAS BARRETO", "PEDRINHAS"],
            datasViagem: [],
            tarefas: 19
        },
        {
            id: '188',
            nome: "VINICIUS SOUSA BOMFIM",
            interiores: ["UMBAUBA", "CARMOPOLIS", "LOTEAMENTO JEOVA (BOTAFOGO)"],
            datasViagem: [],
            tarefas: 7
        }
    ]

    it('Selecionar responsavel pelo respectivo interior do cliente', () => {

        cliente.processo.estado = 'SE'
        cliente.localAtendido = 'TOBIAS BARRETO'

        const resultado = selectExecutorContatarJudicial(aracaju, cliente, removeAcentuacaoStringMock)

        expect(resultado).toMatchObject({ responsavel: "JULIANO OLIVEIRA DE SOUZA", executor: "LUCAS NATHAN NOGUEIRA DA SILVA" })
    })

    it('Selecionar responsavel por cliente de BSB', () => {

        cliente.processo.estado = 'DF'
        cliente.localAtendido = 'AGUAS LINDAS'

        const brasilia = [
            {
                id: '215',
                nome: "JÚLIA ROBERTA DE FÁTIMA SOUSA ARAÚJO",
                interiores: [],
                datasViagem: [],
                tarefas: 5
            },
            {
                id: '223',
                nome: "MATHEUS CAMPELO DA SILVA",
                interiores: [],
                datasViagem: [],
                tarefas: 4
            },
            {
                id: '222',
                nome: "STEFANNY MORAIS DO NASCIMENTO",
                interiores: [],
                datasViagem: [],
                tarefas: 2
            },
        ]

        const resultado = selectExecutorContatarJudicial(brasilia, cliente, removeAcentuacaoStringMock)

        expect(resultado).toMatchObject({ responsavel: "HENYR GOIS DOS SANTOS", executor: "STEFANNY MORAIS DO NASCIMENTO" })
    })

    it('Selecionar responsavel por cliente de Estância', () => {

        cliente.processo.estado = 'SE'
        cliente.localAtendido = 'ESTANCIA'
        cliente.cidade = 'ESTANCIA'

        const estancia = [
            {
                id: '22',
                nome: "SANDOVAL FILHO CORREIA LIMA FILHO",
                interiores: [],
                datasViagem: [],
                tarefas: 0
            }
        ]

        const resultado = selectExecutorContatarJudicial(estancia, cliente, removeAcentuacaoStringMock)

        expect(resultado).toMatchObject({ responsavel: "SANDOVAL FILHO CORREIA LIMA FILHO", executor: "SANDOVAL FILHO CORREIA LIMA FILHO" })
    })

    it('Selecionar responsavel por cliente de outras localidades e que possui o menor número de tarefas de intimação', () => {

        cliente.processo.estado = 'SE'
        cliente.localAtendido = 'ARACAJU'

        const resultado = selectExecutorContatarJudicial(aracaju, cliente, removeAcentuacaoStringMock)

        expect(resultado).toMatchObject({ responsavel: "JULIANO OLIVEIRA DE SOUZA", executor: "VINICIUS SOUSA BOMFIM" })
    })
})