import { describe, expect, test } from "@jest/globals"

import { setIntervaloFeriadosJudiciario } from "../../src/helpers/datasFeriadosFixos.helpers"
import { calculaFeriadosDerivadosPascoa } from "../../src/utils/feriados/calculaFeriadosDerivadosPascoa.utils"
import { calculaPascoa } from "../../src/utils/feriados/calculaPascoa.utils"
import { isFeriado } from "../../src/utils/feriados/isFeriados.utils"
import { parametros } from "../../src/utils/feriados/parametros.utils"

const processoSE = {
    cidade: "ARACAJU",
    origem: "000000000000",
    natureza: "PREVIDENCIARIA",
    estado: "SE"
}

function formatLocalDate(date: Date) {
    return [
        date.getFullYear(),
        String(date.getMonth() + 1).padStart(2, "0"),
        String(date.getDate()).padStart(2, "0")
    ].join("-")
}

describe("calendario de feriados", () => {
    test("calcula a Pascoa de 2025", () => {
        expect(formatLocalDate(calculaPascoa(2025))).toBe("2025-04-20")
    })

    test("calcula Corpus Christi sessenta dias depois da Pascoa", () => {
        const feriados = calculaFeriadosDerivadosPascoa(calculaPascoa(2025))
        const corpusChristi = feriados.find(({ feriado }) => feriado.includes("CORPUS CHRISTI"))

        expect(corpusChristi).toBeDefined()
        expect(formatLocalDate(corpusChristi.data)).toBe("2025-06-19")
    })

    test("gera recesso forense atravessando dezembro e janeiro", () => {
        const feriados = setIntervaloFeriadosJudiciario({
            nome: "RECESSO FORENSE",
            inicio: [20, 11],
            fim: [6, 0]
        })

        expect(feriados).toHaveLength(18)
        expect(feriados[0].data).toEqual([11, 20])
        expect(feriados[11].data).toEqual([11, 31])
        expect(feriados[12].data).toEqual([0, 1])
        expect(feriados[feriados.length - 1].data).toEqual([0, 6])
    })

    test("identifica feriado usando o ano da propria data", () => {
        const result = isFeriado(
            new Date(2025, 4, 1),
            parametros.tarefaAdvogado,
            processoSE
        )

        expect(result.isHoliday).toBe(true)
    })

    test("inclui feriado estadual de Sergipe para tarefa de advogado", () => {
        const result = isFeriado(
            new Date(2025, 5, 24),
            parametros.tarefaAdvogado,
            processoSE
        )

        expect(result.isHoliday).toBe(true)
        if (result.isHoliday) {
            expect(result.isNacional).toBe(false)
        }
    })
})
