import { expect, test } from '@jest/globals'

import { atualizaHoraFinal } from '../../../../../../src/services/tarefas/index'

test('Function atualizaHoraFinal: A partir de uma string de hora informada, somar 2 horas referente ao horário previsto de término do evento', () => {

    const horarioInicial = "12:00"
    const horarioEsperado = "14:00"

    const resultado = atualizaHoraFinal(horarioInicial)

    expect(horarioEsperado).toBe(resultado)
})