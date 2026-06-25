import { ValidationError } from "@models/errors"
import { Result } from "@models/results"
import { iValidationReport } from "@models/validations/iValidationReport.models"
import { tHandleIntimation } from "@services/intimation"
import { HandleIntimationsReportResult } from "@models/handleIntimationsReport/handleIntimationsReport.models"
import { credential } from "@services/login"
import { iFileData } from "@services/validateIntimations"

/**
 * 1. classifyPublicationsByDepartment
 * 
 * Classifies the extracted publications by the responsible department.
 *
 * This function receives the publications extracted from DOCX, XLSX or PDF files
 * and applies the defined classification rules to determine which department
 * should handle each publication.
 *
 * The classification may consider information such as case number, court,
 * publication content, type of lawsuit, keywords, procedural class or any other
 * criteria used internally to identify the correct department.
 *
 * The result of this process allows the publications to be organized and routed
 * to the appropriate workflow, queue or team before reconciliation or registration
 * in the system.
 */
const inputClassifyPublicationsByDepartment = document.querySelector('#inputClassifyPublicationsByDepartment') as HTMLInputElement
const buttonsDivClassifyPublicationsByDepartment = document.querySelector('#buttonsDivClassifyPublicationsByDepartment') as HTMLElement
const confirmButtonClassifyPublicationsByDepartmentXLSX = document.querySelector("#confirmButtonClassifyPublicationsByDepartmentXLSX") as HTMLButtonElement
const confirmButtonClassifyPublicationsByDepartmentDOCX = document.querySelector("#confirmButtonClassifyPublicationsByDepartmentDOCX") as HTMLButtonElement
const cancelButtonClassifyPublicationsByDepartment = document.querySelector("#cancelButtonClassifyPublicationsByDepartment") as HTMLButtonElement

/**
 * 1. registerIntimationsFromAnalyses
 * 
 * Automatically registers intimations in the system based on the analyses
 * extracted from the document.
 *
 * This function should be used after the document has been read and the analyst
 * annotations have been extracted, since not every publication found in the file
 * must necessarily be registered.
 *
 * The registration process should consider only the intimations that were analyzed
 * and identified as requiring system registration, using the relevant information
 * such as case number, publication date, summary, deadline and assigned executor.
 */
const inputRegisterIntimationsFromAnalyses = document.querySelector('#inputRegisterIntimationsFromAnalyses') as HTMLInputElement
const buttonsDivregisterIntimationsFromAnalyses = document.querySelector('#buttonsDivregisterIntimationsFromAnalyses') as HTMLButtonElement
const confirmButtonRegisterIntimationsFromAnalyses = document.querySelector('#confirmButtonRegisterIntimationsFromAnalyses') as HTMLButtonElement
const cancelButtonRegisterIntimationsFromAnalyses = document.querySelector('#cancelButtonRegisterIntimationsFromAnalyses') as HTMLButtonElement

/**
 * Realiza a conciliação entre as informações extraídas do documento e os registros existentes no sistema.
 *
 * Existem duas validações semelhantes, mas com finalidades diferentes:
 *
 * 1. Conciliação das publicações (reconcilePublicationsWithSystem):
 *    Verifica se as publicações constantes nas tabelas dos arquivos DOCX, XLSX ou PDF
 *    foram cadastradas no sistema, utilizando como critério de comparação o número
 *    do processo e a data de publicação.
 *
 * 2. Conciliação das análises (reconcileAnalysesWithSystem):
 *    Verifica se as análises feitas pelos analistas, geralmente localizadas fora das tabelas
 *    do documento e contendo informações como resumo, prazo e executor da intimação,
 *    foram efetivamente cadastradas no sistema.
 *
 * Essa separação é necessária porque nem toda publicação encontrada no documento
 * deve ser registrada no sistema. Portanto, a conciliação das análises permite validar
 * se aquilo que foi analisado e deveria ter sido lançado foi realmente cadastrado,
 * enquanto a conciliação das publicações permite identificar quais publicações não
 * foram cadastradas e possibilita investigar o motivo da ausência do registro.
 */

/* Conciliação das análises */
const inputReconcileAnalysesWithSystem = document.querySelector('#inputReconcileAnalysesWithSystem') as HTMLInputElement
const buttonsDivReconcileAnalysesWithSystem = document.querySelector('#buttonsDivReconcileAnalysesWithSystem') as HTMLButtonElement
const confirmButtonReconcileAnalysesWithSystem = document.querySelector('#confirmButtonReconcileAnalysesWithSystem') as HTMLButtonElement
const cancelButtonReconcileAnalysesWithSystem = document.querySelector('#cancelButtonReconcileAnalysesWithSystem') as HTMLButtonElement

