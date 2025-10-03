import { iValidationReport } from "@models/validations/iValidationReport"
import { BrowserWindow } from "electron"
import { tCreateTaskResult } from "@services/intimation"

export function enableButtonCloseReport(win: Pick<BrowserWindow, 'webContents'>) {
    win.webContents.send('enable-button-close-report')
}

export function updateViewReportValidation(data: iValidationReport, win: Pick<BrowserWindow, 'webContents'>) {
    win.webContents.send('update-view-report-validation', data)
}

//TODO: Refatorar o resultado dessa função: Passar somente os dados necessários para alimentar a interface
export function updateViewRegistrationIntimations(data: tCreateTaskResult, win: Pick<BrowserWindow, 'webContents'>) {
    win.webContents.send('update-view-registration-intimations', data)
}