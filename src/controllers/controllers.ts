import { iWindows } from '../models/windows/iWindows'
import { openFileDialog } from '../infrastructure/dialog/openFile'
import { iCompromissoFromFile } from '../models/compromisso/iCompromissoFromFile'
import { closeSobreWindowService, createSobreWindowService } from '../services/windows/sobre/sobreWindow'
import { createMainWindowService } from '../services/windows/main/mainWindow'
import { getObjectISService } from '../services/splitIS/splitISService'
import { getDadosService, openPageGithubService } from '../services/appData/appData'
import { getCookieLoginService } from '../services/login/loginService'
import { intimationValidateService } from '../services/compromissos/getCompromissoService'
import { getObjectValidateIntimationsService } from '../services/validateIntimations/validateIntimationsService'
import { handleIntimationsReport } from '../services/intimation/intimationReporter'
import { handleIntimationsRegistration } from '../services/intimation/intimationRegister'
import { iFileData } from '../models/file/iFileData'
import { handleIntimationsAction } from '../services/intimation/handleIntimationAction'

export function openFileDialogForFile(event: Electron.IpcMainInvokeEvent, windows: iWindows) {
    return openFileDialog(windows)
}

export function createSobreWindowController (windows: iWindows) {
    createSobreWindowService(windows)
}

export function createMainWindowController(windows: iWindows) {
    createMainWindowService(windows)
}

export async function splitISController (event: Electron.IpcMainInvokeEvent, args: { endereco: string; fileName: string }) {
    return getObjectISService(args)
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

export async function intimationValidateController (intimation: iCompromissoFromFile, cookie: string) {
    return await intimationValidateService(intimation, cookie)
}

export function getIntimations(file: iFileData) {
    return getObjectValidateIntimationsService(file)
}

export async function intimationsRegisterController(event: Electron.IpcMainInvokeEvent, file: iFileData, windows: iWindows) {
    return handleIntimationsAction(event, file, windows, handleIntimationsRegistration)
}

export async function intimationsReportController(event: Electron.IpcMainInvokeEvent, file: iFileData, windows: iWindows) {
    return handleIntimationsAction(event, file, windows, handleIntimationsReport)
}