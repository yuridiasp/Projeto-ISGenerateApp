const splitISInput = document.querySelector('#splitIS')
const buttonsDivSplit = document.querySelector('#splitBtns')

splitISInput.addEventListener('change', event => {
    const { name, path, size, type } = event.target.files[0]

    console.log(`name: ${name} | path: ${path} | size: ${size} | type: ${type}`)

    buttonsDivSplit.classList.add('aparecer')
})