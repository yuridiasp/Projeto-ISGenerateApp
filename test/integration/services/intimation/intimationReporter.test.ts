import dotEnv from 'dotenv'
import path from 'path'
import { describe, expect, it, beforeAll } from '@jest/globals'

import { loginService } from '../../../../src/services/auth/authService'
import { getObjectValidateIntimationsService } from '../../../../src/services/validateIntimations/validateIntimationsService'
import { handleIntimationsReportService } from '../../../../src/services/intimation/intimationReporter'

dotEnv.config()

describe("Validar cadastro de intimações a partir de um documento Word", () => {

    let cookie: string
    
    beforeAll(async () => {
        const { LOGIN, SENHA } = process.env
        const result = await loginService(LOGIN, SENHA)

        if(result.success) {
            cookie = result.data.cookie
        }
    })

    it("Lê o documento do Word e retorna resultados do cadastro no Korbil", async () => {
        const fileName = "TRT15092025.docx"
        const filePath = path.resolve(__dirname, "..","..","..","..", "doc", "TRT15092025.docx")

        handleIntimationsReportService()

        const result = await getObjectValidateIntimationsService({ endereco: filePath, fileName })

        console.log(result)
    })
})