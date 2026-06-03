import { Result } from "@models/results/result.models"
import { iWindows } from "@models/windows/iWindows.models"
import { tHandleIntimation, tHandlePublication } from "@services/intimation/handleIntimationsRegistration.services";
import { HandleIntimationsReportResult } from "@services/intimation/handleIntimationsReport.services";
import { Cookie, credential, getCookieLoginService } from "@services/login"
import { iFileData } from "@services/validateIntimations/validateIntimations.services"

export type tActionReturn = Promise<Result<tHandleIntimation>> | Promise<Result<HandleIntimationsReportResult>> | Promise<Result<tHandlePublication>>

export type actionFunctionArgs = {
    window: iWindows,
    cookie: string,
    file?: iFileData,
    filePath?: string
}

export async function executeWithLogin({ window, action, credentials, file, filePath }:{
    window: iWindows,
    action: (args: actionFunctionArgs) => tActionReturn,
    credentials?: credential,
    file?: iFileData,
    filePath?: string
}){
    console.log('Realizando login...')

    const resultJSONText =  await getCookieLoginService(credentials)
    const result = JSON.parse(resultJSONText) as Result<Cookie>

    if (result.success) {
        console.log('Login realizado!')
        const response = await action({ window, cookie: result.data?.cookie, file, filePath })

        return JSON.stringify(response)
    }

    console.log('Falha no login!')

    return resultJSONText
}