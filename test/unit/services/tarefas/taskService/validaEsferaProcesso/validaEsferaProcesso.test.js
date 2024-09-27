describe('Function validaEsferaProcesso: Verificar se a quantidade de caracteres de um processo corresponde a um processo federal, estadual ou emite erro quando não correspondente', () => {
    const { validaEsferaProcesso } = require("../../../../../../dist/services/tarefas/taskService")

    it('Verificar, com sucesso, que é um processo judicial federal', () => {
        const clienteMock = {
            processo: {
                origem: '202410201331'
            }
        }

        const resultado = validaEsferaProcesso(clienteMock)

        expect(resultado).toBe(true)
    })
    it('Verificar, com sucesso, que é um processo judicial estadual', () => {
        const clienteMock = {
            processo: {
                origem: '00085853620244058500'
            }
        }

        const resultado = validaEsferaProcesso(clienteMock)

        expect(resultado).toBe(false)
    })
    it('Confirmar um erro no cadastro do processo', () => {
        const expectedError = new Error("Erro no cadastro do número do processo")
        const clienteMock = {
            processo: {
                origem: '0008585362024405850'
            }
        }
        try {
            validaEsferaProcesso(clienteMock)
        } catch (error) {
            expect(error).toMatchObject(expectedError)
        }

    })
})
