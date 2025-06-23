import { JSDOM } from "jsdom"

export function extractValueFromSelect (dom: JSDOM, fields: any) {
    const init: any = {}
    Object.keys(fields).reduce((previous, current) => {
        const select: HTMLSelectElement = dom.window.document.querySelector(fields[current])
        previous[current] = select.selectedIndex === -1 ? "" : select.options[select.selectedIndex].textContent.toUpperCase()
        return previous
    }, init)
}