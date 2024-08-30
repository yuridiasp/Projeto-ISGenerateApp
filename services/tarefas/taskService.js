const { JSDOM } = require("jsdom")

const parametros = require("../../utils/appData/parametros")
const { removeAcentuacaoString } = require("../../utils/textFormatting/textFormatting")
const { getTarefa } = require("./getTaskService")
const { calcularDataTarefa } = require("../../utils/prazos/prazos")
const { getSelectsTask } = require("../seletores/seletoresService")
const { Cliente } = require("../../models/Cliente")

function atualizaHoraFinal (horarioInicial) {
    const duracaoAudicencia = 2
    let hora = Number(horarioInicial.value.slice(0,2)) + duracaoAudicencia

    if (!horarioInicial.value.length)
        horarioInicial.value = "00:00"

    if (hora == 24)
        hora = '00'
    else if (hora == 25)
        hora = '01'
    else if (hora == 26)
        hora = '02'
    else if (hora < 10) {
        let num = hora
        hora = `0${num}`
    }
    return `${hora}:${horarioInicial.value.slice(3)}`
}

function existeOrigem(cliente) {
    if (cliente.processo.dependente)
        if (cliente.processo.dependente.length > 0)
            return `${cliente.processo.dependente} (ORIGEM ${cliente.processo.origem})`
    return cliente.processo.origem
}

/**
 * 
 * @param {number} parametro - Um número para cálculo de prazo: 1 - Tarefas para contatar; 2 - Tarefas para advogado
 * @param {object} cliente - Um objeto que representa o cliente
 * @param {string} cliente.id
 * @param {string} cliente.nome
 * @param {string} cliente.cpf
 * @param {string} cliente.cidade
 * @param {string} cliente.estado
 * @param {string} cliente.localAtendido
 * @param {string} cliente.parceiro
 * @param {object} cliente.compromisso
 * @param {string} cliente.compromisso.id
 * @param {string} cliente.compromisso.prazoInterno
 * @param {string} cliente.compromisso.prazoFatal
 * @param {string} cliente.compromisso.tarefas
 * @param {string} cliente.compromisso.quantidadeTarefas
 * @param {string} cliente.compromisso.tipoCompromisso
 * @param {string} cliente.compromisso.descricao
 * @param {string} cliente.compromisso.semanas
 * @param {string} cliente.compromisso.publicacao
 * @param {string} cliente.compromisso.peritoOrReu
 * @param {string} cliente.compromisso.local
 * @param {string} cliente.compromisso.horario
 * @param {object} cliente.processo
 * @param {string} cliente.processo.id
 * @param {string} cliente.processo.origem
 * @param {string} cliente.processo.dependente
 * @param {string} cliente.processo.reu
 * @param {string} cliente.processo.responsavel
 * @param {string} cliente.processo.natureza
 * @param {string} cliente.processo.merito
 * @param {string} cliente.processo.cidade
 * @param {string} cliente.processo.estado
 * @param {string} cliente.processo.vara
 * @returns {string}
 */
function getDescricao (cliente) {
    const fistWordInTarefa = removeAcentuacaoString(cliente.compromisso.tarefas[0].split(" ")[0]),
        localText = getEndereço(cliente.compromisso.local),
        numero = existeOrigem(cliente),
        tipoTarefaNormalizado = removeAcentuacaoString(cliente.compromisso.tarefas[0]),
        tipoCompromissoNormalizado = removeAcentuacaoString(cliente.compromisso.tipoCompromisso)
    
    if (cliente.compromisso.descricao && removeAcentuacaoString(fistWordInTarefa) !== "ANALISE" && tipoTarefaNormalizado !== "ATO ORDINATORIO" && cliente.compromisso.tipoCompromisso !== "EMENDAR"  && !tipoCompromissoNormalizado.includes('DECISAO ANTECIPACAO PERICIA')) {

        return cliente.compromisso.descricao

    } else if (tipoCompromissoNormalizado.search('PERICIA') === 0 && cliente.compromisso.quantidadeTarefas === cliente.compromisso.tarefas.length) {
        if (state.functions.todasPaginas.tipoIntimacaoIsJudicial) {
            const perito = document.querySelector('#inputPerito')
    
            return `${numero} - ${cliente.compromisso.tipoCompromisso} DE ${cliente.nome} (${cliente.cpf}), NO DIA ${cliente.compromisso.prazoInterno} ÀS ${horarioInicial.value}, PERITO: ${perito ? perito.value : ''}, LOCAL: ${localText}`
        } else {
            const inputEndereco = document.querySelector('#inputEndereco')

            return `${numero} - ${cliente.compromisso.tipoCompromisso}: DATA E HORA: ${cliente.compromisso.prazoInterno} ÀS ${horarioInicial.value}, LOCAL: ${localText}, ENDEREÇO: ${inputEndereco ? inputEndereco.value : ''}. ORIENTAR A LEVAR O AGENDAMENTO, RELATÓRIOS MÉDICOS E DOCUMENTOS PERTINENTES A ATIVIDADE RURAL / PESCADO (CASO EXERÇA). CHEGAR COM 30 MINUTOS DE ANTECEDÊNCIA`
        }

    } else {

        if (fistWordInTarefa == "AUDIENCIA" && cliente.compromisso.quantidadeTarefas === cliente.compromisso.tarefas.length) {

            return `${numero} - ${cliente.compromisso.tipoCompromisso} DE ${cliente.nome} (${cliente.cpf}) X ${cliente.processo.reu.length > 0 ? cliente.processo.reu : ''}, NO DIA ${cliente.compromisso.prazoInterno} ÀS ${horarioInicial.value}, LOCAL: ${localText}`

        }
        else if (tipoTarefaNormalizado === "ATO ORDINATORIO" && tipoCompromissoNormalizado.includes('PERICIA')) {

            return `${numero} - ATO ORDINATÓRIO (PERÍCIA DESIGNADA)`

        } else if ((fistWordInTarefa === "ANALISE") && tipoCompromissoNormalizado.search('AUDIENCIA') === 0) {

            return `${numero} - VERIFICAR NECESSIDADE DE TESTEMUNHAS`

        } else if ((cliente.compromisso.tipoCompromisso === "EMENDAR") && (cliente.compromisso.tarefas[0] === "CONTATAR CLIENTE")) {

            return `${numero} - `

        } else if (tipoTarefaNormalizado.includes('ACOMPANHAR')  && tipoCompromissoNormalizado.includes('DECISAO ANTECIPACAO PERICIA')) {
            return `${numero} - ACOMPANHAR ANTECIPAÇÃO DA PERÍCIA ADMINISTRATIVA`
        } else {

            return `${numero} - ${cliente.compromisso.tipoCompromisso}`

        }
    }
}

