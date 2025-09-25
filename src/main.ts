import { updateElectronApp } from 'update-electron-app'
import path from 'path'
import dotenv from 'dotenv'
import fs from 'fs'

import { createApp } from "./app"
import { createMainWindowController, createSobreWindowController, createLoginWindowController } from "@controllers/controllers"
import { setHandlers } from "@channels/ipcHandlers"
import { iWindows } from "@models/windows/iWindows"

function loadDotEnv() {
  // Em dev, o .env está na raiz; em prod, fica em resources ao lado do asar
  const devPath = path.resolve(process.cwd(), ".env");
  const prodPath = path.join(process.resourcesPath, ".env");

  const envPath = fs.existsSync(prodPath) ? prodPath : devPath;
  dotenv.config({ path: envPath });
}

loadDotEnv()

updateElectronApp()

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