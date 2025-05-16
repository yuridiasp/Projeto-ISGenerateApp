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

export default tiposTarefasMock