const axios = require('axios')
const jsdom = require("jsdom");
const { JSDOM } = jsdom;
require('dotenv').config()

async function getCompromissosProcesso({ processo, description, publicacao }, cookie) {
    let isRegistered = false
    const { URL_COMPROMISSOS_SISTEMFR } = process.env
    const body = {
        bsAdvCompromissos: 's',
        idPRorg: '',
        bsAdvCompromissosDe: '',
        bsAdvCompromissosAte: '',
        bsAdvCompromissosTipo: '',
        bsAdvCompromissosStatus: '',
        bsAdvCompromissosResponsavel: '',
        bsAdvCompromissosCliente: '',
        bsAdvCompromissosProcesso: processo,
        bsAdvCompromissosINSS: '',
        filtrar: 'Filtrar'
    }

    const response = await axios.post(URL_COMPROMISSOS_SISTEMFR, new URLSearchParams(body).toString(), {
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Cookie': cookie,
            'Connection': 'close'
        },
        withCredentials: true
    })

    const dom = new JSDOM(response.data)

    const compromissosElementHTML = dom.window.document.querySelectorAll('body > section > section > div.fdt-espaco > div > div.fdt-pg-conteudo > div.table-responsive > table > tbody > tr')

    const hasTD = !compromissosElementHTML[0].textContent.includes('Nenhum registro até o momento.')
    
    if (hasTD)
        isRegistered = Array.from(compromissosElementHTML).some(compromissoElementHTML => {
            const descriptionHTML = compromissoElementHTML.querySelector('td:nth-child(3)').innerHTML.split('<br>')[0].trim()
            const publicationHTML = compromissoElementHTML.querySelector('td:nth-child(6)').textContent

            return descriptionHTML === description && publicationHTML === publicacao
        })
    
    return { processo, description, publicacao, isRegistered }

}

module.exports = { getCompromissosProcesso }