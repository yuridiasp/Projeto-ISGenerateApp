describe('Function getDescricao: Construir descrição da tarefa em compromisso de Audiência', () => {
    const { getDescricao } = require("../../../../../../dist/services/tarefas/taskService")

    it('Gerar descrição para tarefa "AUDIÊNCIA" em compromisso de audiência', () => {
        const cliente = {
            nome: 'LAILTON DE SOUZA AGUIAR',
            cpf: '085.650.825-04',
            compromisso: {
                descricao: '202311800989 (ORIGEM 201811800803) - AUDIÊNCIA DE INSTRUÇÃO DE LAILTON DE SOUZA AGUIAR (085.650.825-04) X NOME_DO_RÉU, NO DIA DD/MM/AAAA ÀS ${cliente.compromisso.horario}, LOCAL: LOCAL_DO_EVENTO',
                tipoCompromisso: 'AUDIÊNCIA DE INSTRUÇÃO',
                quantidadeTarefas: 5,
                tarefas: ['AUDIÊNCIA DE INSTRUÇÃO', 'CONTATAR CLIENTE', 'SMS E WHATSAPP', 'LEMBRAR CLIENTE', 'ANÁLISE'],
                prazoInterno: 'DD/MM/AAAA',
                horario: 'HH:MM',
                peritoOrReu: 'NOME_DO_RÉU',
            }
        }
        const getDescricaoMock = {
            fistWordInTarefa: 'AUDIENCIA',
            localText: 'LOCAL_DO_EVENTO',
            numero: '202311800989 (ORIGEM 201811800803)',
            tipoTarefaNormalizado: 'AUDIENCIA',
            tipoCompromissoNormalizado: 'AUDIENCIA'
        }

        const resultDescription = getDescricao(cliente, getDescricaoMock)

        const expectedDescription = '202311800989 (ORIGEM 201811800803) - AUDIÊNCIA DE INSTRUÇÃO DE LAILTON DE SOUZA AGUIAR (085.650.825-04) X NOME_DO_RÉU, NO DIA DD/MM/AAAA ÀS ${cliente.compromisso.horario}, LOCAL: LOCAL_DO_EVENTO'

        expect(resultDescription).toBe(expectedDescription)
    })

    it('Gerar descrição para tarefa "CONTATAR CLIENTE" em compromisso de audiência', () => {
        const cliente = {
            nome: 'LAILTON DE SOUZA AGUIAR',
            cpf: '085.650.825-04',
            compromisso: {
                descricao: '202311800989 (ORIGEM 201811800803) - AUDIÊNCIA DE INSTRUÇÃO DE LAILTON DE SOUZA AGUIAR (085.650.825-04) X NOME_DO_RÉU, NO DIA DD/MM/AAAA ÀS ${cliente.compromisso.horario}, LOCAL: LOCAL_DO_EVENTO',
                tipoCompromisso: 'AUDIÊNCIA DE INSTRUÇÃO',
                quantidadeTarefas: 5,
                tarefas: ['CONTATAR CLIENTE', 'SMS E WHATSAPP', 'LEMBRAR CLIENTE', 'ANÁLISE'],
                prazoInterno: 'DD/MM/AAAA',
                horario: 'HH:MM',
                peritoOrReu: 'NOME_DO_RÉU',
            }
        }
        const getDescricaoMock = {
            fistWordInTarefa: 'CONTATAR',
            localText: 'LOCAL_DO_EVENTO',
            numero: '202311800989 (ORIGEM 201811800803)',
            tipoTarefaNormalizado: 'CONTATAR CLIENTE',
            tipoCompromissoNormalizado: 'AUDIENCIA'
        }

        const resultDescription = getDescricao(cliente, getDescricaoMock)

        const expectedDescription = '202311800989 (ORIGEM 201811800803) - AUDIÊNCIA DE INSTRUÇÃO DE LAILTON DE SOUZA AGUIAR (085.650.825-04) X NOME_DO_RÉU, NO DIA DD/MM/AAAA ÀS ${cliente.compromisso.horario}, LOCAL: LOCAL_DO_EVENTO'

        expect(resultDescription).toBe(expectedDescription)
    })

    it('Gerar descrição para tarefa "SMS E WHATSAPP" em compromisso de audiência', () => {
        const cliente = {
            nome: 'LAILTON DE SOUZA AGUIAR',
            cpf: '085.650.825-04',
            compromisso: {
                descricao: '202311800989 (ORIGEM 201811800803) - AUDIÊNCIA DE INSTRUÇÃO DE LAILTON DE SOUZA AGUIAR (085.650.825-04) X NOME_DO_RÉU, NO DIA DD/MM/AAAA ÀS ${cliente.compromisso.horario}, LOCAL: LOCAL_DO_EVENTO',
                tipoCompromisso: 'AUDIÊNCIA DE INSTRUÇÃO',
                quantidadeTarefas: 5,
                tarefas: ['SMS E WHATSAPP', 'LEMBRAR CLIENTE', 'ANÁLISE'],
                prazoInterno: 'DD/MM/AAAA',
                horario: 'HH:MM',
                peritoOrReu: 'NOME_DO_RÉU',
            }
        }
        const getDescricaoMock = {
            fistWordInTarefa: 'SMS',
            localText: 'LOCAL_DO_EVENTO',
            numero: '202311800989 (ORIGEM 201811800803)',
            tipoTarefaNormalizado: 'SMS E WHATSAPP',
            tipoCompromissoNormalizado: 'AUDIENCIA'
        }

        const resultDescription = getDescricao(cliente, getDescricaoMock)

        const expectedDescription = '202311800989 (ORIGEM 201811800803) - AUDIÊNCIA DE INSTRUÇÃO DE LAILTON DE SOUZA AGUIAR (085.650.825-04) X NOME_DO_RÉU, NO DIA DD/MM/AAAA ÀS ${cliente.compromisso.horario}, LOCAL: LOCAL_DO_EVENTO'

        expect(resultDescription).toBe(expectedDescription)
    })

    it('Gerar descrição para tarefa "LEMBRAR CLIENTE" em compromisso de audiência', () => {
        const cliente = {
            nome: 'LAILTON DE SOUZA AGUIAR',
            cpf: '085.650.825-04',
            compromisso: {
                descricao: '202311800989 (ORIGEM 201811800803) - AUDIÊNCIA DE INSTRUÇÃO DE LAILTON DE SOUZA AGUIAR (085.650.825-04) X NOME_DO_RÉU, NO DIA DD/MM/AAAA ÀS ${cliente.compromisso.horario}, LOCAL: LOCAL_DO_EVENTO',
                tipoCompromisso: 'AUDIÊNCIA DE INSTRUÇÃO',
                quantidadeTarefas: 5,
                tarefas: ['LEMBRAR CLIENTE', 'ANÁLISE'],
                prazoInterno: 'DD/MM/AAAA',
                horario: 'HH:MM',
                peritoOrReu: 'NOME_DO_RÉU',
            }
        }
        const getDescricaoMock = {
            fistWordInTarefa: 'LEMBRAR',
            localText: 'LOCAL_DO_EVENTO',
            numero: '202311800989 (ORIGEM 201811800803)',
            tipoTarefaNormalizado: 'LEMBRAR CLIENTE',
            tipoCompromissoNormalizado: 'AUDIENCIA'
        }

        const resultDescription = getDescricao(cliente, getDescricaoMock)

        const expectedDescription = '202311800989 (ORIGEM 201811800803) - AUDIÊNCIA DE INSTRUÇÃO DE LAILTON DE SOUZA AGUIAR (085.650.825-04) X NOME_DO_RÉU, NO DIA DD/MM/AAAA ÀS ${cliente.compromisso.horario}, LOCAL: LOCAL_DO_EVENTO'

        expect(resultDescription).toBe(expectedDescription)
    })

    it('Gerar descrição para tarefa "ANÁLISE" em compromisso de audiência', () => {
        const cliente = {
            nome: 'LAILTON DE SOUZA AGUIAR',
            cpf: '085.650.825-04',
            compromisso: {
                descricao: '202311800989 (ORIGEM 201811800803) - AUDIÊNCIA DE INSTRUÇÃO DE LAILTON DE SOUZA AGUIAR (085.650.825-04) X NOME_DO_RÉU, NO DIA DD/MM/AAAA ÀS ${cliente.compromisso.horario}, LOCAL: LOCAL_DO_EVENTO',
                tipoCompromisso: 'AUDIÊNCIA DE INSTRUÇÃO',
                quantidadeTarefas: 5,
                tarefas: ['ANÁLISE'],
                prazoInterno: 'DD/MM/AAAA',
                horario: 'HH:MM',
                peritoOrReu: 'NOME_DO_RÉU',
            }
        }
        const getDescricaoMock = {
            fistWordInTarefa: 'ANALISE',
            localText: 'LOCAL_DO_EVENTO',
            numero: '202311800989 (ORIGEM 201811800803)',
            tipoTarefaNormalizado: 'ANALISE',
            tipoCompromissoNormalizado: 'AUDIENCIA'
        }

        const resultDescription = getDescricao(cliente, getDescricaoMock)

        const expectedDescription = '202311800989 (ORIGEM 201811800803) - VERIFICAR NECESSIDADE DE TESTEMUNHAS'

        expect(resultDescription).toBe(expectedDescription)
    })

})