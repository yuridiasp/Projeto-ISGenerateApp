describe('Function selectExecutorContatarJudicial: Selecionar executor da tarefa de acordo com responsabilidade ou disponibilidade', () => {
    const { selectExecutorContatarJudicial } = require("../../../../../../dist/services/tarefas/taskService")

    const removeAcentuacaoStringMock = (string) => {
        return string
    }

    const aracaju = [
        {
            id: '196',
            nome: "KAUÃ DE CARVALHO NASCIMENTO",
            interiores: [],
            datasViagem: [],
            tarefas: 10
        },
        {
            id: '199',
            nome: "LUCAS NATHAN NOGUEIRA DA SILVA",
            interiores: ["ESTANCIA", "TOBIAS BARRETO", "PEDRINHAS"],
            datasViagem: [],
            tarefas: 19
        },
        {
            id: '188',
            nome: "VINICIUS SOUSA BOMFIM",
            interiores: ["UMBAUBA", "CARMOPOLIS", "LOTEAMENTO JEOVA (BOTAFOGO)"],
            datasViagem: [],
            tarefas: 7
        }
    ]

    it('Selecionar responsavel pelo respectivo interior do cliente', () => {
        const clienteMock = {
            localAtendido: 'TOBIAS BARRETO',
            processo: {
                estado: 'SE'
            }
        }

        const resultado = selectExecutorContatarJudicial(aracaju, clienteMock, removeAcentuacaoStringMock)

        expect(resultado).toMatchObject({ responsavel: "JULIANO OLIVEIRA DE SOUZA", executor: "LUCAS NATHAN NOGUEIRA DA SILVA" })
    })

    it('Selecionar responsavel por cliente de BSB', () => {
        const clienteMock = {
            localAtendido: 'AGUAS LINDAS',
            processo: {
                estado: 'DF'
            }
        }

        const brasilia = [
            {
                id: '215',
                nome: "JÚLIA ROBERTA DE FÁTIMA SOUSA ARAÚJO",
                interiores: [],
                datasViagem: [],
                tarefas: 5
            },
            {
                id: '223',
                nome: "MATHEUS CAMPELO DA SILVA",
                interiores: [],
                datasViagem: [],
                tarefas: 4
            },
            {
                id: '222',
                nome: "STEFANNY MORAIS DO NASCIMENTO",
                interiores: [],
                datasViagem: [],
                tarefas: 2
            },
        ]

        const resultado = selectExecutorContatarJudicial(brasilia, clienteMock, removeAcentuacaoStringMock)

        expect(resultado).toMatchObject({ responsavel: "HENYR GOIS DOS SANTOS", executor: "STEFANNY MORAIS DO NASCIMENTO" })
    })

    it('Selecionar responsavel por cliente de Estância', () => {
        const clienteMock = {
            cidade: 'ESTANCIA',
            localAtendido: 'ESTANCIA',
            processo: {
                estado: 'SE'
            }
        }

        const estancia = [
            {
                id: '22',
                nome: "SANDOVAL FILHO CORREIA LIMA FILHO",
                interiores: [],
                datasViagem: [],
                tarefas: 0
            }
        ]

        const resultado = selectExecutorContatarJudicial(estancia, clienteMock, removeAcentuacaoStringMock)

        expect(resultado).toMatchObject({ responsavel: "SANDOVAL FILHO CORREIA LIMA FILHO", executor: "SANDOVAL FILHO CORREIA LIMA FILHO" })
    })

    it('Selecionar responsavel por cliente de outras localidades e que possui o menor número de tarefas de intimação', () => {
        const clienteMock = {
            localAtendido: 'ARACAJU',
            processo: {
                estado: 'SE'
            }
        }

        const resultado = selectExecutorContatarJudicial(aracaju, clienteMock, removeAcentuacaoStringMock)

        expect(resultado).toMatchObject({ responsavel: "JULIANO OLIVEIRA DE SOUZA", executor: "VINICIUS SOUSA BOMFIM" })
    })
})