async function validaResponsavelTj (cliente, processLength) {
    const digito = Number(cliente.processo.origem[processLength - 1]),
        financeiro = ["RPV TRF1 BRASILIA", "RPV TRF1 GOIAS", "RPV TRF5 ARACAJU", "RPV TRF5 ESTANCIA", "RPV TRF1 BAHIA", "RECEBIMENTO DE PRECATORIO"],
        tarefasAdm = ["CONTATAR CLIENTE","LEMBRAR CLIENTE"],
        sac = "SMS E WHATSAPP",
        liminarPericiaAdm = "ACOMPANHAR",
        natureza = cliente.processo.natureza,
        tipoCompromissoNormalizado = removeAcentuacaoString(cliente.compromisso.tipoCompromisso),
        tarefaAtualNormalizada = removeAcentuacaoString(cliente.compromisso.tarefas[0])

    if (tarefaAtualNormalizada.includes(liminarPericiaAdm)  && tarefaAtualNormalizada.includes("ADM")) {
        converterParaTarefaAvulsa()
        return {responsavel: 'LEANDRO SANTOS', executor: 'LEANDRO SANTOS'}
    }
    
    if (tarefaAtualNormalizada.includes("RECEBIMENTO DE ALVARA") && tarefaAtualNormalizada.includes("FINANCEIRO")) {
        converterParaTarefaAvulsa()
        return {responsavel: "VICTOR MENDES DOS SANTOS",executor: "VICTOR MENDES DOS SANTOS"}
    }

    if (financeiro.includes(tarefaAtualNormalizada.split("-")[0].trim()) && tarefaAtualNormalizada.includes("FINANCEIRO")) {
        //let ehMateusFinanceiro = await getFinanceiro()
        //setFinanceiro(!ehMateusFinanceiro)
        return {responsavel: "LUCIANA LIMA REZENDE",executor: "SHEYLA SANTANA SANTOS"} //ehMateusFinanceiro ? "MATEUS DOS SANTOS SILVA":"OVERLANDIA SANTOS MELO"
    }

    if (tarefasAdm.includes(tarefaAtualNormalizada)) {
        if (cliente.cliente.cidade === "ESTANCIA" && cliente.cliente.localAtendido === "ESTANCIA")
            return {responsavel: "SANDOVAL FILHO CORREIA LIMA FILHO",executor: "SANDOVAL FILHO CORREIA LIMA FILHO"}
        return {responsavel: "JULIANO OLIVEIRA DE SOUZA",executor: "JULIANO OLIVEIRA DE SOUZA"}
    }

    if (sac === tarefaAtualNormalizada)
        return {responsavel: "HENYR GOIS DOS SANTOS",executor: "LAYNE DA SILVA GOIS"}

    if (tipoCompromissoNormalizado === "MANIFESTACAO SOBRE CALCULOS" && tarefaAtualNormalizada.includes("ANALISE")) {
        return {responsavel: "GUILHERME JASMIM", executor: "GUILHERME JASMIM"}
    }

    if (natureza === "TRABALHISTA")
        return {responsavel: "FELIPE PANTA CARDOSO",executor: "FELIPE PANTA CARDOSO"}

    if (natureza === "PREVIDENCIÁRIA")
        return {responsavel: "KEVEN FARO DE CARVALHO",executor: "KEVEN FARO DE CARVALHO"}

    if (natureza === "BANCÁRIO" || natureza === "CÍVEL" || natureza === "CONSUMIDOR" || natureza === "SERVIDOR PÚBLICO") {
        const ala = [0,1,8]
        const gabriel = [2,3,4,6]
        if (tarefaAtualNormalizada !== "SESSÃO DE JULGAMENTO" && tarefaAtualNormalizada.search("AUDIENCIA") !== 0) {
            if (gabriel.includes(digito))
                return {responsavel: "RODRIGO AGUIAR SANTOS",executor: "GABRIEL DAVILA FILGUEIRAS MELLONE"}
            if (ala.includes(digito))
                return {responsavel: "RODRIGO AGUIAR SANTOS",executor: "ALÃ FEITOSA CARVALHO"}
        }
        return {responsavel: "RODRIGO AGUIAR SANTOS",executor: "RODRIGO AGUIAR SANTOS"}
    }
}

