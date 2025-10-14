import { app } from 'electron'

import configMenu from '@infrastructure/menu/menu'
import { iWindows } from '@models/windows/iWindows'

export function createApp(windows: iWindows): Electron.App {
    const handleSquirrelEvent = require('./handleSquirrel')
    // this should be placed at top of main.js to handle setup events quickly
    if (handleSquirrelEvent(app)) {
        // squirrel event handled and app will exit in 1000ms, so don't do anything else
        return;
    }

    configMenu(app, windows)

    return app
}