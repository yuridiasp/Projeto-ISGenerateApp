import { ipcMain } from 'electron'

import { iWindows } from "@models/windows/iWindows"
import { credential } from '@services/login/loginService'
import { splitISController,
    githubController,
    getVersionsController,
    closeSobreWindowController,
    intimationsReportController,
    intimationsRegisterController,
    openFileDialogForFile,
    createLoginWindowController,
    loginController,
    closeLoginWindowController,
    sendCredenctialsController
} from '@controllers/controllers'
import { iFileData } from '@services/validateIntimations/validateIntimationsService'

export async function setHandlers (windows: iWindows) {
    ipcMain.handle('intimation-validate', (event: Electron.IpcMainInvokeEvent, data: iFileData, credentials: credential) => intimationsReportController(event, data, credentials, windows))
    ipcMain.handle('intimation-register', (event: Electron.IpcMainInvokeEvent, data: iFileData, credentials: credential) => intimationsRegisterController(event, data, credentials, windows))
    ipcMain.handle('split-is', splitISController)
    ipcMain.handle('get-versions', getVersionsController)
    ipcMain.on('open-github', githubController)
    ipcMain.on('fechar-janela-sobre', () => closeSobreWindowController(windows))
    ipcMain.on('abrir-janela-login', () => createLoginWindowController(windows))
    ipcMain.on('fechar-janela-login', () => closeLoginWindowController(windows))
    ipcMain.on('send-credencials-to-renderer', (event, credencials: credential) => sendCredenctialsController(credencials, windows))
    ipcMain.handle('open-file-dialog-for-file', (event) => openFileDialogForFile(event, windows))
    ipcMain.handle('login-korbil', (event, credential: credential) => loginController(windows, credential))
}