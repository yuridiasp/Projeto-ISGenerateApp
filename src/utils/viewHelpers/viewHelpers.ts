import { AxiosResponse } from "axios"

import { iValidationReport } from "../../models/validation/iValidationReport"
import { iWindows } from "../../models/windows/iWindows"

export function enableButtonCloseReport(windows: iWindows) {
    windows.mainWindow.webContents.send('enable-button-close-report')
}

export function updateViewReportValidation(data: iValidationReport, windows: iWindows) {
    windows.mainWindow.webContents.send('update-view-report-validation', data)
}

export function updateViewRegistrationIntimations(data: AxiosResponse<any, any>[], windows: iWindows) {
    windows.mainWindow.webContents.send('update-view-registration-intimations', data)
}