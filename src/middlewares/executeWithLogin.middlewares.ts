import { HandleIntimationsReportResult, ISAnalysisDTO } from "@models/handleIntimationsReport/handleIntimationsReport.models";
import { Result } from "@models/results/result.models"
import { iWindows } from "@models/windows/iWindows.models"
import { tHandlePublication } from "@services/intimation";
import { tHandleIntimation } from "@services/intimation/handleIntimationsRegistration.services";
import { Cookie, credential, getCookieLoginService } from "@services/login"
import { iFileData } from "@services/validateIntimations/validateIntimations.services"

export type tActionReturn = Promise<Result<tHandleIntimation>> | Promise<Result<HandleIntimationsReportResult>> | Promise<Result<tHandlePublication>>

export type actionFunctionArgs = {
    window: iWindows,
    cookie?: string,
    file: iFileData,
    filePath?: string,
    funcValObj: (file: iFileData) => Promise<Result<{ file: ISAnalysisDTO[] }>>
}

export async function executeWithLogin({ window, action, credentials, file, filePath, funcValObj }: {
    window: iWindows,
    action: (args: actionFunctionArgs) => tActionReturn,
    credentials?: credential,
    file: iFileData,
    filePath?: string,
    funcValObj: (file: iFileData) => Promise<Result<{ file: ISAnalysisDTO[] }>>
}){
    console.log('Realizando login...')

    const resultJSONText =  await getCookieLoginService(credentials)
    const result = JSON.parse(resultJSONText) as Result<Cookie>

    if (result.success) {
        console.log('Login realizado!')
        const response = await action({ window, cookie: result.data?.cookie, file, filePath, funcValObj })

        return JSON.stringify(response)
    }

    console.log('Falha no login!')

    return resultJSONText
}