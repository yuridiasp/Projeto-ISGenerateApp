import { BrowserWindow } from 'electron'

export function createWindow (width: number = 400, height: number = 600,  webPreference: object = {}, props: object = {}, pageHtmlFilename: string): BrowserWindow {
    const path = require('path')
    const win = new BrowserWindow({
        width: width,
        height: height,
        icon: path.join(__dirname,'icon', 'icon.ico'),
        webPreferences: {
            preload: path.join(__dirname, '..', '..', 'preload.js'),
            ...webPreference
        },
        ...props
    })
    
    win.loadFile(path.resolve(__dirname, '..', '..', '..', 'public', 'page', pageHtmlFilename))
    
    return win
}