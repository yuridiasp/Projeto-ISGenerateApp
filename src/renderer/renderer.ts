import { iValidationReport } from "../models/validation/iValidationReport"

const splitISInput: HTMLInputElement = document.querySelector('#splitIS')
const buttonsDivSplit = document.querySelector('#splitBtns')
const btnConfirmSplit: HTMLButtonElement = document.querySelector('#btnConfirmSplit')
const btnCancelSplit: HTMLButtonElement = document.querySelector('#btnCancelSplit')
const registrationISInput: HTMLInputElement = document.querySelector('#registrationIS')
const buttonsDivRegistrationIS: HTMLButtonElement = document.querySelector('#registrationISBtns')
const btnConfirmRegistrationIS: HTMLButtonElement = document.querySelector('#btnConfirmregistrationIS')
const btnCancelRegistrationIS: HTMLButtonElement = document.querySelector('#btnCancelregistrationIS')
const validateIntimationsInput: HTMLInputElement = document.querySelector('#validateIntimationsIS')
const buttonsDivValidateIntimations: HTMLButtonElement = document.querySelector('#validateIntimationsBtns')
const btnConfirmValidateIntimations: HTMLButtonElement = document.querySelector('#btnConfirmValidateIntimations')
const btnCancelValidateIntimations: HTMLButtonElement = document.querySelector('#btnCancelValidateIntimations')
const loader = document.querySelector('#loader')
const content = document.querySelector('.content')
const reportContainer = document.querySelector("#report-container")
const reportContent = document.querySelector("#report-content")
const closeReportButton: HTMLButtonElement = document.querySelector('#closeReport')

type fileData = {
    fileName: string,
    endereco: string,
    tipo: string
}

let argsSplit: fileData, argsValidate: fileData, argsRegister: fileData

// Defina uma interface para a API
interface MyAPI {
    openFileDialogForFile(): PromiseLike<{ filePaths: string; canceled: string }>
    intimationRegister: (args: any) => Promise<any>;
    intimationValidate: (args: any) => Promise<any>;
    splitFileIs: (args: any) => Promise<any>;
    updateReportStatus: (report: any) => Promise<any>;
    enableButtonCloseReport: (args: any) => Promise<any>;
  }
  
  // Estenda a interface Window para incluir a API
  declare global {
    interface Window {
      api: MyAPI;
    }
  }
  

function createObjectArgs(filePaths: string) {
    const pathArray = filePaths[0].split("\\")
    const nome = pathArray.pop()
    return {
        fileName: nome,
        endereco: filePaths[0],
        tipo: nome.split(".")[0]
    }
}

function setReportFileName (fileName: string) {
    const fileNameTitle = document.querySelector("#fileName")

    fileNameTitle.innerHTML = fileName
}

function setReportFilePath(filePath: string) {
    const filePathTitle = document.querySelector("#filePath")

    filePathTitle.innerHTML = filePath
}

function insertReportValidation({ processo, case_number, publicacao, publication_date, isRegistered, reason = '' }: iValidationReport) {
    const processValue = processo || case_number
    const publicationValue = publicacao || publication_date
    const resultClass = isRegistered ? 'success' : 'error'
    const resultIcon = isRegistered ? 'check' : 'times'

    reportContent.innerHTML += `
        <div class="content-validation-result ${resultClass} ${reason}">
            <i class="fa fa-${resultIcon}" aria-hidden="true"></i>
            <span id="process-report">${processValue.replace("'", "")}</span>
            <span id="publication-report">${publicationValue}</span>
        </div>
    `
}

function resetReport() {
    hiddeLoader()
    showContent()
    hiddeReportContainer()
    setReportFileName('')
    setReportFilePath('')
    reportContent.innerHTML = ''
    btnCancelValidateIntimations.click()
}

function showReportContainer() {
    reportContainer.classList.remove('hidder')
    reportContainer.classList.add('show')
}

function hiddeReportContainer() {
    reportContainer.classList.add('hidder')
    reportContainer.classList.remove('show')
}

function showContent() {
    content.classList.remove('hidder')
    content.classList.add('show')
}

function hiddeContent() {
    content.classList.add('hidder')
    content.classList.remove('show')
}

function showLoader() {
    loader.classList.add('c-loader')
    loader.classList.add('show')
    hiddeContent()
}

function hiddeLoader() {
    loader.classList.remove('c-loader')
    loader.classList.remove('show')
    showContent()
}

closeReportButton.addEventListener('click', resetReport)

splitISInput.addEventListener('click', async () => { 
    const { canceled, filePaths } = await window.api.openFileDialogForFile()
    
    if (!canceled) {
        argsSplit = createObjectArgs(filePaths)

        buttonsDivSplit.classList.add('aparecer')
    }
})

btnConfirmSplit.addEventListener('click', async () => {
    showLoader()
    if (Object.keys(argsSplit).length) {
        let result = await window.api.splitFileIs(argsSplit)

        const { msg, value } = result
        if (value) {
            console.log('Sucesso')
        } else {
            console.log('Erro')
        }
        alert(msg)
    }
    else {
        alert('Erro: Não há arquivo selecionado! Selecione um arquivo antes de solicitar a separação.')
    }
    hiddeLoader()
    btnCancelSplit.click()
})

btnCancelSplit.addEventListener('click', () => {
    buttonsDivSplit.classList.remove('aparecer')
})

registrationISInput.addEventListener('click', async () => {
    const { canceled, filePaths } = await window.api.openFileDialogForFile()

    if (!canceled) {
        argsRegister = createObjectArgs(filePaths)
    
        buttonsDivRegistrationIS.classList.add('aparecer')
    }

})

btnConfirmRegistrationIS.addEventListener('click', async () => {
    showLoader()
    if (Object.keys(argsRegister).length) {
        const result = await window.api.intimationRegister(argsRegister)

        if (result) {
            console.log('Sucesso')
        } else {
            console.log('Erro')
        }
        alert(result)
    }
    else {
        alert('Erro: Não há arquivo selecionado! Selecione um arquivo antes de solicitar a separação.')
    }
    hiddeLoader()
    btnCancelRegistrationIS.click()
})

btnCancelRegistrationIS.addEventListener('click', () => {
    buttonsDivRegistrationIS.classList.remove('aparecer')
})

validateIntimationsInput.addEventListener('click', async () => {
    const { canceled, filePaths } = await window.api.openFileDialogForFile()

    if (!canceled) {
        argsValidate = createObjectArgs(filePaths)

        buttonsDivValidateIntimations.classList.add('aparecer')
    }
})

btnConfirmValidateIntimations.addEventListener('click', async () => {
    hiddeContent()
    showLoader()
    if (Object.keys(argsValidate).length) {        
        let result = await window.api.intimationValidate(argsValidate)
        
        if (result) {
            console.log('Sucesso')
        } else {
            console.log('Erro')
        }
        alert(result)
    }
    else {
        alert('Erro: Não há arquivo selecionado! Selecione um arquivo antes de solicitar a validação.')
    }
})

btnCancelValidateIntimations.addEventListener('click', () => {
    buttonsDivValidateIntimations.classList.remove('aparecer')
})

window.api.updateReportStatus((report: iValidationReport) => {
    showReportContainer()
    hiddeContent()
    setReportFileName(argsValidate.fileName)
    setReportFilePath(argsValidate.endereco)
    insertReportValidation(report)
    //showReportCloseButtonReport()
})

window.api.enableButtonCloseReport(() => {
    closeReportButton.disabled = false
})