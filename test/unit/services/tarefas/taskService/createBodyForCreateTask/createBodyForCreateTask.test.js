test('Function createBodyForCreateTask: ', () => {
    const { createBodyForCreateTask } = require("../../../../../../dist/services/tarefas/taskService")

    const colaboradoresMock = []
    const tiposTarefasMock = []

    beforeEach(() => {
        //TODO: Antes de qualquer execução, criar o compromisso TESTE
    })

    afterEach(() => {
        //TODO: Após qualquer execução, deletar o compromisso TESTE
    })
    
    it('Criar objeto body de todas as tarefas de um compromisso de audiência', async () => {
        const clienteMock = {
            tarefas: [],
            compromisso: {
                id
            },
            processo: {
                id
            }
        }

        const createBodyForCreateTaskMock = {
            getParametroData,
            calcularDataTarefa,
            getDescricao,
            getTipoTarefa,
            getResponsavelExecutor,
        }
        const desiredBodyTask = []

        const resultados = await createBodyForCreateTask({ cliente: clienteMock, colaboradores: colaboradoresMock, tiposTarefas: tiposTarefasMock, createBodyForCreateTaskMock })

        resultados.forEach(resultado => expect(resultado).toMatchObject(desiredBodyTask))
    })
})