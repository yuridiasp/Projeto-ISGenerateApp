import { describe, expect, it, beforeEach } from '@jest/globals'

import { validaResponsavelFederal } from '../../../../../../src/services/tarefas/index'

describe('Function validaResponsavelFederal: ', () => {

    const processLengthFederal = 20

    let cliente = {
        id: '',
        nome: '',
        cpf: '',
        cidade: '',
        estado: 'SE',
        localAtendido: 'ARACAJU',
        parceiro: '',
        situacao: '',
        compromisso: {
            id: '',
            prazoInterno: '',
            prazoFatal: '',
            tarefas: [],
            quantidadeTarefas: 0,
            tipoCompromisso: '',
            descricao: '',
            semanas: 0,
            publicacao: '',
            peritoOrReu: '',
            local: '',
            horario: '',
        },
        processo: {
            id: '',
            origem: '',
            dependente: '',
            reu: '',
            responsavel: '',
            natureza: 'TRABALHISTA',
            merito: '',
            vara: '',
            acao: '',
            idsCopias: [],
            cidade: "ARACAJU",
            estado: "SERGIPE"
        }
    }

    beforeEach(() => {
        cliente = {
            id: '',
            nome: '',
            cpf: '',
            cidade: '',
            estado: 'SE',
            localAtendido: 'ARACAJU',
            parceiro: '',
            situacao: '',
            compromisso: {
                id: '',
                prazoInterno: '',
                prazoFatal: '',
                tarefas: [],
                quantidadeTarefas: 0,
                tipoCompromisso: '',
                descricao: '',
                semanas: 0,
                publicacao: '',
                peritoOrReu: '',
                local: '',
                horario: '',
            },
            processo: {
                id: '',
                origem: '',
                dependente: '',
                reu: '',
                responsavel: '',
                natureza: 'TRABALHISTA',
                merito: '',
                vara: '',
                acao: '',
                idsCopias: [],
                cidade: "ARACAJU",
                estado: "SERGIPE"
            }
        }
    })

    it('Definir responsável/executor de tarefa de acompanhamento para o Adminstrativo da matriz', () => {
        const validaResponsavelFederalMock = {
            tipoCompromissoNormalizado: "DECISÃO ANTECIPAÇÃO PERÍCIA",
            tarefaAtualNormalizada: "ACOMPANHAR - ADM",
            digito: 0,
            secao: '8500',
            digitoVerificador: '405'
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

        cliente.processo.natureza = "PREVIDENCIÁRIA"

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

        cliente.localAtendido = "ESTANCIA"

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
    
        cliente.processo.natureza = "PREVIDENCIÁRIA"
        cliente.processo.estado = "DF"

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
    
        cliente.estado = "BA"
        cliente.cidade = "ALAGOINHAS"
        cliente.localAtendido = "CONDE/BA"
        cliente.processo.natureza = "PREVIDENCIÁRIA"
        cliente.processo.estado = "BA"

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
        
        cliente.estado = "DF"
        cliente.cidade = "BRASILIA"
        cliente.localAtendido = "AGUAS LINDAS"
        cliente.processo.natureza = "PREVIDENCIÁRIA"
        cliente.processo.estado = "DF"
        cliente.processo.vara = "23ª VARA FEDERAL BRASÍLIA"

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
    
        cliente.estado = "DF"
        cliente.cidade = "BRASILIA"
        cliente.localAtendido = "AGUAS LINDAS"
        cliente.processo.natureza = "PREVIDENCIÁRIA"
        cliente.processo.estado = "DF"
        cliente.processo.vara = "23ª VARA FEDERAL BRASÍLIA"

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

        cliente.estado = "MT"
        cliente.cidade = "CUIABA"
        cliente.localAtendido = "ARACAJU"
        cliente.processo.natureza = "PREVIDENCIÁRIA"

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
    
        cliente.processo.natureza = "CÍVEL"

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
    
        cliente.estado = "DF"
        cliente.cidade = "BRASILIA"
        cliente.localAtendido = "AGUAS LINDAS"
        cliente.processo.natureza = "PREVIDENCIÁRIA"
        cliente.processo.estado = "DF"
        cliente.processo.vara = "23ª VARA FEDERAL BRASÍLIA"

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
    
        cliente.estado = "DF"
        cliente.cidade = "BRASILIA"
        cliente.localAtendido = "AGUAS LINDAS"
        cliente.processo.natureza = "PREVIDENCIÁRIA"
        cliente.processo.estado = "DF"
        cliente.processo.vara = "23ª VARA FEDERAL BRASÍLIA"

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

        cliente.estado = "SP"
        cliente.cidade = "SAO PAULO"
        cliente.localAtendido = "ARACAJU"
        cliente.processo.natureza = "PREVIDENCIÁRIA"

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
    
        cliente.processo.origem = "08018449320144058500"
        cliente.processo.natureza = "PREVIDENCIÁRIA"

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
    
        cliente.processo.origem = "00018449320144058500"
        cliente.processo.natureza = "PREVIDENCIÁRIA"

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
    
        cliente.processo.origem = "00018449320144058500"
        cliente.processo.natureza = "PREVIDENCIÁRIA"

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

        cliente.cidade = "ITABAIANA"
        cliente.processo.origem = "00018449320144058501"
        cliente.processo.natureza = "PREVIDENCIÁRIA"

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

        cliente.cidade = "ESTANCIA"
        cliente.localAtendido = "ESTANCIA"
        cliente.processo.origem = "00018449320144058501"
        cliente.processo.natureza = "PREVIDENCIÁRIA"

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

        cliente.cidade = "ESTANCIA"
        cliente.localAtendido = "ESTANCIA"
        cliente.processo.origem = "00018449320144058502"
        cliente.processo.natureza = "PREVIDENCIÁRIA"

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

        cliente.cidade = "LARGARTO"
        cliente.processo.origem = "00018449320144058503"
        cliente.processo.natureza = "PREVIDENCIÁRIA"

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

        cliente.cidade = "LARGARTO"
        cliente.localAtendido = "ARACAJU"
        cliente.processo.origem = "00018449320144058504"
        cliente.processo.natureza = "PREVIDENCIÁRIA"

        const desiredRespExec = {responsavel: "LAIS PEREIRA MORAES",executor: "LAIS PEREIRA MORAES"}

        const resultado = validaResponsavelFederal(validaResponsavelFederalMock.tarefaAtualNormalizada, cliente, processLengthFederal, validaResponsavelFederalMock)

        expect(resultado).toMatchObject(desiredRespExec)
    })
})