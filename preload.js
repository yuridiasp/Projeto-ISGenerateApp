const { contextBridge, ipcRenderer } = require('electron')

contextBridge.exposeInMainWorld('api', {
    splitFileIs: async args => {
        const result = await ipcRenderer.invoke('split-is', args)
        return result
    }
})