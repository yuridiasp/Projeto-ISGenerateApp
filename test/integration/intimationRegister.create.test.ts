import dotEnv from 'dotenv'
import { describe, expect, it, beforeAll, jest, afterAll, afterEach } from '@jest/globals'

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

const timeout = 20000

jest.mock('../../src/services/validateIntimations', () => ({
    getObjectValidateIntimationsService: jest.fn().mockImplementation(() => [
      {
        case_number: '202488101866',
        description: 'SENTENÇA',
        publication_date: '30/09/2025',
        related_case_number: null,
        internal_deadline: '03/10/2025',
        fatal_deadline: '21/10/2025',
        time: null,
        expert_or_defendant: null,
        local_adress: null,
        dataCliente: undefined,
        dataProcesso: undefined,
        executor: 'KEVEN',
        separate_task: null,
        justification: null,
        paragraph: '202488101866 - SENTENÇA - (03/10/2025 - 21/10/2025) - KEVEN'
      }
    ])
}))

function delay(ms: number, id: string, cookie: string) {
  return new Promise<void>(resolve => setTimeout(async () => { await excluirCompromisso(id, cookie); resolve() }, ms));
}

describe('Criar tarefas de compromissos', () => {
    const files = ["PREV30092025 - Cadastrar Teste [SENTENÇA]"]

    const send = jest.fn()
    const windows: iWindows = {
        mainWindow: { webContents: { send } } as any,
        sobreWindow: null,
        loginWindow: null
    }

    let cookie: string, hoje: Date, compromissos: objectID[]

    beforeAll(async () => { cookie = await login(); hoje = new Date() })

    afterEach(async () => {
        await delay(2000, compromissos[0].id, cookie)
    })

    it("Criando compromisso de sentença", async () => {
        const [ fileNameReport, fileData ] = getFileData(files[0])
        const resultRegister: Result<tHandleIntimation> = await handleIntimationsRegistrationService(windows, cookie, fileData)

        
        if(resultRegister.success) {
            compromissos = resultRegister.data?.registered[0].data?.bodys.compromisso
            console.log(resultRegister.data?.registered[0])
        }
        
        expect(getObjectValidateIntimationsService).toHaveBeenCalled()
        expect(resultRegister.success).toBeTruthy()
    }, timeout)
})