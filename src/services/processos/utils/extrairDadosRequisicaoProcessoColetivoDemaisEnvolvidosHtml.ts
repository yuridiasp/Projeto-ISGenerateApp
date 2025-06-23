import { AxiosResponse } from "axios"
import { JSDOM } from "jsdom"

export async function extrairDadosRequisicaoProcessoColetivoDemaisEnvolvidosHtml(response: AxiosResponse<any, any>) {
    let demaisEnvolvidos: string[] = []

    const dom = new JSDOM(response.data)

    const tableRows = dom.window.document.querySelectorAll("#demaisEnvolvidos > div > table > tbody > tr > td:nth-child(4)")

    if (tableRows.length) {
        demaisEnvolvidos = Array.from(tableRows).map(tr => tr.textContent)
    }

    return demaisEnvolvidos
}