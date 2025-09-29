import dotEnv from 'dotenv'
import { describe, expect, it, beforeAll, jest } from '@jest/globals'

import { login } from './utils/login'
import { iWindows } from '../../src/models/windows/iWindows'
import { handleIntimationsRegistrationService } from '../../src/services/intimation/handleIntimationsRegistrationService'
import { getObjectValidateIntimationsService } from "../../src/services/validateIntimations/validateIntimationsService"
import { iFileData } from '../../src/services/validateIntimations/validateIntimationsService'
import { getFileData } from './utils/getFileData'

dotEnv.config()

describe('Criar tarefas de compromissos', () => {
    const files = ["TRT15092025", "PREV26092025"]
    const [ fileNameReport, fileData ] = getFileData(files[1])

    const send = jest.fn()
    const windows: iWindows = {
        mainWindow: { webContents: send } as any,
        sobreWindow: null,
        loginWindow: null
    }

    let cookie: string, hoje: Date

    beforeAll(async () => { cookie = await login(); hoje = new Date() })

    it("Criando compromisso de audiência com prazo para o evento acima de 2 semanas", async () => {
        const result = await getObjectValidateIntimationsService(fileData)

        console.log(result.data.file)
        //handleIntimationsRegistrationService(windows, cookie, file)
    })
})