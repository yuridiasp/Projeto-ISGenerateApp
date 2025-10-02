import dotEnv from 'dotenv'
import { describe, expect, it, beforeAll, jest, beforeEach, afterEach } from '@jest/globals'

import { login } from './utils/login'
import { iWindows } from '../../src/models/windows/iWindows'
import { handleIntimationsRegistrationService } from '../../src/services/intimation/handleIntimationsRegistrationService'
import { getFileData } from './utils/getFileData'
import { excluirCompromisso } from './utils/excluirCompromisso'
import { tHandleIntimation } from '../../src/services/intimation/handleIntimationsRegistrationService'
import { Result } from '../../src/models/results/result'
import { objectID } from '../../src/utils/request/successfulCreationRequestValidation'
import { getObjectValidateIntimationsService } from '../../src/services/validateIntimations/validateIntimationsService'

dotEnv.config()

const timeout = 20000, sentenca = { interno: '03/10/2025', fatal: '21/10/2025' }, pericia = '21/10/2025'

const mockSuccessSentenca = {
  success: true,
  data: {
    file: [{
      case_number: '202488101866',
      description: 'SENTENÇA',
      publication_date: '30/09/2025',
      related_case_number: null,
      internal_deadline: sentenca.interno,
      fatal_deadline: sentenca.fatal,
      time: null,
      expert_or_defendant: null,
      local_adress: null,
      dataCliente: undefined,
      dataProcesso: undefined,
      executor: 'KEVEN',
      separate_task: null,
      justification: null,
      paragraph: `202488101866 - SENTENÇA - (${sentenca.interno} - ${sentenca.fatal}) - KEVEN`
    }]
  }
} as never

const mockSuccessPericia = {
  success: true,
  data: {
    file: [{
      case_number: '202488101866',
      description: 'PERÍCIA MÉDICA',
      publication_date: '30/09/2025',
      related_case_number: null,
      internal_deadline: pericia,
      fatal_deadline: pericia,
      time: '07:00',
      expert_or_defendant: 'MONICA FULANA DE TAL',
      local_adress: 'FORUM DE ALGUM LUGAR',
      dataCliente: undefined,
      dataProcesso: undefined,
      executor: '(ADM)',
      separate_task: null,
      justification: null,
      paragraph: `202488101866 - PERÍCIA MÉDICA - (${pericia} ÀS 07:00) - (ADM)PERITO: MONICA FULANA DE TALLOCAL:FORUM DE ALGUM LUGAR`
    }]
  }
} as never

function delay(ms: number, id: string, cookie: string) {
  return new Promise<void>(resolve => setTimeout(async () => { await excluirCompromisso(id, cookie); resolve() }, ms));
}

jest.mock('../../src/services/validateIntimations/validateIntimationsService', () => ({
  __esModule: true,
  getObjectValidateIntimationsService: jest.fn(),   // vira Jest mock
}))

describe('Criar tarefas de compromissos', () => {
    const mocked = jest.mocked(getObjectValidateIntimationsService)
    const files = ["PREV30092025 - Cadastrar Teste [SENTENÇA]"]

    const send = jest.fn()
    const windows: iWindows = {
        mainWindow: { webContents: { send } } as any,
        sobreWindow: null,
        loginWindow: null
    }

    let cookie: string, hoje: Date, compromissos: objectID[] = []

    beforeAll(async () => { cookie = await login(); hoje = new Date() })
    
    beforeEach(async () => jest.clearAllMocks())

    afterEach(async () => {
        await delay(2000, compromissos[0]?.id, cookie)
    })


    it("Criando compromisso de sentença com sucesso", async () => {
        mocked.mockResolvedValueOnce(mockSuccessSentenca)

        const [ fileNameReport, fileData ] = getFileData(files[0])
        const resultRegister: Result<tHandleIntimation> = await handleIntimationsRegistrationService(windows, cookie, fileData)

        
        if(resultRegister.success) {
            compromissos = resultRegister.data?.registered[0].data?.bodys.compromisso
        }
        
        expect(resultRegister.success).toBeTruthy()
    }, timeout)
    
    it("Criando compromisso de perícia com sucesso", async () => {
        (getObjectValidateIntimationsService as jest.Mock).mockResolvedValueOnce(mockSuccessPericia)
        const [ fileNameReport, fileData ] = getFileData(files[0])
        const resultRegister: Result<tHandleIntimation> = await handleIntimationsRegistrationService(windows, cookie, fileData)

        
        if(resultRegister.success) {
            compromissos = resultRegister.data?.registered[0].data?.bodys.compromisso
        }
        
        expect(resultRegister.success).toBeTruthy()
    }, timeout)
})