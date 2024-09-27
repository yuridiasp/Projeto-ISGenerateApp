describe('Function getDescricao: Construir descrição da tarefa em compromisso de Perícia', () => {
    const { getDescricao } = require("../../../../../../dist/services/tarefas/taskService")

    it('Gerar descrição para tarefa "CONTATAR CLIENTE" em compromisso de perícia', () => {
        const cliente = {
            nome: 'LAILTON DE SOUZA AGUIAR',
            cpf: '085.650.825-04',
            compromisso: {
                descricao: '202311800989 (ORIGEM 201811800803) - PERICIA MÉDICA DE LAILTON DE SOUZA AGUIAR (085.650.825-04), NO DIA DD/MM/AAAA ÀS HH:MM, PERITO: PERITO QUALQUER, LOCAL: CLÍNICA CLIMAGEM',
                tipoCompromisso: 'PERICIA MÉDICA',
                quantidadeTarefas: 3,
                tarefas: ['CONTATAR CLIENTE', 'SMS E WHATSAPP', 'LEMBRAR CLIENTE'],
                prazoInterno: 'DD/MM/AAAA',
                horario: 'HH:MM',
                peritoOrReu: 'PERITO QUALQUER',
            }
        }
        const getDescricaoMock = {
            fistWordInTarefa: 'CONTATAR',
            localText: 'CLÍNICA CLIMAGEM',
            numero: '202311800989 (ORIGEM 201811800803)',
            tipoTarefaNormalizado: 'CONTATAR CLIENTE',
            tipoCompromissoNormalizado: 'PERICIA MEDICA'
        }

        const resultDescription = getDescricao(cliente, getDescricaoMock)

        const expectedDescription = '202311800989 (ORIGEM 201811800803) - PERICIA MÉDICA DE LAILTON DE SOUZA AGUIAR (085.650.825-04), NO DIA DD/MM/AAAA ÀS HH:MM, PERITO: PERITO QUALQUER, LOCAL: CLÍNICA CLIMAGEM'

        expect(resultDescription).toBe(expectedDescription)
    })

    it('Gerar descrição para tarefa "SMS E WHATSAPP" em compromisso de perícia', () => {
        const cliente = {
            nome: 'LAILTON DE SOUZA AGUIAR',
            cpf: '085.650.825-04',
            compromisso: {
                descricao: '202311800989 (ORIGEM 201811800803) - PERICIA MÉDICA DE LAILTON DE SOUZA AGUIAR (085.650.825-04), NO DIA DD/MM/AAAA ÀS HH:MM, PERITO: PERITO QUALQUER, LOCAL: CLÍNICA CLIMAGEM',
                tipoCompromisso: 'PERICIA MÉDICA',
                quantidadeTarefas: 3,
                tarefas: ['SMS E WHATSAPP', 'LEMBRAR CLIENTE'],
                prazoInterno: 'DD/MM/AAAA',
                horario: 'HH:MM',
                peritoOrReu: 'PERITO QUALQUER',
            }
        }
        const getDescricaoMock = {
            fistWordInTarefa: 'SMS',
            localText: 'CLÍNICA CLIMAGEM',
            numero: '202311800989 (ORIGEM 201811800803)',
            tipoTarefaNormalizado: 'SMS E WHATSAPP',
            tipoCompromissoNormalizado: 'PERICIA MEDICA'
        }

        const resultDescription = getDescricao(cliente, getDescricaoMock)

        const expectedDescription = '202311800989 (ORIGEM 201811800803) - PERICIA MÉDICA DE LAILTON DE SOUZA AGUIAR (085.650.825-04), NO DIA DD/MM/AAAA ÀS HH:MM, PERITO: PERITO QUALQUER, LOCAL: CLÍNICA CLIMAGEM'

        expect(resultDescription).toBe(expectedDescription)
    })

    it('Gerar descrição para tarefa "LEMBRAR CLIENTE" em compromisso de perícia', () => {
        const cliente = {
            nome: 'LAILTON DE SOUZA AGUIAR',
            cpf: '085.650.825-04',
            compromisso: {
                descricao: '202311800989 (ORIGEM 201811800803) - PERICIA MÉDICA DE LAILTON DE SOUZA AGUIAR (085.650.825-04), NO DIA DD/MM/AAAA ÀS HH:MM, PERITO: PERITO QUALQUER, LOCAL: CLÍNICA CLIMAGEM',
                tipoCompromisso: 'PERICIA MÉDICA',
                quantidadeTarefas: 3,
                tarefas: ['LEMBRAR CLIENTE'],
                prazoInterno: 'DD/MM/AAAA',
                horario: 'HH:MM',
                peritoOrReu: 'PERITO QUALQUER',
            }
        }
        const getDescricaoMock = {
            fistWordInTarefa: 'LEMBRAR',
            localText: 'CLÍNICA CLIMAGEM',
            numero: '202311800989 (ORIGEM 201811800803)',
            tipoTarefaNormalizado: 'LEMBRAR CLIENTE',
            tipoCompromissoNormalizado: 'PERICIA MEDICA'
        }

        const resultDescription = getDescricao(cliente, getDescricaoMock)

        const expectedDescription = '202311800989 (ORIGEM 201811800803) - PERICIA MÉDICA DE LAILTON DE SOUZA AGUIAR (085.650.825-04), NO DIA DD/MM/AAAA ÀS HH:MM, PERITO: PERITO QUALQUER, LOCAL: CLÍNICA CLIMAGEM'

        expect(resultDescription).toBe(expectedDescription)
    })

    it('Gerar descrição para tarefa "ATO ORDINATÓRIO" em compromisso de perícia', () => {
        const cliente = {
            nome: 'LAILTON DE SOUZA AGUIAR',
            cpf: '085.650.825-04',
            compromisso: {
                descricao: '202311800989 (ORIGEM 201811800803) - PERICIA MÉDICA DE LAILTON DE SOUZA AGUIAR (085.650.825-04), NO DIA DD/MM/AAAA ÀS HH:MM, PERITO: PERITO QUALQUER, LOCAL: CLÍNICA CLIMAGEM',
                tipoCompromisso: 'PERICIA MÉDICA',
                quantidadeTarefas: 4,
                tarefas: ['ATO ORDINATÓRIO'],
                prazoInterno: 'DD/MM/AAAA',
                horario: 'HH:MM',
                peritoOrReu: 'PERITO QUALQUER',
            }
        }
        const getDescricaoMock = {
            fistWordInTarefa: 'ATO',
            localText: 'CLÍNICA CLIMAGEM',
            numero: '202311800989 (ORIGEM 201811800803)',
            tipoTarefaNormalizado: 'ATO ORDINATORIO',
            tipoCompromissoNormalizado: 'PERICIA MEDICA'
        }

        const resultDescription = getDescricao(cliente, getDescricaoMock)

        const expectedDescription = '202311800989 (ORIGEM 201811800803) - ATO ORDINATÓRIO (PERÍCIA DESIGNADA)'

        expect(resultDescription).toBe(expectedDescription)
    })
})