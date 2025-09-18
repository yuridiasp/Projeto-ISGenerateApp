import jsdom from "jsdom"
const { JSDOM } = jsdom
import dotEnv from 'dotenv'

import { getCadastroProcessoService } from '@services/processos/index'
import { loggedPostRequest } from '@utils/request/postRequest'
import { iValidationReport } from "@models/validation/iValidationReport"
import { iCompromissoFromFile } from "@models/compromisso/iCompromissoFromFile"

dotEnv.config()

//TODO: Refatorar essa função
export async function intimationValidateService({ processo, case_number, description, publicacao, publication_date, expediente, paragraph }: iCompromissoFromFile, cookie: string): Promise<iValidationReport> {
    //console.log(processo, case_number, description, publicacao, publication_date, expediente)
    let isRegistered = false, reason = null
    const processValue = processo || case_number
    const dataCadastro = publicacao || publication_date || expediente?.split(' ')[0]
    const { URL_COMPROMISSOS_SISTEMFR } = process.env
    const body = {
        bsAdvCompromissos: 's',
        bsAdvCompromissosProcesso: processValue,
        filtrar: 'Filtrar'
    }

    const response = await loggedPostRequest({url: URL_COMPROMISSOS_SISTEMFR, body, cookie })

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
        const resultRegisterProcess = await getCadastroProcessoService(processValue, cookie)
        if (resultRegisterProcess.success === false) {
            //TODO: Construir caso de falha na busca do cadastro do processo
            return
        }

        reason = resultRegisterProcess.data.reason
    }
    
    return { processo: processValue, description, publicacao: dataCadastro, isRegistered, reason, paragraph }

}