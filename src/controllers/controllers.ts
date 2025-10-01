import { iWindows } from '@models/windows'
import { openFileDialog } from '@infrastructure/dialog/openFile'
import { closeSobreWindowService, createSobreWindowService } from '@services/windows'
import { createMainWindowService } from '@services/windows'
import { splitISService } from '@services/splitIS/splitISService'
import { getDadosService, openPageGithubService } from '@services/appData'
import { credential, getCookieLoginService } from '@services/login'
import { iFileData } from '@services/validateIntimations'
import { handleIntimationsReportService } from '@services/intimation'
import { handleIntimationsRegistrationService } from '@services/intimation'
import { executeWithLogin } from '@middlewares/executeWithLogin'
import { closeLoginWindowService, createLoginWindowService } from '@services/windows'
import { sendCredenctialsService } from '@services/auth'

export function openFileDialogForFile(event: Electron.IpcMainInvokeEvent, windows: iWindows) {
    return openFileDialog(windows)
}

export async function loginController(credentials: credential) {
    return await getCookieLoginService(credentials)
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
    return splitISService(file)
}
export async function sendCredenctialsController (credentials: credential, windows: iWindows) {
    return sendCredenctialsService(credentials, windows)
}

export async function intimationsRegisterController(event: Electron.IpcMainInvokeEvent, file: iFileData, credentials: credential, windows: iWindows) {
    return executeWithLogin(windows, handleIntimationsRegistrationService, credentials, file)
}

export async function intimationsReportController(event: Electron.IpcMainInvokeEvent, file: iFileData, credentials: credential, windows: iWindows) {
    return executeWithLogin(windows, handleIntimationsReportService, credentials, file)
}