import dayjs, { Dayjs } from "dayjs"

import { timezone } from "@helpers/timezone"
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
export function calculatePreviousBusinessDay(dateString: Dayjs): Dayjs {
    //2025-02-10T03:00:00.000Z
    const sundayIndex = 0
    const saturdayIndex = 6
    let previousDay = dayjs.tz(dateString, timezone)
    let isBusinessDay = false
    let weekDay
    do {
        previousDay = previousDay.subtract(1, "d")
        weekDay = previousDay.day()
        const isHoliday = isFeriado(previousDay.toDate(), parametros.tarefaAdvogado, { cidade: "ARACAJU", origem: "", natureza: "", estado: "SE" }).isHoliday
        isBusinessDay = ((weekDay === sundayIndex) || (weekDay === saturdayIndex) || isHoliday)
    } while(isBusinessDay)

    return previousDay
}