async function validaResponsavelFederal (cliente, processLength) {
    const tarefaAtualNormalizada = removeAcentuacaoString(cliente.compromisso.tarefas[0]),
        numeroProcesso = cliente.processo.origem,
        financeiro = ["RPV TRF1 BRASILIA", "RPV TRF1 GOIAS", "RPV TRF5 ARACAJU", "RPV TRF5 ESTANCIA", "RPV TRF1 BAHIA", "RECEBIMENTO DE PRECATORIO"],
        tarefasAdm = ["CONTATAR CLIENTE","LEMBRAR CLIENTE"],
        tarefaSac = "SMS E WHATSAPP",
        liminarPericiaAdm = "ACOMPANHAR",
        lengthSecao = 4,
        secao = numeroProcesso.slice(processLength - lengthSecao, processLength),
        secaoDFGO = ["3400","3501","3502","3506", "0015"],
        setimoDigito = Number(numeroProcesso[6]),
        digitoVerificador = numeroProcesso.slice(13,16),
        natureza = cliente.processo.natureza

    if (tarefaAtualNormalizada.includes(liminarPericiaAdm) && tarefaAtualNormalizada.includes("ADM")) {
        converterParaTarefaAvulsa()
        return {responsavel: 'LEANDRO SANTOS', executor: 'LEANDRO SANTOS'}
    }
    
    if (tarefaAtualNormalizada.includes("RECEBIMENTO DE ALVARA") && tarefaAtualNormalizada.includes("FINANCEIRO")) {
        converterParaTarefaAvulsa()
        return {responsavel: "VICTOR MENDES DOS SANTOS",executor: "VICTOR MENDES DOS SANTOS"}
    }

    if (financeiro.includes(tarefaAtualNormalizada.split("-")[0].trim()) && tarefaAtualNormalizada.includes("FINANCEIRO")) {
        //let ehMateusFinanceiro = await getFinanceiro()
        //setFinanceiro(!ehMateusFinanceiro)
        return {responsavel: "LUCIANA LIMA REZENDE",executor: "SHEYLA SANTANA SANTOS"} //ehMateusFinanceiro ? "MATEUS DOS SANTOS SILVA":"OVERLANDIA SANTOS MELO"
    }

    if (tarefasAdm.includes(tarefaAtualNormalizada)) {
        //Tarefa contatar para BSB
        if (cliente.processo.estado === "DF" || cliente.processo.estado === "GO") {
            return {responsavel: "HENYR GOIS DOS SANTOS", executor: "HENYR GOIS DOS SANTOS"}
        }

        //Tarefa contatar para escritório de Estância
        if(cliente.cliente.cidade === "ESTANCIA"  && cliente.cliente.localAtendido === "ESTANCIA") { 
            return {responsavel: "SANDOVAL FILHO CORREIA LIMA FILHO",executor: "SANDOVAL FILHO CORREIA LIMA FILHO"}
        }

        //Tarefa contatar para demais localidades
        return {responsavel: "JULIANO OLIVEIRA DE SOUZA",executor: "JULIANO OLIVEIRA DE SOUZA"}
    }

    if (tarefaSac === tarefaAtualNormalizada) { //Tarefas para o SAC
        return {responsavel: "HENYR GOIS DOS SANTOS",executor: "LAYNE DA SILVA GOIS"}
    }

    if ((digitoVerificador === "520" || natureza === "TRABALHISTA") || (natureza === "SERVIDOR PÚBLICO" && cliente.processo.responsavel === "VICTOR HUGO SOUSA ANDRADE")) {  //Processos Trabalhistas TRT20
        return {responsavel: "FELIPE PANTA CARDOSO",executor: "FELIPE PANTA CARDOSO"}
    }

    if (digitoVerificador === "401" || secaoDFGO.includes(secao)) { // Processos do TRF1
        const varasDF = ["23ª VARA FEDERAL BRASÍLIA", "24ª VARA FEDERAL DE BRASÍLIA", "25ª VARA FEDERAL DE BRASÍLIA", "26ª VARA FEDERAL DE BRASÍLIA", "27ª VARA FEDERAL DE BRASÍLIA", "23ª VARA FEDERAL", "24ª VARA FEDERAL", "25ª VARA FEDERAL", "26ª VARA FEDERAL", "27ª VARA FEDERAL", "BRASILIA", "1ª VARA FEDERAL CÍVEL SJGO", "TJ GOIÁS", "VARA FEDERAL DA SSJ LUZIÂNIA-GO", "VARA DE ÁGUAS LINDAS DE GOIÁS", "VARA FEDERAL DE RIO VERDE-GO", "VARA FEDERAL SJDF"]
        
        if ((cliente.processo.estado === "DF" || cliente.processo.estado === "GO")) {
            if (!varasDF.includes(cliente.processo.vara)) {
                alert('Atenção: Confirme o responsável e executor da tarefa!')
            }
            let bruno = [0,1,2]
            if (bruno.includes(setimoDigito) || tarefaAtualNormalizada.search("AUDIENCIA") === 0)
                return {responsavel: "BRUNO PRADO GUIMARAES",executor: "BRUNO PRADO GUIMARAES"}
            return {responsavel: "BRUNO PRADO GUIMARAES",executor: "PAULO VICTOR SANTANA TEIXEIRA"}
        }
        
        if (cliente.processo.estado === "BA") {
            return {responsavel: "LAIS PEREIRA MORAES",executor: "LAIS PEREIRA MORAES"}
        }

        return {responsavel: "DIEGO MELO SOBRINHO",executor: "DIEGO MELO SOBRINHO"}
    }

    if (natureza === "PREVIDENCIÁRIA") {
        if (digitoVerificador === "403") { //Processos do TRF3
            return {responsavel: "DIEGO MELO SOBRINHO",executor: "DIEGO MELO SOBRINHO"}
        }

        if (digitoVerificador === "405" && numeroProcesso.search('080') === 0) { //Processos do TRF5
            if (cliente.processo.merito === "MANDADO DE SEGURANÇA") {
                if (setimoDigito <= 4) {
                    return {responsavel: "DIEGO MELO SOBRINHO",executor: "DIEGO MELO SOBRINHO"}
                }

                return {responsavel: "DIEGO MELO SOBRINHO",executor: "ITALO DE ANDRADE BEZERRA"}
            }

            return {responsavel: "DIEGO MELO SOBRINHO",executor: "DIEGO MELO SOBRINHO"}
        }

        else {
            if (secao === "8500") { //Processos da seção de Aracaju
                if (setimoDigito < 3) {
                    return {responsavel: "KEVEN FARO DE CARVALHO",executor: "KEVEN FARO DE CARVALHO"}
                }

                /* const responsavel = function responsavel () {
                    // Verifica se há um valor armazenado no localStorage para o índice atual
                    if (!localStorage.getItem('currentIndex')) {
                        localStorage.setItem('currentIndex', '0')
                    }
    
                    // Array com os elementos que serão alternados
                    const elementos = ["KEVEN FARO DE CARVALHO", "FERNANDO HENRIQUE BARBOZA NASCIMENTO", "ITALO DE ANDRADE BEZERRA"]
    
                    // Obtém o índice atual do localStorage e converte para número
                    let currentIndex = parseInt(localStorage.getItem('currentIndex'))
    
                    // Obtém o elemento atual do array com base no índice atual
                    const elementoAtual = elementos[currentIndex]
    
                    // Incrementa o índice atual para apontar para o próximo elemento
                    currentIndex = (currentIndex + 1) % elementos.length
    
                    // Armazena o novo índice atual no localStorage
                    localStorage.setItem('currentIndex', currentIndex.toString());
    
                    return elementoAtual
    
                } */

                //const advogado = responsavel()
                
                // Retorna o elemento atual
                //return {responsavel: advogado,executor: advogado}

                return {responsavel: "MARCUS VINICIUS DE SOUZA MORAIS",executor: "MARCUS VINICIUS DE SOUZA MORAIS"}
            }
            if (secao === "8501") //Processos da seção de Itabaiana
                return {responsavel: "LAIS PEREIRA MORAES",executor: "LAIS PEREIRA MORAES"}
            if (secao === "8502") { //Processos da seção de Estância
                if (setimoDigito < 3)
                    return {responsavel: "KEVEN FARO DE CARVALHO",executor: "KEVEN FARO DE CARVALHO"}
                return {responsavel: "SARA GONÇALVES PINHEIRO",executor: "SARA GONÇALVES PINHEIRO"}
            }
            if (secao === "8503") //Processos da seção de Lagarto
                return {responsavel: "SARA GONÇALVES PINHEIRO",executor: "SARA GONÇALVES PINHEIRO"}
            if (secao === "8504")//Processos da seção de Propriá
                return {responsavel: "LAIS PEREIRA MORAES",executor: "LAIS PEREIRA MORAES"}
            //return {responsavel: "DIEGO MELO SOBRINHO",executor: "DIEGO MELO SOBRINHO"}
                
        }
    }
    
    if (natureza === "CÍVEL" || natureza === "CONSUMIDOR" || natureza === "SERVIDOR PÚBLICO" || natureza === "BANCÁRIO") { //Processos de natureza cível
        if (cliente.processo.estado === "DF" || cliente.processo.estado === "GO") {
            return {responsavel: "BRUNO PRADO GUIMARAES",executor: "BRUNO PRADO GUIMARAES"}
        }
        return {responsavel: "RODRIGO AGUIAR SANTOS",executor: "RODRIGO AGUIAR SANTOS"}
    }
}

