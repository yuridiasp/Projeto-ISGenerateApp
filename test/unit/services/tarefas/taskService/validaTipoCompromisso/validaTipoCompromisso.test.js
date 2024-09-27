describe('Function validaTipoCompromisso: Normaliza o tipo de comprisso informado de acordo com padrão do tipo de tarefa', () => {
    const { validaTipoCompromisso } = require("../../../../../../dist/services/tarefas/taskService")

    const removeAcentuacaoStringMock = (string) => {
        return string
    }

    const clienteMock = {
        processo: {
            cidade: "ARACAJU",
            estado: "SERGIPE"
        }
    }

    it('Normalizar intimação de RPV', () => {
        const description = "RPV"
        const resultado = validaTipoCompromisso(description, clienteMock, removeAcentuacaoStringMock)
        
        expect(resultado).toBe("RPV TRF5 ARACAJU")
    })

    it('Normalizar intimação de ALVARÁ', () => {
        const description = "ALVARA"
        const resultado = validaTipoCompromisso(description, clienteMock, removeAcentuacaoStringMock)
        
        expect(resultado).toBe("RECEBIMENTO DE ALVARÁ")
    })

    it('Normalizar intimação de PRECATÓRIO', () => {
        const description = "PRECATORIO"
        const resultado = validaTipoCompromisso(description, clienteMock, removeAcentuacaoStringMock)
        
        expect(resultado).toBe("RECEBIMENTO DE PRECATÓRIO")
    })

    it('Normalizar intimação de AUDIÊNCIA DE CONCILIAÇÃO', () => {
        const description = "AUDIENCIA DE CONCILIACAO"
        const resultado = validaTipoCompromisso(description, clienteMock, removeAcentuacaoStringMock)
        
        expect(resultado).toBe("AUDIÊNCIA CONCILIATÓRIA")
    })

    it('Normalizar intimação de AUDIÊNCIA INICIAL', () => {
        const description = "AUDIENCIA INICIAL"
        const resultado = validaTipoCompromisso(description, clienteMock, removeAcentuacaoStringMock)
        
        expect(resultado).toBe("AUDIÊNCIA INAUGURAL")
    })

    it('Normalizar intimação de PLANILHA', () => {
        const description = "PLANILHA"
        const resultado = validaTipoCompromisso(description, clienteMock, removeAcentuacaoStringMock)
        
        expect(resultado).toBe("CÁLCULOS")
    })

    it('Normalizar intimação de DADOS COMPLEMENTARES PARA PERíCIA SOCIAL', () => {
        const description = "DADOS COMPLEMENTARES"
        const resultado = validaTipoCompromisso(description, clienteMock, removeAcentuacaoStringMock)
        
        expect(resultado).toBe("EMENDAR")
    })

    it('Normalizar intimação de PEDIDO DE VISTAS', () => {
        const description = "PEDIDO DE VISTAS"
        const resultado = validaTipoCompromisso(description, clienteMock, removeAcentuacaoStringMock)
        
        expect(resultado).toBe("MANIFESTAÇÃO")
    })

    it('Normalizar intimação de PAUTA', () => {
        const description = "PAUTA"
        const resultado = validaTipoCompromisso(description, clienteMock, removeAcentuacaoStringMock)
        
        expect(resultado).toBe("SESSÃO DE JULGAMENTO")
    })
})