import { shell } from 'electron'

import { iWindows } from "../models/windows/iWindows"
import { dados } from "../utils/appData/dados"
import { splitISToExcel } from './fileHandler/fileHandlerExcelService'
import { createWindow } from '../infrastructure/window/createWindow'
import { getCookieLoginSistemFR } from './login/loginService'
import { getCompromissosProcesso } from './compromissos/getCompromissoService'
import { readExcelFile, writeExcelFile } from '../utils/xlsx/excelISFile'
import { iValidation } from "../models/validation/iValidation"
import { InfoCompromissoFromFile } from 'src/models/compromisso/typeCompromissoFromFile'

export function getDadosService () {
    return dados
}

export async function getObjectISService ({ endereco, fileName }: { endereco: string, fileName: string }) {
    let obj = null
    console.log(endereco)
    
    if (endereco && fileName) {
        try {
            obj = { msg: 'Arquivos gerados com sucesso! Acesse a pasta do arquivo original.',value: await splitISToExcel(endereco, fileName) }
        } catch (error) {
            obj = { msg: 'Erro! ' + error, value: false }
        }
    } else {
        obj = { msg: 'Erro! Nome ou caminho do arquivo não encontrados.', value: false }
    }

    return obj
}

export function getObjectValidateIntimationsService({ endereco }: { endereco: string }) {
    
    let obj = null
    
    if (endereco) {
        try {
            obj = { msg: `Arquivo salvo no caminho ${endereco} lidos com sucesso!`, value: readExcelFile(endereco) }
        } catch (error) {
            obj = { msg: 'Erro! ' + error, value: null }
        }
    } else {
        obj = { msg: 'Erro! Nome ou caminho do arquivo não encontrados.', value: null }
    }

    return obj
}

export function writeExcelFileService(validations: iValidation) {
    return writeExcelFile(validations)
}

export async function openPageGithubService() {
    await shell.openExternal(dados.github)
}

export function createMainWindowService (windows: iWindows) {
    const indexPageHtmlFilename = 'index.html'
    const indexPageWidth = 400, indexPageHeight = 600
    
    windows.mainWindow = createWindow(indexPageWidth,  indexPageHeight, { }, { resizable: false }, indexPageHtmlFilename)
}

export function createSobreWindowService (windows: iWindows) {
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

export function closeSobreWindowService(windows: iWindows) {
    windows.sobreWindow.close()
}

export async function getCookieLoginService() {
    return await getCookieLoginSistemFR()
}

export async function intimationValidateService(processo: InfoCompromissoFromFile, cookie: string) {
    return await getCompromissosProcesso(processo, cookie)
}