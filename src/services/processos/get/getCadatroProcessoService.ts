import { JSDOM } from "jsdom"

import { loggedPostRequest } from "../../../utils/request/postRequest"
import { Result } from "../../../models/result/result"
import { NotFoundError } from "src/models/errors/notFoundError"

export async function getCadastroProcessoService(processo: string, cookie: string, isValidation = false): Promise<Result<{ reason: string, url: string }>> {
    const { URL_PROCESSOS_SISTEMFR } = process.env

    const body = {
        bsAdvProcessos: 's',
        bsAdvProcessosTexto: processo,
        filtrar: 'Filtrar'
    }

    const response = await loggedPostRequest({ cookie, body, url: URL_PROCESSOS_SISTEMFR })

    const dom = new JSDOM(response.data)

    const compromissosElementHTML = dom.window.document.querySelectorAll('body > section > section > div.fdt-espaco > div > div.fdt-pg-conteudo > div.table-responsive > table > tbody > tr')

    const hasTD = !compromissosElementHTML[0].textContent.includes('Nenhum registro até o momento.')

    if (!hasTD) {
        if (isValidation)
            return {
                success: false,
                error: new NotFoundError(processo)
            }
            
        return {
            success: true,
            data: {
                reason: 'process',
                url: null
            }
        }
        
    }
    

    const linkElement: HTMLAnchorElement = dom.window.document.querySelector("body > section > section > div.fdt-espaco > div > div.fdt-pg-conteudo > div.table-responsive > table > tbody > tr > td.fdt-acao > div > div > a:nth-child(1)")

    return {
        success: true,
        data: {
            reason: 'publication',
            url: linkElement.href
        }
    }
}