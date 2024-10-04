import { describe, expect, it, beforeEach } from '@jest/globals';

import { getParametroData } from "../../../../../../src/services/tarefas/taskService"

describe('Function getParametroData: Definir o parâmetro para o cálculo de prazo', () => {

    const parametros = {
        tarefaContatar: 1,
        tarefaAdvogado: 2
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

    it('Tarefas do evento de audiência', () => {
        const arrayAudiencias = [
            {
                descricao: "AUDIÊNCIA DE INSTRUÇÃO E JULGAMENTO",
                tipoId: '',
                dataParaFinalizacao: new Date(),
                responsavel: '',
                executor: ''
            },
            {
                descricao: "AUDIÊNCIA UNA",
                tipoId: '',
                dataParaFinalizacao: new Date(),
                responsavel: '',
                executor: ''
            },
            {
                descricao: "AUDIÊNCIA DE INSTRUÇÃO",
                tipoId: '',
                dataParaFinalizacao: new Date(),
                responsavel: '',
                executor: ''
            },
            {
                descricao: "AUDIÊNCIA INICIAL",
                tipoId: '',
                dataParaFinalizacao: new Date(),
                responsavel: '',
                executor: ''
            },
            {
                descricao: "AUDIÊNCIA INAUGURAL",
                tipoId: '',
                dataParaFinalizacao: new Date(),
                responsavel: '',
                executor: ''
            }
        ]

        const resultados = arrayAudiencias.map(audiencia => {
            cliente.compromisso.tipoCompromisso = audiencia.descricao
            return getParametroData(audiencia, cliente)
        })

        resultados.forEach(resultado => expect(resultado).toBe(parametros.tarefaAdvogado))
    })

    it('Tarefas de contatar e mensagem por whatsapp', () => {
        const tarefas = [
            {
                descricao: 'CONTATAR CLIENTE',
                tipoId: '',
                dataParaFinalizacao: new Date(),
                responsavel: '',
                executor: ''
            },
            {
                descricao: 'SMS E WHATSAPP',
                tipoId: '',
                dataParaFinalizacao: new Date(),
                responsavel: '',
                executor: ''},
            {
                descricao: 'LEMBRAR CLIENTE',
                tipoId: '',
                dataParaFinalizacao: new Date(),
                responsavel: '',
                executor: ''
            }
        ]

        const resultados = tarefas.map(tarefa => {
            cliente.compromisso.tipoCompromisso = tarefa.descricao
            return getParametroData(tarefa, cliente)
        })

        resultados.forEach(resultado => expect(resultado).toBe(parametros.tarefaContatar))
    })

    it('Tarefa para o advogado', () => {
        const tarefa = {
            descricao: "MANIFESTAÇÃO SOBRE DOCUMENTOS",
            tipoId: '',
            dataParaFinalizacao: new Date(),
            responsavel: '',
            executor: ''
        }

        const resultado = getParametroData(tarefa, cliente)

        expect(resultado).toBe(parametros.tarefaAdvogado)
    })
})