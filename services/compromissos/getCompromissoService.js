const axios = require('axios')
const jsdom = require("jsdom");
const { JSDOM } = jsdom;
require('dotenv').config()

const getCadastroProcesso = require('../processos/getCadatroProcessoService');
const { loggedPostRequest } = require('../../utils/request/postRequest');

async function getCompromissosProcesso({ processo, case_number, description, publicacao, publication_date, expediente }, cookie) {
    const processValue = processo || case_number
    let isRegistered = false, reason = ''
    const dataCadastro = publicacao || publication_date || expediente.split(' ')[0]
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
        bsAdvCompromissosProcesso: processValue,
        bsAdvCompromissosINSS: '',
        filtrar: 'Filtrar'
    }

    const response = await loggedPostRequest(URL_COMPROMISSOS_SISTEMFR, body, cookie)

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
        const responseProcess = await getCadastroProcesso(processValue, cookie)
        reason = responseProcess.reason
    }
    
    return { processo: processValue, description, publicacao: dataCadastro, isRegistered, reason }

}

module.exports = { getCompromissosProcesso }