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
const { writeExcelFile } = require('../utils/xlsx/excelISFile')

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

async function intimationsRegisterController(event, args, windows) {
    console.log('Realizando login...')
    
    const cookie = await getCookieLoginController()

    if (cookie) {
        console.log('Login realizado!')

        const resultado = []

        const { msg, value: intimations } = getIntimations(args)

        if (!intimations) {
            throw new Error(msg)
        } else {
            console.log(msg)
        }

        return 'Sucesso!'
    } else {
        console.log('Falha no login!')
        return 'Falha!'
    }
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
            updateViewReportValidation(result, windows)
            return result
        })

        resultado.push(response)
    })

    const validations = await Promise.all(resultado).then(intimationsValidated => intimationsValidated.filter(intimation => !intimation.isRegistered))
    enableButtonCloseReport(windows)

    const [ result, newFilePath ] = writeExcelFile({ data: validations, filePath: args, prefix: 'RELATORIO-REGISTRO-INTIMACAO-', sheetName: "Relatório" })
    
    if (result) {
        const pluralOrSingularForIntimacao = validations.length > 1 ? 'intimações' : 'intimação'
        
        return `Encontrado ${validations.length} ${pluralOrSingularForIntimacao} sem cadastro. Exportado relatório no caminho: ${newFilePath}`
    }

    return 'Todas as intimações foram cadastradas! Nenhum arquivo de relatório gerado.'
}

function enableButtonCloseReport(windows) {
    windows.mainWindow.webContents.send('enable-button-close-report')
}

function updateViewReportValidation(data, windows) {
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
    intimationsRegisterController
}