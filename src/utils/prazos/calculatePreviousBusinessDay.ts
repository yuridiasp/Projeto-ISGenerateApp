import { isFeriado } from "@utils/feriados/isFeriados"
import { parametros } from "@utils/feriados/parametros"

/**
 * 
 * @param {string} dateString Texto de data no formato DD/MM/YYYY
 * 
 * @return {Date} dia útil anterior à data informada com tipo Date
 */
export function ptBRDateStringTODate(dateString: string) {
    const [ day, month, year ] = dateString.split("/")
    const date = new Date(Number(year), Number(month) - 1, Number(day))

    return date
}

/**
 * 
 * @param {string} dateString Texto de data no formato DD/MM/YYYY
 * 
 * @return {Date} dia útil anterior à data informada com tipo Date
 */
export function calculatePreviousBusinessDay(dateString: string): Date {
    const sundayIndex = 0
    const saturdayIndex = 6
    const date = ptBRDateStringTODate(dateString)
    let isHoliday
    let weekDay
    do {
        date.setDate(date.getDate() - 1)
        weekDay = date.getDay()
        isHoliday = isFeriado(date, parametros.tarefaAdvogado, { cidade: "ARACAJU", origem: "", natureza: "", estado: "SE" }).isHoliday
    } while((weekDay === sundayIndex || weekDay === saturdayIndex) || isHoliday)

    return date
}