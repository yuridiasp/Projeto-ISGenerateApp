import { iWindows } from '../models/windows/iWindows'
import { openFileDialog } from '../infrastructure/dialog/openFile'
import { closeSobreWindowService, createSobreWindowService } from '../services/windows/sobre/sobreWindow'
import { createMainWindowService } from '../services/windows/main/mainWindow'
import { getObjectISService } from '../services/splitIS/splitISService'
import { getDadosService, openPageGithubService } from '../services/appData/appData'
import { getCookieLoginService } from '../services/login/loginService'
import { iFileData } from '../services/validateIntimations/validateIntimationsService'
import { handleIntimationsReportService } from '../services/intimation/intimationReporter'
import { handleIntimationsRegistrationService } from '../services/intimation/intimationRegister'
import { executeWithLogin } from '../middlewares/executeWithLogin'

export function openFileDialogForFile(event: Electron.IpcMainInvokeEvent, windows: iWindows) {
    return openFileDialog(windows)
}

export function createSobreWindowController (windows: iWindows) {
    createSobreWindowService(windows)
}

export function createMainWindowController(windows: iWindows) {
    createMainWindowService(windows)
}

export async function githubController () {
    openPageGithubService()
}

export async function getVersionsController() {
    return getDadosService()
}

export function closeSobreWindowController (windows: iWindows) {
    closeSobreWindowService(windows)
}

export async function getCookieLoginController() {
    return await getCookieLoginService()
}

export async function splitISController (event: Electron.IpcMainInvokeEvent, file: iFileData) {
    return getObjectISService(file)
}

export async function intimationsRegisterController(event: Electron.IpcMainInvokeEvent, file: iFileData, windows: iWindows) {
    return executeWithLogin(event, windows, handleIntimationsRegistrationService, file)
}

export async function intimationsReportController(event: Electron.IpcMainInvokeEvent, file: iFileData, windows: iWindows) {
    return executeWithLogin(event, windows, handleIntimationsReportService, file)
}