import path from "path"
import { app } from 'electron'

import configMenu from '@infrastructure/menu/menu.infrastructure'
import { iWindows } from '@models/windows/iWindows.models'

export function createApp(windows: iWindows): Electron.App | undefined {
    const handleSquirrelEvent = require('./handleSquirrel')
    // this should be placed at top of main.js to handle setup events quickly
    if (handleSquirrelEvent(app)) {
        // squirrel event handled and app will exit in 1000ms, so don't do anything else
        return;
    }

    const userDataPath = path.join(app.getPath("appData"), "seu-app-electron");

    app.setPath("userData", userDataPath);

    app.commandLine.appendSwitch("disable-gpu");
    app.commandLine.appendSwitch("disable-gpu-shader-disk-cache");
    app.commandLine.appendSwitch("disable-http-cache");

    configMenu(app, windows)

    return app
}