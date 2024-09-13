import { dialog } from "electron"
import { iWindows } from "../../models/windows/iWindows"

export async function openFileDialog(windos: iWindows) {
    return await dialog.showOpenDialog(windos.mainWindow, {
        properties: ['openFile']
    })
}