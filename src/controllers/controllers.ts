import { iWindows } from '@models/windows/iWindows'
import { openFileDialog } from '@infrastructure/dialog/openFile'
import { closeSobreWindowService, createSobreWindowService } from '@services/windows/sobre/sobreWindow'
import { createMainWindowService } from '@services/windows/main/mainWindow'
import { getObjectISService } from '@services/splitIS/splitISService'
import { getDadosService, openPageGithubService } from '@services/appData/appData'
import { credential, getCookieLoginService } from '@services/login/loginService'
import { iFileData } from '@services/validateIntimations/validateIntimationsService'
import { handleIntimationsReportService } from '@services/intimation/intimationReporter'
import { handleIntimationsRegistrationService } from '@services/intimation/intimationRegister'
import { executeWithLogin } from '@middlewares/executeWithLogin'
import { closeLoginWindowService, createLoginWindowService } from '@services/windows/login/loginWindow'
import { sendCredenctialsService } from '@services/auth/authService'

export function openFileDialogForFile(event: Electron.IpcMainInvokeEvent, windows: iWindows) {
    return openFileDialog(windows)
}

export async function loginController(windows: iWindows, credentials: credential) {
    return await getCookieLoginService(windows, credentials)
}

export function createSobreWindowController (windows: iWindows) {
    createSobreWindowService(windows)
}

export function createLoginWindowController (windows: iWindows) {
    createLoginWindowService(windows)
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

export function closeLoginWindowController (windows: iWindows) {
    closeLoginWindowService(windows)
}

export async function splitISController (event: Electron.IpcMainInvokeEvent, file: iFileData) {
    return getObjectISService(file)
}
export async function sendCredenctialsController (credentials: credential, windows: iWindows) {
    return sendCredenctialsService(credentials, windows)
}

export async function intimationsRegisterController(event: Electron.IpcMainInvokeEvent, file: iFileData, credentials: credential, windows: iWindows) {
    return executeWithLogin(event, windows, handleIntimationsRegistrationService, credentials, file)
}

export async function intimationsReportController(event: Electron.IpcMainInvokeEvent, file: iFileData, credentials: credential, windows: iWindows) {
    return executeWithLogin(event, windows, handleIntimationsReportService, credentials, file)
}