import { updateElectronApp } from 'update-electron-app'

import { createApp } from "./app"
import { createMainWindowController } from "@controllers/controllers"
import { setHandlers } from "@channels/ipcHandlers"
import { iWindows } from "@models/windows/iWindows"

updateElectronApp()

const windows: iWindows = {
    mainWindow: null,
    sobreWindow: null
}

const app = createApp(windows)

app?.whenReady().then(async () => {
    createMainWindowController(windows)
    await setHandlers(windows)
})

app?.on('window-all-closed', () => {
    if (process.platform !== 'darwin')
        app.quit()
})