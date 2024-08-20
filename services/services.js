const { shell} = require('electron')

const dados = require("../utils/appData/dados")
const splitIS = require('./fileHandler/fileHandlerExcel')
const createWindow = require('../utils/window/createWindow')
const { getCookieLoginSistemFR } = require('./login/loginSistemFR')
const { getCompromissosProcesso } = require('./compromissos/getCompromissosProcessoSistemFR')
const { readExcelFile, writeExcelFile } = require('../utils/xlsx/excelISFile')
const { calcularDataTarefa } = require('../utils/prazos/prazos')
const { validaTipoCompromisso } = require('../utils/compromissos/validarTipoCompromisso')
const { Cliente } = require('../models/Cliente')

const parametros = {
    tarefaContatar: 1,
    tarefaAdvogado: 2
}

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

    const condiction = true
    
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

function createBodyForCreateTask({ publication_date, case_number, related_case_number, description, internal_deadline, fatal_deadline, time, expert_or_defendant, local_adress}) {

    const cliente = new Cliente({ publication_date, case_number, related_case_number, description, internal_deadline, fatal_deadline, time, expert_or_defendant, local_adress })

    const tipoCompromisso = validaTipoCompromisso(description)

    const arrayAudiencias = ["AUDIÊNCIA DE INSTRUÇÃO E JULGAMENTO", "AUDIÊNCIA UNA", "AUDIÊNCIA DE INSTRUÇÃO", "AUDIÊNCIA INICIAL", "AUDIÊNCIA INAUGURAL"],
        ehTarefaParaAdmOuSac = ((cliente.compromisso.tarefas[0] == "CONTATAR CLIENTE") || (cliente.compromisso.tarefas[0] == "LEMBRAR CLIENTE") || (cliente.compromisso.tarefas[0] == "SMS E WHATSAPP")),
        ehAudiencia = (arrayAudiencias.includes(tipoCompromisso)),
        parametro = (ehTarefaParaAdmOuSac || ehAudiencia) ? parametros.tarefaContatar : parametros.tarefaAdvogado

    calcularDataTarefa(parametro, cliente)

    if ((horarioInicial.value.length == 0 || local.value.length == 0))
        atualizaDescricao(descricaoTarefa, horarioInicial, horarioFinal, local)

    selecionarResponsavelExecutor(option)

    submitAtualizarTarefa()

    if (cliente.compromisso.tarefas.length === 1) {
        desmarcarCaixaTarefaSequencia()
    }

    selectTipoIntimacao()
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
    createBodyForCreateTask
}