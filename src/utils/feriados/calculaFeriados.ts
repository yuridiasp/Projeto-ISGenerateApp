
import { Cliente } from "../../models/cliente/Cliente"
import { calculaPascoa } from "./calculaPascoa"
import { getFeriadosFixos } from "./getFeriadosFixos"

export function calculaFeriados(parametro: number,  dataProcess: Pick<Cliente["processo"], "cidade" | "origem" | "natureza" | "estado">, year?: number) {
    const date = new Date(),
        ano = year ?? date.getFullYear(),
        fixos = getFeriadosFixos(ano,parametro, dataProcess),
        pascoa = calculaPascoa(ano),
        feriados = { ...fixos }

    const feriadosDerivadosPascoa = calculaFeriadosDerivadosPascoa(pascoa)
        
    feriadosDerivadosPascoa.forEach(feriadoVariavel => {
        const { data, feriado, isNacional } = feriadoVariavel

        const dateString = data.toISOString()

        feriados[dateString] ? feriados[dateString].push({ feriado, isNacional: isNacional ? isNacional : false }) : feriados[dateString] = [ { feriado, isNacional: isNacional ? isNacional : false } ]
    })
    
    return feriados
}