import { describe, expect, it, jest, beforeEach } from "@jest/globals"

import { iWindows } from "../../src/models/windows/iWindows.models"
import {
  handleIntimationsRegistrationService,
  tHandleIntimation
} from "../../src/services/intimation/handleIntimationsRegistration.services"
import { getFileData } from "./utils/getFileData"
import { Result } from "../../src/models/results/result.models"
import { getObjectValidateIntimationsService } from "../../src/services/validateIntimations/validateIntimations.services"
import { createClienteService } from "../../src/services/clientes"
import { createCompromissoService } from "../../src/services/compromissos"
import { getSelectsTask } from "../../src/services/seletores"
import {
  createTaskService,
  getListaTarefasCompromissoJudicial,
  taskFactory
} from "../../src/services/tarefas"
import { updateViewRegistrationIntimations } from "../../src/utils/viewHelpers/viewHelpers.utils"
import { errorsCodeList } from "../../src/helpers/errorsCode.helpers"

jest.mock("../../src/services/validateIntimations/validateIntimations.services", () => ({
  __esModule: true,
  getObjectValidateIntimationsService: jest.fn()
}))

jest.mock("../../src/services/clientes", () => ({
  __esModule: true,
  createClienteService: jest.fn()
}))

jest.mock("../../src/services/compromissos", () => ({
  __esModule: true,
  createCompromissoService: jest.fn()
}))

jest.mock("../../src/services/seletores", () => ({
  __esModule: true,
  getSelectsTask: jest.fn()
}))

jest.mock("../../src/services/tarefas", () => ({
  __esModule: true,
  createTaskService: jest.fn(),
  getListaTarefasCompromissoJudicial: jest.fn(),
  taskFactory: jest.fn()
}))

jest.mock("../../src/utils/viewHelpers/viewHelpers.utils", () => ({
  __esModule: true,
  updateViewRegistrationIntimations: jest.fn()
}))

const cookie = "cookie-test"

const mockSuccessSentenca = {
  success: true,
  data: {
    file: [{
      case_number: "202488101866",
      description: "SENTENCA",
      publication_date: "30/09/2025",
      related_case_number: null,
      internal_deadline: "06/06/2026",
      fatal_deadline: "11/06/2026",
      time: null,
      expert_or_defendant: null,
      local_adress: null,
      dataCliente: undefined,
      dataProcesso: undefined,
      executor: "KEVEN",
      separate_task: null,
      justification: null,
      paragraph: "202488101866 - SENTENCA - (06/06/2026 - 11/06/2026) - KEVEN"
    }]
  }
} as never

const mockSuccessPericia = {
  success: true,
  data: {
    file: [{
      case_number: "202488101866",
      description: "PERICIA MEDICA",
      publication_date: "30/09/2025",
      related_case_number: null,
      internal_deadline: "01/07/2026",
      fatal_deadline: "01/07/2026",
      time: "07:00",
      expert_or_defendant: "MONICA FULANA DE TAL",
      local_adress: "FORUM DE ALGUM LUGAR",
      dataCliente: undefined,
      dataProcesso: undefined,
      executor: "(ADM)",
      separate_task: null,
      justification: null,
      paragraph: "202488101866 - PERICIA MEDICA - (01/07/2026 AS 07:00) - (ADM)"
    }]
  }
} as never

function mockCliente() {
  return {
    compromisso: {
      id: null,
      tarefas: null,
      quantidadeTarefas: null
    },
    processo: {}
  } as any
}

function arrangeSuccessfulCreation(validationResult: never) {
  const cliente = mockCliente()
  const tarefas = [{ descricao: "CONTATAR CLIENTE" }]
  const compromisso = [{ id: "compromisso-1" }]
  const tarefasRegistradas = [{ id: "tarefa-1" }]

  jest.mocked(getObjectValidateIntimationsService).mockResolvedValueOnce(validationResult)
  jest.mocked(getSelectsTask).mockResolvedValueOnce({ tiposTarefas: [] } as any)
  jest.mocked(createClienteService).mockResolvedValueOnce({
    success: true,
    data: { cliente }
  } as any)
  jest.mocked(createCompromissoService).mockResolvedValueOnce({
    success: true,
    data: { successfulRecordCount: { registeredSuccessfully: compromisso } }
  } as any)
  jest.mocked(getListaTarefasCompromissoJudicial).mockReturnValueOnce(["CONTATAR CLIENTE"])
  jest.mocked(taskFactory).mockResolvedValueOnce(tarefas as any)
  jest.mocked(createTaskService).mockResolvedValueOnce({
    success: true,
    data: { registeredSuccessfully: tarefasRegistradas }
  } as any)

  return { cliente, tarefas, compromisso, tarefasRegistradas }
}

describe("handleIntimationsRegistrationService", () => {
  const send = jest.fn()
  const windows: iWindows = {
    mainWindow: { webContents: { send } } as any,
    sobreWindow: null,
    loginWindow: null
  }

  beforeEach(() => {
    jest.clearAllMocks()
  })

  it("registra compromisso e tarefas de sentenca com sucesso", async () => {
    const { cliente, tarefas, compromisso, tarefasRegistradas } = arrangeSuccessfulCreation(mockSuccessSentenca)
    const [ , fileData ] = getFileData("PREV30092025 - Cadastrar Teste [SENTENCA]")

    const result: Result<tHandleIntimation> = await handleIntimationsRegistrationService({
      window: windows,
      cookie,
      file: fileData
    })

    expect(result).toEqual({
      success: true,
      data: {
        registered: [{
          success: true,
          data: {
            bodys: {
              compromisso,
              tarefas: tarefasRegistradas
            }
          }
        }],
        unregisteredCommitments: [],
        unregisteredTasks: []
      }
    })
    expect(getSelectsTask).toHaveBeenCalledWith(cookie)
    expect(createCompromissoService).toHaveBeenCalledWith(cliente, cookie)
    expect(cliente.compromisso.id).toBe("compromisso-1")
    expect(cliente.compromisso.quantidadeTarefas).toBe(1)
    expect(cliente.compromisso.tarefas).toBe(tarefas)
    expect(updateViewRegistrationIntimations).toHaveBeenCalledWith(
      expect.objectContaining({ success: true }),
      windows.mainWindow
    )
  })

  it("registra compromisso de pericia com sucesso", async () => {
    arrangeSuccessfulCreation(mockSuccessPericia)
    const [ , fileData ] = getFileData("PREV30092025 - Cadastrar Teste [SENTENCA]")

    const result: Result<tHandleIntimation> = await handleIntimationsRegistrationService({
      window: windows,
      cookie,
      file: fileData
    })

    expect(result.success).toBeTruthy()
    expect(createClienteService).toHaveBeenCalledWith(
      expect.objectContaining({ description: "PERICIA MEDICA" }),
      cookie
    )
    expect(taskFactory).toHaveBeenCalledWith(
      expect.any(Object),
      ["CONTATAR CLIENTE"],
      cookie,
      []
    )
  })

  it("retorna erro quando o arquivo validado esta vazio", async () => {
    jest.mocked(getObjectValidateIntimationsService).mockResolvedValueOnce({
      success: true,
      data: { file: [] }
    } as any)

    const [ , fileData ] = getFileData("PREV30092025 - Cadastrar Teste [SENTENCA]")
    const result = await handleIntimationsRegistrationService({
      window: windows,
      cookie,
      file: fileData
    })

    expect(result.success).toBe(false)
    if (!result.success) {
      expect(result.error.code).toBe(errorsCodeList.emptyFileError)
    }
    expect(createClienteService).not.toHaveBeenCalled()
  })
})
