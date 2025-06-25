import { AxiosResponse } from "axios"
import { JSDOM } from "jsdom"

export function extrairIdBuscaClienteByCPFHtml(response: AxiosResponse<any, any>) {
    const dom = new JSDOM(response.data)

    const a: HTMLAnchorElement = dom.window.document.querySelector("body > section > section > div.fdt-espaco > div > div.fdt-pg-conteudo > div.table-responsive > table > tbody > tr > td.fdt-acao > div > div > a:nth-child(1)")

    return a.href.split('idPK=')[1]
}