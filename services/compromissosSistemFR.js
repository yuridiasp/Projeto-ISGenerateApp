const axios = require('axios')
const jsdom = require("jsdom");
const { JSDOM } = jsdom;
require('dotenv').config()

async function getCadastroProcesso(processo, cookie) {
    const { URL_PROCESSOS_SISTEMFR } = process.env
    const body = {
        bsAdvProcessos: 's',
        org: '',
        bsAdvProcessosTexto: processo,
        bsAdvProcessosCpf: '',
        bsAdvProcessosResponsavel: '',
        bsAdvProcessosCliente: '',
        bsAdvProcessosReu: '',
        filtrar: 'Filtrar'
    }

    const response = await axios.post(URL_PROCESSOS_SISTEMFR, new URLSearchParams(body).toString(), {
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
        return 'publication'
    
    return 'process'
}

async function getCompromissosProcesso({ processo, description, publicacao, expediente }, cookie) {
    let isRegistered = false, reason = ''
    const dataCadastro = publicacao || expediente.split(' ')[0]
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
    
    if (hasTD) {
        isRegistered = Array.from(compromissosElementHTML).some(compromissoElementHTML => {
            const descriptionHTML = compromissoElementHTML.querySelector('td:nth-child(3)').innerHTML.split('<br>')[0].trim()
            const publicationHTML = compromissoElementHTML.querySelector('td:nth-child(6)').textContent

            if (description)
                return descriptionHTML === description && publicationHTML === dataCadastro

            return publicationHTML === dataCadastro
        })
        
        if (!isRegistered)
            reason = 'publication'
    } else {
        reason = await getCadastroProcesso(processo, cookie)
    }
    
    return { processo, description, publicacao: dataCadastro, isRegistered, reason }

}

module.exports = { getCompromissosProcesso }