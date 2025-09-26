import { Result } from "@models/result/result"
import { iWindows } from "@models/windows/iWindows"
import { HandleIntimationsReportResult } from "@services/intimation/handleIntimationsReportService";
import { credential, getCookieLoginService } from "@services/login/loginService"
import { tResultCreateService } from "@services/tarefas";
import { iFileData } from "@services/validateIntimations/validateIntimationsService"

export type tActionReturn = Promise<Result<tResultCreateService[]>> | Promise<Result<HandleIntimationsReportResult>>

export async function executeWithLogin(
    window: iWindows,
    action: (window: iWindows, cookie: string, file: iFileData) => tActionReturn,
    credentials?: credential,
    file?: iFileData,
){
    console.log('Realizando login...')

    const result =  await getCookieLoginService(credentials)

    if (result.success) {
        console.log('Login realizado!')
        const response = await action(window, result.data.cookie, file)

        return response
    }

    console.log('Falha no login!')

    return result
}