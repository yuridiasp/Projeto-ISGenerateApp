import { ValidationError } from "@models/errors"
import { Result } from "@models/results"
import { iValidationReport } from "@models/validations/iValidationReport"
import { HandleIntimationsReportResult, tHandleIntimation } from "@services/intimation"
import { credential } from "@services/login"
import { iFileData } from "@services/validateIntimations"

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
const loader = document.querySelector('#loader') as HTMLElement
const content = document.querySelector('.content') as HTMLElement
const reportContainer = document.querySelector("#report-container") as HTMLElement
const reportContent = document.querySelector("#report-content") as HTMLElement
const closeReportButton: HTMLButtonElement = document.querySelector('#closeReport')
const btnConfirmSplitOptionsXlsx = document.querySelector("#btnConfirmSplitOptionsXlsx")
const btnConfirmSplitOptionsDocx = document.querySelector("#btnConfirmSplitOptionsDocx")
const btnCancelSplitOptions: HTMLButtonElement = document.querySelector("#btnCancelSplitOptions")

let argsSplit: iFileData, argsValidate: iFileData, argsRegister: iFileData, credentials: credential, operation: operationsType

// API

    export interface iAPI {
        openFileDialogForFile(): Promise<{ filePaths: string[], canceled: boolean }>;
        intimationRegister(args: iFileData, credentials: credential): Promise<string>;
        intimationValidate(args: iFileData, credentials: credential): Promise<string>;
        splitFileIs(args: iFileData): Promise<any>;
        updateReportStatus(callback: (report: iValidationReport) => void): void;
        enableButtonCloseReport(callback: () => void): void;
        abrirJanelaLogin(): void;
        receiveCredentials(callback: (credentials: string) => void): void;
        copyToClipboard(text: string): Promise<boolean>;
    }

    declare global {
        interface Window {
            API: iAPI;
        }
    }

// FileManager

    export function createObjectArgs(filePaths: string[]): iFileData {
        const pathArray = filePaths[0].split("\\")
        const nome = pathArray.pop()
        return { fileName: nome, filePath: filePaths[0] }
    }

