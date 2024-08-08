const { shell} = require('electron')

const dados = require("../utils/dados")
const splitIS = require('../utils/fileHandler')
const createWindow = require('../utils/createWindow')
const { getCookieLoginSistemFR } = require('./loginSistemFR')
const { getCompromissosProcesso } = require('./compromissosSistemFR')
const { readExcelFile, writeExcelFile } = require('../utils/excelISFile')
const { readPDFFile } = require('../utils/pdfISFile')

function getDadosService () {
    return dados
}

async function getObjectISService ({ endereco, fileName }) {
    let obj = null
    
    if (endereco && fileName) {
        try {
            obj = { msg: 'Arquivos gerados com sucesso! Acesse a pasta do arquivo original.',value: await splitIS(endereco, fileName) }
        } catch (error) {
            obj = { msg: 'Erro! ' + error, value: false }
        }
    } else {
        obj = { msg: 'Erro! Nome ou caminho do arquivo não encontrados.', value: false }
    }

    return obj
}

function getObjectValidateIntimationsService({ endereco }) {
    
    let obj = null
    
    if (endereco) {
        try {
            obj = { msg: `Arquivo salvo no caminho ${endereco} lidos com sucesso!`, value: condiction ? readExcelFile(endereco) : readPDFFile(endereco) }
        } catch (error) {
            obj = { msg: 'Erro! ' + error, value: false }
        }
    } else {
        obj = { msg: 'Erro! Nome ou caminho do arquivo não encontrados.', value: false }
    }

    return obj
}

function writeExcelFileService(validations) {
    return writeExcelFile(validations)
}

async function openPageGithubService() {
    await shell.openExternal(dados.github)
}

function createMainWindowService (windows) {
    const indexPageHtmlFilename = 'index.html'
    const indexPageWidth = 400, indexPageHeight = 600
    
    windows.mainWindow = createWindow(indexPageWidth,  indexPageHeight, { }, { resizable: false }, indexPageHtmlFilename)
}

function createSobreWindowService (windows) {
    if (!windows.sobreWindow) {
        const sobrePageHtmlFilename = 'sobre.html'
        const sobrePageWidth = 300, sobrePageHeight = 500

        windows.sobreWindow = createWindow(sobrePageWidth, sobrePageHeight, {}, {
            alwaysOnTop: true,
            frame: false
        }, sobrePageHtmlFilename)

        windows.sobreWindow.on('closed', () => {
            windows.sobreWindow = null
        })
    }
}

function closeSobreWindowService(windows) {
    windows.sobreWindow.close()
}

async function getCookieLoginService() {
    return await getCookieLoginSistemFR()
}

async function intimationValidateService(processo, cookie) {

    return await getCompromissosProcesso(processo, cookie)
}

module.exports = {
    getDadosService,
    getObjectISService,
    openPageGithubService,
    createMainWindowService,
    createSobreWindowService,
    closeSobreWindowService,
    intimationValidateService,
    getCookieLoginService,
    getObjectValidateIntimationsService,
    writeExcelFileService,
}