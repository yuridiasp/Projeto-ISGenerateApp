import { updateElectronApp } from 'update-electron-app'

updateElectronApp()

import { createApp } from "./app"
import { createMainWindowController } from "@controllers/index"
import { setHandlers } from "@channels/ipcHandlers.channels"
import { iWindows } from "@models/windows/iWindows.models"
import { loadDotEnv } from '@config/loadDotEnv.config'
import { dayjsConfig } from '@config/dayjsConfig.config'
import { readDiaryAutomaticallyController } from '@controllers/diaryAutoReader.controllers';

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

    //const registros = await readDiaryFromPdfController("./doc/IS JFSE 08052026.pdf")
    
    /* const filePath = "./doc/TRT30092025 - Cadastrados.docx";

    try {
        const registros = await readDiaryAutomaticallyController(filePath);

        console.log("Total de registros:", registros.length);

        if (registros.length > 0) {
        console.dir(registros[0], {
            depth: null,
            maxArrayLength: null
        });
        }
    } catch (error) {
        console.error("Erro ao ler documento:", error);
    } */
})

app?.on('window-all-closed', () => {
    if (process.platform !== 'darwin')
        app.quit()
})