async function getTarefasColaboradores(colaborador, data) {
    let contador = 0

    const dateString = data.toLocaleDateString()

    const response = await getTarefa({ bsAdvTarefasDe: dateString, bsAdvTarefasAte: dateString, bsAdvTarefasExecutor: colaborador.id })

    const htmlString = response.text()
    
    const dom = new JSDOM(htmlString)

    const tarefas = dom.window.document.querySelectorAll('body > section > section > div.fdt-espaco > div > div.fdt-pg-conteudo > div.table-responsive > table > tbody > tr')
    
    tarefas.forEach(e => {
        if (e.children[2] != null) {
            const lengthProcessTJ = 12
            if ((e.children[2].innerText.match("[0-9]*")[0].length >= lengthProcessTJ) && !(e.children[3].innerText.search('Acompanhar') == 0)) {
                contador++
            }
        }
    })

    colaborador.tarefas = contador

    return colaborador
}

async function validaEsferaProcesso() {
    const caracteresProcesso = cliente.processo.origem.length
    const lengthCharProcessTJ = 12
    const lengthCharProcessFederalProtocol = 15
    const lengthCharProcessFederalEcint = 17
    const lengthCharProcessAllFederal = 20

    if (caracteresProcesso === lengthCharProcessTJ) {
        return true
    }
    
    if (caracteresProcesso === lengthCharProcessFederalProtocol || caracteresProcesso === lengthCharProcessFederalEcint || caracteresProcesso === lengthCharProcessAllFederal) {
        return false
    }

    throw new Error("Erro no cadastro do número do processo")
}

