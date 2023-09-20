const { app, BrowserWindow, ipcMain, Menu, shell } = require('electron')
const handleSquirrelEvent = require('./handleSquirrel')
const path = require('path')
const analiseIS = require('./file')
const dados = {
    nomeapp: app.name,
    autor: 'Yuri Dias Pereira Gomes',
    version: '1.0.0',
    electronjs: process.versions.electron,
    nodejs: process.version,
    github: 'https://github.com/yuridiasp'
}
let mainWindow

// this should be placed at top of main.js to handle setup events quickly
if (handleSquirrelEvent(app)) {
    // squirrel event handled and app will exit in 1000ms, so don't do anything else
    return;
}

const templateMenu = [
    {
        label: app.name,
        role: 'File',
        submenu: [
            {
                label: 'Fechar',
                role: 'quit'
            }
        ]
    },
    {
        label: 'Sobre',
        role: 'Help',
        click: async () => {
            abrirJanelaSobre()
        }
    }
]
const menu = Menu.buildFromTemplate(templateMenu)
Menu.setApplicationMenu(menu)

const createWindow = (width = 400, height = 600,  webPreference = {}, props = {}, page) => {
    const win = new BrowserWindow({
        width: width,
        height: height,
        icon: path.join(__dirname,'icon', 'icon.ico'),
        webPreferences: {
            preload: path.join(__dirname,'preload.js'),
            ...webPreference
        },
        ...props
    })
    
    win.loadFile(page)
    return win
}

app.whenReady().then(() => {
    const page = path.resolve(__dirname,'app','page','index.html')
    mainWindow = createWindow(400,  600, {}, {
        resizable: false
    }, page)

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
            return obj
        } catch (error) {
            let obj = {msg: 'Erro! ' + error, value: false}
            return obj
        }
    }
    else {
        let obj = {msg: 'Erro! Nome ou caminho do arquivo não encontrados.', value: false}
        return obj
    }
})

ipcMain.handle('get-versions', async () => {
    return dados
})

ipcMain.on('open-github', async () => {
    await shell.openExternal(dados.github)
})

let sobreWindow = null
function abrirJanelaSobre() {
    if (!sobreWindow) {
        const sobreHtml = path.join(__dirname, 'app', 'page', 'sobre.html')
        sobreWindow = createWindow(300,500, {}, {
            alwaysOnTop: true,
            frame: false
        }, sobreHtml)
        sobreWindow.on('closed', () => {
            sobreWindow = null
        })
    }
}

ipcMain.on('fechar-janela-sobre', () => {
    sobreWindow.close()
})