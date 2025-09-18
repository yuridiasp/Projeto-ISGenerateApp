import { dialog } from "electron"
import { iWindows } from "@models/windows/iWindows"

export async function openFileDialog(windows: iWindows) {
    return await dialog.showOpenDialog(windows.mainWindow, {
        properties: ['openFile'],
        filters: [
            { name: 'Documentos compatíveis', extensions: ['xlsx', 'doc', 'docx', 'xhtml'] }
        ]
    })
}