function filterColaboradoresJudicial () {
    const colaboradores = []

    //Última atualização: 24/05/2024
    // Padrão para data das viagens: ['DD/MM']
    const parceiros = ['ELIZEU ( PARCEIRO)','MARIA DO POV. PREGUIÇA','AGENOR (PARCEIRO)','ELIZANGELA ( PARCEIRA)','ERMINIO','AUGUSTO ( PARCEIRO)'],
        varaEstancia = ['7ª VARA FEDERAL', '1ª VARA CIVEL DE ESTÂNCIA', '2ª VARA CIVEL DE ESTÂNCIA', 'JUIZADO ESPECIAL CÍVEL E CRIMINAL DE ESTÂNCIA', 'VARA DE ESTÂNCIA', 'VARA DO TRABALHO DE ESTÂNCIA'],
        estancia = [
            {
                id: 22,
                nome: "SANDOVAL FILHO CORREIA LIMA FILHO",
                interiores: [],
                datasViagem: [],
                tarefas: 0
            }
        ],
        aracaju = [
            {
                id: 196,
                nome: "KAUÃ DE CARVALHO NASCIMENTO",
                interiores: [],
                datasViagem: [],
                tarefas: 0
            },
            {
                id: 199,
                nome: "LUCAS NATHAN NOGUEIRA DA SILVA ",
                interiores: ["ESTANCIA", "TOBIAS BARRETO", "PEDRINHAS"],
                datasViagem: [],
                tarefas: 0
            }, //[],
            /* {
                id: 225,
                nome: "ERINALDO FARO SANTOS",
                interiores: [],
                datasViagem: [],
                tarefas: 0
            }, */
            {
                id: 188,
                nome: "VINICIUS SOUSA BOMFIM",
                interiores: ["UMBAUBA", "CARMOPOLIS", "LOTEAMENTO JEOVA (BOTAFOGO)"],
                datasViagem: [],
                tarefas: 0
            },
            {
                id: 94,
                nome: "CARLOS HENRIQUE ESPASIANI",
                interiores: ["CAPELA", "JAPARATUBA", "CONDE/BA", "ALAGOINHAS"],
                datasViagem: [],
                tarefas: 0
            },
            {
                id: 131,
                nome: "ASLEY RODRIGO DE MELO LIMA",
                interiores: [],
                datasViagem: [],
                tarefas: 0
            },
            {
                id: 161,
                nome: "YURI DIAS PEREIRA",
                interiores: [],
                datasViagem: [],
                tarefas: 0
            },
        ],
        brasilia = [
            {
                id: 215,
                nome: "JÚLIA ROBERTA DE FÁTIMA SOUSA ARAÚJO",
                interiores: [],
                datasViagem: [],
                tarefas: 0
            },
            {
                id: 223,
                nome: "MATHEUS CAMPELO DA SILVA",
                interiores: [],
                datasViagem: [],
                tarefas: 0
            },
            {
                id: 80,
                nome: "PATRICIA ANDRE SIMÃO DE SOUZA",
                interiores: [],
                datasViagem: [],
                tarefas: 0
            },
            {
                id: 222,
                nome: "STEFANNY MORAIS DO NASCIMENTO",
                interiores: [],
                datasViagem: [],
                tarefas: 0
            },
        ]

    if (cliente.processo.estado === 'GO' || cliente.processo.estado === 'DF') {
        colaboradores.push(...brasilia)
    } else if (((cliente.cliente.cidade == "ESTANCIA" && cliente.cliente.localAtendido == "ESTANCIA")) || ((parceiros.includes(cliente.cliente.parceiro)) && varaEstancia.includes(cliente.processo.vara))) {
        colaboradores.push(...estancia)
    } else {
        if (varaEstancia.includes(cliente.processo.vara)) {
            alert("Verificar executor manualmente!")
            colaboradores.push(...aracaju)
            colaboradores.push(...estancia)
        } else {
            colaboradores.push(...aracaju)
        }
    }

    return colaboradores
}

