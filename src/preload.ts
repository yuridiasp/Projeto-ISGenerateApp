import { contextBridge, ipcRenderer } from 'electron'

import { iValidationReport } from "./models/validation/iValidationReport"

type resultSplitIS = { msg: string, value: boolean }
type callbackUpdateReportStatus = (value: iValidationReport) => void
type callbackEnableButtonCloseReport = () => void

contextBridge.exposeInMainWorld('api', {
    openFileDialogForFile: async () => await ipcRenderer.invoke('open-file-dialog-for-file'),
    splitFileIs: async (args: resultSplitIS) => await ipcRenderer.invoke('split-is', args),
    getVersions: async () => await ipcRenderer.invoke('get-versions'),
    fecharJanelaSobre: () => ipcRenderer.send('fechar-janela-sobre'),
    openGithub: () => ipcRenderer.send('open-github'),
    intimationValidate: async (args: { endereco: string }) => await ipcRenderer.invoke('intimation-validate', args),
    intimationRegister: async (args: string) => await ipcRenderer.invoke('intimation-register', args),
    updateReportStatus: (callback: callbackUpdateReportStatus) => ipcRenderer.on('update-view-report-validation', (event: Electron.IpcRendererEvent, value: iValidationReport) => callback(value)),
    enableButtonCloseReport: (calback: callbackEnableButtonCloseReport) => ipcRenderer.on('enable-button-close-report', calback),
})