import { updateElectronApp } from 'update-electron-app'

updateElectronApp()

import { createApp } from "./app"
import { createMainWindowController, createSobreWindowController, createLoginWindowController } from "@controllers/controllers"
import { setHandlers } from "@channels/ipcHandlers"
import { iWindows } from "@models/windows/iWindows"
import { loadDotEnv } from '@config/loadDotEnv'
import { dayjsConfig } from '@config/dayjsConfig'

dayjsConfig()

loadDotEnv()

const windows: iWindows = {
    mainWindow: null,
    sobreWindow: null,
    loginWindow: null
}

const app = createApp(windows)

app?.whenReady().then(async () => {
    createMainWindowController(windows)
    //createSobreWindowController(windows)
    //createLoginWindowController(windows)
    await setHandlers(windows)
})

app?.on('window-all-closed', () => {
    if (process.platform !== 'darwin')
        app.quit()
})