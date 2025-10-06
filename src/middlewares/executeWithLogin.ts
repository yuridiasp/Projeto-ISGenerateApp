import { Result } from "@models/results/result"
import { iWindows } from "@models/windows/iWindows"
import { tHandleIntimation } from "@services/intimation/handleIntimationsRegistrationService";
import { HandleIntimationsReportResult } from "@services/intimation/handleIntimationsReportService";
import { Cookie, credential, getCookieLoginService } from "@services/login"
import { iFileData } from "@services/validateIntimations/validateIntimationsService"

export type tActionReturn = Promise<Result<tHandleIntimation>> | Promise<Result<HandleIntimationsReportResult>>

export async function executeWithLogin(
    window: iWindows,
    action: (window: iWindows, cookie: string, file: iFileData) => tActionReturn,
    credentials?: credential,
    file?: iFileData,
){
    console.log('Realizando login...')

    const resultJSONText =  await getCookieLoginService(credentials)
    const result = JSON.parse(resultJSONText) as Result<Cookie>

    if (result.success) {
        console.log('Login realizado!')
        const response = await action(window, result.data.cookie, file)

        return response
    }

    console.log('Falha no login!')

    return JSON.stringify(result)
}