import { JSDOM } from "jsdom"
import { FieldsClienteData } from "@services/clientes"

export function extractValueFromSelectClienteForm (dom: JSDOM, fields: FieldsClienteData, init: Partial<Record<keyof FieldsClienteData, string>> = {}) {
    return (Object.keys(fields) as (keyof (FieldsClienteData))[]).reduce((previous, current) => {
        const select: HTMLSelectElement = dom.window.document.querySelector(fields[current])
        
        previous[current] = select.selectedIndex === -1 ? "" : select.options[select.selectedIndex].textContent.toUpperCase()
        
        return previous
    }, { ...init } as Record<keyof FieldsClienteData, string>)
}