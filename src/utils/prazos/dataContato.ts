import { Cliente } from "@models/clientes/Cliente"
import { isFeriado } from "@utils/feriados/isFeriados"

export function dataContato(intervalo: number, internalDeadline: Date, param: number, dataProcess: Pick<Cliente["processo"], "cidade" | "origem" | "natureza" | "estado">) {
    let today = new Date(),
        endInterval = Number(intervalo),
        date
        

    today.setHours(0, 0, 0, 0)
    
    if (intervalo > 0) {
        const sundayIndex = 0
        const saturdayIndex = 6
        let businessDayCount = 0

        date = new Date(internalDeadline)

        while (businessDayCount < endInterval) {
            date.setDate(date.getDate() -1)
            const { isHoliday } = isFeriado(date, param, dataProcess)
            const weekDay = date.getDay()
            const isSunday = weekDay === sundayIndex
            const isSaturday = weekDay === saturdayIndex
            const isBusinessDay = !isSunday && !isSaturday && !isHoliday

            if (isBusinessDay) {
                ++businessDayCount
            }
        }
    } else {
        date = internalDeadline
    }

    if (date < today) {
        date = today
    }

    return date
}