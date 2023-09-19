const splitISInput = document.querySelector('#splitIS')
const formSplit = document.querySelector('#formSplit')
const buttonsDivSplit = document.querySelector('#splitBtns')
const btnConfirmSplit = document.querySelector('#btnConfirmSplit')
const btnCancelSplit = document.querySelector('#btnCancelSplit')
let args = {}

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
    
    if (splitISInput.files.length > 0) {
        let result = await window.api.splitFileIs(args)
        console.log(Date.now())
        console.log(result)
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
    btnCancelSplit.click()
})

btnCancelSplit.addEventListener('click', () => {
    buttonsDivSplit.classList.remove('aparecer')
})