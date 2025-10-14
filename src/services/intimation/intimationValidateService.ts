import dayjs from "dayjs"
import jsdom from "jsdom"
import dotEnv from 'dotenv'

import { getCadastroProcessoService } from '@services/processos/index'
import { loggedPostRequest } from '@utils/request/postRequest'
import { iValidationReport } from "@models/validations"
import { ISAnalysisDTO } from "@models/clientes/Cliente"
import { RequestValidationURL } from "@utils/request/requestValidation"
import { Result } from "@models/results"
import { RecordResultsWithError } from "@models/errors"
import { calculatePreviousBusinessDay } from "@utils/prazos/calculatePreviousBusinessDay"
import { dateTimeFormat } from "@helpers/dateTimeFormat"
import { timezone } from "@helpers/timezone"

const { JSDOM } = jsdom

dotEnv.config()

//TODO: Refatorar essa função
export async function intimationValidateService({ case_number, description, publication_date, paragraph, availability_date, isRecorte, objectRecorte }: ISAnalysisDTO, cookie: string): Promise<Result<{ validationReport: iValidationReport }>> {
    //console.log(processo, case_number, description, publicacao, publication_date, expediente)
    let isRegistered = false, reason = null
    const { URL_COMPROMISSOS_SISTEMFR } = process.env
    const body = {
        bsAdvCompromissos: 's',
        bsAdvCompromissosProcesso: case_number,
        filtrar: 'Filtrar'
    }

    const response = await loggedPostRequest({url: URL_COMPROMISSOS_SISTEMFR, body, cookie })

    const result = RequestValidationURL(response.request.res.responseUrl, URL_COMPROMISSOS_SISTEMFR)

    if (result.success === false)
        return {
            success: false,
            error: new RecordResultsWithError({
                case_number: case_number,
                description,
                publicacao: publication_date.tz(timezone).format(dateTimeFormat),
                isRegistered: null,
                reason: result.error.code,
                paragraph,
                objectRecorte
            }, "Houve um erro para validar registro dessa intimação.")
        }

    const dom = new JSDOM(response.data)
    
    const compromissosElementHTML = dom.window.document.querySelectorAll('body > section > section > div.fdt-espaco > div > div.fdt-pg-conteudo > div.table-responsive > table > tbody > tr')

    const hasTD = !compromissosElementHTML[0].textContent.includes('Nenhum registro até o momento.')
    
    if (hasTD) {
        const previousBusinessDateDispRecorte = calculatePreviousBusinessDay(availability_date)

        isRegistered = Array.from(compromissosElementHTML).some(compromissoElementHTML => {
            const publicationLocaleDateString = publication_date.tz(timezone).format(dateTimeFormat)
            const descriptionHTML = compromissoElementHTML.querySelector('td:nth-child(3)').innerHTML.split('<br>')[0].trim()
            const publicationHTML = compromissoElementHTML.querySelector('td:nth-child(6)').textContent //DD/MM/YYYY
            
            if (description)
                return descriptionHTML === description && publicationHTML === publicationLocaleDateString

            if (isRecorte) {
                const datePubPage = dayjs.tz(publicationHTML, dateTimeFormat, timezone)

                return datePubPage.isBetween(previousBusinessDateDispRecorte, publication_date, "day", "[]")
            }

            return publicationHTML === publicationLocaleDateString
        })
        
        if (!isRegistered)
            reason = 'publication'
    } else {
        const resultRegisterProcess = await getCadastroProcessoService(case_number, cookie)
        if (resultRegisterProcess.success === false) {
            return {
                success: false,
                error: new RecordResultsWithError({
                    case_number: case_number,
                    description,
                    publicacao: publication_date.tz(timezone, true).format(dateTimeFormat),
                    isRegistered: null,
                    reason: resultRegisterProcess.error.code,
                    paragraph,
                    objectRecorte
                }, "Houve um erro para validar registro o cadastro do processo.")
            }
        }

        reason = resultRegisterProcess.data.reason
    }
    
    return {
        success: true,
        data: {
            validationReport: {
                processo: case_number,
                description,
                publicacao: publication_date.tz(timezone, true).format(dateTimeFormat),
                isRegistered,
                reason,
                paragraph,
                objectRecorte
            }
        }
    }
}