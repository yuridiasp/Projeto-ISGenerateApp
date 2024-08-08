const { Menu } = require('electron')

const { createSobreWindowController } = require('../controllers/controllers')

function configMenu (app, window) {
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
            click: () => createSobreWindowController(window)
        }
    ]

    const menu = Menu.buildFromTemplate(templateMenu)
    Menu.setApplicationMenu(menu)
}

module.exports = configMenu