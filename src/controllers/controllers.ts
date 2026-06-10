import { iWindows } from '@models/windows'
import { openFileDialog } from '@infrastructure/dialog/openFile.infrastructure'
import { closeSobreWindowService, createSobreWindowService } from '@services/windows'
import { createMainWindowService } from '@services/windows'
import { splitISService } from '@services/splitIS/splitIS.services'
import { getDadosService, openPageGithubService } from '@services/appData'
import { credential, getCookieLoginService } from '@services/login'
import { getObjectValidateIntimationsService, getOjectValidatePublicationService, iFileData } from '@services/validateIntimations'
import { handleIntimationsRegistrationService, handleIntimationsReportService } from '@services/intimation'
import { executeWithLogin } from '@middlewares/executeWithLogin.middlewares'
import { closeLoginWindowService, createLoginWindowService } from '@services/windows'
import { sendCredenctialsService } from '@services/auth'
import { copyToClipboardService } from '@services/clipboard/copyToClipboard.services'
import { ValidationError } from '@models/errors';

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
    const errors: string[] = []

    if (!file || !Object.keys(file).length) {
        errors.push("Dados do arquivo ausentes.")
    }

    if (!credentials || !Object.keys(credentials).length) {
        errors.push("Credenciais de login ausentes.")
    }

    if (!windows || !Object.keys(windows).length) {
        errors.push("Janela do evento ausente.")
    }

    if (errors.length) {
        return {
            success: false,
            error: new ValidationError(errors.join(";"))
        }
    }

    return executeWithLogin({ window: windows, action: handleIntimationsRegistrationService, credentials, file, funcValObj: getObjectValidateIntimationsService })
}

export async function intimationsPublicationRegisterController(event: Electron.IpcMainInvokeEvent, file: iFileData, credentials: credential, windows: iWindows) {
    const errors: string[] = []

    if (!file || !Object.keys(file).length) {
        errors.push("Dados do arquivo ausentes.")
    }

    if (!credentials || !Object.keys(credentials).length) {
        errors.push("Credenciais de login ausentes.")
    }

    if (!windows || !Object.keys(windows).length) {
        errors.push("Janela do evento ausente.")
    }

    if (errors.length) {
        return {
            success: false,
            error: new ValidationError(errors.join(";"))
        }
    }
    
    return executeWithLogin({ window: windows, action: handleIntimationsReportService, credentials, file, funcValObj: getOjectValidatePublicationService })
}

export async function intimationsReportController(event: Electron.IpcMainInvokeEvent, file: iFileData, credentials: credential, windows: iWindows) {
    return executeWithLogin({ window: windows, action: handleIntimationsReportService, credentials, file, funcValObj: getObjectValidateIntimationsService })
}

export function copyToClipboardController(text: string) {
    return copyToClipboardService(text)
}