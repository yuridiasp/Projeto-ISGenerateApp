const { app } = require('electron')

const handleSquirrelEvent = require('./handleSquirrel');
const configMenu = require('./utils/menu');

function createApp(window) {
    // this should be placed at top of main.js to handle setup events quickly
    if (handleSquirrelEvent(app)) {
        // squirrel event handled and app will exit in 1000ms, so don't do anything else
        return;
    }

    //configMenu(app, window)

    return app
}

module.exports = createApp