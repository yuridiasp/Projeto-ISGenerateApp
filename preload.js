const { contextBridge, ipcRenderer } = require('electron')

contextBridge.exposeInMainWorld('api', {
    splitFileIs: async args => {
        return await ipcRenderer.invoke('split-is', args)
    },
    getVersions: async () => {
        return await ipcRenderer.invoke('get-versions')
    },
    fecharJanelaSobre: () => {
        ipcRenderer.send('fechar-janela-sobre')
    },
    openGithub: () => {
        ipcRenderer.send('open-github')
    },
    intimationValidate: async args => {
        return await ipcRenderer.invoke('intimation-validate', args)
    }
})