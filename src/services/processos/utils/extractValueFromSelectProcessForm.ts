import { JSDOM } from "jsdom"
import { FieldsProcessData } from "./extrairDadosRequisicaoProcessoHtml"

export function extractValueFromSelectProcessForm (dom: JSDOM, fields: FieldsProcessData, init: Partial<Record<keyof FieldsProcessData, string>> = {}) {
    return (Object.keys(fields) as (keyof (FieldsProcessData))[]).reduce((previous, current) => {
        const select: HTMLSelectElement = dom.window.document.querySelector(fields[current])
        
        previous[current] = select.selectedIndex === -1 ? "" : select.options[select.selectedIndex].textContent.toUpperCase()
        
        return previous
    }, { ...init } as Record<keyof FieldsProcessData, string>)
}