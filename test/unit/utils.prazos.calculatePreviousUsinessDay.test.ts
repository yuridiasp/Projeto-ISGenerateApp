import dayjs from "dayjs"
import { beforeAll, describe, expect, test } from "@jest/globals"

import { dayjsConfig } from "../../src/config/dayjsConfig.config"
import { timezone } from "../../src/helpers/timezone.helpers"
import {
    calculatePreviousBusinessDay,
    ptBRDateStringTODate
} from "../../src/utils/prazos/calculatePreviousBusinessDay.utils"

beforeAll(() => {
    dayjsConfig()
})

function dateInTimezone(date: string) {
    return dayjs.tz(date, "YYYY-MM-DD", timezone)
}

describe("calculatePreviousBusinessDay", () => {
    test("retorna a sexta-feira anterior quando a data base e segunda-feira", () => {
        const result = calculatePreviousBusinessDay(dateInTimezone("2025-09-01"))

        expect(result.format("YYYY-MM-DD")).toBe("2025-08-29")
    })

    test("ignora feriado nacional no ano da data informada", () => {
        const result = calculatePreviousBusinessDay(dateInTimezone("2025-05-02"))

        expect(result.format("YYYY-MM-DD")).toBe("2025-04-30")
    })

    test("ignora recesso forense ao atravessar a virada do ano", () => {
        const result = calculatePreviousBusinessDay(dateInTimezone("2025-01-07"))

        expect(result.format("YYYY-MM-DD")).toBe("2024-12-19")
    })
})

describe("ptBRDateStringTODate", () => {
    test("converte texto DD/MM/YYYY para Date local", () => {
        const result = ptBRDateStringTODate("02/10/2025")

        expect(result.getFullYear()).toBe(2025)
        expect(result.getMonth()).toBe(9)
        expect(result.getDate()).toBe(2)
    })
})
