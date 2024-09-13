import { createWindow } from "../../../infrastructure/window/createWindow"
import { iWindows } from "../../../models/windows/iWindows"

export function createMainWindowService (windows: iWindows) {
    const path = require('path')
    const mainWindowFolderPath = path.resolve(__dirname, '..', '..', '..', '..','public', 'pages', 'index')
    const indexPageWidth = 400, indexPageHeight = 600
    
    windows.mainWindow = createWindow(indexPageWidth,  indexPageHeight, { }, { resizable: false }, mainWindowFolderPath)
}