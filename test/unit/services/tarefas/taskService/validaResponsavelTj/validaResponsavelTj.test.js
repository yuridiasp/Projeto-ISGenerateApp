describe('Function validaResponsavelTj: ', () => {
    const { validaResponsavelTj } = require("../../../../../../dist/services/tarefas/taskService")

    const processLengthTJSE = 12

    it('Definir responsável/executor de tarefa de acompanhamento para o Adminstrativo da matriz', () => {
        const validaResponsavelTjMock = {
            tipoCompromissoNormalizado: "DECISÃO",
            tarefaAtualNormalizada: "ACOMPANHAR - ADM",
            digito: 0
        }
    
        const cliente = {
            localAtendido: "ARACAJU",
            processo: {
                natureza: "TRABALHISTA"
            }
        }

        const desiredRespExec = {responsavel: 'LEANDRO SANTOS', executor: 'LEANDRO SANTOS'}

        const resultado = validaResponsavelTj(cliente, processLengthTJSE, validaResponsavelTjMock)

        expect(resultado).toMatchObject(desiredRespExec)
    })

    it('Definir responsável/executor de tarefa de Alvará para o Financeiro', () => {
        const validaResponsavelTjMock = {
            tipoCompromissoNormalizado: "RECEBIMENTO DE ALVARA",
            tarefaAtualNormalizada: "RECEBIMENTO DE ALVARA - FINANCEIRO",
            digito: 0
        }
    
        const cliente = {
            localAtendido: "ARACAJU",
            processo: {
                natureza: "TRABALHISTA"
            }
        }

        const desiredRespExec = {responsavel: "VICTOR MENDES DOS SANTOS",executor: "VICTOR MENDES DOS SANTOS"}

        const resultado = validaResponsavelTj(cliente, processLengthTJSE, validaResponsavelTjMock)

        expect(resultado).toMatchObject(desiredRespExec)
    })

    it('Definir responsável/executor de tarefa de RPV para o Financeiro', () => {
        const validaResponsavelTjMock = {
            tipoCompromissoNormalizado: "RPV TRF5 ARACAJU",
            tarefaAtualNormalizada: "RPV TRF5 ARACAJU - FINANCEIRO",
            digito: 0
        }
    
        const cliente = {
            localAtendido: "ARACAJU",
            processo: {
                natureza: "TRABALHISTA"
            }
        }

        const desiredRespExec = {responsavel: "LUCIANA LIMA REZENDE",executor: "SHEYLA SANTANA SANTOS"}

        const resultado = validaResponsavelTj(cliente, processLengthTJSE, validaResponsavelTjMock)

        expect(resultado).toMatchObject(desiredRespExec)
    })

    it('Definir responsável/executor de tarefa de contatar para o Administrativo de Estância', () => {
        const validaResponsavelTjMock = {
            tipoCompromissoNormalizado: "PERICIA TECNICA",
            tarefaAtualNormalizada: "CONTATAR CLIENTE",
            digito: 0
        }
    
        const cliente = {
            cidade: "ESTANCIA",
            localAtendido: "ESTANCIA",
            processo: {
                natureza: "TRABALHISTA"
            }
        }

        const desiredRespExec = {responsavel: "SANDOVAL FILHO CORREIA LIMA FILHO",executor: "SANDOVAL FILHO CORREIA LIMA FILHO"}

        const resultado = validaResponsavelTj(cliente, processLengthTJSE, validaResponsavelTjMock)

        expect(resultado).toMatchObject(desiredRespExec)
    })

    it('Definir responsável/executor de tarefa de contatar para o Administrativo da matriz', () => {
        const validaResponsavelTjMock = {
            tipoCompromissoNormalizado: "PERICIA TECNICA",
            tarefaAtualNormalizada: "CONTATAR CLIENTE",
            digito: 0
        }
    
        const cliente = {
            cidade: "ARACAJU",
            localAtendido: "ARACAJU",
            processo: {
                natureza: "TRABALHISTA"
            }
        }

        const desiredRespExec = {responsavel: "JULIANO OLIVEIRA DE SOUZA",executor: "JULIANO OLIVEIRA DE SOUZA"}

        const resultado = validaResponsavelTj(cliente, processLengthTJSE, validaResponsavelTjMock)

        expect(resultado).toMatchObject(desiredRespExec)
    })

    it('Definir responsável/executor de tarefa de SMS E WHATSAPP para o SAC da matriz', () => {
        const validaResponsavelTjMock = {
            tipoCompromissoNormalizado: "PERICIA TECNICA",
            tarefaAtualNormalizada: "SMS E WHATSAPP",
            digito: 0
        }
    
        const cliente = {
            cidade: "ARACAJU",
            localAtendido: "ARACAJU",
            processo: {
                natureza: "TRABALHISTA"
            }
        }

        const desiredRespExec = {responsavel: "HENYR GOIS DOS SANTOS",executor: "LAYNE DA SILVA GOIS"}

        const resultado = validaResponsavelTj(cliente, processLengthTJSE, validaResponsavelTjMock)

        expect(resultado).toMatchObject(desiredRespExec)
    })

    it('Definir responsável/executor de tarefa de CÁLCULO para o seto de Cálculos da matriz', () => {
        const validaResponsavelTjMock = {
            tipoCompromissoNormalizado: "MANIFESTACAO SOBRE CALCULOS",
            tarefaAtualNormalizada: "ANALISE",
            digito: 0
        }
    
        const cliente = {
            cidade: "ARACAJU",
            localAtendido: "ARACAJU",
            processo: {
                natureza: "CÍVEL"
            }
        }

        const desiredRespExec = {responsavel: "GUILHERME JASMIM", executor: "GUILHERME JASMIM"}

        const resultado = validaResponsavelTj(cliente, processLengthTJSE, validaResponsavelTjMock)

        expect(resultado).toMatchObject(desiredRespExec)
    })

    it('Definir responsável/executor de tarefa de MANIFESTAÇÃO para o Trabalhista da matriz', () => {
        const validaResponsavelTjMock = {
            tipoCompromissoNormalizado: "MANIFESTACAO",
            tarefaAtualNormalizada: "MANIFESTACAO",
            digito: 0
        }
    
        const cliente = {
            cidade: "ARACAJU",
            localAtendido: "ARACAJU",
            processo: {
                natureza: "TRABALHISTA"
            }
        }

        const desiredRespExec = {responsavel: "FELIPE PANTA CARDOSO",executor: "FELIPE PANTA CARDOSO"}

        const resultado = validaResponsavelTj(cliente, processLengthTJSE, validaResponsavelTjMock)

        expect(resultado).toMatchObject(desiredRespExec)
    })

    it('Definir responsável/executor de tarefa de MANIFESTAÇÃO para o Previdenciário da matriz', () => {
        const validaResponsavelTjMock = {
            tipoCompromissoNormalizado: "MANIFESTACAO",
            tarefaAtualNormalizada: "MANIFESTACAO",
            digito: 0
        }
    
        const cliente = {
            cidade: "ARACAJU",
            localAtendido: "ARACAJU",
            processo: {
                natureza: "PREVIDENCIÁRIA"
            }
        }

        const desiredRespExec = {responsavel: "KEVEN FARO DE CARVALHO", executor: "KEVEN FARO DE CARVALHO"}

        const resultado = validaResponsavelTj(cliente, processLengthTJSE, validaResponsavelTjMock)

        expect(resultado).toMatchObject(desiredRespExec)
    })

    it('Definir responsável/executor de tarefa de MANIFESTAÇÃO para o Cível da matriz com dígitos 2, 3, 4 e 6', () => {
        const digitos = [ 2,3,4,6 ]

        const validaResponsavelTjMock = {
            tipoCompromissoNormalizado: "MANIFESTACAO",
            tarefaAtualNormalizada: "MANIFESTACAO",
            digito: 0
        }
    
        const cliente = {
            cidade: "ARACAJU",
            localAtendido: "ARACAJU",
            processo: {
                natureza: "CÍVEL"
            }
        }

        const desiredRespExec = {responsavel: "RODRIGO AGUIAR SANTOS",executor: "GABRIEL DAVILA FILGUEIRAS MELLONE"}

        const resultados = digitos.map(digito => {
            const newValidaResponsavelTjMock = { ...validaResponsavelTjMock }
            newValidaResponsavelTjMock.digito = digito
            return validaResponsavelTj(cliente, processLengthTJSE, newValidaResponsavelTjMock)
        })

        resultados.forEach(resultado => expect(resultado).toMatchObject(desiredRespExec))
    })

    it('Definir responsável/executor de tarefa de MANIFESTAÇÃO para o Cível da matriz com dígitos 0, 1 e 8', () => {
        const digitos = [ 0,1,8 ]

        const validaResponsavelTjMock = {
            tipoCompromissoNormalizado: "MANIFESTACAO",
            tarefaAtualNormalizada: "MANIFESTACAO",
            digito: 0
        }
    
        const cliente = {
            cidade: "ARACAJU",
            localAtendido: "ARACAJU",
            processo: {
                natureza: "CÍVEL"
            }
        }

        const desiredRespExec = {responsavel: "RODRIGO AGUIAR SANTOS",executor: "ALÃ FEITOSA CARVALHO"}

        const resultados = digitos.map(digito => {
            const newValidaResponsavelTjMock = { ...validaResponsavelTjMock }
            newValidaResponsavelTjMock.digito = digito
            return validaResponsavelTj(cliente, processLengthTJSE, newValidaResponsavelTjMock)
        })

        resultados.forEach(resultado => expect(resultado).toMatchObject(desiredRespExec))
    })

    it('Definir responsável/executor de tarefa de MANIFESTAÇÃO para o Cível da matriz com dígitos 5, 7 e 9', () => {
        const digitos = [ 5,7,9 ]

        const validaResponsavelTjMock = {
            tipoCompromissoNormalizado: "MANIFESTACAO",
            tarefaAtualNormalizada: "MANIFESTACAO",
            digito: 0
        }
    
        const cliente = {
            cidade: "ARACAJU",
            localAtendido: "ARACAJU",
            processo: {
                natureza: "CÍVEL"
            }
        }

        const desiredRespExec = {responsavel: "RODRIGO AGUIAR SANTOS",executor: "RODRIGO AGUIAR SANTOS"}

        const resultados = digitos.map(digito => {
            const newValidaResponsavelTjMock = { ...validaResponsavelTjMock }
            newValidaResponsavelTjMock.digito = digito
            return validaResponsavelTj(cliente, processLengthTJSE, newValidaResponsavelTjMock)
        })

        resultados.forEach(resultado => expect(resultado).toMatchObject(desiredRespExec))
    })
})