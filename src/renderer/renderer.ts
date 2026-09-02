import { ValidationError } from "@models/errors"
import { Result } from "@models/results"
import { iValidationReport } from "@models/validations/iValidationReport.models"
import { tHandleIntimation } from "@services/intimation"
import { HandleIntimationsReportResult } from "@models/handleIntimationsReport/handleIntimationsReport.models"
import { credential } from "@services/login"
import { iFileData } from "@services/validateIntimations"
import type {
    FolderIntimationCountResult,
    FolderIntimationCounterInput,
    FolderIntimationFileCount
} from "@services/folderIntimationCounter"
import { PublicationComparisonFile, PublicationComparisonItem, PublicationComparisonResult, PublicationComparisonStatus } from "@models/publicationComparison";

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

const inputCountIntimationsByFolder = document.querySelector('#inputCountIntimationsByFolder') as HTMLInputElement
const buttonsDivCountIntimationsByFolder = document.querySelector('#buttonsDivCountIntimationsByFolder') as HTMLButtonElement
const confirmButtonCountIntimationsByFolder = document.querySelector('#confirmButtonCountIntimationsByFolder') as HTMLButtonElement
const cancelButtonCountIntimationsByFolder = document.querySelector('#cancelButtonCountIntimationsByFolder') as HTMLButtonElement


const inputComparePublications = document.querySelector("#inputComparePublications") as HTMLInputElement
const buttonsDivComparePublications = document.querySelector("#buttonsDivComparePublications") as HTMLElement
const confirmButtonComparePublications = document.querySelector("#confirmButtonComparePublications") as HTMLButtonElement
const cancelButtonComparePublications = document.querySelector("#cancelButtonComparePublications") as HTMLButtonElement

const visualIndicatorConection = document.querySelector("#visual-indicator-conection") as HTMLElement
const loader = document.querySelector('#loader') as HTMLElement
const content = document.querySelector('.content') as HTMLElement
const comparisonContainer = document.querySelector("#comparison-report") as HTMLElement
const reportContainer = document.querySelector("#report-container") as HTMLElement
const reportContent = document.querySelector("#report-content") as HTMLElement
const closeReportButton = document.querySelector('#closeReport') as HTMLButtonElement
const closeComparisonReport = document.querySelector('#closeComparisonReport') as HTMLButtonElement
const somenteDivergenciasBtn = document.querySelector("#somente-divergencias-btn") as HTMLButtonElement
const todasPublicacoesBtn = document.querySelector("#todas-publicacoes-btn") as HTMLButtonElement
const successViewPublicacoes = document.querySelector(".success-view-publicacoes") as HTMLButtonElement
const comparisonReportTableContainer = document.querySelector(".comparison-report-table-container") as HTMLElement
const notFoundDivergencesSectionResult = document.querySelector(".not-found-divergences-section-result") as HTMLElement
const totalArquivos = document.querySelectorAll(".total-arquivos") as unknown as HTMLElement[]
const totalPublicacoes = document.querySelectorAll(".total-publicacoes") as unknown as HTMLElement[]
const successDestaqueCardComparisonReport = document.querySelector(".principal-card-comparison-report:last-child") as HTMLElement
const contadorDivergenciasEncontradas = document.querySelectorAll(".divergencias-encontradas") as unknown as HTMLElement[]
const divergencesFoundSectionResult = document.querySelector(".divergences-found-section-result") as HTMLElement
const comparisonReportFilterContainer = document.querySelector(".comparison-report-filter") as HTMLElement
const resultTableComparisonReportTbody = document.querySelector(".result-table-comparison-report tbody") as HTMLElement
const rowResultTableComparisonReportThead = document.querySelector(".result-table-comparison-report thead tr") as HTMLElement
const comparedFileList = document.querySelector("#compared-file-list") as HTMLElement

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

const folderCounterArgs: FolderIntimationCounterInput = {
    folderPath: "",
    folderName: ""
}