/* Conciliação das publicações */
const inputReconcilePublicationsWithSystem = document.querySelector('#inputReconcilePublicationsWithSystem') as HTMLInputElement
const buttonsDivReconcilePublicationsWithSystem = document.querySelector('#buttonsDivReconcilePublicationsWithSystem') as HTMLButtonElement
const confirmButtonReconcilePublicationsWithSystem = document.querySelector('#confirmButtonReconcilePublicationsWithSystem') as HTMLButtonElement
const cancelButtonReconcilePublicationsWithSystem = document.querySelector('#cancelButtonReconcilePublicationsWithSystem') as HTMLButtonElement

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

type tOperationArgs = {
    classifyPublicationsByDepartment: iFileData,
    reconcileAnalysesWithSystem: iFileData,
    reconcilePublicationsWithSystem: iFileData,
    registerIntimationsFromAnalyses: iFileData,
}

const operationArgs: tOperationArgs = {
    classifyPublicationsByDepartment: { fileName: "", filePath: "", isXlsx: false },
    reconcileAnalysesWithSystem: { fileName: "", filePath: "", isXlsx: false },
    reconcilePublicationsWithSystem: { fileName: "", filePath: "", isXlsx: false },
    registerIntimationsFromAnalyses: { fileName: "", filePath: "", isXlsx: false }
}

let credentials: credential | undefined
let currentOperation: operationsType | undefined

// API

    type ApiResult = Result<HandleIntimationsReportResult | tHandleIntimation>

    type GenericApiFunction = (
        args: iFileData,
        credentials?: credential,
        currentOperation?: operationsType
    ) => Promise<string | ApiResult>

    export interface iAPI {
        openFileDialogForFile(): Promise<{ filePaths: string[], canceled: boolean }>;
        registerIntimationsFromAnalyses: GenericApiFunction;
        reconcilePublicationsWithSystem: GenericApiFunction;
        reconcileAnalysesWithSystem: GenericApiFunction;
        classifyPublicationsByDepartment: GenericApiFunction;
        updateReportStatus(callback: (report: iValidationReport, operation?: operationsType) => void): void;
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
        const filePath = filePaths[0]

        if (!filePath) {
            return { fileName: "", filePath: "", isXlsx: false }
        }

        const pathArray = filePath.split("\\")
        const fileName = pathArray.pop() ?? ""

        return {
            fileName,
            filePath,
            isXlsx: false
        }
    }

    function hasSelectedFile(args: iFileData): boolean {
        return Boolean(args.filePath && args.fileName)
    }

