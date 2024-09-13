import { BrowserWindow } from "electron";

export interface iWindows {
    mainWindow: BrowserWindow | null,
    sobreWindow: BrowserWindow | null
}