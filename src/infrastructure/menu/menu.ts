import { Menu } from 'electron'

import { iWindows } from '@models/windows/iWindows'
import { createSobreWindowController } from '@controllers/controllers'

function configMenu (app: { name: string }, windows: iWindows): void {
    const templateMenu: Electron.MenuItemConstructorOptions[] = [
        {
            label: app.name,
            submenu: [
                {
                    label: 'Fechar',
                    role: 'quit'
                }
            ]
        },
        {
            label: "DevTools",
            role: "toggleDevTools"
        },
        {
            label: 'Sobre',
            click: () => createSobreWindowController(windows)
        }
    ]

    const menu = Menu.buildFromTemplate(templateMenu)
    Menu.setApplicationMenu(menu)
}

export default configMenu