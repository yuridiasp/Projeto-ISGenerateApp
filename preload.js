const { contextBridge, ipcRenderer } = require('electron')

contextBridge.exposeInMainWorld('api', {
    splitFileIs: async args => {
        const result = await ipcRenderer.invoke('split-is', args)
        return result
    },
    getVersions: async () => {
        const result = await ipcRenderer.invoke('get-versions')
        return result
    },
    fecharJanelaSobre: () => {
        ipcRenderer.send('fechar-janela-sobre')
    },
    openGithub: () => {
        ipcRenderer.send('open-github')
    }
})