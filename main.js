const createApp = require("./app")

const { createMainWindowController } = require("./controllers/controllers")
const setHandlers = require("./handlers/ipcHandlers")

const windows = {
    mainWindow: null,
    sobreWindow: null
}

const app = createApp(windows)

app.whenReady().then(async () => {
    createMainWindowController(windows)
    await setHandlers(windows)
})

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin')
        app.quit()
})