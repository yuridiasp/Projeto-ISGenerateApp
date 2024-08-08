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
let argsSplit = {}, argsValidate = {}

function showLoader() {
    loader.classList.add('c-loader')
    content.classList.add('hidder')
}

function hiddeLoader() {
    loader.classList.remove('c-loader')
    content.classList.remove('hidder')
}

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
    showLoader()
    if (validateIntimationsInput.files.length > 0) {
        let result = await window.api.intimationValidate(argsValidate)
        console.log(result);
        
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
    hiddeLoader()
    btnCancelValidateIntimations.click()
})

btnCancelValidateIntimations.addEventListener('click', () => {
    buttonsDivValidateIntimations.classList.remove('aparecer')
})