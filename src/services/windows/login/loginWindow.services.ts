import path from 'path'

import { createWindow } from "@infrastructure/window/createWindow.infrastructure"
import { iWindows } from "@models/windows/iWindows.models"
import { getAuthState, resetAuthentication } from "@services/auth/authSession.services";

export function createLoginWindowService (windows: iWindows) {
    if (windows.loginWindow && !windows.loginWindow.isDestroyed()) {
        windows.loginWindow.focus();
        return;
    }

    const loginWindowFolderPath = path.resolve(__dirname, '..', '..', '..', '..', '..','public', 'pages', 'login')
    const indexPageWidth = 400, indexPageHeight = 600
    
    windows.loginWindow = createWindow(indexPageWidth,  indexPageHeight, { }, { resizable: true, alwaysOnTop: true }, loginWindowFolderPath)

    windows.loginWindow.on("closed", () => {
        const loginCompleted = getAuthState() === "AUTHENTICATED";

        windows.loginWindow = null;

        if (!loginCompleted) {
            windows.mainWindow?.webContents.send("login-cancelled");
        }

        resetAuthentication();
    });
}

export function closeLoginWindowService(windows: iWindows) {
    windows.loginWindow?.close()
}