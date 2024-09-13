import { AxiosResponse } from 'axios'

import { iWindows } from '../models/windows/iWindows'
import { createCliente, createClienteDTO } from '../services/clientes/clienteService'
import { createCompromissoService } from '../services/compromissos/compromissoService'
import { getObjectISService, getDadosService, openPageGithubService, createMainWindowService, createSobreWindowService, closeSobreWindowService, intimationValidateService, getCookieLoginService, getObjectValidateIntimationsService } from '../services/services'
import { createTaskService } from '../services/tarefas/taskService'
import { writeExcelFile } from '../utils/xlsx/excelISFile'
import { iValidationReport } from '../models/validation/iValidationReport'
import { openFileDialog } from '../infrastructure/dialog/openFile'
import { InfoCompromissoFromFile } from 'src/models/compromisso/typeCompromissoFromFile'

export function openFileDialogForFile(event: Electron.IpcMainInvokeEvent, windows: iWindows) {
    return openFileDialog(windows)
}

export function createSobreWindowController (windows: iWindows) {
    createSobreWindowService(windows)
}

export function createMainWindowController(windows: iWindows) {
    createMainWindowService(windows)
}

export async function splitISController (event: Electron.IpcMainInvokeEvent, args: { endereco: string; fileName: string }) {
    return getObjectISService(args)
}

export async function githubController () {
    openPageGithubService()
}

export async function getVersionsController() {
    return getDadosService()
}

export function closeSobreWindowController (windows: iWindows) {
    closeSobreWindowService(windows)
}

export async function getCookieLoginController() {
    return await getCookieLoginService()
}

export async function intimationValidateController (intimation: InfoCompromissoFromFile, cookie: string) {
    return await intimationValidateService(intimation, cookie)
}

export function getIntimations(args: { endereco: string }) {
    return getObjectValidateIntimationsService(args)
}

export async function intimationsRegisterController(event: Electron.IpcMainInvokeEvent, args: any, windows: iWindows) {
    console.log('Realizando login...')
    
    const cookie = await getCookieLoginController()

    if (cookie) {
        console.log('Login realizado!')

        const { msg, value: intimations } = getIntimations(args)

        if (!intimations) {
            throw new Error(msg)
        }
        
        console.log(msg)

        const resultados = Promise.all(intimations.map((intimation: createClienteDTO) => createCliente({ ...intimation }, cookie)
            .then(cliente => {
                const response = createCompromissoService(cliente, cookie)
                return createTaskService({ cliente, cookie })
            }).then(resultadoCadastro => updateViewRegistrationIntimations(resultadoCadastro, windows))))

        console.log(resultados)
        

        return 'Sucesso!'
    } else {
        console.log('Falha no login!')

        return 'Falha!'
    }
}

export async function intimationsHandleController(event: Electron.IpcMainInvokeEvent, args: { endereco: string, fileName: string }, windows: iWindows) {
    const cookie = await getCookieLoginController()
    const resultado: Promise<iValidationReport>[] = []
    
    const { msg, value: intimations } = getIntimations(args)
    
    if (!intimations) {
        throw new Error(msg)
    } else {
        console.log(msg)
    }

    intimations.forEach((intimation: InfoCompromissoFromFile) => {
        
        const response = intimationValidateController(intimation, cookie).then(result => {
            updateViewReportValidation(result, windows)
            return result
        })

        resultado.push(response)
    })

    const validations = await Promise.all(resultado).then(intimationsValidated => intimationsValidated.filter((intimation: { isRegistered: boolean }) => !intimation.isRegistered))
    enableButtonCloseReport(windows)

    const [ result, newFilePath ] = writeExcelFile({ data: validations, filePath: args, prefix: 'RELATORIO-REGISTRO-INTIMACAO-', sheetName: "Relatório" })
    
    if (result) {
        const pluralOrSingularForIntimacao = validations.length > 1 ? 'intimações' : 'intimação'
        
        return `Encontrado ${validations.length} ${pluralOrSingularForIntimacao} sem cadastro. Exportado relatório no caminho: ${newFilePath}`
    }

    return 'Todas as intimações foram cadastradas! Nenhum arquivo de relatório gerado.'
}

function enableButtonCloseReport(windows: iWindows) {
    windows.mainWindow.webContents.send('enable-button-close-report')
}

function updateViewReportValidation(data: iValidationReport, windows: iWindows) {
    windows.mainWindow.webContents.send('update-view-report-validation', data)
}

function updateViewRegistrationIntimations(data: AxiosResponse<any, any>[], windows: iWindows) {
    windows.mainWindow.webContents.send('update-view-registration-intimations', data)
}