describe('Function getParametroData: Definir o parâmetro para o cálculo de prazo', () => {
    const { getParametroData } = require("../../../../../../dist/services/tarefas/taskService")

    const parametros = {
        tarefaContatar: 1,
        tarefaAdvogado: 2
    }

    const clienteMock = {
        compromisso: {}
    }

    it('Tarefas do evento de audiência', () => {
        const arrayAudiencias = [
            { descricao: "AUDIÊNCIA DE INSTRUÇÃO E JULGAMENTO" },
            { descricao: "AUDIÊNCIA UNA" },
            { descricao: "AUDIÊNCIA DE INSTRUÇÃO" },
            { descricao: "AUDIÊNCIA INICIAL" },
            { descricao: "AUDIÊNCIA INAUGURAL" }
        ]

        const resultados = arrayAudiencias.map(audiencia => {
            clienteMock.compromisso.tipoCompromisso = audiencia
            return getParametroData(audiencia, clienteMock)
        })

        resultados.forEach(resultado => expect(resultado).toBe(parametros.tarefaAdvogado))
    })

    it('Tarefas de contatar e mensagem por whatsapp', () => {
        const tarefas = [
            { descricao: 'CONTATAR CLIENTE' },
            { descricao: 'SMS E WHATSAPP' },
            { descricao: 'LEMBRAR CLIENTE' }
        ]

        const resultados = tarefas.map(tarefa => {
            clienteMock.compromisso.tipoCompromisso = tarefa
            return getParametroData(tarefa, clienteMock)
        })

        resultados.forEach(resultado => expect(resultado).toBe(parametros.tarefaContatar))
    })

    it('Tarefa para o advogado', () => {
        const tarefa = { descricao: "MANIFESTAÇÃO SOBRE DOCUMENTOS" }

        const resultado = getParametroData(tarefa, clienteMock)

        expect(resultado).toBe(parametros.tarefaAdvogado)
    })
})