import { describe, expect, it, beforeEach } from '@jest/globals'

import { createBodyForCreateTask } from "../../../../../../src/services/tarefas/taskService"

describe('Function createBodyForCreateTask: ', () => {
    //202212600876 - Ação coletiva
    const colaboradoresMock = [
        {
            id: "166",
            nome: "ALÃ FEITOSA CARVALHO",
            normalizado: "ALA FEITOSA CARVALHO"
        },
        {
            id: "14",
            nome: "ALINE RIBEIRO",
            normalizado: "ALINE RIBEIRO"
        },
        {
            id: "134",
            nome: "ANA CAROLINA SOARES DE MELO",
            normalizado: "ANA CAROLINA SOARES DE MELO"
        },
        {
            id: "180",
            nome: "ANSELMO DAVID DOS SANTOS RODRIGUES",
            normalizado: "ANSELMO DAVID DOS SANTOS RODRIGUES"
        },
        {
            id: "219",
            nome: "ARTHUR PORTO ROSENDO",
            normalizado: "ARTHUR PORTO ROSENDO"
        },
        {
            id: "131",
            nome: "ASLEY RODRIGO DE MELO LIMA",
            normalizado: "ASLEY RODRIGO DE MELO LIMA"
        },
        {
            id: "25",
            nome: "BRUNO PRADO GUIMARAES",
            normalizado: "BRUNO PRADO GUIMARAES"
        },
        {
            id: "216",
            nome: "CAMILA TOJAL MACHADO SANTOS",
            normalizado: "CAMILA TOJAL MACHADO SANTOS"
        },
        {
            id: "226",
            nome: "CARLOS FERNANDES PEREIRA DA SILVA",
            normalizado: "CARLOS FERNANDES PEREIRA DA SILVA"
        },
        {
            id: "94",
            nome: "CARLOS HENRIQUE ESPASIANI",
            normalizado: "CARLOS HENRIQUE ESPASIANI"
        },
        {
            id: "96",
            nome: "CARLOS ROBERTO SANTOS ARAUJO DA SILVA",
            normalizado: "CARLOS ROBERTO SANTOS ARAUJO DA SILVA"
        },
        {
            id: "135",
            nome: "CRISTINA BEZERRA DA SILVA",
            normalizado: "CRISTINA BEZERRA DA SILVA"
        },
        {
            id: "132",
            nome: "DANIEL CABRAL PEREIRA SANTOS",
            normalizado: "DANIEL CABRAL PEREIRA SANTOS"
        },
        {
            id: "204",
            nome: "DIEGO DOS SANTOS SILVA",
            normalizado: "DIEGO DOS SANTOS SILVA"
        },
        {
            id: "1",
            nome: "DIEGO MELO SOBRINHO",
            normalizado: "DIEGO MELO SOBRINHO"
        },
        {
            id: "192",
            nome: "EDUARDO PAIXÃO ROCHA SOBRINHO",
            normalizado: "EDUARDO PAIXAO ROCHA SOBRINHO"
        },
        {
            id: "210",
            nome: "EFRAIM SILVA CORREA DOS SANTOS",
            normalizado: "EFRAIM SILVA CORREA DOS SANTOS"
        },
        {
            id: "189",
            nome: "ENZO RIBEIRO",
            normalizado: "ENZO RIBEIRO"
        },
        {
            id: "225",
            nome: "ERINALDO FARO SANTOS",
            normalizado: "ERINALDO FARO SANTOS"
        },
        {
            id: "2",
            nome: "FABIO RIBEIRO",
            normalizado: "FABIO RIBEIRO"
        },
        {
            id: "108",
            nome: "FELIPE PANTA CARDOSO",
            normalizado: "FELIPE PANTA CARDOSO"
        },
        {
            id: "97",
            nome: "FERNANDO BATISTA",
            normalizado: "FERNANDO BATISTA"
        },
        {
            id: "158",
            nome: "FERNANDO HENRIQUE BARBOZA NASCIMENTO",
            normalizado: "FERNANDO HENRIQUE BARBOZA NASCIMENTO"
        },
        {
            id: "139",
            nome: "FLAVIO LUCAS LIMA SOUZA",
            normalizado: "FLAVIO LUCAS LIMA SOUZA"
        },
        {
            id: "187",
            nome: "GABRIEL DAVILA FILGUEIRAS MELLONE",
            normalizado: "GABRIEL DAVILA FILGUEIRAS MELLONE"
        },
        {
            id: "211",
            nome: "GABRIEL EDSON BARBOSA ARIMATEIA",
            normalizado: "GABRIEL EDSON BARBOSA ARIMATEIA"
        },
        {
            id: "115",
            nome: "GABRIEL FRANÇA VITAL",
            normalizado: "GABRIEL FRANCA VITAL"
        },
        {
            id: "104",
            nome: "GLENISSON NASCIMENTO",
            normalizado: "GLENISSON NASCIMENTO"
        },
        {
            id: "100",
            nome: "GUILHERME JASMIM",
            normalizado: "GUILHERME JASMIM"
        },
        {
            id: "224",
            nome: "GUILHERME MIGUEL GUIMARÃES SILVA",
            normalizado: "GUILHERME MIGUEL GUIMARAES SILVA"
        },
        {
            id: "213",
            nome: "HELLEN VITORIA ROCHA SILVA SANTOS",
            normalizado: "HELLEN VITORIA ROCHA SILVA SANTOS"
        },
        {
            id: "205",
            nome: "HELTON FRADES BRABEC SOUZA",
            normalizado: "HELTON FRADES BRABEC SOUZA"
        },
        {
            id: "62",
            nome: "HENYR GOIS DOS SANTOS",
            normalizado: "HENYR GOIS DOS SANTOS"
        },
        {
            id: "159",
            nome: "ITALO DE ANDRADE BEZERRA",
            normalizado: "ITALO DE ANDRADE BEZERRA"
        },
        {
            id: "197",
            nome: "JHONATHAN DA FONSECA ALMEIDA FLOR",
            normalizado: "JHONATHAN DA FONSECA ALMEIDA FLOR"
        },
        {
            id: "230",
            nome: "JOSÉ HENRIQUE VASCONCELOS RODRIGUES FONTES",
            normalizado: "JOSE HENRIQUE VASCONCELOS RODRIGUES FONTES"
        },
        {
            id: "190",
            nome: "JOSE PEDRO DE GOIS NETO",
            normalizado: "JOSE PEDRO DE GOIS NETO"
        },
        {
            id: "215",
            nome: "JÚLIA ROBERTA DE FÁTIMA SOUSA ARAÚJO",
            normalizado: "JULIA ROBERTA DE FATIMA SOUSA ARAUJO"
        },
        {
            id: "51",
            nome: "JULIANO OLIVEIRA DE SOUZA",
            normalizado: "JULIANO OLIVEIRA DE SOUZA"
        },
        {
            id: "196",
            nome: "KAUÃ DE CARVALHO NASCIMENTO",
            normalizado: "KAUA DE CARVALHO NASCIMENTO"
        },
        {
            id: "93",
            nome: "KEVEN FARO DE CARVALHO",
            normalizado: "KEVEN FARO DE CARVALHO"
        },
        {
            id: "47",
            nome: "LAIS PEREIRA MORAES",
            normalizado: "LAIS PEREIRA MORAES"
        },
        {
            id: "140",
            nome: "LAYNE DA SILVA GOIS",
            normalizado: "LAYNE DA SILVA GOIS"
        },
        {
            id: "64",
            nome: "LEANDRO SANTOS",
            normalizado: "LEANDRO SANTOS"
        },
        {
            id: "221",
            nome: "LEONARDO TEIXEIRA SANTOS SILVA",
            normalizado: "LEONARDO TEIXEIRA SANTOS SILVA"
        },
        {
            id: "193",
            nome: "LINIKER BERNARDO SOARES",
            normalizado: "LINIKER BERNARDO SOARES"
        },
        {
            id: "199",
            nome: "LUCAS NATHAN NOGUEIRA DA SILVA",
            normalizado: "LUCAS NATHAN NOGUEIRA DA SILVA"
        },
        {
            id: "11",
            nome: "LUCIANA DOS SANTOS ARAUJO",
            normalizado: "LUCIANA DOS SANTOS ARAUJO"
        },
        {
            id: "127",
            nome: "LUCIANA LIMA REZENDE",
            normalizado: "LUCIANA LIMA REZENDE"
        },
        {
            id: "212",
            nome: "LUIZ CARLOS LOPES DOS SANTOS",
            normalizado: "LUIZ CARLOS LOPES DOS SANTOS"
        },
        {
            id: "201",
            nome: "MARCO AURELIO LEITE GOMES",
            normalizado: "MARCO AURELIO LEITE GOMES"
        },
        {
            id: "28",
            nome: "MARCUS VINICIUS DE SOUZA MORAIS",
            normalizado: "MARCUS VINICIUS DE SOUZA MORAIS"
        },
        {
            id: "231",
            nome: "MARIA LUANNA DE LIMA SOUZA",
            normalizado: "MARIA LUANNA DE LIMA SOUZA"
        },
        {
            id: "223",
            nome: "MATHEUS CAMPELO DA SILVA",
            normalizado: "MATHEUS CAMPELO DA SILVA"
        },
        {
            id: "175",
            nome: "MATHEUS CORREIA SANTOS",
            normalizado: "MATHEUS CORREIA SANTOS"
        },
        {
            id: "164",
            nome: "MATHEUS MATOS BARRETO",
            normalizado: "MATHEUS MATOS BARRETO"
        },
        {
            id: "162",
            nome: "MIQUEAS CAMPOS DA SILVA",
            normalizado: "MIQUEAS CAMPOS DA SILVA"
        },
        {
            id: "198",
            nome: "MURILLO VICTOR SANTOS ROCHA",
            normalizado: "MURILLO VICTOR SANTOS ROCHA"
        },
        {
            id: "154",
            nome: "OSMAR SILVA VIANA",
            normalizado: "OSMAR SILVA VIANA"
        },
        {
            id: "148",
            nome: "OVERLANDIA SANTOS MELO",
            normalizado: "OVERLANDIA SANTOS MELO"
        },
        {
            id: "52",
            nome: "PAULO VICTOR SANTANA TEIXEIRA",
            normalizado: "PAULO VICTOR SANTANA TEIXEIRA"
        },
        {
            id: "73",
            nome: "PAUTISTA BRASILIA ADVOGADOS",
            normalizado: "PAUTISTA BRASILIA ADVOGADOS"
        },
        {
            id: "70",
            nome: "PAUTISTA CIVEL ADVOGADOS",
            normalizado: "PAUTISTA CIVEL ADVOGADOS"
        },
        {
            id: "71",
            nome: "PAUTISTA PREVIDENCIARIO ADVOGADOS",
            normalizado: "PAUTISTA PREVIDENCIARIO ADVOGADOS"
        },
        {
            id: "72",
            nome: "PAUTISTA TRABALHISTA ADVOGADOS",
            normalizado: "PAUTISTA TRABALHISTA ADVOGADOS"
        },
        {
            id: "203",
            nome: "RENATA DE JESUS SANTOS",
            normalizado: "RENATA DE JESUS SANTOS"
        },
        {
            id: "55",
            nome: "RODRIGO AGUIAR SANTOS",
            normalizado: "RODRIGO AGUIAR SANTOS"
        },
        {
            id: "22",
            nome: "SANDOVAL FILHO CORREIA LIMA FILHO",
            normalizado: "SANDOVAL FILHO CORREIA LIMA FILHO"
        },
        {
            id: "23",
            nome: "SARA GONÇALVES PINHEIRO",
            normalizado: "SARA GONCALVES PINHEIRO"
        },
        {
            id: "207",
            nome: "SHEYLA SANTANA SANTOS",
            normalizado: "SHEYLA SANTANA SANTOS"
        },
        {
            id: "24",
            nome: "SILVANIA PINHEIRO DE LEMOS",
            normalizado: "SILVANIA PINHEIRO DE LEMOS"
        },
        {
            id: "222",
            nome: "STEFANNY MORAIS DO NASCIMENTO",
            normalizado: "STEFANNY MORAIS DO NASCIMENTO"
        },
        {
            id: "36",
            nome: "SUPORTE FÁBRICA DE TEMPO",
            normalizado: "SUPORTE FABRICA DE TEMPO"
        },
        {
            id: "206",
            nome: "THALYSON KELSON LIMA TORRES",
            normalizado: "THALYSON KELSON LIMA TORRES"
        },
        {
            id: "217",
            nome: "THIAGO SANTOS SANTANA",
            normalizado: "THIAGO SANTOS SANTANA"
        },
        {
            id: "153",
            nome: "TRICYA MATEUS ROLEMBERG",
            normalizado: "TRICYA MATEUS ROLEMBERG"
        },
        {
            id: "120",
            nome: "VICTOR MENDES DOS SANTOS",
            normalizado: "VICTOR MENDES DOS SANTOS"
        },
        {
            id: "188",
            nome: "VINICIUS SOUSA BOMFIM",
            normalizado: "VINICIUS SOUSA BOMFIM"
        },
        {
            id: "147",
            nome: "WILKE RODRIGUES DE JESUS",
            normalizado: "WILKE RODRIGUES DE JESUS"
        },
        {
            id: "229",
            nome: "YAN THADEU PORTO DE OLIVEIRA SANTOS",
            normalizado: "YAN THADEU PORTO DE OLIVEIRA SANTOS"
        },
        {
            id: "161",
            nome: "YURI DIAS PEREIRA",
            normalizado: "YURI DIAS PEREIRA"
        }
    ]
    const tiposTarefasMock = [
        {
            id: "",
            nome: "TODOS",
            normalizado: "TODOS"
        },
        {
            id: "94",
            nome: "ACOMPANHAMENTO COMERCIAL",
            normalizado: "ACOMPANHAMENTO COMERCIAL"
        },
        {
            id: "78",
            nome: "ACOMPANHAMENTO OUVIDORIA",
            normalizado: "ACOMPANHAMENTO OUVIDORIA"
        },
        {
            id: "91",
            nome: "ACOMPANHAMENTO REDES SOCIAIS",
            normalizado: "ACOMPANHAMENTO REDES SOCIAIS"
        },
        {
            id: "106",
            nome: "ACOMPANHAR",
            normalizado: "ACOMPANHAR"
        },
        {
            id: "119",
            nome: "ACOMPANHAR IMPLANTAÇÃO DE BENEFÍCIO",
            normalizado: "ACOMPANHAR IMPLANTACAO DE BENEFICIO"
        },
        {
            id: "89",
            nome: "ACÓRDÃO",
            normalizado: "ACORDAO"
        },
        {
            id: "52",
            nome: "AGRAVO",
            normalizado: "AGRAVO"
        },
        {
            id: "77",
            nome: "ANÁLISE",
            normalizado: "ANALISE"
        },
        {
            id: "93",
            nome: "ANALISE COMERCIAL",
            normalizado: "ANALISE COMERCIAL"
        },
        {
            id: "7",
            nome: "ANÁLISE DE CONTRATO",
            normalizado: "ANALISE DE CONTRATO"
        },
        {
            id: "98",
            nome: "ANÁLISE DE EXIGÊNCIA INSS DIGITAL",
            normalizado: "ANALISE DE EXIGENCIA INSS DIGITAL"
        },
        {
            id: "39",
            nome: "ANÁLISE DE PROCESSO",
            normalizado: "ANALISE DE PROCESSO"
        },
        {
            id: "68",
            nome: "ANÁLISE INSS DIGITAL",
            normalizado: "ANALISE INSS DIGITAL"
        },
        {
            id: "86",
            nome: "ANDAMENTO PROCESSUAL",
            normalizado: "ANDAMENTO PROCESSUAL"
        },
        {
            id: "49",
            nome: "APELAÇÃO",
            normalizado: "APELACAO"
        },
        {
            id: "23",
            nome: "ATENDIMENTO (EXTERNO)",
            normalizado: "ATENDIMENTO (EXTERNO)"
        },
        {
            id: "24",
            nome: "ATENDIMENTO (INTERNO)",
            normalizado: "ATENDIMENTO (INTERNO)"
        },
        {
            id: "101",
            nome: "ATO ORDINATÓRIO",
            normalizado: "ATO ORDINATORIO"
        },
        {
            id: "41",
            nome: "ATUALIZAR CÁLCULOS",
            normalizado: "ATUALIZAR CALCULOS"
        },
        {
            id: "25",
            nome: "AUDIÊNCIA CONCILIATÓRIA",
            normalizado: "AUDIENCIA CONCILIATORIA"
        },
        {
            id: "28",
            nome: "AUDIÊNCIA DE INSTRUÇÃO",
            normalizado: "AUDIENCIA DE INSTRUCAO"
        },
        {
            id: "27",
            nome: "AUDIÊNCIA DE INSTRUÇÃO E JULGAMENTO",
            normalizado: "AUDIENCIA DE INSTRUCAO E JULGAMENTO"
        },
        {
            id: "67",
            nome: "AUDIÊNCIA DE INTERROGATÓRIO",
            normalizado: "AUDIENCIA DE INTERROGATORIO"
        },
        {
            id: "29",
            nome: "AUDIÊNCIA DE JULGAMENTO",
            normalizado: "AUDIENCIA DE JULGAMENTO"
        },
        {
            id: "31",
            nome: "AUDIÊNCIA DE SUSTENTAÇÃO ORAL",
            normalizado: "AUDIENCIA DE SUSTENTACAO ORAL"
        },
        {
            id: "30",
            nome: "AUDIÊNCIA INAUGURAL",
            normalizado: "AUDIENCIA INAUGURAL"
        },
        {
            id: "79",
            nome: "AUDIÊNCIA RAZÕES FINAIS",
            normalizado: "AUDIENCIA RAZOES FINAIS"
        },
        {
            id: "26",
            nome: "AUDIÊNCIA UNA",
            normalizado: "AUDIENCIA UNA"
        },
        {
            id: "123",
            nome: "BENEFÍCIO IMPLANTADO",
            normalizado: "BENEFICIO IMPLANTADO"
        },
        {
            id: "37",
            nome: "CÁLCULOS",
            normalizado: "CALCULOS"
        },
        {
            id: "105",
            nome: "CÁLCULOS DE REVISÃO",
            normalizado: "CALCULOS DE REVISAO"
        },
        {
            id: "43",
            nome: "CARGA DO PROCESSO",
            normalizado: "CARGA DO PROCESSO"
        },
        {
            id: "92",
            nome: "CARTA COMERCIAL",
            normalizado: "CARTA COMERCIAL"
        },
        {
            id: "120",
            nome: "CHAT GPT",
            normalizado: "CHAT GPT"
        },
        {
            id: "113",
            nome: "CIÊNCIA",
            normalizado: "CIENCIA"
        },
        {
            id: "16",
            nome: "CONSULTA",
            normalizado: "CONSULTA"
        },
        {
            id: "15",
            nome: "CONTATAR CLIENTE",
            normalizado: "CONTATAR CLIENTE"
        },
        {
            id: "75",
            nome: "CONTATAR CLIENTE (ADVOGADO)",
            normalizado: "CONTATAR CLIENTE (ADVOGADO)"
        },
        {
            id: "74",
            nome: "CONTATO COMERCIAL",
            normalizado: "CONTATO COMERCIAL"
        },
        {
            id: "51",
            nome: "CONTRARRAZÕES",
            normalizado: "CONTRARRAZOES"
        },
        {
            id: "122",
            nome: "CRIAR PRÉ-PROCESSO",
            normalizado: "CRIAR PRE-PROCESSO"
        },
        {
            id: "46",
            nome: "CUMPRIMENTO DE SENTENÇA",
            normalizado: "CUMPRIMENTO DE SENTENCA"
        },
        {
            id: "71",
            nome: "CUMPRIMENTO EXIGÊNCIA INSS DIGITAL",
            normalizado: "CUMPRIMENTO EXIGENCIA INSS DIGITAL"
        },
        {
            id: "82",
            nome: "DECISÃO",
            normalizado: "DECISAO"
        },
        {
            id: "110",
            nome: "DEMORA INJUSTIFICADA",
            normalizado: "DEMORA INJUSTIFICADA"
        },
        {
            id: "81",
            nome: "DESPACHO",
            normalizado: "DESPACHO"
        },
        {
            id: "65",
            nome: "DILIGÊNCIA",
            normalizado: "DILIGENCIA"
        },
        {
            id: "21",
            nome: "DILIGÊNCIA (ACOMPANHAMENTO PROCESSUAL)",
            normalizado: "DILIGENCIA (ACOMPANHAMENTO PROCESSUAL)"
        },
        {
            id: "17",
            nome: "DILIGÊNCIA (CÓPIAS)",
            normalizado: "DILIGENCIA (COPIAS)"
        },
        {
            id: "18",
            nome: "DILIGÊNCIA (PROTOCOLO)",
            normalizado: "DILIGENCIA (PROTOCOLO)"
        },
        {
            id: "73",
            nome: "DISTRIBUIR",
            normalizado: "DISTRIBUIR"
        },
        {
            id: "6",
            nome: "ELABORAÇÃO DE CONTRATO",
            normalizado: "ELABORACAO DE CONTRATO"
        },
        {
            id: "4",
            nome: "ELABORAÇÃO DE PARECER",
            normalizado: "ELABORACAO DE PARECER"
        },
        {
            id: "20",
            nome: "ELABORAÇÃO DE PETIÇÃO",
            normalizado: "ELABORACAO DE PETICAO"
        },
        {
            id: "5",
            nome: "ELABORAÇÃO DE RELATÓRIO",
            normalizado: "ELABORACAO DE RELATORIO"
        },
        {
            id: "53",
            nome: "EMBARGO",
            normalizado: "EMBARGO"
        },
        {
            id: "35",
            nome: "EMENDAR",
            normalizado: "EMENDAR"
        },
        {
            id: "121",
            nome: "ENVIO DE AR",
            normalizado: "ENVIO DE AR"
        },
        {
            id: "84",
            nome: "EXECUÇÃO",
            normalizado: "EXECUCAO"
        },
        {
            id: "96",
            nome: "EXIGÊNCIA INSS",
            normalizado: "EXIGENCIA INSS"
        },
        {
            id: "118",
            nome: "GESTÃO",
            normalizado: "GESTAO"
        },
        {
            id: "70",
            nome: "INTERVENÇÃO - CONTROLE INSS DIGITAL",
            normalizado: "INTERVENCAO - CONTROLE INSS DIGITAL"
        },
        {
            id: "36",
            nome: "INTIMAÇÃO",
            normalizado: "INTIMACAO"
        },
        {
            id: "63",
            nome: "LEMBRAR CLIENTE",
            normalizado: "LEMBRAR CLIENTE"
        },
        {
            id: "109",
            nome: "MANDADO DE SEGURANÇA",
            normalizado: "MANDADO DE SEGURANCA"
        },
        {
            id: "44",
            nome: "MANIFESTAÇÃO",
            normalizado: "MANIFESTACAO"
        },
        {
            id: "115",
            nome: "MARCAR/REMARCAR ATENDIMENTO",
            normalizado: "MARCAR/REMARCAR ATENDIMENTO"
        },
        {
            id: "54",
            nome: "NOVA ENTRADA",
            normalizado: "NOVA ENTRADA"
        },
        {
            id: "99",
            nome: "NOVA ENTRADA PROCESSO ADM INSS DIGITAL",
            normalizado: "NOVA ENTRADA PROCESSO ADM INSS DIGITAL"
        },
        {
            id: "103",
            nome: "PEDIDO DE PRORROGAÇÃO AUXÍLIO DOENÇA - ADM",
            normalizado: "PEDIDO DE PRORROGACAO AUXILIO DOENCA - ADM"
        },
        {
            id: "102",
            nome: "PEDIDO DE PRORROGAÇÃO AUXÍLIO DOENÇA - JUDICIAL",
            normalizado: "PEDIDO DE PRORROGACAO AUXILIO DOENCA - JUDICIAL"
        },
        {
            id: "83",
            nome: "PENDÊNCIAS ADM",
            normalizado: "PENDENCIAS ADM"
        },
        {
            id: "104",
            nome: "PENDENCIAS INSS",
            normalizado: "PENDENCIAS INSS"
        },
        {
            id: "19",
            nome: "PESQUISA DE JURISPRUDÊNCIA/DOUTRINA",
            normalizado: "PESQUISA DE JURISPRUDENCIA/DOUTRINA"
        },
        {
            id: "116",
            nome: "PRIORIDADE - PERÍCIA",
            normalizado: "PRIORIDADE - PERICIA"
        },
        {
            id: "112",
            nome: "PROCESSO",
            normalizado: "PROCESSO"
        },
        {
            id: "111",
            nome: "PROCESSO ADMINISTRATIVO INDEFERIDO",
            normalizado: "PROCESSO ADMINISTRATIVO INDEFERIDO"
        },
        {
            id: "117",
            nome: "PROCESSO ARQUIVADO",
            normalizado: "PROCESSO ARQUIVADO"
        },
        {
            id: "108",
            nome: "PROTOCOLO AUX. DOENÇA ADM",
            normalizado: "PROTOCOLO AUX. DOENCA ADM"
        },
        {
            id: "107",
            nome: "PROTOCOLO DE PROCESSO ADM - COM PENDÊNCIA",
            normalizado: "PROTOCOLO DE PROCESSO ADM - COM PENDENCIA"
        },
        {
            id: "97",
            nome: "PROTOCOLO DE PROCESSO ADM - INSS DIGITAL",
            normalizado: "PROTOCOLO DE PROCESSO ADM - INSS DIGITAL"
        },
        {
            id: "85",
            nome: "PROVAS",
            normalizado: "PROVAS"
        },
        {
            id: "87",
            nome: "QUESITOS",
            normalizado: "QUESITOS"
        },
        {
            id: "88",
            nome: "RAZÕES FINAIS",
            normalizado: "RAZOES FINAIS"
        },
        {
            id: "57",
            nome: "RECEBIMENTO DE ALVARÁ",
            normalizado: "RECEBIMENTO DE ALVARA"
        },
        {
            id: "100",
            nome: "RECEBIMENTO DE HONORÁRIOS",
            normalizado: "RECEBIMENTO DE HONORARIOS"
        },
        {
            id: "56",
            nome: "RECEBIMENTO DE PRECATÓRIO",
            normalizado: "RECEBIMENTO DE PRECATORIO"
        },
        {
            id: "38",
            nome: "RECEBIMENTO DE RPV",
            normalizado: "RECEBIMENTO DE RPV"
        },
        {
            id: "50",
            nome: "RECURSO",
            normalizado: "RECURSO"
        },
        {
            id: "42",
            nome: "REFAZER CÁLCULOS",
            normalizado: "REFAZER CALCULOS"
        },
        {
            id: "48",
            nome: "RÉPLICA",
            normalizado: "REPLICA"
        },
        {
            id: "40",
            nome: "REUNIÃO",
            normalizado: "REUNIAO"
        },
        {
            id: "32",
            nome: "REUNIÃO COM CLIENTE",
            normalizado: "REUNIAO COM CLIENTE"
        },
        {
            id: "33",
            nome: "REUNIÃO COM EQUIPE",
            normalizado: "REUNIAO COM EQUIPE"
        },
        {
            id: "34",
            nome: "REUNIÃO COM SÓCIO(S)",
            normalizado: "REUNIAO COM SOCIO(S)"
        },
        {
            id: "3",
            nome: "REVISÃO DE PRAZO",
            normalizado: "REVISAO DE PRAZO"
        },
        {
            id: "22",
            nome: "REVISÃO DE RELATÓRIO",
            normalizado: "REVISAO DE RELATORIO"
        },
        {
            id: "55",
            nome: "RPV ANTIGO",
            normalizado: "RPV ANTIGO"
        },
        {
            id: "58",
            nome: "RPV TRF1 BAHIA",
            normalizado: "RPV TRF1 BAHIA"
        },
        {
            id: "59",
            nome: "RPV TRF1 BRASÌLIA",
            normalizado: "RPV TRF1 BRASILIA"
        },
        {
            id: "60",
            nome: "RPV TRF1 GOIÀS",
            normalizado: "RPV TRF1 GOIAS"
        },
        {
            id: "61",
            nome: "RPV TRF5 ARACAJU",
            normalizado: "RPV TRF5 ARACAJU"
        },
        {
            id: "62",
            nome: "RPV TRF5 ESTÂNCIA",
            normalizado: "RPV TRF5 ESTANCIA"
        },
        {
            id: "80",
            nome: "SENTENÇA",
            normalizado: "SENTENCA"
        },
        {
            id: "90",
            nome: "SESSÃO DE JULGAMENTO",
            normalizado: "SESSAO DE JULGAMENTO"
        },
        {
            id: "76",
            nome: "SMS E WHATSAPP",
            normalizado: "SMS E WHATSAPP"
        },
        {
            id: "66",
            nome: "SUSTENTAÇÃO ORAL",
            normalizado: "SUSTENTACAO ORAL"
        },
        {
            id: "69",
            nome: "TAREFA ENCERRADA SEM PROVIDÊNCIA",
            normalizado: "TAREFA ENCERRADA SEM PROVIDENCIA"
        }
    ]
    let cliente = {
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
        cliente.processo.idsCopias = ['']
    })
    const getParametroData = ({ descricao: tarefa }) => {
        const parametros = {
            "AUDIÊNCIA DE INSTRUÇÃO": 2,
            "CONTATAR CLIENTE": 1,
            "SMS E WHATSAPP": 1,
            "LEMBRAR CLIENTE": 1,
            "ANÁLISE": 2
        }

        return parametros[tarefa]
    }
    const calcularDataTarefa = ({ descricao: tarefa }) => {
        const datasTarefas = {
            "AUDIÊNCIA DE INSTRUÇÃO": new Date('2024-11-01'),
            "CONTATAR CLIENTE": new Date('2024-10-02'),
            "SMS E WHATSAPP": new Date('2024-10-01'),
            "LEMBRAR CLIENTE": new Date('2024-10-29'),
            "ANÁLISE": new Date('2024-10-01')
        }

        return datasTarefas[tarefa]
    }
    const getDescricao = ({ descricao: tarefa }) => {
        const descricoes = {
            "AUDIÊNCIA DE INSTRUÇÃO": "202212600876 - AUDIÊNCIA DE INSTRUÇÃO DE JOAO VASCONCELOS TAVARES (INVENTÁRIO), NO DIA 01/11/2024 ÀS 08:00, LOCAL: VIDEOCONFERÊNCIA",
            "CONTATAR CLIENTE": "202212600876 - AUDIÊNCIA DE INSTRUÇÃO DE JOAO VASCONCELOS TAVARES (INVENTÁRIO), NO DIA 01/11/2024 ÀS 08:00, LOCAL: VIDEOCONFERÊNCIA",
            "SMS E WHATSAPP": "202212600876 - AUDIÊNCIA DE INSTRUÇÃO DE JOAO VASCONCELOS TAVARES (INVENTÁRIO), NO DIA 01/11/2024 ÀS 08:00, LOCAL: VIDEOCONFERÊNCIA",
            "LEMBRAR CLIENTE": "202212600876 - AUDIÊNCIA DE INSTRUÇÃO DE JOAO VASCONCELOS TAVARES (INVENTÁRIO), NO DIA 01/11/2024 ÀS 08:00, LOCAL: VIDEOCONFERÊNCIA",

            "ANÁLISE": "202212600876 - VERIFICAR NECESSIDADE DE TESTEMUNHAS"}

        return descricoes[tarefa]
    }
    const getTipoTarefa = ({ descricao: tarefa }) => {
        const tiposTarefas = {
            "AUDIÊNCIA DE INSTRUÇÃO": "28",
            "CONTATAR CLIENTE": "15",
            "SMS E WHATSAPP": "76",
            "LEMBRAR CLIENTE": "63",
            "ANÁLISE": "77",
        }

        return tiposTarefas[tarefa]
    }
    const getResponsavelExecutor = ({ descricao: tarefa }) => {
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
    }
    
    it('Criar objeto body de todas as tarefas de um compromisso de audiência em processo coletivo', async () => {
        cliente.processo.idsCopias = ['18529', '27193', '26049', '12183', '26048', '28952']

        const createBodyForCreateTaskMock = {
            getParametroData,
            calcularDataTarefa,
            getDescricao,
            getTipoTarefa,
            getResponsavelExecutor
        }
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

        const resultados = await createBodyForCreateTask({ cliente, colaboradores: colaboradoresMock, tiposTarefas: tiposTarefasMock, cookie: '', createBodyForCreateTaskMock })

        resultados.forEach((resultado, index) => expect(resultado).toMatchObject(desiredBodyTask[index]))
    })

    it('Criar objeto body de todas as tarefas de um compromisso de audiência em processo individual', async () => {

        const createBodyForCreateTaskMock = {
            getParametroData,
            calcularDataTarefa,
            getDescricao,
            getTipoTarefa,
            getResponsavelExecutor
        }
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

        const resultados = await createBodyForCreateTask({ cliente, colaboradores: colaboradoresMock, tiposTarefas: tiposTarefasMock, cookie: '' , createBodyForCreateTaskMock })

        resultados.forEach((resultado, index) => expect(resultado).toMatchObject(desiredBodyTask[index]))
    })
})