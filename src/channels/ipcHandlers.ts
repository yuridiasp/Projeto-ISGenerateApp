import { ipcMain } from 'electron'

import { iWindows } from "src/models/windows/iWindows"
import { splitISController, githubController, getVersionsController, closeSobreWindowController, intimationsReportController, intimationsRegisterController, openFileDialogForFile } from '../controllers/controllers'

export async function setHandlers (windows: iWindows) {
    ipcMain.handle('intimation-validate', (event, args) => intimationsReportController(event, args, windows))
    ipcMain.handle('intimation-register', (event, args) => intimationsRegisterController(event, args, windows))
    ipcMain.handle('split-is', splitISController)
    ipcMain.handle('get-versions', getVersionsController)
    ipcMain.on('open-github', githubController)
    ipcMain.on('fechar-janela-sobre', () => closeSobreWindowController(windows))
    ipcMain.handle('open-file-dialog-for-file', (event) => openFileDialogForFile(event, windows))
}