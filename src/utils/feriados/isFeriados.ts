import { Cliente } from "../../models/cliente/Cliente"
import { calculaFeriados } from "./calculaFeriados"

export type isFeriadoDTO = { isHoliday: boolean, holiday: string , isNacional: boolean | undefined } | { isHoliday: boolean }

export function isFeriado (date: Date, parametro: number, dataProcess: Pick<Cliente["processo"], "cidade" | "origem" | "natureza" | "estado">, year?: number): isFeriadoDTO {
    const feriados = calculaFeriados(parametro, dataProcess, year)
    
    const dateString = date.toISOString()

    if (feriados[dateString]) {
        let holiday = ''

        const isNacional = feriados[dateString].reduce((prev, { feriado, isNacional }) => {
            
            holiday += feriado + '\n'

            return isNacional ?? prev
        }, false)


        return { isHoliday: true, holiday, isNacional }
    }

    return { isHoliday: false }
}