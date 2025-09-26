import { iValidationReport } from "@models/validation/iValidationReport"
import { credential } from "@services/login/loginService"
import { iFileData } from "@services/validateIntimations/validateIntimationsService"

const splitISInput: HTMLInputElement = document.querySelector('#splitIS')
const buttonsDivSplit = document.querySelector('#splitBtnsOptions')
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
const btnConfirmSplitOptionsXlsx = document.querySelector("#btnConfirmSplitOptionsXlsx")
const btnConfirmSplitOptionsDocx = document.querySelector("#btnConfirmSplitOptionsDocx")
const btnCancelSplitOptions: HTMLButtonElement = document.querySelector("#btnCancelSplitOptions")

const operations = {
    "validateIntimations": validateIntimations,
    "intimationRegister": intimationRegister,
}

let argsSplit: iFileData, argsValidate: iFileData, argsRegister: iFileData, credentials: credential, operation: keyof typeof operations

// Defina uma interface para a API
interface iAPI {
    openFileDialogForFile(): PromiseLike<{ filePaths: string; canceled: string }>
    intimationRegister: (args: iFileData, credentials: credential) => Promise<any>;
    intimationValidate: (args: iFileData, credentials: credential) => Promise<any>;
    splitFileIs: (args: iFileData) => Promise<any>;
    updateReportStatus: (report: any) => Promise<any>;
    enableButtonCloseReport: (args: any) => Promise<any>;
    abrirJanelaLogin: () => void;
    receiveCredentials: (receiveCredentials: any) => Promise<any>;
}
  
// Estenda a interface Window para incluir a API
declare global {
    interface Window {
        API: iAPI;
    }
}

async function intimationRegister () {
    showLoader()
    if (Object.keys(argsRegister).length) {
        if(!credentials) {
            operation = "intimationRegister"
            window.API.abrirJanelaLogin()
        } else {
            const { data, success, error } = await window.API.intimationRegister(argsRegister, credentials)

            if (success) {
                console.log('Sucesso')
                alert(data)
            } else {
                console.log('Erro')
                alert(error.message)
            }
        }
    }
    else {
        alert('Erro: Não há arquivo selecionado! Selecione um arquivo antes de solicitar a separação.')
    }
    hiddeLoader()
    btnCancelRegistrationIS.click()
}

async function splitIS (typeDoc: { isXlsx: boolean }) {
    showLoader()
    if (Object.keys(argsSplit).length) {
        const result = await window.API.splitFileIs({ ...argsSplit, ...typeDoc })

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
    btnCancelSplitOptions.click()
}

async function validateIntimations() {
    hiddeContent()
    showLoader()
    if (Object.keys(argsValidate).length) {  
        
        if(!credentials) {
            operation = 'validateIntimations'
            window.API.abrirJanelaLogin()
        } else {
            const { data, success, error } = await window.API.intimationValidate(argsValidate, credentials)
            
            if (success) {
                console.log('Sucesso')
                alert(data.message)
            } else {
                alert(error.message)
                console.log('Erro', error)
            }

            
        }
    }
    else {
        alert('Erro: Não há arquivo selecionado! Selecione um arquivo antes de solicitar a validação.')
    }
}

function resumeOperation () {
    return operations[operation]()
}

function createObjectArgs(filePaths: string): iFileData {
    const pathArray = filePaths[0].split("\\")
    const nome = pathArray.pop()
    return {
        fileName: nome,
        filePath: filePaths[0],
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

function insertReportValidation({ processo, case_number, publicacao, publication_date, isRegistered, reason = '', paragraph }: iValidationReport) {
    const processValue = processo || case_number
    const publicationValue = publicacao || publication_date
    const resultClass = isRegistered ? 'success' : 'error'
    const resultIcon = isRegistered ? 'check' : 'times'

    const toogleEye = (i: HTMLElement, p: HTMLElement) => {
        if (i.classList.contains("fa-eye-slash")) {
            i.classList.remove("fa-eye-slash")
            i.classList.add("fa-eye")

            p.style.display = "none"
        } else {
            i.classList.add("fa-eye-slash")
            i.classList.remove("fa-eye")
            
            p.style.display = "block"
        }
    }

    const container = document.createElement("div")
    reportContent.append(container)
    
    const content = document.createElement("div")
    content.classList.add("content-validation-result")
    content.classList.add(resultClass)
    content.classList.add(reason)
    container.append(content)
    
    const iContent = document.createElement("i")
    iContent.classList.add("fa", `fa-${resultIcon}`)
    iContent.ariaHidden = "true"
    content.append(iContent)
    
    const spanCaseNumber = document.createElement("span")
    spanCaseNumber.innerHTML = processValue.replace("'", "")
    spanCaseNumber.classList.add("process-report")
    content.append(spanCaseNumber)

    const spanPublicationDate = document.createElement("span")
    spanPublicationDate.innerHTML = publicationValue
    spanPublicationDate.classList.add("publication-report")
    content.append(spanPublicationDate)
    
    if(!isRegistered) {
        const button = document.createElement("button")
        button.classList.add("show-information")
        content.append(button)
        
        const iButton = document.createElement("i")
        iButton.classList.add("fa", "fa-eye")
        iButton.ariaHidden = "true"
        button.append(iButton)
        
        const p = document.createElement("p")
        p.classList.add("p-info-is")
        p.style.display = "none"
        p.innerHTML = paragraph
        reportContent.append(p)

        button.addEventListener("click", () => toogleEye(iButton, p))
    }
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
    const { canceled, filePaths } = await window.API.openFileDialogForFile()
    
    if (!canceled) {
        argsSplit = createObjectArgs(filePaths)

        buttonsDivSplit.classList.add('aparecer')
    }
})

btnConfirmSplitOptionsXlsx.addEventListener('click', () => splitIS({ isXlsx: true }))

btnConfirmSplitOptionsDocx.addEventListener('click', () => splitIS({ isXlsx: false }))

btnCancelSplitOptions.addEventListener('click', () => {
    buttonsDivSplit.classList.remove('aparecer')
})

registrationISInput.addEventListener('click', async () => {
    const { canceled, filePaths } = await window.API.openFileDialogForFile()

    if (!canceled) {
        argsRegister = createObjectArgs(filePaths)
    
        buttonsDivRegistrationIS.classList.add('aparecer')
    }

})

btnConfirmRegistrationIS.addEventListener('click', intimationRegister)

btnCancelRegistrationIS.addEventListener('click', () => {
    buttonsDivRegistrationIS.classList.remove('aparecer')
})

validateIntimationsInput.addEventListener('click', async () => {
    const { canceled, filePaths } = await window.API.openFileDialogForFile()

    if (!canceled) {
        argsValidate = createObjectArgs(filePaths)

        buttonsDivValidateIntimations.classList.add('aparecer')
    }
})

btnConfirmValidateIntimations.addEventListener('click', validateIntimations)

btnCancelValidateIntimations.addEventListener('click', () => {
    buttonsDivValidateIntimations.classList.remove('aparecer')
})

window.API.updateReportStatus((report: iValidationReport) => {
    showReportContainer()
    hiddeContent()
    setReportFileName(argsValidate.fileName)
    setReportFilePath(argsValidate.filePath)
    insertReportValidation(report)
    //showReportCloseButtonReport()
})

window.API.enableButtonCloseReport(() => {
    closeReportButton.disabled = false
})

window.API.receiveCredentials((receivedCredentials: string) => {
    credentials = JSON.parse(receivedCredentials)
    resumeOperation()
})