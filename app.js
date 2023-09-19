const { app, BrowserWindow, ipcMain, Menu } = require('electron')
const path = require('path')
const analiseIS = require('./file')

const templateMenu = [
    {
        label: app.name,
        submenu: [
            {
                role: 'Sair'
            }
        ]
    }
]
const menu = Menu.buildFromTemplate(templateMenu)
Menu.setApplicationMenu(menu)

const createWindow = (width = 400, height = 600,  webPreference = {}, props = {}) => {
    const win = new BrowserWindow({
        width: width,
        height: height,
        webPreferences: {
            preload: path.join(__dirname,'preload.js'),
            ...webPreference
        },
        ...props
    })
    const page = path.resolve(__dirname,'app','page','index.html')
    
    win.loadFile(page)
}

app.whenReady().then(() => {
    createWindow(400,  600, {}, {
        resizable: false
    })

    app.on('window-all-closed', () => {
        if (process.platform !== 'darwin')
            app.quit()
    })

})

ipcMain.handle('split-is', async (event, args) => {
    const { endereco, fileName } = args
    
    if (endereco && fileName) {
        try {
            let obj = {msg: 'Arquivos gerados com sucesso! Acesse a pasta do arquivo original.',value: await analiseIS.run(endereco, fileName)}
            console.log(obj)
            console.log("main: "+Date.now())
            return obj
        } catch (error) {
            let obj = {msg: 'Erro! ' + error, value: false}
            console.log(obj)
            console.log("main: "+Date.now())
            return obj
        }
    }
    else {
        let obj = {msg: 'Erro! Nome ou caminho do arquivo não encontrados.', value: false}
        console.log("main: "+Date.now())
        return obj
    }
})