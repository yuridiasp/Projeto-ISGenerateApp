const { ipcMain } = require('electron')

const { splitISController, githubController, getVersionsController, closeSobreWindowController, intimationsHandleController } = require('../controllers/controllers')

async function setHandlers (windows) {

    ipcMain.handle('intimation-validate', intimationsHandleController)
    
    ipcMain.handle('split-is', splitISController)
    
    ipcMain.handle('get-versions', getVersionsController)
    
    ipcMain.on('open-github', githubController)
    
    ipcMain.on('fechar-janela-sobre', () => closeSobreWindowController(windows))
}

module.exports = setHandlers