function filterColaboradoresCalculo () {
    const calculo = [
        {
            id: 180,
            nome: "ANSELMO DAVID DOS SANTOS RODRIGUES",
            interiores: [],
            datasViagem: [],
            tarefas: 0
        },
        {
            id: 100,
            nome: "GUILHERME JASMIM",
            interiores: [],
            datasViagem: [],
            tarefas: 0
        },
        {
            id: 147,
            nome: "WILKE RODRIGUES DE JESUS",
            interiores: [],
            datasViagem: [],
            tarefas: 0
        },
    ]
    
    return calculo
}

async function selectExecutorContatarJudicial (colaboradores) {
    const adm = await Promise.all(await colaboradores)
    let responsavel = 'JULIANO OLIVEIRA DE SOUZA'

    const responsavelInterior = adm.reduce((previous, currrent) => {
        if (currrent.interiores.includes(removeAcentuacaoString(cliente.cliente.localAtendido))) {
            return currrent
        }
        return previous
    }, null)

    if (responsavelInterior) {
        return {responsavel, executor: responsavelInterior.nome}
    }

    const executor = adm.reduce((previous, currrent) => {
        if (previous.tarefas > currrent.tarefas) {
            return currrent
        }
        return previous
    }, adm[0])

    if (executor.nome.includes("SANDOVAL"))
        responsavel =  'SANDOVAL FILHO CORREIA LIMA FILHO'
    else if (cliente.processo.estado === 'GO' || cliente.processo.estado === 'DF') {
        responsavel = 'HENYR GOIS DOS SANTOS'
    }

    return { responsavel, executor: executor.nome }
}

async function selectExecutorCalculo (colaboradores) {
    const colaboradoresCalculo = await Promise.all(await colaboradores)

    const executor = colaboradoresCalculo.reduce((previous, currrent) => {
        if (previous.tarefas > currrent.tarefas) {
            return currrent
        }
        return previous
    }, colaboradoresCalculo[0])

    return {responsavel: 'GUILHERME JASMIM', executor: executor.nome}
}

async function selectExecutorContatar(colaboradores) {
    const isTaskCalculo = removeAcentuacaoString(cliente.compromisso.tipoCompromisso).includes("CALCULO") && removeAcentuacaoString(cliente.compromisso.tarefas[0]).includes("CALCULO")

    if (isTaskCalculo) {
        return await selectExecutorCalculo(colaboradores)
    }
    
    return await selectExecutorContatarJudicial(colaboradores)
}

async function requererTarefasContatar(data) {

    const isTaskCalculo = removeAcentuacaoString(cliente.compromisso.tipoCompromisso).includes("CALCULO") && removeAcentuacaoString(cliente.compromisso.tarefas[0]).includes("CALCULO")

    const colaboradores = isTaskCalculo ? filterColaboradoresCalculo() : filterColaboradoresJudicial()

    return colaboradores.map(async colaborador => {
        return await getTarefasColaboradores(colaborador, data)
    })
}

async function validaExecutorContatarOrCalculo (data) {

    const colaboradores = await requererTarefasContatar(data)
    
    const responsavelExecutorContatarOrCalculo = await selectExecutorContatar(colaboradores)

    return responsavelExecutorContatarOrCalculo
}

