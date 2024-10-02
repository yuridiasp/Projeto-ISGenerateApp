describe('Function validaResponsavelFederal: ', () => {
    const { validaResponsavelFederal } = require("../../../../../../dist/services/tarefas/taskService")

    const processLengthFederal = 20

    it('Definir responsável/executor de tarefa de acompanhamento para o Adminstrativo da matriz', () => {
        const validaResponsavelFederalMock = {
            tipoCompromissoNormalizado: "DECISÃO ANTECIPAÇÃO PERÍCIA",
            tarefaAtualNormalizada: "ACOMPANHAR - ADM",
            digito: 0,
            secao: '8500',
            digitoVerificador: '405'
        }
    
        const cliente = {
            estado: 'SE',
            cidade: "ARACAJU",
            localAtendido: "ARACAJU",
            processo: {
                natureza: "PREVIDENCIÁRIA"
            }
        }

        const desiredRespExec = {responsavel: 'LEANDRO SANTOS', executor: 'LEANDRO SANTOS'}

        const resultado = validaResponsavelFederal(validaResponsavelFederalMock.tarefaAtualNormalizada, cliente, processLengthFederal, validaResponsavelFederalMock)

        expect(resultado).toMatchObject(desiredRespExec)
    })

    it('Definir responsável/executor de tarefa de Alvará para o Financeiro', () => {
        const validaResponsavelFederalMock = {
            tipoCompromissoNormalizado: "RECEBIMENTO DE ALVARA",
            tarefaAtualNormalizada: "RECEBIMENTO DE ALVARA - FINANCEIRO",
            digito: 0,
            secao: '0001',
            digitoVerificador: '520'
        }
    
        const cliente = {
            estado: 'SE',
            cidade: "ARACAJU",
            localAtendido: "ARACAJU",
            processo: {
                natureza: "TRABALHISTA"
            }
        }

        const desiredRespExec = {responsavel: "VICTOR MENDES DOS SANTOS",executor: "VICTOR MENDES DOS SANTOS"}

        const resultado = validaResponsavelFederal(validaResponsavelFederalMock.tarefaAtualNormalizada, cliente, processLengthFederal, validaResponsavelFederalMock)

        expect(resultado).toMatchObject(desiredRespExec)
    })

    it('Definir responsável/executor de tarefa de RPV para o Financeiro', () => {
        const validaResponsavelFederalMock = {
            tipoCompromissoNormalizado: "RPV TRF5 ARACAJU",
            tarefaAtualNormalizada: "RPV TRF5 ARACAJU - FINANCEIRO",
            digito: 0,
            secao: '8500',
            digitoVerificador: '405'
        }
    
        const cliente = {
            estado: 'SE',
            cidade: "ARACAJU",
            localAtendido: "ARACAJU",
            processo: {
                natureza: "PREVIDENCIÁRIA"
            }
        }

        const desiredRespExec = {responsavel: "LUCIANA LIMA REZENDE",executor: "SHEYLA SANTANA SANTOS"}

        const resultado = validaResponsavelFederal(validaResponsavelFederalMock.tarefaAtualNormalizada, cliente, processLengthFederal, validaResponsavelFederalMock)

        expect(resultado).toMatchObject(desiredRespExec)
    })

    it('Definir responsável/executor de tarefa de contatar para o Administrativo de Estância', () => {
        const validaResponsavelFederalMock = {
            tipoCompromissoNormalizado: "PERICIA TECNICA",
            tarefaAtualNormalizada: "CONTATAR CLIENTE",
            digito: 0,
            secao: '0012',
            digitoVerificador: '520'
        }
    
        const cliente = {
            estado: 'SE',
            cidade: "ESTANCIA",
            localAtendido: "ESTANCIA",
            processo: {
                natureza: "TRABALHISTA"
            }
        }

        const desiredRespExec = {responsavel: "SANDOVAL FILHO CORREIA LIMA FILHO",executor: "SANDOVAL FILHO CORREIA LIMA FILHO"}

        const resultado = validaResponsavelFederal(validaResponsavelFederalMock.tarefaAtualNormalizada, cliente, processLengthFederal, validaResponsavelFederalMock)

        expect(resultado).toMatchObject(desiredRespExec)
    })

    it('Definir responsável/executor de tarefa de contatar para o Administrativo de BSB', () => {
        const validaResponsavelFederalMock = {
            tipoCompromissoNormalizado: "PERICIA MEDICA",
            tarefaAtualNormalizada: "CONTATAR CLIENTE",
            digito: 0,
            secao: '3400',
            digitoVerificador: '401'
        }
    
        const cliente = {
            estado: 'DF',
            cidade: "BRASILIA",
            localAtendido: "AGUAS LINDAS",
            processo: {
                estado: 'DF',
                natureza: "PREVIDENCIÁRIA"
            }
        }

        const desiredRespExec = {responsavel: "HENYR GOIS DOS SANTOS", executor: "HENYR GOIS DOS SANTOS"}

        const resultado = validaResponsavelFederal(validaResponsavelFederalMock.tarefaAtualNormalizada, cliente, processLengthFederal, validaResponsavelFederalMock)

        expect(resultado).toMatchObject(desiredRespExec)
    })

    it('Definir responsável/executor de tarefa de MANIFESTAÇÃO de processo do TRF1 e da Bahia', () => {
        const validaResponsavelFederalMock = {
            tipoCompromissoNormalizado: "MANIFESTACAO",
            tarefaAtualNormalizada: "MANIFESTACAO",
            digito: 0,
            secao: '3314',
            digitoVerificador: '401'
        }
    
        const cliente = {
            estado: 'BA',
            cidade: "ALAGOINHAS",
            localAtendido: "CONDE/BA",
            processo: {
                estado: 'BA',
                natureza: "PREVIDENCIÁRIA"
            }
        }

        const desiredRespExec = {responsavel: "LAIS PEREIRA MORAES",executor: "LAIS PEREIRA MORAES"}

        const resultado = validaResponsavelFederal(validaResponsavelFederalMock.tarefaAtualNormalizada, cliente, processLengthFederal, validaResponsavelFederalMock)

        expect(resultado).toMatchObject(desiredRespExec)
    })

    it('Definir responsável/executor de tarefa de MANIFESTAÇÃO de processo do TRF1 e de BSB com os dígitos 0, 1 e 2', () => {
        const digitos = [ 0,1,2 ]

        const validaResponsavelFederalMock = {
            tipoCompromissoNormalizado: "MANIFESTACAO",
            tarefaAtualNormalizada: "MANIFESTACAO",
            digito: 0,
            secao: '3400',
            digitoVerificador: '401'
        }
    
        const cliente = {
            estado: 'DF',
            cidade: "BRASILIA",
            localAtendido: "AGUAS LINDAS",
            processo: {
                estado: 'DF',
                natureza: "PREVIDENCIÁRIA",
                vara: '23ª VARA FEDERAL BRASÍLIA'
            }
        }

        const desiredRespExec = {responsavel: "BRUNO PRADO GUIMARAES",executor: "BRUNO PRADO GUIMARAES"}

        const resultados = digitos.map(digito => {
            const newvalidaResponsavelFederalMock = { ...validaResponsavelFederalMock }
            newvalidaResponsavelFederalMock.digito = digito
            return validaResponsavelFederal(validaResponsavelFederalMock.tarefaAtualNormalizada, cliente, processLengthFederal, newvalidaResponsavelFederalMock)
        })

        resultados.forEach(resultado => expect(resultado).toMatchObject(desiredRespExec))
    })

    it('Definir responsável/executor de tarefa de MANIFESTAÇÃO de processo do TRF1 e de BSB com os dígitos 3, 4, 5, 6, 7, 8 e 9', () => {
        const digitos = [ 3,4,5,6,7,8,9 ]

        const validaResponsavelFederalMock = {
            tipoCompromissoNormalizado: "MANIFESTACAO",
            tarefaAtualNormalizada: "MANIFESTACAO",
            digito: 0,
            secao: '3400',
            digitoVerificador: '401'
        }
    
        const cliente = {
            estado: 'DF',
            cidade: "BRASILIA",
            localAtendido: "AGUAS LINDAS",
            processo: {
                estado: 'DF',
                natureza: "PREVIDENCIÁRIA",
                vara: "23ª VARA FEDERAL BRASÍLIA"
            }
        }

        const desiredRespExec = {responsavel: "BRUNO PRADO GUIMARAES",executor: "PAULO VICTOR SANTANA TEIXEIRA"}

        const resultados = digitos.map(digito => {
            const newvalidaResponsavelFederalMock = { ...validaResponsavelFederalMock }
            newvalidaResponsavelFederalMock.digito = digito
            return validaResponsavelFederal(validaResponsavelFederalMock.tarefaAtualNormalizada, cliente, processLengthFederal, newvalidaResponsavelFederalMock)
        })

        resultados.forEach(resultado => expect(resultado).toMatchObject(desiredRespExec))
    })

    it('Definir responsável/executor de tarefa de MANIFESTAÇÃO de processo do TRF1 e de outras localidades (fora de BA, DF e GO)', () => {
        const validaResponsavelFederalMock = {
            tipoCompromissoNormalizado: "MANIFESTACAO",
            tarefaAtualNormalizada: "MANIFESTACAO",
            digito: 0,
            secao: '3600',
            digitoVerificador: '401'
        }
    
        const cliente = {
            estado: 'MT',
            cidade: "CUIABA",
            localAtendido: "ARACAJU",
            processo: {
                natureza: "PREVIDENCIÁRIA"
            }
        }

        const desiredRespExec = {responsavel: "DIEGO MELO SOBRINHO",executor: "DIEGO MELO SOBRINHO"}

        const resultado = validaResponsavelFederal(validaResponsavelFederalMock.tarefaAtualNormalizada, cliente, processLengthFederal, validaResponsavelFederalMock)

        expect(resultado).toMatchObject(desiredRespExec)
    })

    it('Definir responsável/executor de tarefa de contatar para o Administrativo da matriz', () => {
        const validaResponsavelFederalMock = {
            tipoCompromissoNormalizado: "PERICIA TECNICA",
            tarefaAtualNormalizada: "CONTATAR CLIENTE",
            digito: 0,
            secao: '0001',
            digitoVerificador: '520'
        }
    
        const cliente = {
            estado: 'SE',
            cidade: "ARACAJU",
            localAtendido: "ARACAJU",
            processo: {
                natureza: "TRABALHISTA"
            }
        }

        const desiredRespExec = {responsavel: "JULIANO OLIVEIRA DE SOUZA",executor: "JULIANO OLIVEIRA DE SOUZA"}

        const resultado = validaResponsavelFederal(validaResponsavelFederalMock.tarefaAtualNormalizada, cliente, processLengthFederal, validaResponsavelFederalMock)

        expect(resultado).toMatchObject(desiredRespExec)
    })

    it('Definir responsável/executor de tarefa de SMS E WHATSAPP para o SAC da matriz', () => {
        const validaResponsavelFederalMock = {
            tipoCompromissoNormalizado: "PERICIA TECNICA",
            tarefaAtualNormalizada: "SMS E WHATSAPP",
            digito: 0,
            secao: '0001',
            digitoVerificador: '520'
        }
    
        const cliente = {
            estado: 'SE',
            cidade: "ARACAJU",
            localAtendido: "ARACAJU",
            processo: {
                natureza: "TRABALHISTA"
            }
        }

        const desiredRespExec = {responsavel: "HENYR GOIS DOS SANTOS",executor: "LAYNE DA SILVA GOIS"}

        const resultado = validaResponsavelFederal(validaResponsavelFederalMock.tarefaAtualNormalizada, cliente, processLengthFederal, validaResponsavelFederalMock)

        expect(resultado).toMatchObject(desiredRespExec)
    })

    it('Definir responsável/executor de tarefa de MANIFESTAÇÃO para o Trabalhista da matriz', () => {
        const validaResponsavelFederalMock = {
            tipoCompromissoNormalizado: "MANIFESTACAO",
            tarefaAtualNormalizada: "MANIFESTACAO",
            digito: 0,
            secao: '0001',
            digitoVerificador: '520'
        }
    
        const cliente = {
            estado: 'SE',
            cidade: "ARACAJU",
            localAtendido: "ARACAJU",
            processo: {
                natureza: "TRABALHISTA"
            }
        }

        const desiredRespExec = {responsavel: "FELIPE PANTA CARDOSO",executor: "FELIPE PANTA CARDOSO"}

        const resultado = validaResponsavelFederal(validaResponsavelFederalMock.tarefaAtualNormalizada, cliente, processLengthFederal, validaResponsavelFederalMock)

        expect(resultado).toMatchObject(desiredRespExec)
    })

    it('Definir responsável/executor de tarefa de MANIFESTAÇÃO para o Cível', () => {
        const validaResponsavelFederalMock = {
            tipoCompromissoNormalizado: "MANIFESTACAO",
            tarefaAtualNormalizada: "MANIFESTACAO",
            digito: 0,
            secao: '8500',
            digitoVerificador: '405'
        }
    
        const cliente = {
            estado: 'SE',
            cidade: "ARACAJU",
            localAtendido: "ARACAJU",
            processo: {
                natureza: "CÍVEL"
            }
        }

        const desiredRespExec = {responsavel: "RODRIGO AGUIAR SANTOS",executor: "RODRIGO AGUIAR SANTOS"}

        const resultado = validaResponsavelFederal(validaResponsavelFederalMock.tarefaAtualNormalizada, cliente, processLengthFederal, validaResponsavelFederalMock)

        expect(resultado).toMatchObject(desiredRespExec)
    })

    it('Definir responsável/executor de tarefa de MANIFESTAÇÃO para processo cível de BSB com os dígitos 0, 1 e 2', () => {
        const digitos = [ 0,1,2 ]

        const validaResponsavelFederalMock = {
            tipoCompromissoNormalizado: "MANIFESTACAO",
            tarefaAtualNormalizada: "MANIFESTACAO",
            digito: 0,
            secao: '3400',
            digitoVerificador: '401'
        }
    
        const cliente = {
            estado: "DF",
            cidade: "BRASILIA",
            localAtendido: "AGUAS LINDAS",
            processo: {
                estado: 'DF',
                natureza: "CÍVEL",
                vara: '23ª VARA FEDERAL BRASÍLIA'
            }
        }

        const desiredRespExec = {responsavel: "BRUNO PRADO GUIMARAES",executor: "BRUNO PRADO GUIMARAES"}

        const resultado = digitos.map(digito => {
            const newvalidaResponsavelFederalMock = { ...validaResponsavelFederalMock }
            newvalidaResponsavelFederalMock.digito = digito
            return validaResponsavelFederal(validaResponsavelFederalMock.tarefaAtualNormalizada, cliente, processLengthFederal, newvalidaResponsavelFederalMock)
        })

        resultado.forEach(resultado => expect(resultado).toMatchObject(desiredRespExec))
    })

    it('Definir responsável/executor de tarefa de MANIFESTAÇÃO para processo cível de BSB com os dígitos 3, 4, 5, 6, 7, 8 e 9', () => {
        const digitos = [ 3,4,5,6,7,8,9 ]

        const validaResponsavelFederalMock = {
            tipoCompromissoNormalizado: "MANIFESTACAO",
            tarefaAtualNormalizada: "MANIFESTACAO",
            digito: 0,
            secao: '3400',
            digitoVerificador: '401'
        }
    
        const cliente = {
            estado: "DF",
            cidade: "BRASILIA",
            localAtendido: "AGUAS LINDAS",
            processo: {
                estado: 'DF',
                natureza: "CÍVEL",
                vara: '23ª VARA FEDERAL BRASÍLIA'
            }
        }

        const desiredRespExec = {responsavel: "BRUNO PRADO GUIMARAES",executor: "PAULO VICTOR SANTANA TEIXEIRA"}

        const resultado = digitos.map(digito => {
            const newvalidaResponsavelFederalMock = { ...validaResponsavelFederalMock }
            newvalidaResponsavelFederalMock.digito = digito
            return validaResponsavelFederal(validaResponsavelFederalMock.tarefaAtualNormalizada, cliente, processLengthFederal, newvalidaResponsavelFederalMock)
        })

        resultado.forEach(resultado => expect(resultado).toMatchObject(desiredRespExec))
    })

    it('Definir responsável/executor de tarefa de MANIFESTAÇÃO para processo previdenciário de SP', () => {

        const validaResponsavelFederalMock = {
            tipoCompromissoNormalizado: "MANIFESTACAO",
            tarefaAtualNormalizada: "MANIFESTACAO",
            digito: 0,
            secao: '6183',
            digitoVerificador: '403'
        }
    
        const cliente = {
            estado: "SP",
            cidade: "SAO PAULO",
            localAtendido: "ARACAJU",
            processo: {
                natureza: "PREVIDENCIÁRIA"
            }
        }

        const desiredRespExec = {responsavel: "DIEGO MELO SOBRINHO",executor: "DIEGO MELO SOBRINHO"}

        const resultado = validaResponsavelFederal(validaResponsavelFederalMock.tarefaAtualNormalizada, cliente, processLengthFederal, validaResponsavelFederalMock)

        expect(resultado).toMatchObject(desiredRespExec)
    })

    it('Definir responsável/executor de tarefa de MANIFESTAÇÃO para processo previdenciário do TRF5', () => {

        const validaResponsavelFederalMock = {
            tipoCompromissoNormalizado: "MANIFESTACAO",
            tarefaAtualNormalizada: "MANIFESTACAO",
            digito: 0,
            secao: '8500',
            digitoVerificador: '405'
        }
    
        const cliente = {
            estado: "SE",
            cidade: "ARACAJU",
            localAtendido: "ARACAJU",
            processo: {
                origem: '08018449320144058500',
                natureza: "PREVIDENCIÁRIA"
            }
        }

        const desiredRespExec = {responsavel: "DIEGO MELO SOBRINHO",executor: "DIEGO MELO SOBRINHO"}

        const resultado = validaResponsavelFederal(validaResponsavelFederalMock.tarefaAtualNormalizada, cliente, processLengthFederal, validaResponsavelFederalMock)

        expect(resultado).toMatchObject(desiredRespExec)
    })

    it('Definir responsável/executor de tarefa de MANIFESTAÇÃO para processo previdenciário de ARACAJU/SE com dígitos 0, 1 e 2', () => {
        const digitos = [ 0,1,2 ]

        const validaResponsavelFederalMock = {
            tipoCompromissoNormalizado: "MANIFESTACAO",
            tarefaAtualNormalizada: "MANIFESTACAO",
            digito: 0,
            secao: '8500',
            digitoVerificador: '405'
        }
    
        const cliente = {
            estado: "SE",
            cidade: "ARACAJU",
            localAtendido: "ARACAJU",
            processo: {
                origem: '00018449320144058500',
                natureza: "PREVIDENCIÁRIA"
            }
        }

        const desiredRespExec = {responsavel: "KEVEN FARO DE CARVALHO",executor: "KEVEN FARO DE CARVALHO"}

        const resultados = digitos.map(digito => {
            const newvalidaResponsavelFederalMock = { ...validaResponsavelFederalMock }
            newvalidaResponsavelFederalMock.digito = digito
            return validaResponsavelFederal(validaResponsavelFederalMock.tarefaAtualNormalizada, cliente, processLengthFederal, newvalidaResponsavelFederalMock)
        })

        resultados.forEach(resultado => expect(resultado).toMatchObject(desiredRespExec))
    })

    it('Definir responsável/executor de tarefa de MANIFESTAÇÃO para processo previdenciário de ARACAJU/SE com dígitos 3, 4, 5, 6, 7, 8 e 9', () => {
        const digitos = [ 3,4,5,6,7,8,9 ]

        const validaResponsavelFederalMock = {
            tipoCompromissoNormalizado: "MANIFESTACAO",
            tarefaAtualNormalizada: "MANIFESTACAO",
            digito: 0,
            secao: '8500',
            digitoVerificador: '405'
        }
    
        const cliente = {
            estado: "SE",
            cidade: "ARACAJU",
            localAtendido: "ARACAJU",
            processo: {
                origem: '00018449320144058500',
                natureza: "PREVIDENCIÁRIA"
            }
        }

        const desiredRespExec = {responsavel: "MARCUS VINICIUS DE SOUZA MORAIS",executor: "MARCUS VINICIUS DE SOUZA MORAIS"}

        const resultados = digitos.map(digito => {
            const newvalidaResponsavelFederalMock = { ...validaResponsavelFederalMock }
            newvalidaResponsavelFederalMock.digito = digito
            return validaResponsavelFederal(validaResponsavelFederalMock.tarefaAtualNormalizada, cliente, processLengthFederal, newvalidaResponsavelFederalMock)
        })

        resultados.forEach(resultado => expect(resultado).toMatchObject(desiredRespExec))
    })

    it('Definir responsável/executor de tarefa de MANIFESTAÇÃO para processo previdenciário de ITABAIANA/SE', () => {

        const validaResponsavelFederalMock = {
            tipoCompromissoNormalizado: "MANIFESTACAO",
            tarefaAtualNormalizada: "MANIFESTACAO",
            digito: 0,
            secao: '8501',
            digitoVerificador: '405'
        }
    
        const cliente = {
            estado: "SE",
            cidade: "ITABAIANA",
            localAtendido: "ARACAJU",
            processo: {
                origem: '00018449320144058501',
                natureza: "PREVIDENCIÁRIA"
            }
        }

        const desiredRespExec = {responsavel: "LAIS PEREIRA MORAES",executor: "LAIS PEREIRA MORAES"}

        const resultado = validaResponsavelFederal(validaResponsavelFederalMock.tarefaAtualNormalizada, cliente, processLengthFederal, validaResponsavelFederalMock)

        expect(resultado).toMatchObject(desiredRespExec)
    })

    it('Definir responsável/executor de tarefa de MANIFESTAÇÃO para processo previdenciário de ESTÂNCIA/SE com dígitos 0, 1 e 2', () => {
        const digitos = [ 0,1,2 ]

        const validaResponsavelFederalMock = {
            tipoCompromissoNormalizado: "MANIFESTACAO",
            tarefaAtualNormalizada: "MANIFESTACAO",
            digito: 0,
            secao: '8502',
            digitoVerificador: '405'
        }
    
        const cliente = {
            estado: "SE",
            cidade: "ESTANCIA",
            localAtendido: "ESTANCIA",
            processo: {
                origem: '00018449320144058502',
                natureza: "PREVIDENCIÁRIA"
            }
        }

        const desiredRespExec = {responsavel: "KEVEN FARO DE CARVALHO",executor: "KEVEN FARO DE CARVALHO"}

        const resultados = digitos.map(digito => {
            const newvalidaResponsavelFederalMock = { ...validaResponsavelFederalMock }
            newvalidaResponsavelFederalMock.digito = digito
            return validaResponsavelFederal(validaResponsavelFederalMock.tarefaAtualNormalizada, cliente, processLengthFederal, newvalidaResponsavelFederalMock)
        })

        resultados.forEach(resultado => expect(resultado).toMatchObject(desiredRespExec))
    })

    it('Definir responsável/executor de tarefa de MANIFESTAÇÃO para processo previdenciário de ESTÂNCIA/SE com dígitos 3, 4, 5, 6, 7, 8 e 9', () => {
        const digitos = [ 3,4,5,6,7,8,9 ]

        const validaResponsavelFederalMock = {
            tipoCompromissoNormalizado: "MANIFESTACAO",
            tarefaAtualNormalizada: "MANIFESTACAO",
            digito: 0,
            secao: '8502',
            digitoVerificador: '405'
        }
    
        const cliente = {
            estado: "SE",
            cidade: "ESTANCIA",
            localAtendido: "ESTANCIA",
            processo: {
                origem: '00018449320144058502',
                natureza: "PREVIDENCIÁRIA"
            }
        }

        const desiredRespExec = {responsavel: "SARA GONÇALVES PINHEIRO",executor: "SARA GONÇALVES PINHEIRO"}

        const resultados = digitos.map(digito => {
            const newvalidaResponsavelFederalMock = { ...validaResponsavelFederalMock }
            newvalidaResponsavelFederalMock.digito = digito
            return validaResponsavelFederal(validaResponsavelFederalMock.tarefaAtualNormalizada, cliente, processLengthFederal, newvalidaResponsavelFederalMock)
        })

        resultados.forEach(resultado => expect(resultado).toMatchObject(desiredRespExec))
    })

    it('Definir responsável/executor de tarefa de MANIFESTAÇÃO para processo previdenciário de LAGARTO', () => {

        const validaResponsavelFederalMock = {
            tipoCompromissoNormalizado: "MANIFESTACAO",
            tarefaAtualNormalizada: "MANIFESTACAO",
            digito: 0,
            secao: '8503',
            digitoVerificador: '405'
        }
    
        const cliente = {
            estado: "SE",
            cidade: "LARGARTO",
            localAtendido: "ARACAJU",
            processo: {
                origem: '00018449320144058503',
                natureza: "PREVIDENCIÁRIA"
            }
        }

        const desiredRespExec = {responsavel: "SARA GONÇALVES PINHEIRO",executor: "SARA GONÇALVES PINHEIRO"}

        const resultado = validaResponsavelFederal(validaResponsavelFederalMock.tarefaAtualNormalizada, cliente, processLengthFederal, validaResponsavelFederalMock)

        expect(resultado).toMatchObject(desiredRespExec)
    })

    it('Definir responsável/executor de tarefa de MANIFESTAÇÃO para processo previdenciário de PROPRIÁ', () => {

        const validaResponsavelFederalMock = {
            tipoCompromissoNormalizado: "MANIFESTACAO",
            tarefaAtualNormalizada: "MANIFESTACAO",
            digito: 0,
            secao: '8504',
            digitoVerificador: '405'
        }
    
        const cliente = {
            estado: "SE",
            cidade: "LARGARTO",
            localAtendido: "ARACAJU",
            processo: {
                origem: '00018449320144058504',
                natureza: "PREVIDENCIÁRIA"
            }
        }

        const desiredRespExec = {responsavel: "LAIS PEREIRA MORAES",executor: "LAIS PEREIRA MORAES"}

        const resultado = validaResponsavelFederal(validaResponsavelFederalMock.tarefaAtualNormalizada, cliente, processLengthFederal, validaResponsavelFederalMock)

        expect(resultado).toMatchObject(desiredRespExec)
    })
})