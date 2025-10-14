import dayjs from 'dayjs'
import customParseFormat from 'dayjs/plugin/customParseFormat'
import { expect, test } from '@jest/globals'

import { calculatePreviousBusinessDay } from '../../src/utils/prazos/calculatePreviousBusinessDay'

dayjs.extend(customParseFormat)

const date = "02/10/2025"
const expectDate = "01/10/2025"

test(`Calcular dia util anterior à ${date}`, () => {
    const expectResult = dayjs(expectDate, "DD-MM-YYYY").toDate()
    const result = calculatePreviousBusinessDay(dayjs(date, "DD-MM-YYYY"))

    expect(result).toEqual(expectResult)
})