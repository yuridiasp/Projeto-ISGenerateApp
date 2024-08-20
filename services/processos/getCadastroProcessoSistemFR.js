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

    if (hasTD)
        return 'publication'
    
    return 'process'
}

module.exports = getCadastroProcesso