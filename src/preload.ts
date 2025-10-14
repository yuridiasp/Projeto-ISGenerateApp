import { contextBridge, ipcRenderer } from 'electron'

import { iValidationReport } from "@models/validations/iValidationReport"
import { credential } from '@services/login/loginService'
import { iFileData } from '@services/validateIntimations/validateIntimationsService'

type callbackUpdateReportStatus = (value: iValidationReport) => void
type callbackEnableButtonCloseReport = () => void
type callbackreceiveCredentials = (credentials: credential) => credential

contextBridge.exposeInMainWorld('API', {
    openFileDialogForFile: async () => await ipcRenderer.invoke('open-file-dialog-for-file'),
    splitFileIs: async (data: iFileData) => await ipcRenderer.invoke('split-is', data),
    getVersions: async () => await ipcRenderer.invoke('get-versions'),
    fecharJanelaSobre: () => ipcRenderer.send('fechar-janela-sobre'),
    abrirJanelaLogin: () => ipcRenderer.send('abrir-janela-login'),
    fecharJanelaLogin: () => ipcRenderer.send('fechar-janela-login'),
    openGithub: () => ipcRenderer.send('open-github'),
    intimationValidate: async (data: iFileData, credentials: credential): Promise<string> => await ipcRenderer.invoke('intimation-validate', data, credentials),
    intimationRegister: async (data: iFileData, credentials: credential): Promise<string> => await ipcRenderer.invoke('intimation-register', data, credentials),
    loginKorbil : async (credentials: credential) => await ipcRenderer.invoke('login-korbil', credentials),
    sendCredencialsToRenderer : async (credentials: credential) => ipcRenderer.send('send-credencials-to-renderer', credentials),
    updateReportStatus: (callback: callbackUpdateReportStatus) => ipcRenderer.on('update-view-report-validation', (event: Electron.IpcRendererEvent, value: iValidationReport) => callback(value)),
    enableButtonCloseReport: (calback: callbackEnableButtonCloseReport) => ipcRenderer.on('enable-button-close-report', calback),
    receiveCredentials: (calback: callbackreceiveCredentials) => ipcRenderer.on('receive-credentials', (event, credentials: credential) => calback(credentials)),
    copyToClipboard: (text: string) => ipcRenderer.invoke('clopy-to-clip', text)
})