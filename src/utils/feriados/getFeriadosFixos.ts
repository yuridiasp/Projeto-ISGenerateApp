import { Cliente } from "@models/clientes/Cliente"
import { Holiday } from "@models/feriados/Holiday"
import { datas } from "@utils/feriados/datasFixasHelper"
import { parametros } from "@utils/feriados/parametros"

function dataFactory (date: Holiday, resultados: { [key: string]: { feriado: string, isNacional: boolean }[] }, ano: number, increment: boolean = null) {
    const { data: [mes, dia], feriado, isNacional } = date
    const yearCalculated = increment === null ? ano : (increment ? ano + 1 :  ano - 1)
    const dateString = (new Date(yearCalculated, mes, dia)).toISOString()

    resultados[dateString] ? resultados[dateString]?.push({ feriado, isNacional }) : resultados[dateString] = [ { feriado, isNacional } ]
}

export function getFeriadosFixos (ano: number, parametro: number,
    { cidade: cidadeProcesso, origem: numeroProcesso, natureza: naturezaProcesso, estado: estadoProcesso }: Pick<Cliente["processo"], "cidade" | "origem" | "natureza" | "estado">) {
    const tarefaContatar = parametro === parametros.tarefaContatar,
        tarefaAdvogado = parametro === parametros.tarefaAdvogado,
        indexJaneiro = 0,
        isTJ = numeroProcesso.length === 12,
        isTRT = naturezaProcesso === "TRABALHISTA",
        isIS = isTJ || isTRT,
        resultados: { [key: string]: { feriado: string, isNacional: boolean }[] } = {}
            
    
    datas.nacional.forEach(date => dataFactory(date, resultados, ano))

    if (isIS) {
        datas.justicaEstadual.forEach(date => dataFactory(date, resultados, ano))
    }

    if (tarefaContatar) {
        datas.SE.forEach(date => dataFactory(date, resultados, ano))

        datas.ARACAJU.forEach(date => dataFactory(date, resultados, ano))
    }

    if (tarefaAdvogado) {
        datas.justicaNacional.forEach(date => dataFactory(date, resultados, ano))

        datas.feriasAdvogados.forEach(date => {
            const month = date.data[0]

            let increment = null

            if (month == indexJaneiro) {
                increment = true
            }
            else {
                increment = false
            }

            dataFactory(date, resultados, ano, increment)
            dataFactory(date, resultados, ano)
        })
        
        if (estadoProcesso == 'SE') {
            datas.SE.forEach(date => dataFactory(date, resultados, ano))
        }

        if (estadoProcesso == 'DF' || estadoProcesso == 'GO') {
            datas.TRF1.forEach(date => dataFactory(date, resultados, ano))
        }
        
        const cidades = Object.entries(datas.interiores)
        for (const [cidade, dates] of cidades) {
            if (cidade === cidadeProcesso) {
                dates.forEach((date: Holiday) => dataFactory(date, resultados, ano))
            }
        }
    }

    datas.recessoForense.forEach((date: Holiday) => {
        const month = date.data[0]

        let increment = null

        if (month == indexJaneiro) {
            increment = true
        }
        else {
            increment = false
        }

        dataFactory(date, resultados, ano, increment)
        dataFactory(date, resultados, ano)
    })
    
    return resultados
}