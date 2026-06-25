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
    if (!windows || !Object.keys(windows).length) {
        return {
            success: false,
            error: new ValidationError("Janela do evento ausente.")
        }
    }
    return openFileDialog(windows)
}

export async function loginController(credentials: credential) {
    if (!credentials || !Object.keys(credentials).length) {
        return {
            success: false,
            error: new ValidationError("Credenciais de login ausentes.")
        }
    }
    return await getCookieLoginService(credentials)
}

export function createSobreWindowController (windows: iWindows) {
    return createSobreWindowService(windows)
}

export function createLoginWindowController (windows: iWindows) {
    return createLoginWindowService(windows)
}

export function createMainWindowController(windows: iWindows) {
    return createMainWindowService(windows)
}

export async function githubController () {
    return openPageGithubService()
}

export async function getVersionsController() {
    return getDadosService()
}

export function closeSobreWindowController (windows: iWindows) {
    return closeSobreWindowService(windows)
}

export function closeLoginWindowController (windows: iWindows) {
    return closeLoginWindowService(windows)
}

export async function splitISController (event: Electron.IpcMainInvokeEvent, file: iFileData) {
    if (!file || !Object.keys(file).length) {
        return {
            success: false,
            error: new ValidationError("Dados do arquivo ausentes.")
        }
    }
    return splitISService(file)
}
export async function sendCredenctialsController (credentials: credential, windows: iWindows) {
    const errors: string[] = []

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

    return executeWithLogin({ window: windows, action: handleIntimationsReportService, credentials, file, funcValObj: getObjectValidateIntimationsService })
}

export function copyToClipboardController(text: string) {
    return copyToClipboardService(text)
}