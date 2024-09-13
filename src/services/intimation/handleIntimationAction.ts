import { getCookieLoginController } from "../../controllers/controllers"
import { iFileData } from "../../models/file/iFileData"
import { iWindows } from "../../models/windows/iWindows"

export async function handleIntimationsAction(
    event: Electron.IpcMainInvokeEvent, 
    file: iFileData, 
    windows: iWindows, 
    action: (windows: iWindows, cookie: string, file: iFileData) => Promise<any>
) {
    console.log('Realizando login...')

    const cookie = await getCookieLoginController()

    if (cookie) {
        console.log('Login realizado!')
        const response = await action(windows, cookie, file)
        return response
    }

    console.log('Falha no login!')
    return 'Falha!'
}
