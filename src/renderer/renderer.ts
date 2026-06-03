import { ValidationError } from "@models/errors"
import { Result } from "@models/results"
import { iValidationReport } from "@models/validations/iValidationReport.models"
import { HandleIntimationsReportResult, tHandleIntimation } from "@services/intimation"
import { credential } from "@services/login"
import { iFileData } from "@services/validateIntimations"

const splitISInput = document.querySelector('#splitIS') as HTMLInputElement
const buttonsDivSplit = document.querySelector('#splitBtnsOptions') as HTMLElement
const btnConfirmSplitOptionsXlsx = document.querySelector("#btnConfirmSplitOptionsXlsx")
const btnConfirmSplitOptionsDocx = document.querySelector("#btnConfirmSplitOptionsDocx")
const btnCancelSplitOptions = document.querySelector("#btnCancelSplitOptions") as HTMLButtonElement

const registrationISInput = document.querySelector('#registrationIS') as HTMLInputElement
const buttonsDivRegistrationIS = document.querySelector('#registrationISBtns') as HTMLButtonElement
const btnConfirmRegistrationIS = document.querySelector('#btnConfirmregistrationIS') as HTMLButtonElement
const btnCancelRegistrationIS = document.querySelector('#btnCancelregistrationIS') as HTMLButtonElement

const validateIntimationsInput = document.querySelector('#validateIntimationRegister') as HTMLInputElement
const buttonsDivValidateIntimations = document.querySelector('#validateIntimationRegisterBtns') as HTMLButtonElement
const btnConfirmValidateIntimations = document.querySelector('#btnConfirmValidateIntimationRegister') as HTMLButtonElement
const btnCancelValidateIntimations = document.querySelector('#btnCancelValidateIntimationRegister') as HTMLButtonElement

const validateAnaliseRegisterInput = document.querySelector('#validateAnaliseRegister') as HTMLInputElement
const buttonsDivValidateAnaliseRegister = document.querySelector('#validateAnaliseRegisterBtns') as HTMLButtonElement
const btnConfirmValidateAnaliseRegister = document.querySelector('#btnConfirmvalidateAnaliseRegister') as HTMLButtonElement
const btnCancelValidateAnaliseRegister = document.querySelector('#btnCancelvalidateAnaliseRegister') as HTMLButtonElement

const loader = document.querySelector('#loader') as HTMLElement
const content = document.querySelector('.content') as HTMLElement
const reportContainer = document.querySelector("#report-container") as HTMLElement
const reportContent = document.querySelector("#report-content") as HTMLElement
const closeReportButton = document.querySelector('#closeReport') as HTMLButtonElement

const textMessages = {
    success: {
        successPtBr: "Sucesso!",
        registerIntimation: "Intimações registradas com sucesso!",
    },
    error: {
        errorPtBr: 'Erro',
        emptyFile: 'Erro: Não há arquivo selecionado! Selecione um arquivo antes de solicitar o processamento.',
    }
}

let argsSplit: iFileData,
    argsValidateRegister: iFileData = { fileName: "", filePath: "", isXlsx: false },
    argsValidateIntimation: iFileData = { fileName: "", filePath: "", isXlsx: false },
    argsRegister: iFileData = { fileName: "", filePath: "", isXlsx: false },
    credentials: credential,
    currentOperation: operationsType

// API

    export interface iAPI {
        openFileDialogForFile(): Promise<{ filePaths: string[], canceled: boolean }>;
        intimationRegister(args: iFileData, credentials: credential): Promise<string>;
        validateAnaliseRegister(args: iFileData, credentials: credential): Promise<string>;
        validateIntimationRegister(args: iFileData, credentials: credential): Promise<string>;
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
        return { fileName: nome as string, filePath: filePaths[0] }
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
        "validateAnaliseRegister": () => validateOperationFunction(window.API.validateAnaliseRegister, "validateAnaliseRegister", argsValidateRegister, credentials),
        "validateIntimationRegister": () => validateOperationFunction(window.API.validateIntimationRegister, "validateIntimationRegister", argsValidateIntimation, credentials),
        "intimationRegister": () => validateOperationFunction(window.API.intimationRegister, "intimationRegister", argsRegister, credentials),
    }

    export type operationsType = keyof typeof operations

    export async function splitIS (typeDoc: { isXlsx: boolean }) {
        showLoader()
        if (Object.keys(argsSplit).length) {
            const result = await window.API.splitFileIs({ ...argsSplit, ...typeDoc })

            const { msg, value } = result
            if (value) {
                console.log(textMessages.success.successPtBr)
            } else {
                console.log(textMessages.error.errorPtBr)
            }
            alert(msg)
        }
        else {
            alert(textMessages.error.emptyFile)
        }
        hiddeLoader()
        btnCancelSplitOptions.click()
    }

    export async function processValidate(validateFunction: (args: iFileData, credentials: credential) => Promise<string>, args: iFileData, credentials: credential) {
        const resultJSONText = await validateFunction(args, credentials)
                
        const result = JSON.parse(resultJSONText) as Result<HandleIntimationsReportResult | tHandleIntimation>

        if (result.success === true) {
            console.log(textMessages.success.successPtBr)
            alert(result.data?.message || textMessages.success.registerIntimation)
        } else {
            const error = result.error as ValidationError

            if(currentOperation !== "intimationRegister") {
                hiddeContent()
                showReportContainer()
                setReportFileName(args.fileName)
                setReportFilePath(args.filePath)

                if(!error.fileLength)
                    insertSuccessMessageResponse(reportContent)
            }

            alert(result.error.message)
        }
    }

    export async function validateOperationFunction(functionAPI: (args: iFileData, credentials: credential) => Promise<string>, operation: operationsType, args: iFileData, credentials: credential) {
        if(currentOperation !== "intimationRegister") {
            hiddeContent()
        }

        showLoader()
        
        if (Object.keys(args).length) {
            
            if(!credentials) {
                currentOperation = operation
                window.API.abrirJanelaLogin()
            } else {
                processValidate(functionAPI, args, credentials)
            }
        }
        else {
            alert(textMessages.error.emptyFile)
        }

        if (currentOperation === "intimationRegister") {
            hiddeLoader()
            btnCancelRegistrationIS.click()
        }
    }

    /* 
        Função invocada quando for necessário realizar login no sistema antes da execução.
        Retoma execução da função.
    */
    export function resumeOperation () {
        return operations[currentOperation]()
    }


