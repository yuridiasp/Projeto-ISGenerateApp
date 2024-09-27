test('Function atualizaHoraFinal: A partir de uma string de hora informada, somar 2 horas referente ao horário previsto de término do evento', () => {
    const { atualizaHoraFinal } = require("../../../../../../dist/services/tarefas/taskService")

    const horarioInicial = "12:00"
    const horarioEsperado = "14:00"

    const resultado = atualizaHoraFinal(horarioInicial)

    expect(horarioEsperado).toBe(resultado)
})