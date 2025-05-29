import { describe, expect, it, beforeEach, jest } from '@jest/globals'

import { createBodyForCreateTask } from '../../../../../src/repositories/tarefas/index'
import { calcularDataTarefa } from "../../../../../src/utils/prazos/prazos"
import { getDescricao } from "../../../../../src/services/tarefas/utils/getDescricao"
import { getResponsavelExecutor } from "../../../../../src/services/tarefas/get/getResponsavelExecutor"
import { atualizaHoraFinal } from "../../../../../src/services/tarefas/utils/atualizaHoraFinal"
import { getParametroData } from "../../../../../src/services/tarefas/utils/getParametroData"
import { getTipoTarefa } from "../../../../../src/services/tarefas/utils/getTipoTarefa"
import { tiposTarefasMock } from '../../../mocks/tarefas/tiposTarefasMock'
import { colaboradoresMock } from '../../../mocks/colaboradores/colaboradoresMock'

jest.mock("../../../../../src/utils/prazos/prazos")
jest.mock("../../../../../src/services/tarefas/utils/getDescricao")
jest.mock("../../../../../src/services/tarefas/get/getResponsavelExecutor")
jest.mock("../../../../../src/services/tarefas/utils/atualizaHoraFinal")
jest.mock("../../../../../src/services/tarefas/utils/getParametroData")
jest.mock("../../../../../src/services/tarefas/utils/getTipoTarefa")

const mockedCalcularDataTarefa = jest.mocked(calcularDataTarefa)
const mockedGetDescricao = jest.mocked(getDescricao)
const mockedGetResponsavelExecutor = jest.mocked(getResponsavelExecutor)
const mockedAtualizaHoraFinal = jest.mocked(atualizaHoraFinal)
const mockedGetParametroData = jest.mocked(getParametroData)
const mockedGetTipoTarefa = jest.mocked(getTipoTarefa)

