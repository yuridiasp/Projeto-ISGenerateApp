import { beforeAll, describe, expect, it } from '@jest/globals'
import { createCompromissoService } from "../../../../src/services/compromissos/index"
import { getCookieLoginService } from '../../../../src/services/login/loginService'
import { Cliente } from '../../../../src/models/cliente/Cliente'

require('dotenv').config()

describe("Criar compromisso de Teste", () => {

    let cookie: string

    beforeAll(async () => {
        const result = await getCookieLoginService()

        if (result.success) {
            cookie = result.data.cookie
        }
    })

    it.skip("", async () => {
        const date = new Date()
        const cliente: Cliente = {
            processo: {
                origem: "08040832120244058500",
                id: '',
                reu: '',
                responsavel: '',
                natureza: '',
                merito: '',
                cidade: '',
                estado: '',
                vara: ''
            },
            compromisso: {
                descricao: "Teste",
                prazoFatal: date.toLocaleDateString(),
                prazoInterno: date.toLocaleDateString(),
                publicacao: date.toLocaleDateString(),
                id: '',
                tarefas: [],
                quantidadeTarefas: 0,
                tipoCompromisso: '',
                semanas: 0,
                peritoOrReu: '',
                local: '',
                horario: ''
            },
            id: '40860',
            nome: 'EVERTON SANTOS BISPO',
            cpf: '030.699.385-66',
            cidade: 'CARMOPOLIS',
            estado: 'SE',
            localAtendido: 'CARMÓPOLIS',
            parceiro: 'EDSON DE SOUZA SANTOS ARACAJU (PARCEIRO)',
            situacao: 'CLIENTE 1ª VEZ'
        }
        
        const result = await createCompromissoService(cliente, cookie)

        expect(result).toBe(true)
    })
})