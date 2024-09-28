test('Function createBodyForCreateTask: ', () => {
    const { createBodyForCreateTask } = require("../../../../../../dist/services/tarefas/taskService")

    const colaboradoresMock = []
    const tiposTarefasMock = []
    const clienteMock = {}
    
    it('', async () => {
        const desiredBodyTask = []

        const resultados = await createBodyForCreateTask(clienteMock, colaboradoresMock, tiposTarefasMock)

        resultados.forEach(resultado => expect(resultado).toMatchObject(desiredBodyTask))
    })
})