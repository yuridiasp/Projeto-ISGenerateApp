import { updateElectronApp } from 'update-electron-app'

updateElectronApp()

import { createApp } from "./app"
import { createMainWindowController } from "@controllers/index"
import { setHandlers } from "@channels/ipcHandlers.channels"
import { iWindows } from "@models/windows/iWindows.models"
import { loadDotEnv } from '@config/loadDotEnv.config'
import { dayjsConfig } from '@config/dayjsConfig.config'
import { readDiaryFromPdfController } from '@controllers/pdfDiaryReader.controllers';

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

    const registros = await readDiaryFromPdfController("./doc/IS JFSE 08052026.pdf")
    
    if (registros.length > 0) {
        console.dir(registros[0], {
            depth: null,
            maxArrayLength: null
        });
    } else {
        console.log("Nenhum registro foi extraído.");
    }
})

app?.on('window-all-closed', () => {
    if (process.platform !== 'darwin')
        app.quit()
})