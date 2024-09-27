describe('Function existeOrigem: Verificar se há processo dependente para construir a string referente ao número do processo da tarefa', () => {
    const { existeOrigem } = require("../../../../../../dist/services/tarefas/taskService")

    it('Existe processo dependente', () => {
        const clienteMockHasOrigem = {
            processo: {
                dependente: '202311800989',
                origem: '201811800803'
            }
        }
        const expectResultHasOrigem = '202311800989 (ORIGEM 201811800803)'
        const resultadoHasOrigem = existeOrigem(clienteMockHasOrigem)
    
        expect(resultadoHasOrigem).toBe(expectResultHasOrigem)
    })

    it('Não existe processo dependente', () => {
        const clienteMockNotHasOrigem = {
            processo: {
                origem: '201811800803'
            }
        }
        const expectResultNotHasOrigem = '201811800803'
        const resultadoNotHasOrigem = existeOrigem(clienteMockNotHasOrigem)
    
        expect(resultadoNotHasOrigem).toBe(expectResultNotHasOrigem)
    })
})