const splitISInput = document.querySelector('#splitIS')
const formSplit = document.querySelector('#formSplit')
const buttonsDivSplit = document.querySelector('#splitBtns')
const btnConfirmSplit = document.querySelector('#btnConfirmSplit')
const btnCancelSplit = document.querySelector('#btnCancelSplit')
const loader = document.querySelector('#loader')
const content = document.querySelector('.content')
let args = {}

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

    args = { 
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
        let result = await window.api.splitFileIs(args)

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