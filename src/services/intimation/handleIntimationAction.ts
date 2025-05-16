import { getCookieLoginController } from "../../controllers/controllers"
import { iWindows } from "../../models/windows/iWindows"
import { iFileData } from "../validateIntimations/validateIntimationsService"

export async function handleIntimationsAction(
    event: Electron.IpcMainInvokeEvent, 
    file: iFileData, 
    windows: iWindows, 
    action: (windows: iWindows, cookie: string, file: iFileData) => Promise<any>
) {
    console.log('Realizando login...')

    const result = await getCookieLoginController()

    if (result.success) {
        console.log('Login realizado!')
        const response = await action(windows, result.data.cookie, file)
        return response
    }

    console.log('Falha no login!')
    return 'Falha!'
}
