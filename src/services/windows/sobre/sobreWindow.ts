import { createWindow } from "@infrastructure/window/createWindow"
import { iWindows } from "@models/windows/iWindows"

export function createSobreWindowService (windows: iWindows) {
    const path = require('path')
    if (!windows.sobreWindow) {
        const sobrePageHtmlFolderPath = path.resolve(__dirname, '..', '..', '..', '..','public', 'pages', 'sobre')
        const sobrePageWidth = 300, sobrePageHeight = 500

        windows.sobreWindow = createWindow(sobrePageWidth, sobrePageHeight, {}, {
            alwaysOnTop: true,
            frame: false
        }, sobrePageHtmlFolderPath)

        windows.sobreWindow.on('closed', () => {
            windows.sobreWindow = null
        })
    }
}

export function closeSobreWindowService(windows: iWindows) {
    windows.sobreWindow.close()
}