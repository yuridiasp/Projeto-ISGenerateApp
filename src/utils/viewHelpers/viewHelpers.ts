import { iValidationReport } from "../../models/validation/iValidationReport"
import { iWindows } from "../../models/windows/iWindows"
import { idCompromisso } from "../../services/compromissos"
import { Result } from "../../models/result/result"
import { idTarefa } from "../../services/tarefas/utils/isTarefaSuccessfullyCreated"

export function enableButtonCloseReport(windows: iWindows) {
    windows.mainWindow.webContents.send('enable-button-close-report')
}

export function updateViewReportValidation(data: iValidationReport, windows: iWindows) {
    windows.mainWindow.webContents.send('update-view-report-validation', data)
}

//TODO: Refatorar o resultado dessa função: Passar somente os dados necessários para alimentar a interface
export function updateViewRegistrationIntimations(data: Result<idCompromisso> | Result<idTarefa>[], windows: iWindows) {
    windows.mainWindow.webContents.send('update-view-registration-intimations', data)
}