/**
 * 
 * @param {string} task 
 * @param {object} cliente 
 * @returns {object} Um objeto que contém o nome do responsável e executor da tarefa
 * @returns {string} returns.responsavel
 * @returns {string} returns.executor
 */
async function getResponsavelExecutor(task, cliente) {

    const isTaskCalculo = removeAcentuacaoString(cliente.compromisso.tipoCompromisso).includes("CALCULO") && removeAcentuacaoString(cliente.compromisso.tarefas[0]).includes("CALCULO")
    const isTaskContatar = task == "CONTATAR CLIENTE"
    const isTaskLembrar = task == "LEMBRAR CLIENTE"
    const isTaskWhatsapp = task == "SMS E WHATSAPP"
    const isDFOrGO = cliente.processo.estado === "DF" || cliente.processo.estado === "GO"

    if ((isTaskContatar || isTaskLembrar) || (isDFOrGO && (isTaskContatar || isTaskLembrar)) || isTaskCalculo) {
        const responsavelExecutorContatarOrCalculo = validaExecutorContatarOrCalculo(data) //TODO: Implementar algum jeito de obter um objeto Date referente a data de execução da tarefa
        return responsavelExecutorContatarOrCalculo
    }

    const isEstadualProcess = await validaEsferaProcesso()

    const responsavelExecutorFederal = isEstadualProcess ? await validaResponsavelTj(cliente, cliente.processo.origem.length) : await validaResponsavelFederal(cliente, cliente.processo.origem.length)

    return responsavelExecutorFederal
}

/** 
 * Normaliza o tipo de compromisso para o tipo de tarefa
 * 
 * @param {string} descriptionCompromisso
 * @returns {string} descriptionCompromisso normalizado
*/
function validaTipoCompromisso(descriptionCompromisso) {
    const { cidade, estado } = cliente.processo
    const descriptionCompromissoNormalizado = removeAcentuacaoString(descriptionCompromisso)
    const pauta = ["PAUTA", "RETIRADO DE PAUTA"]
    const emendar = ["DADOS PERICIA SOCIAL", "DADOS COMPLEMENTARES", "EMENDA", "EMENDA A INICIAL", "EMENDAR A INICIAL", "EMENDAR"]
    const pedidoVistas = ["PEDIDO DE VISTAS", "PEDIDO DE VISTA"]

    if (descriptionCompromissoNormalizado === "RPV") {
        if (cidade === "ESTANCIA")
            return "RPV TRF5 ESTÂNCIA"
        if (estado === "DF")
            return "RPV TRF1 BRASÌLIA"
        if (estado === "GO")
            return "RPV TRF1 GOIÁS"
        if (estado === "BA")
            return "RPV TRF1 BAHIA"
        return "RPV TRF5 ARACAJU"
    }
    
    if (pauta.includes(descriptionCompromissoNormalizado))
        return "SESSÃO DE JULGAMENTO"

    if (descriptionCompromissoNormalizado === "ALVARA")
        return "RECEBIMENTO DE ALVARÁ"

    if (descriptionCompromissoNormalizado === "PRECATORIO")
        return "RECEBIMENTO DE PRECATÓRIO"
    
    if (descriptionCompromissoNormalizado === "AUDIENCIA DE CONCILIACAO")
        return "AUDIÊNCIA CONCILIATÓRIA"
    
    if (descriptionCompromissoNormalizado === "AUDIENCIA INICIAL")
        return "AUDIÊNCIA INAUGURAL"
    
    if (descriptionCompromissoNormalizado === "PLANILHA")
        return "CÁLCULOS"
    
    if (emendar.includes(descriptionCompromissoNormalizado))
        return "EMENDAR"
    
    if (pedidoVistas.includes(descriptionCompromissoNormalizado))
        return "MANIFESTAÇÃO"

    return descriptionCompromisso
}

/**
 * 
 * @param {string} tarefa - Uma string que representa a descrição da tarefa atual
 * @returns {number} retorna um número que representa um parametro para o cálculo de prazos
 */
function getParametroData (tarefa) {
    const arrayAudiencias = ["AUDIÊNCIA DE INSTRUÇÃO E JULGAMENTO", "AUDIÊNCIA UNA", "AUDIÊNCIA DE INSTRUÇÃO", "AUDIÊNCIA INICIAL", "AUDIÊNCIA INAUGURAL"]
    const ehTarefaParaAdmOuSac = ((tarefa == "CONTATAR CLIENTE") || (tarefa == "LEMBRAR CLIENTE") || (tarefa == "SMS E WHATSAPP"))
    const ehAudiencia = (arrayAudiencias.includes(tipoCompromisso))

    return (ehTarefaParaAdmOuSac || ehAudiencia) ? parametros.tarefaContatar : parametros.tarefaAdvogado
}

