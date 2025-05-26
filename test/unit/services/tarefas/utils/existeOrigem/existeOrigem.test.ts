import { describe, expect, it, beforeEach } from '@jest/globals'

import { existeOrigem } from '../../../../../../src/services/tarefas/index'

describe('Function existeOrigem: Verificar se há processo dependente para construir a string referente ao número do processo da tarefa', () => {
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
            idsCopias: [''],
            cidade: "ARACAJU",
            estado: "SERGIPE"
        }
    }

    beforeEach(() => {
        cliente.processo.origem = '201811800803'
        cliente.processo.dependente = '202311800989'
    })

    it('Existe processo dependente', () => {

        const expectResultHasOrigem = '202311800989 (ORIGEM 201811800803)'
        const resultadoHasOrigem = existeOrigem(cliente)
    
        expect(resultadoHasOrigem).toBe(expectResultHasOrigem)
    })

    it('Não existe processo dependente', () => {
        cliente.processo.dependente = ''

        const expectResultNotHasOrigem = '201811800803'
        const resultadoNotHasOrigem = existeOrigem(cliente)
    
        expect(resultadoNotHasOrigem).toBe(expectResultNotHasOrigem)
    })
})