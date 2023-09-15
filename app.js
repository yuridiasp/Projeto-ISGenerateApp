const { app, BrowserWindow } = require('electron')
const path = require('path')
const analiseIS = require('./file')

const createWindow = () => {
    const win = new BrowserWindow({
        width: 800,
        height: 600
    })
    const page = path.resolve(__dirname,'app','page','index.html')
    
    win.loadFile(page)
}

// analiseIS.run(endereço, fileName)

app.whenReady().then(() => {
    createWindow()

    app.on('window-all-closed', () => {
        if (process.platform !== 'darwin')
            app.quit()
    })
})