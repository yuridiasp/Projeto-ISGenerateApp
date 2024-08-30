const { JSDOM } = require("jsdom")

const { loggedPostRequest } = require("../../utils/request/postRequest")

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

    const response = await loggedPostRequest({ cookie, body, url: URL_PROCESSOS_SISTEMFR })

    const dom = new JSDOM(response.data)

    const compromissosElementHTML = dom.window.document.querySelectorAll('body > section > section > div.fdt-espaco > div > div.fdt-pg-conteudo > div.table-responsive > table > tbody > tr')

    const hasTD = !compromissosElementHTML[0].textContent.includes('Nenhum registro até o momento.')

    if (hasTD) {
        const url = dom.window.document.querySelector("body > section > section > div.fdt-espaco > div > div.fdt-pg-conteudo > div.table-responsive > table > tbody > tr > td.fdt-acao > div > div > a:nth-child(1)").href

        return { reason: 'publication', url }
    }
    
    return { reason: 'process' }
}

module.exports = getCadastroProcesso