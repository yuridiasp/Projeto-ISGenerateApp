describe('Criar tarefas de compromissos', () => {
    const tiposTarefasMock = require("../../../utils/tiposTarefasMock")
    const colaboradoresMock = require("../../../utils/colaboradoresMock")
    const { createBodyForCreateTask } = require("../../../../dist/services/tarefas/taskService")
    const { loginService } = require("../../../../dist/services/auth/authService")

    let cookie

    beforeAll(async () => {
        require("dotenv").config()

        cookie = await loginService(process.env.LOGIN, process.env.SENHA)
    })

    it("Criando body para tarefas de compromisso de audiência com prazo para o evento acima de 2 semanas", async () => {

        const clienteMock = {
            id: "1683",
            nome: "JOAO VASCONCELOS TAVARES",
            cpf: "013.118.755-49",
            cidade: "ARACAJU",
            estado: "SE",
            localAtendido: "ARACAJU",
            parceiro: "ESCRITÓRIO",
            situacao: "ATIVO",
            compromisso: {
                id: "31924",
                prazoInterno: "01/11/2024",
                prazoFatal: "01/11/2024",
                tarefas: [
                    {
                        tipoId: "28",
                        descricao: "AUDIÊNCIA DE INSTRUÇÃO",
                        dataParaFinalizacao: new Date('2024-11-01'),
                        responsavel: "RODRIGO AGUIAR SANTOS",
                        executor: "RODRIGO AGUIAR SANTOS"
                    },
                    {
                        tipoId: "15",
                        descricao: "CONTATAR CLIENTE",
                        dataParaFinalizacao: new Date('2024-10-02'),
                        responsavel: "JULIANO OLIVEIRA DE SOUZA",
                        executor: "JULIANO OLIVEIRA DE SOUZA"
                    },
                    {
                        tipoId: "76",
                        descricao: "SMS E WHATSAPP",
                        dataParaFinalizacao: new Date('2024-10-01'),
                        responsavel: "HENYR GOIS DOS SANTOS",
                        executor: "HENYR GOIS DOS SANTOS"
                    },
                    {
                        tipoId: "63",
                        descricao: "LEMBRAR CLIENTE",
                        dataParaFinalizacao: new Date('2024-10-29'),
                        responsavel: "JULIANO OLIVEIRA DE SOUZA",
                        executor: "JULIANO OLIVEIRA DE SOUZA"
                    },
                    {
                        tipoId: "77",
                        descricao: "ANÁLISE",
                        dataParaFinalizacao: new Date('2024-10-01'),
                        responsavel: "RODRIGO AGUIAR SANTOS",
                        executor: "RODRIGO AGUIAR SANTOS"
                    },
                ],
                quantidadeTarefas: 5,
                tipoCompromisso: "AUDIÊNCIA DE INSTRUÇÃO",
                descricao: "202212600876 - AUDIÊNCIA DE INSTRUÇÃO DE JOAO VASCONCELOS TAVARES (INVENTÁRIO), NO DIA 01/11/2024 ÀS 08:00, LOCAL: VIDEOCONFERÊNCIA",
                semanas: 2,
                publicacao: "13/09/2024",
                peritoOrReu: "N/A",
                local: "VIDEOCONFERÊNCIA",
                horario: "08:00",
            },
            processo: {
                id: "31924",
                origem: "202212600876",
                dependente: undefined,
                reu: "N/A",
                responsavel: "DANIEL DE ALBUQUERQUE FRANCO OLIVEIRA",
                natureza: "CÍVEL",
                merito: "INVENTÁRIO",
                cidade: "ARACAJU",
                estado: "SE",
                vara: "26ª VARA CÍVEL DE ARACAJU",
                acao: "COLETIVA",
                idsCopias: [
                    "18529",
                    "26049",
                    "26048",
                    "27193",
                    "12183",
                    "28952"
                ]
            }
        }

        const desiredBodyTask = [
            {
              idCO: '31924',
              idPR: '31924',
              agendada: 's',
              idTipoTarefa: '28',
              dataParaFinalizacao: '01/11/2024',
              descricao: '202212600876 - AUDIÊNCIA DE INSTRUÇÃO DE JOAO VASCONCELOS TAVARES (INVENTÁRIO), NO DIA 01/11/2024 ÀS 08:00, LOCAL: VIDEOCONFERÊNCIA',
              idResponsavel: '55',
              idExecutor: '55',
              acaoColetiva: 'True',
              idsCopias: [ '18529', '26049', '26048', '27193', '12183', '28952' ],
              dataParaFinalizacaoAgendada: '01/11/2024',
              onde: 'VIDEOCONFERÊNCIA',
              horarioInicial: '08:00',
              horarioFinal: '10:00'
            },
            {
              idCO: '31924',
              idPR: '31924',
              agendada: 'n',
              idTipoTarefa: '15',
              dataParaFinalizacao: '01/11/2024',
              descricao: '202212600876 - AUDIÊNCIA DE INSTRUÇÃO DE JOAO VASCONCELOS TAVARES (INVENTÁRIO), NO DIA 01/11/2024 ÀS 08:00, LOCAL: VIDEOCONFERÊNCIA',
              idResponsavel: '51',
              idExecutor: '199',
              acaoColetiva: 'True',
              idsCopias: [ '18529', '26049', '26048', '27193', '12183', '28952' ]
            },
            {
              idCO: '31924',
              idPR: '31924',
              agendada: 'n',
              idTipoTarefa: '76',
              dataParaFinalizacao: '01/11/2024',
              descricao: '202212600876 - AUDIÊNCIA DE INSTRUÇÃO DE JOAO VASCONCELOS TAVARES (INVENTÁRIO), NO DIA 01/11/2024 ÀS 08:00, LOCAL: VIDEOCONFERÊNCIA',
              idResponsavel: '62',
              idExecutor: '140',
              acaoColetiva: 'True',
              idsCopias: [ '18529', '26049', '26048', '27193', '12183', '28952' ]
            },
            {
              idCO: '31924',
              idPR: '31924',
              agendada: 'n',
              idTipoTarefa: '63',
              dataParaFinalizacao: '01/11/2024',
              descricao: '202212600876 - AUDIÊNCIA DE INSTRUÇÃO DE JOAO VASCONCELOS TAVARES (INVENTÁRIO), NO DIA 01/11/2024 ÀS 08:00, LOCAL: VIDEOCONFERÊNCIA',
              idResponsavel: '51',
              idExecutor: '188',
              acaoColetiva: 'True',
              idsCopias: [ '18529', '26049', '26048', '27193', '12183', '28952' ]
            },
            {
              idCO: '31924',
              idPR: '31924',
              agendada: 'n',
              idTipoTarefa: '77',
              dataParaFinalizacao: '01/11/2024',
              descricao: '202212600876 - VERIFICAR NECESSIDADE DE TESTEMUNHAS',
              idResponsavel: '55',
              idExecutor: '187',
              acaoColetiva: 'True',
              idsCopias: [ '18529', '26049', '26048', '27193', '12183', '28952' ]
            }
          ]

        const resultados = await createBodyForCreateTask({ cliente: clienteMock, colaboradores: colaboradoresMock, tiposTarefas: tiposTarefasMock, cookie })

        resultados.forEach((resultado, index) => expect(resultado).toMatchObject(desiredBodyTask[index]))
    })
})