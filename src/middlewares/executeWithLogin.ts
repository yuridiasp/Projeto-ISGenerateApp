import { iWindows } from "@models/windows/iWindows"
import { getCookieLoginService } from "@services/login/loginService"
import { iFileData } from "@services/validateIntimations/validateIntimationsService"

export async function executeWithLogin(
    event: Electron.IpcMainInvokeEvent, 
    window: iWindows,
    action: (window: iWindows, cookie: string, file: iFileData) => Promise<any>,
    file?: iFileData,
) {
    console.log('Realizando login...')

    const result = await getCookieLoginService()

    if (result.success) {
        console.log('Login realizado!')
        const response = await action(window, result.data.cookie, file)
        return response
    }

    console.log('Falha no login!')
    return 'Falha!'
}
