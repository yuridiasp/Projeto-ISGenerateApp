const splitISInput = document.querySelector('#splitIS')
const buttonsDivSplit = document.querySelector('#splitBtns')
const btnConfirmSplit = document.querySelector('#btnConfirmSplit')
const btnCancelSplit = document.querySelector('#btnCancelSplit')
const validateIntimationsInput = document.querySelector('#validateIntimationsIS')
const buttonsDivValidateIntimations = document.querySelector('#validateIntimationsBtns')
const btnConfirmValidateIntimations = document.querySelector('#btnConfirmValidateIntimations')
const btnCancelValidateIntimations = document.querySelector('#btnCancelValidateIntimations')
const loader = document.querySelector('#loader')
const content = document.querySelector('.content')
const reportContainer = document.querySelector("#report-container")
const reportContent = document.querySelector("#report-content")
const closeReportButton = document.querySelector('#closeReport')
let argsSplit = {}, argsValidate = {}

function setReportFileName (fileName) {
    const fileNameTitle = document.querySelector("#fileName")

    fileNameTitle.innerHTML = fileName
}

function setReportFilePath(filePath) {
    const filePathTitle = document.querySelector("#filePath")

    filePathTitle.innerHTML = filePath
}

function insertReportValidation({ processo, publicacao, isRegistered, reason = '' }) {
    console.log(reason);
    const resultClass = isRegistered ? 'success' : 'error'
    const resultIcon = isRegistered ? 'check' : 'times'

    reportContent.innerHTML += `
        <div class="content-validation-result ${resultClass} ${reason}">
            <i class="fa fa-${resultIcon}" aria-hidden="true"></i>
            <span id="process-report">${processo.replace("'", "")}</span>
            <span id="publication-report">${publicacao}</span>
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

splitISInput.addEventListener('change', event => {
    const { name, path, size, type } = event.target.files[0]

    argsSplit = { 
        fileName: name,
        endereco: path,
        tamanho: size,
        tipo: type
    }

    buttonsDivSplit.classList.add('aparecer')
})

btnConfirmSplit.addEventListener('click', async () => {
    showLoader()
    if (splitISInput.files.length > 0) {
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
});

validateIntimationsInput.addEventListener('change', event => {
    const { name, path, size, type } = event.target.files[0]

    argsValidate = { 
        fileName: name,
        endereco: path,
        tamanho: size,
        tipo: type
    }

    buttonsDivValidateIntimations.classList.add('aparecer')
})

btnConfirmValidateIntimations.addEventListener('click', async () => {
    hiddeContent()
    showLoader()
    if (validateIntimationsInput.files.length > 0) {
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

window.api.updateReportStatus(report => {
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