import { dialog } from "electron"
import { iWindows } from "@models/windows/iWindows.models"

export async function openFileDialog(windows: iWindows) {
    const options: Electron.OpenDialogOptions = {
        properties: ["openFile"],
        filters: [
            { name: "Documentos compativeis", extensions: ["xlsx", "doc", "docx", "xhtml", "pdf"] }
        ]
    }

    if (windows.mainWindow) {
        return await dialog.showOpenDialog(windows.mainWindow, options)
    }

    return await dialog.showOpenDialog(options)
}

export async function openFolderDialog(windows: iWindows) {
    const options: Electron.OpenDialogOptions = {
        properties: ["openDirectory"]
    }

    if (windows.mainWindow) {
        return await dialog.showOpenDialog(windows.mainWindow, options)
    }

    return await dialog.showOpenDialog(options)
}
