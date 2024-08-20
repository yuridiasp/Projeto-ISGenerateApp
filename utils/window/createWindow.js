const { BrowserWindow } = require('electron')
const path = require('path')

const createWindow = (width = 400, height = 600,  webPreference = {}, props = {}, pageHtmlFilename) => {
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
    
    win.loadFile(path.resolve(__dirname, '..', '..', 'renderer', 'page', pageHtmlFilename))
    return win
}

module.exports = createWindow