describe('Function createBodyForCreateTask: ', () => {
    const fakeCookie = 'cookie'
    const fakeHour = '10:00'
    //202212600876 - Ação coletiva
    const cliente = {
        id: '',
        nome: 'LAILTON DE SOUZA AGUIAR',
        cpf: '085.650.825-04',
        cidade: '',
        estado: 'SE',
        localAtendido: 'ARACAJU',
        parceiro: '',
        situacao: '',
        compromisso: {
            id: '',
            prazoInterno: 'DD/MM/AAAA',
            prazoFatal: 'DD/MM/AAAA',
            tarefas: [
                {
                    tipoId: '',
                    dataParaFinalizacao: new Date(),
                    responsavel: '',
                    executor: '',
                    descricao: 'AUDIÊNCIA DE INSTRUÇÃO'
                },
                {
                    tipoId: '',
                    dataParaFinalizacao: new Date(),
                    responsavel: '',
                    executor: '',
                    descricao: 'CONTATAR CLIENTE'
                },
                {
                    tipoId: '',
                    dataParaFinalizacao: new Date(),
                    responsavel: '',
                    executor: '',
                    descricao: 'SMS E WHATSAPP'
                },
                {
                    tipoId: '',
                    dataParaFinalizacao: new Date(),
                    responsavel: '',
                    executor: '',
                    descricao: 'LEMBRAR CLIENTE'
                },
                {
                    tipoId: '',
                    dataParaFinalizacao: new Date(),
                    responsavel: '',
                    executor: '',
                    descricao: 'ANÁLISE'
                }
            ],
            quantidadeTarefas: 5,
            tipoCompromisso: 'AUDIÊNCIA DE INSTRUÇÃO',
            descricao: '202311800989 (ORIGEM 201811800803) - AUDIÊNCIA DE INSTRUÇÃO DE LAILTON DE SOUZA AGUIAR (085.650.825-04) X NOME_DO_RÉU, NO DIA DD/MM/AAAA ÀS ${cliente.compromisso.horario}, LOCAL: LOCAL_DO_EVENTO',
            semanas: 2,
            publicacao: 'DD/MM/AAAA',
            peritoOrReu: 'NOME_DO_RÉU',
            local: 'LOCAL_DO_EVENTO',
            horario: 'HH:MM',
        },
        processo: {
            id: '',
            origem: '201811800803',
            dependente: '202311800989',
            reu: 'NOME_DO_RÉU',
            responsavel: '',
            natureza: 'TRABALHISTA',
            merito: '',
            vara: '',
            acaoColetiva: '',
            idsCopias: [''],
            cidade: "ARACAJU",
            estado: "SERGIPE"
        }
    }

    beforeEach(() => {
        jest.clearAllMocks()
        cliente.processo.idsCopias = ['']
    })

    mockedAtualizaHoraFinal.mockImplementation(hour => fakeHour)
    
    mockedGetParametroData.mockImplementation(({ descricao }) => {
        const parametros = {
            "AUDIÊNCIA DE INSTRUÇÃO": 2,
            "CONTATAR CLIENTE": 1,
            "SMS E WHATSAPP": 1,
            "LEMBRAR CLIENTE": 1,
            "ANÁLISE": 2
        }

        return parametros[descricao]
    })
    mockedCalcularDataTarefa.mockImplementation((tarefa) => {
        const datasTarefas = {
            "AUDIÊNCIA DE INSTRUÇÃO": new Date('2024-11-01'),
            "CONTATAR CLIENTE": new Date('2024-10-02'),
            "SMS E WHATSAPP": new Date('2024-10-01'),
            "LEMBRAR CLIENTE": new Date('2024-10-29'),
            "ANÁLISE": new Date('2024-10-01')
        }

        return datasTarefas[tarefa]
    })
    mockedGetDescricao.mockImplementation(({ descricao: tarefa }) => {
        const descricoes = {
            "AUDIÊNCIA DE INSTRUÇÃO": "202212600876 - AUDIÊNCIA DE INSTRUÇÃO DE JOAO VASCONCELOS TAVARES (INVENTÁRIO), NO DIA 01/11/2024 ÀS 08:00, LOCAL: VIDEOCONFERÊNCIA",
            "CONTATAR CLIENTE": "202212600876 - AUDIÊNCIA DE INSTRUÇÃO DE JOAO VASCONCELOS TAVARES (INVENTÁRIO), NO DIA 01/11/2024 ÀS 08:00, LOCAL: VIDEOCONFERÊNCIA",
            "SMS E WHATSAPP": "202212600876 - AUDIÊNCIA DE INSTRUÇÃO DE JOAO VASCONCELOS TAVARES (INVENTÁRIO), NO DIA 01/11/2024 ÀS 08:00, LOCAL: VIDEOCONFERÊNCIA",
            "LEMBRAR CLIENTE": "202212600876 - AUDIÊNCIA DE INSTRUÇÃO DE JOAO VASCONCELOS TAVARES (INVENTÁRIO), NO DIA 01/11/2024 ÀS 08:00, LOCAL: VIDEOCONFERÊNCIA",
            "ANÁLISE": "202212600876 - VERIFICAR NECESSIDADE DE TESTEMUNHAS"}

        return descricoes[tarefa]
    })
    mockedGetTipoTarefa.mockImplementation(({ descricao: tarefa }) => {
        const tiposTarefas = {
            "AUDIÊNCIA DE INSTRUÇÃO": "28",
            "CONTATAR CLIENTE": "15",
            "SMS E WHATSAPP": "76",
            "LEMBRAR CLIENTE": "63",
            "ANÁLISE": "77",
        }

        return tiposTarefas[tarefa]
    })
    mockedGetResponsavelExecutor.mockImplementation(({ descricao: tarefa }) => {
        const responsaveisExecutores = {
            "AUDIÊNCIA DE INSTRUÇÃO": {
            responsavel: "RODRIGO AGUIAR SANTOS",
            executor: "RODRIGO AGUIAR SANTOS"
            },
            "CONTATAR CLIENTE": {
                responsavel: "JULIANO OLIVEIRA DE SOUZA",
                executor: "JULIANO OLIVEIRA DE SOUZA"
            },
            "SMS E WHATSAPP": {
                responsavel: "HENYR GOIS DOS SANTOS",
                executor: "HENYR GOIS DOS SANTOS"
            },
            "LEMBRAR CLIENTE": {
                responsavel: "JULIANO OLIVEIRA DE SOUZA",
                executor: "JULIANO OLIVEIRA DE SOUZA"
            },
            "ANÁLISE": {
                responsavel: "RODRIGO AGUIAR SANTOS",
                executor: "RODRIGO AGUIAR SANTOS"
            },
        }

        return responsaveisExecutores[tarefa]
    })
    
    it('Criar objeto body de todas as tarefas de um compromisso de audiência em processo coletivo', async () => {
        cliente.processo.idsCopias = ['18529', '27193', '26049', '12183', '26048', '28952']

        const desiredBodyTask = [
            {
              idCO: '245862',
              idPR: '31924',
              agendada: 's',
              idTipoTarefa: '28',
              dataParaFinalizacao: '31/10/2024',
              descricao: '202212600876 - AUDIÊNCIA DE INSTRUÇÃO DE JOAO VASCONCELOS TAVARES (INVENTÁRIO), NO DIA 01/11/2024 ÀS 08:00, LOCAL: VIDEOCONFERÊNCIA',
              idResponsavel: '55',
              idExecutor: '55',
              acaoColetiva: 'True',
              dataParaFinalizacaoAgendada: '31/10/2024',
              onde: 'VIDEOCONFERÊNCIA',
              horarioInicial: '08:00',
              horarioFinal: '10:00'
            },
            {
              idCO: '245862',
              idPR: '31924',
              agendada: 'n',
              idTipoTarefa: '15',
              dataParaFinalizacao: '01/10/2024',
              descricao: '202212600876 - AUDIÊNCIA DE INSTRUÇÃO DE JOAO VASCONCELOS TAVARES (INVENTÁRIO), NO DIA 01/11/2024 ÀS 08:00, LOCAL: VIDEOCONFERÊNCIA',
              idResponsavel: '51',
              idExecutor: '51',
              acaoColetiva: 'True'
            },
            {
              idCO: '245862',
              idPR: '31924',
              agendada: 'n',
              idTipoTarefa: '76',
              dataParaFinalizacao: '30/09/2024',
              descricao: '202212600876 - AUDIÊNCIA DE INSTRUÇÃO DE JOAO VASCONCELOS TAVARES (INVENTÁRIO), NO DIA 01/11/2024 ÀS 08:00, LOCAL: VIDEOCONFERÊNCIA',
              idResponsavel: '62',
              idExecutor: '62',
              acaoColetiva: 'True'
            },
            {
              idCO: '245862',
              idPR: '31924',
              agendada: 'n',
              idTipoTarefa: '63',
              dataParaFinalizacao: '28/10/2024',
              descricao: '202212600876 - AUDIÊNCIA DE INSTRUÇÃO DE JOAO VASCONCELOS TAVARES (INVENTÁRIO), NO DIA 01/11/2024 ÀS 08:00, LOCAL: VIDEOCONFERÊNCIA',
              idResponsavel: '51',
              idExecutor: '51',
              acaoColetiva: 'True'
            },
            {
              idCO: '245862',
              idPR: '31924',
              agendada: 'n',
              idTipoTarefa: '77',
              dataParaFinalizacao: '30/09/2024',
              descricao: '202212600876 - VERIFICAR NECESSIDADE DE TESTEMUNHAS',
              idResponsavel: '55',
              idExecutor: '55',
              acaoColetiva: 'True'
            }
        ]

        cliente.compromisso.local = "VIDEOCONFERÊNCIA"
        cliente.compromisso.horario = "08:00"
        cliente.compromisso.id = "245862"

        cliente.processo.id = "31924"
        cliente.processo.acaoColetiva = "True"

        const resultados = await createBodyForCreateTask({ cliente, colaboradores: colaboradoresMock, tiposTarefas: tiposTarefasMock, cookie: fakeCookie })

        resultados.forEach((resultado, index) => expect(resultado).toMatchObject(desiredBodyTask[index]))
    })

    it('Criar objeto body de todas as tarefas de um compromisso de audiência em processo individual', async () => {

        const desiredBodyTask = [
            {
              idCO: '245862',
              idPR: '31924',
              agendada: 's',
              idTipoTarefa: '28',
              dataParaFinalizacao: '31/10/2024',
              descricao: '202212600876 - AUDIÊNCIA DE INSTRUÇÃO DE JOAO VASCONCELOS TAVARES (INVENTÁRIO), NO DIA 01/11/2024 ÀS 08:00, LOCAL: VIDEOCONFERÊNCIA',
              idResponsavel: '55',
              idExecutor: '55',
              acaoColetiva: 'False',
              dataParaFinalizacaoAgendada: '31/10/2024',
              onde: 'VIDEOCONFERÊNCIA',
              horarioInicial: '08:00',
              horarioFinal: '10:00'
            },
            {
              idCO: '245862',
              idPR: '31924',
              agendada: 'n',
              idTipoTarefa: '15',
              dataParaFinalizacao: '01/10/2024',
              descricao: '202212600876 - AUDIÊNCIA DE INSTRUÇÃO DE JOAO VASCONCELOS TAVARES (INVENTÁRIO), NO DIA 01/11/2024 ÀS 08:00, LOCAL: VIDEOCONFERÊNCIA',
              idResponsavel: '51',
              idExecutor: '51',
              acaoColetiva: 'False'
            },
            {
              idCO: '245862',
              idPR: '31924',
              agendada: 'n',
              idTipoTarefa: '76',
              dataParaFinalizacao: '30/09/2024',
              descricao: '202212600876 - AUDIÊNCIA DE INSTRUÇÃO DE JOAO VASCONCELOS TAVARES (INVENTÁRIO), NO DIA 01/11/2024 ÀS 08:00, LOCAL: VIDEOCONFERÊNCIA',
              idResponsavel: '62',
              idExecutor: '62',
              acaoColetiva: 'False'
            },
            {
              idCO: '245862',
              idPR: '31924',
              agendada: 'n',
              idTipoTarefa: '63',
              dataParaFinalizacao: '28/10/2024',
              descricao: '202212600876 - AUDIÊNCIA DE INSTRUÇÃO DE JOAO VASCONCELOS TAVARES (INVENTÁRIO), NO DIA 01/11/2024 ÀS 08:00, LOCAL: VIDEOCONFERÊNCIA',
              idResponsavel: '51',
              idExecutor: '51',
              acaoColetiva: 'False'
            },
            {
              idCO: '245862',
              idPR: '31924',
              agendada: 'n',
              idTipoTarefa: '77',
              dataParaFinalizacao: '30/09/2024',
              descricao: '202212600876 - VERIFICAR NECESSIDADE DE TESTEMUNHAS',
              idResponsavel: '55',
              idExecutor: '55',
              acaoColetiva: 'False'
            }
        ]

        cliente.processo.acaoColetiva = "False"

        const resultados = await createBodyForCreateTask({ cliente, colaboradores: colaboradoresMock, tiposTarefas: tiposTarefasMock, cookie: fakeCookie })

        resultados.forEach((resultado, index) => expect(resultado).toMatchObject(desiredBodyTask[index]))
    })
})