/* 
Criação de tarefa:

Request URL:
http://fabioribeiro.eastus.cloudapp.azure.com/adv/tarefas/formularioScript.asp

Request Method:
POST

Form Data:
idPK: 
idCO: 240134
idPR: 37653
idCL: 
org: 
superior: 
idResponsavelAvisado: 
agendada: n
acaoColetiva: False
idTipoTarefa: 101
pautaIdUsuarioResp: 
dataParaFinalizacaoAgendada: 
onde: 
horarioInicial: 
horarioFinal: 
dataParaFinalizacao: 03/09/2024
descricao: 202311301030 - ATO ORDINATÓRIO
idResponsavel: 55
idExecutor: 166
lembreteQuandoFinalizarPara: 


Audiência >
idPK: 
idCO: 240310
idPR: 23
idCL: 
org: 
superior: 
idResponsavelAvisado: 
agendada: s
acaoColetiva: False
idTipoTarefa: 27
pautaIdUsuarioResp: 
dataParaFinalizacaoAgendada: 27/09/2024
onde: VIDEOCONFERÊNCIA
horarioInicial: 10:00
horarioFinal: 12:00
dataParaFinalizacao: 
descricao: 201650001339 - AUDIÊNCIA DE INSTRUÇÃO E JULGAMENTO DE MARIA EUGENIA D ASSUMPÇÃO SOUSA (236.419.085-15) X FERNANDO JOSÉ CHAGAS JÚNIOR E OUTRO, NO DIA 27/09/2024 ÀS 10:00, LOCAL: VIDEOCONFERÊNCIA
idResponsavel: 55
idExecutor: 55
lembreteQuandoFinalizarPara: 
incluirOutra: s
*/

/**
 * 
 * Cria um objeto com os dados para criação de tarefas.
 * 
 * @param {object} param0
 * @param {Cliente} param0.cliente
 * @param {object[]} param0.colaboradores
 * @param {string} param0.colaboradores[].id
 * @param {string} param0.colaboradores[].nome
 * @returns {object[]} Um objeto que representa o body para requisição POST para criação de tarefas
 * @returns {string} returns[].idCO - ID do compromisso
 * @returns {string} returns[].idPR - ID do processo
 * @returns {string} returns[].agendada - Flag para tarefas agendadas (audiências)
 * @returns {string} returns[].acaoColetiva - Flag para ações coletivas
 * @returns {string} returns[].idTipoTarefa - ID do tipo de tarefa
 * @returns {string} returns[].dataParaFinalizacaoAgendada - Data da tarefa de audiência
 * @returns {string} returns[].onde - Local da audiência
 * @returns {string} returns[].horarioInicial - Horário da audiência
 * @returns {string} returns[].horarioFinal - Horário previsto do término de audiência (acrescer 2 horas ao horário inicial)
 * @returns {string} returns[].dataParaFinalizacao - Data da tarefa
 * @returns {string} returns[].descricao - Descrição da tarefa ${número} - ${teor da intimação}
 * @returns {string} returns[].idResponsavel - ID do responsável da tarefa
 * @returns {string} returns[].idExecutor - ID do executor da tarefa
 */
function createBodyForCreateTask({ cliente, colaboradores, tiposTarefas }) {

    const parametro = getParametroData(cliente.compromisso.tarefas[0])

    const dataTarefa = calcularDataTarefa(parametro, cliente)

    const descricaoTarefa = getDescricao(cliente) //TODO: Pensar em um jeito de adicionar os parametros para essa função

    const { responsavel, executor } = getResponsavelExecutor(task, cliente)

    const { id: idExecutor } = colaboradores.filter(({ nome }) => nome.toUpperCase().trim() === executor)
    const { id: idResponsavel } = colaboradores.filter(({ nome }) => nome.toUpperCase().trim() === responsavel)

    //submitAtualizarTarefa()

    /* if (cliente.compromisso.tarefas.length === 1) {
        desmarcarCaixaTarefaSequencia()
    } */

    //selectTipoIntimacao()
}

/**
 * 
 * @param {object} param0 - Objeto que contém os dados para criação da tarefa
 * @param {string} param0.publication_date - Data de publicação da intimação
 * @param {string} param0.case_number - Número do processo de origem
 * @param {string} param0.related_case_number - Número dependente do processo de origem
 * @param {string} param0.description - Descrição da intimação
 * @param {string} param0.internal_deadline - Prazo interno
 * @param {string} param0.fatal_deadline - Prazo fatal
 * @param {string} param0.time - Horário do evento da intimação
 * @param {string} param0.expert_or_defendant - Nome do réu ou perito
 * @param {string} param0.local_adress - Local para perícia ou audiência
 */
async function createTaskService({ cliente, cookie }) {

    const { colaboradores, tiposTarefas } = getSelectsTask(cookie)
    
    const bodys = createBodyForCreateTask({ cliente, colaboradores, tiposTarefas })

    const responses = await Promise.all(bodys.map(body => createTarefa({ body, cookie })))

    return responses
}

module.exports = { createTaskService }