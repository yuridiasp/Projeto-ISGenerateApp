import { describe, expect, it, jest, beforeEach } from "@jest/globals"

import { getSelectsTask } from "../../../../../src/services/seletores/seletoresService"
import { createBodyForCreateTask } from "../../../../../src/repositories/tarefas/create/createBodyForCreateTask"
import { createTarefaRepository } from "../../../../../src/repositories/tarefas/create/createTarefaRepository"
import { createTaskService } from '../../../../../src/services/tarefas/index'
import { Cliente } from "../../../../../src/models/cliente/Cliente"
import { seletores } from "../../../../../src/models/seletores/iSeletores"
import { iCreateTarefa } from "../../../../../src/models/tarefa/iCreateTarefa"
import { idTarefa } from "../../../../../src/services/tarefas/utils/isTarefaSuccessfullyCreated"
import { Result } from "../../../../../src/models/result/result"

jest.mock("../../../../../src/services/seletores/seletoresService")
jest.mock("../../../../../src/repositories/tarefas/create/createTarefaRepository")
jest.mock("../../../../../src/repositories/tarefas/create/createBodyForCreateTask")

const mockedGetSelectsTask = jest.mocked(getSelectsTask)
const mockedCreateBodyForCreateTask = jest.mocked(createBodyForCreateTask)
const mockedCreateTarefaRepository = jest.mocked(createTarefaRepository)

describe("Function createTaskService", () => {
    const seletoresFake: { colaboradores: seletores[]; tiposTarefas: seletores[] } = {
        colaboradores: [],
        tiposTarefas: []
    }
    const bodysFake: iCreateTarefa[] = [{
        idCO: "",
        idPR: "",
        agendada: "",
        acaoColetiva: "",
        idTipoTarefa: "",
        dataParaFinalizacao: "",
        descricao: "",
        idResponsavel: "",
        idExecutor: ""
    }]
    const cookieFake = "cookie"
    const clienteFake: Cliente = {
        id: "",
        nome: "",
        cpf: "",
        cidade: "",
        estado: "",
        localAtendido: "",
        parceiro: "",
        situacao: "",
        compromisso: {
            id: "",
            prazoInterno: "",
            prazoFatal: "",
            tarefas: [],
            quantidadeTarefas: 0,
            tipoCompromisso: "",
            descricao: "",
            semanas: 0,
            publicacao: "",
            peritoOrReu: "",
            local: "",
            horario: ""
        },
        processo: {
            id: "",
            origem: "",
            reu: "",
            responsavel: "",
            natureza: "",
            merito: "",
            cidade: "",
            estado: "",
            vara: ""
        }
    }

    beforeEach(() => {
        jest.clearAllMocks()
    })

    it("Sucesso na criação da tarefa", async () => {
        const fakePositiveResult: Result<idTarefa> = {
            success: true,
            data: { id: 'idFake' }
        }

        mockedGetSelectsTask.mockResolvedValue(seletoresFake)
        mockedCreateBodyForCreateTask.mockResolvedValue(bodysFake)
        mockedCreateTarefaRepository.mockResolvedValue(fakePositiveResult)

        const resultado = await createTaskService(clienteFake, cookieFake)
        
        expect(resultado[0].success).toBeTruthy()
    })
})