// Operations

    export type operationsArgs = {
        credentials: credential
        operation: operationsType
        loader: HTMLElement
        content: HTMLElement
        args?: iFileData
        cancelButtonRegisterIntimationsFromAnalyses?: HTMLButtonElement
        reportContainer?: HTMLElement
        reportContent?: HTMLElement
        argsValidate?: iFileData
    }

    export const operations = {
        reconcilePublicationsWithSystem: async () => {
            return validateOperationFunction(
                window.API.reconcilePublicationsWithSystem,
                "reconcilePublicationsWithSystem",
                operationArgs.reconcilePublicationsWithSystem,
                credentials
            )
        },

        reconcileAnalysesWithSystem: async () => {
            return validateOperationFunction(
                window.API.reconcileAnalysesWithSystem,
                "reconcileAnalysesWithSystem",
                operationArgs.reconcileAnalysesWithSystem,
                credentials
            )
        },

        registerIntimationsFromAnalyses: async () => {
            return validateOperationFunction(
                window.API.registerIntimationsFromAnalyses,
                "registerIntimationsFromAnalyses",
                operationArgs.registerIntimationsFromAnalyses,
                credentials
            )
        },

        classifyPublicationsByDepartment: async (typeDoc?: { isXlsx: boolean }) => {
            return validateOperationFunction(
                window.API.classifyPublicationsByDepartment,
                "classifyPublicationsByDepartment",
                operationArgs.classifyPublicationsByDepartment,
                undefined,
                typeDoc
            )
        }
    }

    export type operationsType = keyof typeof operations

    function operationRequiresLogin(operation: operationsType): boolean {
        return operation !== "classifyPublicationsByDepartment"
    }

    export async function processValidate(
        validateFunction: GenericApiFunction,
        args: iFileData,
        operation: operationsType,
        credentials?: credential
    ): Promise<void> {
        const response = await validateFunction(args, credentials, operation)
        const emptyFileMessage = "Não há intimações a analisar."

        const result = typeof response === "string"
            ? JSON.parse(response) as ApiResult
            : response
            
        console.log(response, result)

        if (result.success === true) {
            console.log(textMessages.success.successPtBr)

            const data = result.data as Partial<{ message: string; msg: string }>

            alert(data.message ?? data.msg ?? textMessages.success.registerIntimation)

            if (data.message === emptyFileMessage) {
                hideAllOperationButtons()
                hideLoader()
            }

            return
        }

        if (operation !== "registerIntimationsFromAnalyses" && operation !== "classifyPublicationsByDepartment") {
            const error = result.error as ValidationError

            hideMainMenuContent()
            showReportContainer()
            setReportFileName(args.fileName)
            setReportFilePath(args.filePath)

            if (!error.fileLength) {
                insertSuccessMessageResponse(reportContent)
            }
        }

        alert(result.error.toString())
    }

    export async function validateOperationFunction(
        functionAPI: GenericApiFunction,
        operation: operationsType,
        args: iFileData,
        credentials?: credential,
        typeDoc?: { isXlsx: boolean }
    ): Promise<void> {
        currentOperation = operation
        
        if (typeDoc) {
            args.isXlsx = typeDoc.isXlsx
        }

        if (!hasSelectedFile(args)) {
            alert(textMessages.error.emptyFile)
            return
        }

        if (operation !== "registerIntimationsFromAnalyses") {
            hideMainMenuContent()
        }

        showLoader()

        try {
            const requiresLogin = operationRequiresLogin(operation)

            if (requiresLogin && !credentials) {
                window.API.abrirJanelaLogin()
                return
            }

            await processValidate(functionAPI, args, operation, credentials)
        } catch (error) {
            console.error(error)
            alert("Erro inesperado ao processar a operação.")
        } finally {
            if (operation === "registerIntimationsFromAnalyses") {
                cancelButtonRegisterIntimationsFromAnalyses.click()
            }

            if (operation === "classifyPublicationsByDepartment") {
                cancelButtonClassifyPublicationsByDepartment.click()
                hideLoader()
            }
        }
    }

    /* 
        Função invocada quando for necessário realizar login no sistema antes da execução.
        Retoma execução da função.
    */
    export function resumeOperation(): Promise<void> | undefined {
        if (!currentOperation) {
            alert("Nenhuma operação pendente para retomar.")
            return
        }

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

    export function insertReportValidation(
    { processo, case_number, publicacao, publication_date, isRegistered, reason = '', paragraph }: iValidationReport,
        reportContent: HTMLElement
    ) {
        const processValue = processo || case_number || ""
        const publicationValue = publicacao || publication_date || ""
        const resultClass = isRegistered ? 'success' : 'error'
        const resultIcon = isRegistered ? 'check' : 'times'

        const [container, spanCaseNumber, content] = createElementReport(
            resultClass,
            resultIcon,
            processValue,
            publicationValue
        )

        reportContent.append(container)

        spanCaseNumber.addEventListener("click", async () => {
            const result = await window.API.copyToClipboard(spanCaseNumber.textContent ?? "")
            showMessageCopy(result)
        })

        if (!isRegistered) {
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
            p.innerHTML = paragraph ?? reason
            reportContent.append(p)

            button.addEventListener("click", () => toggleEye(iButton, p))
        }
    }

    function hideAllOperationButtons(): void {
        buttonsDivClassifyPublicationsByDepartment.classList.remove('aparecer')
        buttonsDivregisterIntimationsFromAnalyses.classList.remove('aparecer')
        buttonsDivReconcileAnalysesWithSystem.classList.remove('aparecer')
        buttonsDivReconcilePublicationsWithSystem.classList.remove('aparecer')
    }

    export function resetReport() {
        hideLoader()
        showMainMenuContent()
        hideReportContainer()
        setReportFileName('')
        setReportFilePath('')
        reportContent.innerHTML = ''
        hideAllOperationButtons()
    }

    export function showReportContainer() {
        reportContainer.classList.remove('hidder')
        reportContainer.classList.add('show')
    }

    export function showMainMenuContent() {
        content.classList.remove('hidder')
        content.classList.add('show')
    }

    export function showLoader() {
        loader.classList.add('c-loader', 'show')
        hideMainMenuContent()
    }

    export function hideMainMenuContent() {
        content.classList.add('hidder')
        content.classList.remove('show')
    }

    export function hideReportContainer() {
        reportContainer.classList.add('hidder')
        reportContainer.classList.remove('show')
    }

    export function hideLoader() {
        loader.classList.remove('c-loader', 'show')
        showMainMenuContent()
    }

    export function toggleEye (i: HTMLElement, p: HTMLElement) {
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

    export async function setFilePathArg(
        operation: operationsType,
        div: HTMLElement
    ): Promise<void> {
        const { canceled, filePaths } = await window.API.openFileDialogForFile()

        if (!canceled) {
            operationArgs[operation] = createObjectArgs(filePaths)
            div.classList.add('aparecer')
        }
    }

// Renderer

    closeReportButton.addEventListener('click', () => resetReport())

    inputClassifyPublicationsByDepartment.addEventListener('click', async () => {
        const { canceled, filePaths } = await window.API.openFileDialogForFile()
        
        if (!canceled) {
            operationArgs.classifyPublicationsByDepartment = createObjectArgs(filePaths)

            buttonsDivClassifyPublicationsByDepartment?.classList.add('aparecer')
        }
    })

    confirmButtonClassifyPublicationsByDepartmentXLSX?.addEventListener('click', () => {
        operations.classifyPublicationsByDepartment({ isXlsx: true })
    })

    confirmButtonClassifyPublicationsByDepartmentDOCX?.addEventListener('click', () => {
        operations.classifyPublicationsByDepartment({ isXlsx: false })
    })

    cancelButtonClassifyPublicationsByDepartment.addEventListener('click', () => {
        buttonsDivClassifyPublicationsByDepartment?.classList.remove('aparecer')
    })

    export function applyListenersRegisterOrValidateFunction(
        operation: operationsType,
        div: HTMLElement,
        functionAPI: GenericApiFunction,
        btnConfirm: HTMLButtonElement,
        btnCancel: HTMLButtonElement,
        validateInput: HTMLInputElement
    ): void {
        validateInput.addEventListener('click', async () => {
            await setFilePathArg(operation, div)
        })

        btnConfirm.addEventListener('click', () => {
            validateOperationFunction(
                functionAPI,
                operation,
                operationArgs[operation],
                credentials
            )
        })

        btnCancel.addEventListener('click', () => {
            div.classList.remove('aparecer')
        })
    }

    applyListenersRegisterOrValidateFunction(
        "registerIntimationsFromAnalyses",
        buttonsDivregisterIntimationsFromAnalyses,
        window.API.registerIntimationsFromAnalyses,
        confirmButtonRegisterIntimationsFromAnalyses,
        cancelButtonRegisterIntimationsFromAnalyses,
        inputRegisterIntimationsFromAnalyses
    )

    applyListenersRegisterOrValidateFunction(
        "reconcileAnalysesWithSystem",
        buttonsDivReconcileAnalysesWithSystem,
        window.API.reconcileAnalysesWithSystem,
        confirmButtonReconcileAnalysesWithSystem,
        cancelButtonReconcileAnalysesWithSystem,
        inputReconcileAnalysesWithSystem
    )

    applyListenersRegisterOrValidateFunction(
        "reconcilePublicationsWithSystem",
        buttonsDivReconcilePublicationsWithSystem,
        window.API.reconcilePublicationsWithSystem,
        confirmButtonReconcilePublicationsWithSystem,
        cancelButtonReconcilePublicationsWithSystem,
        inputReconcilePublicationsWithSystem
    )

    window.API.updateReportStatus((report: iValidationReport, operation?: operationsType) => {
        const reportOperation = operation ?? currentOperation

        if (!reportOperation) {
            console.error("Não foi possível identificar a operação do relatório.", {
                report,
                operation,
                currentOperation
            })

            return
        }

        if (reportOperation === "classifyPublicationsByDepartment") {
            return
        }

        const args = operationArgs[reportOperation]

        if (!args) {
            console.error("Operação inválida recebida no relatório.", {
                reportOperation,
                operation,
                currentOperation,
                report
            })

            return
        }

        showReportContainer()
        hideMainMenuContent()
        setReportFileName(args.fileName)
        setReportFilePath(args.filePath)
        insertReportValidation(report, reportContent)
    })

    window.API.enableButtonCloseReport(() => {
        closeReportButton.disabled = false
    })

    window.API.receiveCredentials((receivedCredentials: string) => {
        credentials = JSON.parse(receivedCredentials)
        resumeOperation()
    })