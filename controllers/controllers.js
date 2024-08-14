const {
    getObjectISService,
    getDadosService,
    openPageGithubService,
    createMainWindowService,
    createSobreWindowService,
    closeSobreWindowService,
    intimationValidateService,
    getCookieLoginService,
    getObjectValidateIntimationsService,
} = require('../services/services')
const { writeExcelFile } = require('../utils/excelISFile')

function createSobreWindowController (window) {
    createSobreWindowService(window)
}

function createMainWindowController(windows) {
    createMainWindowService(windows)
}

async function splitISController (event, args) {
    return getObjectISService(args)
}

async function githubController () {
    openPageGithubService()
}

async function getVersionsController() {
    return getDadosService()
}

function closeSobreWindowController (windows) {
    closeSobreWindowService(windows)
}

async function getCookieLoginController() {
    return await getCookieLoginService()
}

async function intimationValidateController (intimation, cookie) {
    return await intimationValidateService(intimation, cookie)
}

function getIntimations(args) {
    return getObjectValidateIntimationsService(args)
}

async function intimationsHandleController(event, args, windows) {
    const cookie = await getCookieLoginController()
    const resultado = []
    
    const { msg, value: intimations } = getIntimations(args)
    
    if (!intimations) {
        throw new Error(msg)
    } else {
        console.log(msg)
    }

    intimations.forEach(intimation => {
        const response = intimationValidateController(intimation, cookie).then(result => {
            updateView(result, windows)
            return result
        })

        resultado.push(response)
    })

    const validations = await Promise.all(resultado)
    enableButtonCloseReport(windows)
    return writeExcelFile(validations, args)
}

function enableButtonCloseReport(windows) {
    windows.mainWindow.webContents.send('enable-button-close-report')
}

function updateView(data, windows) {
    windows.mainWindow.webContents.send('update-view-report-validation', data)
}

module.exports = {
    splitISController,
    createSobreWindowController,
    createMainWindowController,
    githubController,
    getVersionsController,
    closeSobreWindowController,
    intimationValidateController,
    getCookieLoginController,
    intimationsHandleController,
}