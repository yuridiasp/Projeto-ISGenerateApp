const { contextBridge, ipcRenderer } = require('electron')

contextBridge.exposeInMainWorld('api', {
    splitFileIs: async args => await ipcRenderer.invoke('split-is', args),
    getVersions: async () => await ipcRenderer.invoke('get-versions'),
    fecharJanelaSobre: () => ipcRenderer.send('fechar-janela-sobre'),
    openGithub: () => ipcRenderer.send('open-github'),
    intimationValidate: async args => await ipcRenderer.invoke('intimation-validate', args),
    updateReportStatus: (calback) => ipcRenderer.on('update-view-report-validation', (event, value) => calback(value)),
    enableButtonCloseReport: (calback) => ipcRenderer.on('enable-button-close-report', calback)
})