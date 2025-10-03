import { expect, test } from '@jest/globals'

import { calculatePreviousBusinessDay } from '../../src/utils/prazos/calculatePreviousBusinessDay'

const date = "02/10/2025"
const [ day, month, year ] = "01/10/2025".split("/")

test(`Calcular dia util anterior à ${date}`, () => {
    const expectResult = new Date(Number(year), Number(month) - 1, Number(day))
    const result = calculatePreviousBusinessDay(date)

    expect(result).toEqual(expectResult)
})