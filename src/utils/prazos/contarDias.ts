import { Cliente } from "@models/clientes/Cliente"
import { isFeriado } from "@utils/feriados/isFeriados"

type contagemDiasResult = { uteis: number, todosDias: number, semanas: number }

export function contarDias(dataInterno: Date, parametro: number, dataProcess: Pick<Cliente["processo"], "cidade" | "origem" | "natureza" | "estado">): contagemDiasResult {
    let contaTodos = 0,
        contaUteis = 0,
        domingos = 0,
        date = new Date()

    if (date.toDateString() == dataInterno.toDateString())
        return { uteis: 0, todosDias: 0, semanas: 0 }

    while (date < dataInterno) {
        date.setDate(date.getDate() + 1)
        const { isHoliday } = isFeriado(date, parametro, dataProcess)
        const weekDay = date.getDay()
        const sundayIndex = 0
        const saturdayIndex = 6

        if (weekDay == sundayIndex) {
            domingos++
        }

        if ((weekDay > sundayIndex && weekDay < saturdayIndex) && (!isHoliday)) {
            contaUteis++
        }

        contaTodos++
    }

    return { uteis: contaUteis, todosDias: contaTodos, semanas: domingos }
}