const operationArgs: tOperationArgs = {
    classifyPublicationsByDepartment: { fileName: "", filePath: "", isXlsx: false },
    reconcileAnalysesWithSystem: { fileName: "", filePath: "", isXlsx: false },
    reconcilePublicationsWithSystem: { fileName: "", filePath: "", isXlsx: false },
    registerIntimationsFromAnalyses: { fileName: "", filePath: "", isXlsx: false }
}

let credentials: credential | undefined
let currentOperation: operationsType | undefined
let publicationComparisonFiles: iFileData[] = [];
let controlador: AbortController | null
let lastItemShowMoreComparisonTable: HTMLElement | null
let hasDivergencias: boolean | null

function setConnectionStatus(connected: boolean): void {
    visualIndicatorConection.classList.toggle("conectado",connected)
}

// API

    type ApiResult = Result<HandleIntimationsReportResult | tHandleIntimation>
    type FolderCounterApiResult = Result<FolderIntimationCountResult>

    type GenericApiFunction = (
        args: iFileData,
        credentials?: credential,
        currentOperation?: operationsType
    ) => Promise<string | ApiResult>

    export interface iAPI {
        openMultipleFilesDialog(): Promise<{ filePaths: string[], canceled: boolean }>
        openFileDialogForFile(): Promise<{ filePaths: string[], canceled: boolean }>;
        openFolderDialogForFolder(): Promise<{ filePaths: string[], canceled: boolean }>;
        registerIntimationsFromAnalyses: GenericApiFunction;
        reconcilePublicationsWithSystem: GenericApiFunction;
        reconcileAnalysesWithSystem: GenericApiFunction;
        classifyPublicationsByDepartment: GenericApiFunction;
        countIntimationsByFolder(data: FolderIntimationCounterInput): Promise<FolderCounterApiResult>;
        updateReportStatus(callback: (report: iValidationReport, operation?: operationsType) => void): void;
        enableButtonCloseReport(callback: () => void): void;
        abrirJanelaLogin(): void;
        receiveCredentials(callback: (credentials: string) => void): void;
        copyToClipboard(text: string): Promise<boolean>;
        comparePublications(data: iFileData[]): Promise<Result<PublicationComparisonResult>>
        getVersions(): Promise<{ nomeapp: string, autor: string, version: string, electronjs: string, nodejs: string, github: string }>,
        openDirectory(path: string): Promise<void>
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

    export function createFolderArgs(filePaths: string[]): FolderIntimationCounterInput {
        const folderPath = filePaths[0]

        if (!folderPath) {
            return { folderName: "", folderPath: "" }
        }

        const pathArray = folderPath.split("\\")
        const folderName = pathArray.pop() ?? folderPath

        return {
            folderName,
            folderPath
        }
    }

    function hasSelectedFolder(args: FolderIntimationCounterInput): boolean {
        return Boolean(args.folderPath && args.folderName)
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
            

        if (result.success === true) {

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

    export async function processCountIntimationsByFolder(
        args: FolderIntimationCounterInput
    ): Promise<void> {
        if (!hasSelectedFolder(args)) {
            alert("Erro: Nao ha pasta selecionada.")
            return
        }

        showLoader()

        try {
            const result = await window.API.countIntimationsByFolder(args)

            if (result.success === false) {
                alert(result.error.toString())
                hideLoader()
                return
            }

            hideLoaderOnly()
            hideMainMenuContent()
            showReportContainer()
            closeReportButton.disabled = false
            setReportFileName(args.folderName ?? "Pasta")
            setReportFilePath(args.folderPath)
            insertFolderIntimationCountReport(result.data as FolderIntimationCountResult)
        } catch (error) {
            console.error(error)
            alert("Erro inesperado ao contar intimacoes da pasta.")
            hideLoader()
        } finally {
            buttonsDivCountIntimationsByFolder.classList.remove('aparecer')
        }
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

// Renderer do relatório
    function insertPublicationComparisonReport(result: PublicationComparisonResult): void {
        reportContent.innerHTML = "";

        const [summary] = createElementReport(
            result.equal ? "success" : "error",
            result.equal ? "check" : "times",
            result.equal
            ? "PUBLICAÇÕES IDÊNTICAS"
            : `${result.totalDifferences} DIVERGÊNCIAS`,
            `${result.files.length} arquivos comparados`
        );

        reportContent.append(summary);

        result.items
            .filter(item => item.status !== "MATCH")
            .forEach(item => {
            const container = document.createElement("div");
            container.classList.add(
                "publication-comparison-difference"
            );

            const title = document.createElement("strong");

            title.textContent =
                `${item.caseNumber} | ${formatComparisonDate(item.publicationDate)}`;

            container.append(title);

            item.files.forEach(file => {
                const row = document.createElement("div");
                row.classList.add("publication-comparison-file");

                if (file.count === 0) {
                row.classList.add("missing");
                }

                row.textContent =
                `${file.fileName}: ${file.count} ocorrência(s)`;

                container.append(row);
            });

            reportContent.append(container);
        });
    }

    function formatComparisonDate(value: string): string {
        const [year, month, day] = value.split("-");

        return value ? `${day}/${month}/${year}` : "Data não identificada";
    }


// UI

    export function hideComparisonContainer() {
        comparisonContainer.classList.add('hidder')
        comparisonContainer.classList.remove('show')

        const handleTransitionEnd = (event: TransitionEvent) => {
            if (
                event.target === comparisonContainer &&
                comparisonContainer.classList.contains('hidder')
            ) {
                comparisonContainer.style.display = 'none'
            }
        }

        comparisonContainer.addEventListener(
            'transitionend',
            handleTransitionEnd,
            { once: true }
        )
    }

    export function showComparisonContainer() {
        comparisonContainer.style.display = 'block'

        requestAnimationFrame(() => {
            comparisonContainer.classList.remove('hidder')
            comparisonContainer.classList.add('show')
        })
    }

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

        if (filePath.length) {


            if(controlador) {
                controlador.abort()
                controlador = null
            }

            if(!controlador)
                controlador = new AbortController()

            filePathTitle?.addEventListener("click", () => {
                window.API.openDirectory(filePath)
            }, { signal: controlador.signal })
        }
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

    function insertFolderIntimationCountFile(file: FolderIntimationFileCount) {
        const isCounted = file.status === "COUNTED"
        const resultClass = isCounted ? "success" : "error"
        const resultIcon = isCounted ? "check" : "times"
        const countText = isCounted
            ? `${file.intimationCount} intimacoes`
            : file.status

        const [container, spanFileName, content] = createElementReport(
            resultClass,
            resultIcon,
            file.fileName,
            countText
        )

        reportContent.append(container)

        spanFileName.addEventListener("click", async () => {
            const result = await window.API.copyToClipboard(file.filePath)
            showMessageCopy(result)
        })

        if (file.error) {
            const p = document.createElement("p")
            p.classList.add("p-info-is")
            p.innerHTML = file.error
            reportContent.append(p)
        }
    }

    function insertFolderIntimationCountReport(result: FolderIntimationCountResult) {
        reportContent.innerHTML = ""

        const [summary] = createElementReport(
            "success",
            "check",
            `${result.totalIntimations} intimacoes`,
            `${result.countedFiles}/${result.totalFiles} arquivos lidos`
        )

        reportContent.append(summary)
        result.files.forEach(insertFolderIntimationCountFile)
    }

    function hideAllOperationButtons(): void {
        buttonsDivClassifyPublicationsByDepartment.classList.remove('aparecer')
        buttonsDivregisterIntimationsFromAnalyses.classList.remove('aparecer')
        buttonsDivReconcileAnalysesWithSystem.classList.remove('aparecer')
        buttonsDivReconcilePublicationsWithSystem.classList.remove('aparecer')
        buttonsDivCountIntimationsByFolder.classList.remove('aparecer')
        buttonsDivComparePublications.classList.remove('aparecer')
        buttonsDivClassifyPublicationsByDepartment.parentElement?.classList.remove('active-form')
        buttonsDivregisterIntimationsFromAnalyses.parentElement?.classList.remove('active-form')
        buttonsDivReconcileAnalysesWithSystem.parentElement?.classList.remove('active-form')
        buttonsDivReconcilePublicationsWithSystem.parentElement?.classList.remove('active-form')
        buttonsDivCountIntimationsByFolder.parentElement?.classList.remove('active-form')
        buttonsDivComparePublications.parentElement?.classList.remove('active-form')
    }

    export function resetComparison() {
        hideLoader()
        showMainMenuContent()
        hideComparisonContainer()
        resetComparisonReport()
        hideAllOperationButtons()
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

    function hideLoaderOnly() {
        loader.classList.remove('c-loader', 'show')
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
            div.parentElement?.classList.add("active-form")
        }
    }

    export function filterTableRowsComparisonReport (filter: boolean) {
        const rows = document.querySelectorAll(".result-table-tr") as unknown as HTMLElement[]

        rows.forEach(row => row.style.display = "table-row")

        if (filter) {
            const successItem:PublicationComparisonStatus = "MATCH"
            rows.forEach(row => { if (row.dataset['comparisonStatus'] === successItem) row.style.display = "none" })
        }
    }

    export function applyActiveClassFilterComparisonTableBTN (button: HTMLElement) {
        todasPublicacoesBtn.classList.remove("active")
        somenteDivergenciasBtn.classList.remove("active")
        
        button.classList.add("active")
    }
    
    export function updateIconProcessListComparisonTable(currentRow: HTMLElement) {
        const defaultIconCode = "m9 18 6-6-6-6"
        const activeIconCode = "m6 9 6 6 6-6"

        const currentPath = currentRow.querySelector("path")

        const currentPathValue = currentPath?.getAttribute("d")

        const rows = document.querySelectorAll(".result-table-tr") as unknown as HTMLElement[]

        rows.forEach(row => {
            const path = row.querySelector("td:first-child path")

            path?.setAttribute("d", defaultIconCode)
        })

        if (currentPath && (currentPathValue === defaultIconCode))
            currentPath.setAttribute("d", activeIconCode)
    }

    export function showMoreTableRowComparisonTable(target: HTMLElement) {
        const index = target.dataset.comparisonIndex
        
        const trShowMore = document.querySelector(`.show-more-row-info-comparison-report[data-comparison-index="${index}"]`) as HTMLElement
        
        if (trShowMore) {
            lastItemShowMoreComparisonTable?.classList.toggle("display-none")

            if (trShowMore !== lastItemShowMoreComparisonTable) {
                if (trShowMore.classList.contains("display-none")) {
                    trShowMore.classList.toggle("display-none")
                    lastItemShowMoreComparisonTable = trShowMore
                }
            } else {
                lastItemShowMoreComparisonTable = null
            }
                
        }
    }

    export function exibirElementos(elements: HTMLElement[]) {
        elements.forEach(e => e.classList.remove("display-none"))
    }

    export function ocultarElementos(elements: HTMLElement[]) {
        elements.forEach(e => e.classList.add("display-none"))
    }

    export function insertDataFileListComparisonReport (files: PublicationComparisonFile[]) {
        
        const statusTh = rowResultTableComparisonReportThead.querySelector("th:last-child") as HTMLElement

        files.forEach((file, index) => {
            const th = document.createElement("th")
            th.innerHTML = (index + 1).toString()

            rowResultTableComparisonReportThead.insertBefore(th, statusTh)

            const li = document.createElement("li")

            li.innerHTML = `<div>
                                <span class="label-item-file">${index + 1}</span>
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-file-text size-3.5 shrink-0 text-muted-foreground" aria-hidden="true"><path d="M6 22a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h8a2.4 2.4 0 0 1 1.704.706l3.588 3.588A2.4 2.4 0 0 1 20 8v12a2 2 0 0 1-2 2z"></path><path d="M14 2v5a1 1 0 0 0 1 1h5"></path><path d="M10 9H8"></path><path d="M16 13H8"></path><path d="M16 17H8"></path></svg>
                                <span class="inter-normal">${file.fileName}</span>
                            </div>
                            <span class="jetbrains-mono file-path">${file.filePath}</span>`

            comparedFileList.append(li)
        })
    }

    export function insertDataTableComparisonReport(items: PublicationComparisonItem[]) {
        
        items.forEach((item, index) => {
            const trPrimary =document.createElement("tr")

            const primaryStatus = {
                COUNT_MISMATCH: "QUANTIDADE",
                MISSING: "AUSENTE",
                MATCH: "IGUAL",
            }

            const primaryLabelSpanClass = {
                COUNT_MISMATCH: "warning-label",
                MISSING: "danger-label",
                MATCH: "success-label",
            }

            const primaryTdsHTML = item.files.map(file => {
                const tdValue = {
                    COUNT_MISMATCH: `${file.count}x`,
                    MISSING: "—",
                    MATCH: "✓",
                }

                const tdClass = {
                    COUNT_MISMATCH: "multi",
                    MISSING: "fail",
                    MATCH: "success",
                }

                return `<td class="table-icon-result-comparison-report-${tdClass[item.status]} realce-icon-result-comparison-report">${file.count === 1 ? tdValue.MATCH : (file.count === 0 ? tdValue.MISSING : tdValue.COUNT_MISMATCH)}</td>`
            }).join("")

            trPrimary.setAttribute("class", `result-table-tr result-table-${ item.status === "MATCH" ? "success" : "danger"}-bg-tr`)
            trPrimary.dataset.comparisonIndex = index.toString()
            trPrimary.dataset.comparisonStatus = item.status

            trPrimary.innerHTML = `<td>${ item.status === "MATCH" ? '' : '<span><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-chevron-right size-3.5 shrink-0 text-danger-foreground" aria-hidden="true"><path d="m9 18 6-6-6-6"></path></svg></span>'}<span class="jetbrains-mono">${item.caseNumber}</span></td>
                                    <td class="jetbrains-mono">${formatComparisonDate(item.publicationDate)}</td>
                                    ${primaryTdsHTML}
                                    <td>
                                        <span class="${primaryLabelSpanClass[item.status]}">
                                            <span><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-triangle-alert size-3" aria-hidden="true"><path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3"></path><path d="M12 9v4"></path><path d="M12 17h.01"></path></svg></span>
                                            ${primaryStatus[item.status]}
                                        </span>
                                    </td>`
            
            resultTableComparisonReportTbody?.append(trPrimary)

            if (item.status !== "MATCH") {
                const trSecondary =document.createElement("tr")
    
                const secondaryCardsTdsHTML = item.files.map((file, index) => {
                    const card = `<div class="show-more-card-info-comparison-report ${ item.files[index].count === 0 ? 'not-found' : 'found' }-comparison">
                                    <div><span class="label-item-file">${index + 1}</span><span>${file.fileName}</span></div>
                                    <div>
                                        <span><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-x size-3.5" aria-hidden="true"><path d="M18 6 6 18"></path><path d="${ item.files[index].count === 0 ? 'm6 6 12 12' : 'M20 6 9 17l-5-5' }"></path></svg> ${ item.files[index].count === 0 ? 'Não encontrada' : 'Encontrada' }</span>
                                        <span>Quantidades: ${file.count}</span>
                                    </div>
                                </div>`
    
                    return card
                }).join('')
    
                trSecondary.setAttribute("class", "show-more-row-info-comparison-report display-none")
                trSecondary.dataset.comparisonIndex = index.toString()
                trSecondary.dataset.comparisonStatus = item.status
                
                trSecondary.innerHTML = `<td colspan="6">
                                                <div class="show-more-container">
                                                    ${secondaryCardsTdsHTML}
                                                </div>
                                            </td>`
                                    
    
                resultTableComparisonReportTbody?.append(trSecondary)
            }
        })
    }

    export function updateUIComparisonReportFromDivergencias(result: PublicationComparisonResult) {
        insertDataFileListComparisonReport(result.files)

        insertDataTableComparisonReport(result.items)

        const rows = document.querySelectorAll(".result-table-tr") as unknown as HTMLElement[]
        rows.forEach(row => row.addEventListener("click", () => { updateIconProcessListComparisonTable(row); showMoreTableRowComparisonTable(row) }))

        hasDivergencias = !result.equal
        
        totalPublicacoes.forEach(e => {
            e.innerHTML = result.totalPublications.toString()
        })

        totalArquivos.forEach(e => {
            e.innerHTML = result.files.length.toString()
        })
        
        contadorDivergenciasEncontradas.forEach(contador => {
            contador.innerHTML = result.totalDifferences.toString()
        })

        if (hasDivergencias) {
            comparisonReportFilterContainer?.querySelector("div:last-child")?.classList.remove("match-all")
            successDestaqueCardComparisonReport?.classList.remove("success-destaque-card-comparison-report")
            filterTableRowsComparisonReport(true);
            applyActiveClassFilterComparisonTableBTN(somenteDivergenciasBtn)

            ocultarElementos([notFoundDivergencesSectionResult])
            exibirElementos([comparisonReportTableContainer, divergencesFoundSectionResult])
        } else {
            comparisonReportFilterContainer?.querySelector("div:last-child")?.classList.add("match-all")
            successDestaqueCardComparisonReport?.classList.add("success-destaque-card-comparison-report")
            
            ocultarElementos([comparisonReportTableContainer, divergencesFoundSectionResult])
            exibirElementos([notFoundDivergencesSectionResult])
        }
    }

    export function resetComparisonReport() {
        hasDivergencias = null
        resultTableComparisonReportTbody.innerHTML = ""
        comparedFileList.innerHTML = ""
        rowResultTableComparisonReportThead.innerHTML = "<th>PROCESSO</th><th>PUBLICAÇÃO</th><th>STATUS</th>"
        totalPublicacoes.forEach(e => {
            e.innerHTML = "0"
        })
        totalArquivos.forEach(e => {
            e.innerHTML = "0"
        })
        contadorDivergenciasEncontradas.forEach(e => {
            e.innerHTML = "0"
        })
        comparisonReportFilterContainer?.querySelector("div:last-child")?.classList.remove("match-all")
        successDestaqueCardComparisonReport?.classList.remove("success-destaque-card-comparison-report")
        ocultarElementos([comparisonReportTableContainer, divergencesFoundSectionResult, notFoundDivergencesSectionResult])
    }

// Renderer

    // Comparação de Publicações
    //TODO: Refatorar esse bloco para carregar código apenas em uso da funcionalidade
        successViewPublicacoes.addEventListener("click", () => {
            filterTableRowsComparisonReport(false);
            applyActiveClassFilterComparisonTableBTN(todasPublicacoesBtn)
            exibirElementos([comparisonReportTableContainer])
            ocultarElementos([notFoundDivergencesSectionResult])
        })

        todasPublicacoesBtn.addEventListener("click", () => {
            filterTableRowsComparisonReport(false);
            applyActiveClassFilterComparisonTableBTN(todasPublicacoesBtn)
        })

        somenteDivergenciasBtn.addEventListener("click", () => {
            if (hasDivergencias) {
                filterTableRowsComparisonReport(true);
                applyActiveClassFilterComparisonTableBTN(somenteDivergenciasBtn)
            } else {
                exibirElementos([notFoundDivergencesSectionResult])
                ocultarElementos([comparisonReportTableContainer])
            }
        })

        closeComparisonReport.addEventListener('click', () => resetComparison())

        closeReportButton.addEventListener('click', () => resetReport())

        inputClassifyPublicationsByDepartment.addEventListener('click', async () => {
            resetReport()
            const { canceled, filePaths } = await window.API.openFileDialogForFile()
            
            if (!canceled) {
                operationArgs.classifyPublicationsByDepartment = createObjectArgs(filePaths)

                buttonsDivClassifyPublicationsByDepartment?.classList.add('aparecer')
                buttonsDivClassifyPublicationsByDepartment.parentElement?.classList.add('active-form')
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
        buttonsDivClassifyPublicationsByDepartment.parentElement?.classList.remove('active-form')
    })

    inputCountIntimationsByFolder.addEventListener('click', async () => {
        resetReport()
        const { canceled, filePaths } = await window.API.openFolderDialogForFolder()

        if (!canceled) {
            const selectedFolder = createFolderArgs(filePaths)
            folderCounterArgs.folderPath = selectedFolder.folderPath
            folderCounterArgs.folderName = selectedFolder.folderName

            buttonsDivCountIntimationsByFolder?.classList.add('aparecer')
            buttonsDivCountIntimationsByFolder.parentElement?.classList.add('active-form')
        }
    })

    confirmButtonCountIntimationsByFolder.addEventListener('click', () => {
        processCountIntimationsByFolder(folderCounterArgs)
    })

    cancelButtonCountIntimationsByFolder.addEventListener('click', () => {
        buttonsDivCountIntimationsByFolder?.classList.remove('aparecer')
        buttonsDivCountIntimationsByFolder.parentElement?.classList.remove('active-form')
    })

    inputComparePublications.addEventListener("click", async () => {
        resetReport()
        const { canceled, filePaths } =
            await window.API.openMultipleFilesDialog();

        if (canceled) return;

        if (filePaths.length < 2) {
            alert("Selecione pelo menos dois arquivos.");
            return;
        }

        publicationComparisonFiles = filePaths.map(filePath => {
            const pathArray = filePath.split("\\");
            const fileName = pathArray.pop() ?? "";

            return {
                filePath,
                fileName,
                isXlsx: /\.(xls|xlsx|xlsm|csv)$/i.test(filePath)
            };
        });

        buttonsDivComparePublications.classList.add("aparecer")
        buttonsDivComparePublications.parentElement?.classList.add('active-form')
    });

    confirmButtonComparePublications.addEventListener("click", async () => {
        showLoader();

        try {
            const response = await window.API.comparePublications(publicationComparisonFiles);
            
            if (response.success === false) {
                alert(response.error?.toString() ?? "Erro ao comparar arquivos.");
                return;
            }

            hideLoaderOnly();
            hideMainMenuContent();
            closeReportButton.disabled = false
            showComparisonContainer()
            updateUIComparisonReportFromDivergencias(response.data as PublicationComparisonResult)
        } catch (error) {
            console.error(error);
            alert("Erro inesperado ao comparar publicações.");
            hideLoader();
        }
    });

    cancelButtonComparePublications.addEventListener('click', () => {
        buttonsDivComparePublications?.classList.remove('aparecer')
        buttonsDivComparePublications.parentElement?.classList.remove('active-form')
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
            resetReport()
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
            div.parentElement?.classList.remove('active-form')
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
        try {
            credentials = JSON.parse(receivedCredentials)

            setConnectionStatus(true)

            resumeOperation()
        } catch (error) {
            credentials = undefined

            setConnectionStatus(false)

            console.error(
                "Não foi possível processar as credenciais:",
                error
            )
        }
    })

// Data Load
    async function setHtmlText() {
        const versaoSpan = document.querySelector('#versao') as HTMLElement
        const { version } = await window.API.getVersions()
        setConnectionStatus(false)
        versaoSpan.innerText = version
    }

    window.onload = setHtmlText