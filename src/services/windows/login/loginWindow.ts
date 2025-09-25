import { createWindow } from "@infrastructure/window/createWindow"
import { iWindows } from "@models/windows/iWindows"

export function createLoginWindowService (windows: iWindows) {
    const path = require('path')
    const loginWindowFolderPath = path.resolve(__dirname, '..', '..', '..', '..', '..','public', 'pages', 'login')
    const indexPageWidth = 400, indexPageHeight = 600
    
    windows.loginWindow = createWindow(indexPageWidth,  indexPageHeight, { }, { resizable: true, alwaysOnTop: true }, loginWindowFolderPath)
}

export function closeLoginWindowService(windows: iWindows) {
    windows.loginWindow.close()
}