// Operations

    export type operationsArgs = {
        credentials: credential
        operation: operationsType
        loader: HTMLElement
        content: HTMLElement
        argsRegister?: iFileData
        btnCancelRegistrationIS?: HTMLButtonElement
        reportContainer?: HTMLElement
        reportContent?: HTMLElement
        argsValidate?: iFileData
    }

    export const operations = {
        "validateIntimations": validateIntimations,
        "intimationRegister": intimationRegister,
    }

    export type operationsType = keyof typeof operations

    export async function intimationRegister () {
        showLoader()
        if (Object.keys(argsRegister).length) {
            if(!credentials) {
                operation = "intimationRegister"
                window.API.abrirJanelaLogin()
            } else {
                const resultJSONText = await window.API.intimationRegister(argsRegister, credentials)
                const result = JSON.parse(resultJSONText) as Result<tHandleIntimation>
                if (result.success === true) {
                    console.log('Sucesso')
                    alert("Intimações registradas com sucesso!")
                    console.log(result.data)
                } else {
                    console.log(result.error)
                    alert(result.error.message)
                }
            }
        }
        else {
            alert('Erro: Não há arquivo selecionado! Selecione um arquivo antes de solicitar a separação.')
        }
        hiddeLoader()
        btnCancelRegistrationIS.click()
    }

    export async function splitIS (typeDoc: { isXlsx: boolean }) {
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

    export async function validateIntimations() {
        hiddeContent()
        showLoader()
        if (Object.keys(argsValidate).length) {  
            
            if(!credentials) {
                operation = 'validateIntimations'
                window.API.abrirJanelaLogin()
            } else {
                const resultJSONText = await window.API.intimationValidate(argsValidate, credentials)
                
                const result = JSON.parse(resultJSONText) as Result<HandleIntimationsReportResult>
                if (result.success === true) {
                    console.log('Sucesso')
                    alert(result.data.message)
                } else {
                    const error = result.error as ValidationError
                    showReportContainer()
                    setReportFileName(argsValidate.fileName)
                    setReportFilePath(argsValidate.filePath)
                    if(!error.fileLength)
                        insertSuccessMessageResponse(reportContent)
                    alert(result.error.message)
                }          
            }
        }
        else {
            alert('Erro: Não há arquivo selecionado! Selecione um arquivo antes de solicitar a validação.')
        }
    }

    export function resumeOperation () {
        debugger
        return operations[operation]()
    }


// UI

    export function showMessageCopy(result: boolean) {
        const toggleClassShow = (element: HTMLInputElement) => {
            element.classList.toggle("showMessageOneSecond")
            setTimeout(() => {
                element.classList.toggle("showMessageOneSecond")
            }, 1000)
        }
        if(result)
            toggleClassShow(document.querySelector("#messageCopySuccess"))
        else
            toggleClassShow(document.querySelector("#messageCopyError"))
    }

    export function setReportFileName (fileName: string) {
        const fileNameTitle = document.querySelector("#fileName")

        fileNameTitle.innerHTML = fileName
    }

    export function setReportFilePath(filePath: string) {
        const filePathTitle = document.querySelector("#filePath")

        filePathTitle.innerHTML = filePath
    }

    export function createElementReport(resultClass: 'success' | 'error', resultIcon: 'check' | 'times', processValue = "", publicationValue = "") {
        const container = document.createElement("div")
        
        const content = document.createElement("div")
        content.classList.add("content-validation-result")
        content.classList.add(resultClass)
        container.append(content)
        
        const iContent = document.createElement("i")
        iContent.classList.add("fa", `fa-${resultIcon}`)
        iContent.ariaHidden = "true"
        content.append(iContent)
        
        const spanCaseNumber = document.createElement("span")
        spanCaseNumber.innerHTML = processValue
        spanCaseNumber.classList.add("process-report")
        content.append(spanCaseNumber)

        const spanPublicationDate = document.createElement("span")
        spanPublicationDate.innerHTML = publicationValue
        spanPublicationDate.classList.add("publication-report")
        content.append(spanPublicationDate)

        return [container, spanCaseNumber, content]
    }

    export function insertSuccessMessageResponse(reportContent: HTMLElement) {
        const resultClass = 'success'
        const resultIcon = 'check'

        const [ container ] = createElementReport(resultClass, resultIcon, "Arquivo sem intimações para validar.")
        reportContent.append(container)
    }

    export function insertReportValidation({ processo, case_number, publicacao, publication_date, isRegistered, reason = '', paragraph }: iValidationReport, reportContent: HTMLElement) {
        const processValue = processo || case_number
        const publicationValue = publicacao || publication_date
        const resultClass = isRegistered ? 'success' : 'error'
        const resultIcon = isRegistered ? 'check' : 'times'

        const [ container, spanCaseNumber, content ] = createElementReport(resultClass, resultIcon, processValue, publicationValue)
        reportContent.append(container)

        spanCaseNumber.addEventListener("click", async () => {
            const result = await window.API.copyToClipboard(spanCaseNumber.textContent)
            
            showMessageCopy(result)
        })
        
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

    export function resetReport() {
        hiddeLoader()
        showContent()
        hiddeReportContainer()
        setReportFileName('')
        setReportFilePath('')
        reportContent.innerHTML = ''
        btnCancelValidateIntimations.click()
    }

    export function showReportContainer() {
        reportContainer.classList.remove('hidder')
        reportContainer.classList.add('show')
    }

    export function showContent() {
        content.classList.remove('hidder')
        content.classList.add('show')
    }

    export function showLoader() {
        loader.classList.add('c-loader', 'show')
        hiddeContent()
    }

    export function hiddeContent() {
        content.classList.add('hidder')
        content.classList.remove('show')
    }

    export function hiddeReportContainer() {
        reportContainer.classList.add('hidder')
        reportContainer.classList.remove('show')
    }

    export function hiddeLoader() {
        loader.classList.remove('c-loader', 'show')
        showContent()
    }

    export function toogleEye (i: HTMLElement, p: HTMLElement) {
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

// Renderer

    closeReportButton.addEventListener('click', () => resetReport())

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

    btnConfirmRegistrationIS.addEventListener('click', () => intimationRegister())

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

    btnConfirmValidateIntimations.addEventListener('click', () => validateIntimations())

    btnCancelValidateIntimations.addEventListener('click', () => {
        buttonsDivValidateIntimations.classList.remove('aparecer')
    })

    window.API.updateReportStatus((report: iValidationReport) => {
        showReportContainer()
        hiddeContent()
        setReportFileName(argsValidate.fileName)
        setReportFilePath(argsValidate.filePath)
        insertReportValidation(report, reportContent)
    })

    window.API.enableButtonCloseReport(() => {
        closeReportButton.disabled = false
    })

    window.API.receiveCredentials((receivedCredentials: string) => {
        credentials = JSON.parse(receivedCredentials)
        resumeOperation()
    })