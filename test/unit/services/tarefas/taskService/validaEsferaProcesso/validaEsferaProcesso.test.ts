import { describe, expect, it, beforeEach } from '@jest/globals'

import { validaEsferaProcesso }  from "../../../../../../src/services/tarefas/taskService"

describe('Function validaEsferaProcesso: Verificar se a quantidade de caracteres de um processo corresponde a um processo federal, estadual ou emite erro quando não correspondente', () => {

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

    it('Verificar, com sucesso, que é um processo judicial federal', () => {

        cliente.processo.origem = '202410201331'

        const resultado = validaEsferaProcesso(cliente)

        expect(resultado).toBe(true)
    })
    it('Verificar, com sucesso, que é um processo judicial estadual', () => {
        
        cliente.processo.origem = '00085853620244058500'

        const resultado = validaEsferaProcesso(cliente)

        expect(resultado).toBe(false)
    })
    it('Confirmar um erro no cadastro do processo', () => {
        const expectedError = new Error("Erro no cadastro do número do processo") as unknown as Record<string, unknown>

        cliente.processo.origem = '0008585362024405850'


        try {
            validaEsferaProcesso(cliente)
        } catch (error) {
            expect(error).toMatchObject(expectedError)
        }

    })
})