// UI

    export function showMessageCopy(result: boolean) {
        const toggleClassShow = (element: HTMLInputElement) => {
            element.classList.toggle("showMessageOneSecond")
            setTimeout(() => {
                element.classList.toggle("showMessageOneSecond")
            }, 1000)
        }
        if(result) {
            const classNameSucess = document.querySelector("#messageCopySuccess") as HTMLInputElement

            if (classNameSucess)
                toggleClassShow(classNameSucess)
        }
        else {
            const classNameError = document.querySelector("#messageCopyError") as HTMLInputElement

            if (classNameError)
                toggleClassShow(classNameError)
        }
    }

    export function setReportFileName (fileName: string) {
        const fileNameTitle = document.querySelector("#fileName")
        
        if (fileNameTitle)
            fileNameTitle.innerHTML = fileName
    }

    export function setReportFilePath(filePath: string) {
        const filePathTitle = document.querySelector("#filePath")

        if (filePathTitle)
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
            p.innerHTML = paragraph as string
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

    export async function setFilePathArg(args: iFileData, div: HTMLElement) {
        const { canceled, filePaths } = await window.API.openFileDialogForFile()

        if (!canceled) {
            args = createObjectArgs(filePaths)

            div.classList.add('aparecer')
        }

        return args
    }

// Renderer

    closeReportButton.addEventListener('click', () => resetReport())

    splitISInput.addEventListener('click', async () => {
        const { canceled, filePaths } = await window.API.openFileDialogForFile()
        
        if (!canceled) {
            argsSplit = createObjectArgs(filePaths)

            buttonsDivSplit?.classList.add('aparecer')
        }
    })

    btnConfirmSplitOptionsXlsx?.addEventListener('click', () => splitIS({ isXlsx: true }))

    btnConfirmSplitOptionsDocx?.addEventListener('click', () => splitIS({ isXlsx: false }))

    btnCancelSplitOptions.addEventListener('click', () => {
        buttonsDivSplit?.classList.remove('aparecer')
    })

    export function applyListenersRegisterOrValidateFunction(args: iFileData, div: HTMLElement, functionAPI: (args: iFileData, credentials: credential) => Promise<string>, currentOperation: operationsType, btnConfrm: HTMLButtonElement, btnCancel: HTMLButtonElement, validateInput: HTMLInputElement) {
        validateInput.addEventListener('click', async () => setFilePathArg(args, div))
    
        btnConfrm.addEventListener('click', () => validateOperationFunction(functionAPI, currentOperation, args, credentials))
    
        btnCancel.addEventListener('click', () => {
            div.classList.remove('aparecer')
        })
    }

    applyListenersRegisterOrValidateFunction(argsRegister, buttonsDivRegistrationIS, window.API.intimationRegister, "intimationRegister", btnConfirmRegistrationIS, btnCancelRegistrationIS, registrationISInput)

    applyListenersRegisterOrValidateFunction(argsValidateIntimation, buttonsDivValidateIntimations, window.API.validateIntimationRegister, "validateIntimationRegister", btnConfirmValidateIntimations, btnCancelValidateIntimations, validateIntimationsInput)

    applyListenersRegisterOrValidateFunction(argsValidateRegister, buttonsDivValidateAnaliseRegister, window.API.validateAnaliseRegister, "validateAnaliseRegister", btnConfirmValidateAnaliseRegister, btnCancelValidateAnaliseRegister, validateAnaliseRegisterInput)

    window.API.updateReportStatus((report: iValidationReport) => {
        showReportContainer()
        hiddeContent()
        setReportFileName(argsValidateRegister.fileName)
        setReportFilePath(argsValidateRegister.filePath)
        insertReportValidation(report, reportContent)
    })

    window.API.enableButtonCloseReport(() => {
        closeReportButton.disabled = false
    })

    window.API.receiveCredentials((receivedCredentials: string) => {
        credentials = JSON.parse(receivedCredentials)
        resumeOperation()
    })