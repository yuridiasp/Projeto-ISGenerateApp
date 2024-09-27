describe('Function filterColaboradoresJudicial: Filtra colaboradores executores da tarefa', () => {
    const { filterColaboradoresJudicial } = require("../../../../../../dist/services/tarefas/taskService")
    it('Filtrar colaboradores de responsabilidade de BSB', () => {
        const clienteMock = {
            processo: {
                estado: 'DF'
            }
        }

        const expectedResult = [
            {
                id: '215',
                nome: "JÚLIA ROBERTA DE FÁTIMA SOUSA ARAÚJO",
                interiores: [],
                datasViagem: [],
                tarefas: 0
            },
            {
                id: '223',
                nome: "MATHEUS CAMPELO DA SILVA",
                interiores: [],
                datasViagem: [],
                tarefas: 0
            },
            {
                id: '222',
                nome: "STEFANNY MORAIS DO NASCIMENTO",
                interiores: [],
                datasViagem: [],
                tarefas: 0
            },
        ]

        const resultado = filterColaboradoresJudicial(clienteMock)

        expect(resultado).toMatchObject(expectedResult)
    })

    it('Filtrar colaboradores de responsabilidade de Estância', () => {
        const clienteMock = {
            cidade: 'ESTANCIA',
            localAtendido: 'ESTANCIA',
            processo: {
                estado: 'SE'
            }
        }

        const expectedResult = [
            {
                id: '22',
                nome: "SANDOVAL FILHO CORREIA LIMA FILHO",
                interiores: [],
                datasViagem: [],
                tarefas: 0
            }
        ]

        const resultado = filterColaboradoresJudicial(clienteMock)

        expect(resultado).toMatchObject(expectedResult)
    })

    it('Filtrar colaboradores de responsabilidade das demais localidades', () => {
        const clienteMock = {
            cidade: 'ARACAJU',
            localAtendido: 'ARACAJU',
            processo: {
                estado: 'SE'
            }
        }

        const expectedResult = [
            {
                id: '196',
                nome: "KAUÃ DE CARVALHO NASCIMENTO",
                interiores: [],
                datasViagem: [],
                tarefas: 0
            },
            {
                id: '199',
                nome: "LUCAS NATHAN NOGUEIRA DA SILVA ",
                interiores: ["ESTANCIA", "TOBIAS BARRETO", "PEDRINHAS"],
                datasViagem: [],
                tarefas: 0
            },
            {
                id: '188',
                nome: "VINICIUS SOUSA BOMFIM",
                interiores: ["UMBAUBA", "CARMOPOLIS", "LOTEAMENTO JEOVA (BOTAFOGO)"],
                datasViagem: [],
                tarefas: 0
            },
            {
                id: '94',
                nome: "CARLOS HENRIQUE ESPASIANI",
                interiores: ["CAPELA", "JAPARATUBA", "CONDE/BA", "ALAGOINHAS"],
                datasViagem: [],
                tarefas: 0
            },
            {
                id: '131',
                nome: "ASLEY RODRIGO DE MELO LIMA",
                interiores: [],
                datasViagem: [],
                tarefas: 0
            },
            {
                id: '161',
                nome: "YURI DIAS PEREIRA",
                interiores: [],
                datasViagem: [],
                tarefas: 0
            },
        ]

        const resultado = filterColaboradoresJudicial(clienteMock)

        expect(resultado).toMatchObject(expectedResult)
    })

    it('Filtrar colaboradores quando responsabilidade não identificada', () => {
        const isMocked = true
        const clienteMock = {
            cidade: 'ARACAJU',
            localAtendido: 'ARACAJU',
            processo: {
                vara: '7ª VARA FEDERAL',
                estado: 'SE'
            }
        }

        const expectedResult = [
            {
                id: '196',
                nome: "KAUÃ DE CARVALHO NASCIMENTO",
                interiores: [],
                datasViagem: [],
                tarefas: 0
            },
            {
                id: '199',
                nome: "LUCAS NATHAN NOGUEIRA DA SILVA ",
                interiores: ["ESTANCIA", "TOBIAS BARRETO", "PEDRINHAS"],
                datasViagem: [],
                tarefas: 0
            },
            {
                id: '188',
                nome: "VINICIUS SOUSA BOMFIM",
                interiores: ["UMBAUBA", "CARMOPOLIS", "LOTEAMENTO JEOVA (BOTAFOGO)"],
                datasViagem: [],
                tarefas: 0
            },
            {
                id: '94',
                nome: "CARLOS HENRIQUE ESPASIANI",
                interiores: ["CAPELA", "JAPARATUBA", "CONDE/BA", "ALAGOINHAS"],
                datasViagem: [],
                tarefas: 0
            },
            {
                id: '131',
                nome: "ASLEY RODRIGO DE MELO LIMA",
                interiores: [],
                datasViagem: [],
                tarefas: 0
            },
            {
                id: '161',
                nome: "YURI DIAS PEREIRA",
                interiores: [],
                datasViagem: [],
                tarefas: 0
            },
            {
                id: '22',
                nome: "SANDOVAL FILHO CORREIA LIMA FILHO",
                interiores: [],
                datasViagem: [],
                tarefas: 0
            }
        ]

        const resultado = filterColaboradoresJudicial(clienteMock, isMocked)

        expect(resultado).toMatchObject(expectedResult)
    })
})
