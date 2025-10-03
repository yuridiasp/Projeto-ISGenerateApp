import { Cliente } from "@models/clientes/Cliente"
import { removeAcentuacaoString } from "@utils/textFormatting/textFormatting"
import { validaResponsavelDTO } from "@services/tarefas"

export function validaResponsavelFederal (tarefa: string, cliente: Cliente, processLength: number) {
    const PROCESS_DIGIT_INDEX = 6
    const PROCESS_SLICE_START = 13
    const PROCESS_SLICE_END = 16

    const tarefaAtualNormalizada = removeAcentuacaoString(tarefa),
        numeroProcesso = cliente.processo.origem,
        varasDF = ["23ª VARA FEDERAL BRASÍLIA", "24ª VARA FEDERAL DE BRASÍLIA", "25ª VARA FEDERAL DE BRASÍLIA", "26ª VARA FEDERAL DE BRASÍLIA", "27ª VARA FEDERAL DE BRASÍLIA", "23ª VARA FEDERAL", "24ª VARA FEDERAL", "25ª VARA FEDERAL", "26ª VARA FEDERAL", "27ª VARA FEDERAL", "BRASILIA", "1ª VARA FEDERAL CÍVEL SJGO", "TJ GOIÁS", "VARA FEDERAL DA SSJ LUZIÂNIA-GO", "VARA DE ÁGUAS LINDAS DE GOIÁS", "VARA FEDERAL DE RIO VERDE-GO", "VARA FEDERAL SJDF"],
        financeiro = ["RPV TRF1 BRASILIA", "RPV TRF1 GOIAS", "RPV TRF5 ARACAJU", "RPV TRF5 ESTANCIA", "RPV TRF1 BAHIA", "RECEBIMENTO DE PRECATORIO"],
        tarefasAdm = ["CONTATAR CLIENTE","LEMBRAR CLIENTE"],
        tarefaSac = "SMS E WHATSAPP",
        liminarPericiaAdm = "ACOMPANHAR",
        lengthSecao = 4,
        secao = numeroProcesso.slice(processLength - lengthSecao, processLength),
        secaoDFGO = ["3400","3501","3502","3506", "0015"],
        setimoDigito = Number(numeroProcesso[PROCESS_DIGIT_INDEX]),
        digitoVerificador = numeroProcesso.slice(PROCESS_SLICE_START, PROCESS_SLICE_END),
        natureza = cliente.processo.natureza

    if (tarefaAtualNormalizada.includes(liminarPericiaAdm) && tarefaAtualNormalizada.includes("ADM")) {
        return {responsavel: 'LEANDRO SANTOS', executor: 'LEANDRO SANTOS'}
    }
    
    if (tarefaAtualNormalizada.includes("RECEBIMENTO DE ALVARA") && tarefaAtualNormalizada.includes("FINANCEIRO")) {
        return {responsavel: "VICTOR MENDES DOS SANTOS",executor: "VICTOR MENDES DOS SANTOS"}
    }

    if (financeiro.includes(tarefaAtualNormalizada.split("-")[0].trim()) && tarefaAtualNormalizada.includes("FINANCEIRO")) {
        //let ehMateusFinanceiro = await getFinanceiro()
        //setFinanceiro(!ehMateusFinanceiro)
        return {responsavel: "LUCIANA LIMA REZENDE",executor: "LUCIANA LIMA REZENDE"} //ehMateusFinanceiro ? "MATEUS DOS SANTOS SILVA":"OVERLANDIA SANTOS MELO"
    }

    if (tarefasAdm.includes(tarefaAtualNormalizada)) {
        //Tarefa contatar para BSB
        if (cliente.processo.estado === "DF" || cliente.processo.estado === "GO") {
            return {responsavel: "FLAVIO LUCAS LIMA SOUZA", executor: "FLAVIO LUCAS LIMA SOUZA"}
        }

        //Tarefa contatar para escritório de Estância
        if(cliente.cidade === "ESTANCIA"  || cliente.localAtendido === "ESTANCIA") { 
            return {responsavel: "SANDOVAL FILHO CORREIA LIMA FILHO",executor: "SANDOVAL FILHO CORREIA LIMA FILHO"}
        }

        //Tarefa contatar para demais localidades
        return {responsavel: "JULIANO OLIVEIRA DE SOUZA",executor: "JULIANO OLIVEIRA DE SOUZA"}
    }

    if (tarefaSac === tarefaAtualNormalizada) { //Tarefas para o SAC
        if (cliente.processo.estado === "DF" || cliente.processo.estado === "GO") {
            return {responsavel: "FLAVIO LUCAS LIMA SOUZA",executor: "TRICYA MATEUS ROLEMBERG"}
        }
        return {responsavel: "FLAVIO LUCAS LIMA SOUZA",executor: "FLAVIO LUCAS LIMA SOUZA"}
    }

    if ((digitoVerificador === "520" || natureza === "TRABALHISTA") || (natureza === "SERVIDOR PÚBLICO" && cliente.processo.responsavel === "VICTOR HUGO SOUSA ANDRADE")) {  //Processos Trabalhistas TRT20
        return {responsavel: "FELIPE PANTA CARDOSO",executor: "FELIPE PANTA CARDOSO"}
    }

    if (digitoVerificador === "401" || digitoVerificador === "807" || secaoDFGO.includes(secao)) { // Processos do TRF1
        const varasDF = [
            "1ª VARA FEDERAL CÍVEL SJGO",
            "1ª VARA FEDERAL DE ANÁPOLIS",
            "2ª VARA FEDERAL DE ANÁPOLIS",
            "20ª VARA FEDERAL DA SJDF",
            "21º VARA FEDERAL",
            "23ª VARA FEDERAL",
            "23ª VARA FEDERAL BRASÍLIA",
            "24ª VARA FEDERAL",
            "24ª VARA FEDERAL DE BRASÍLIA",
            "25ª VARA FEDERAL",
            "25ª VARA FEDERAL DE BRASÍLIA",
            "26ª VARA FEDERAL",
            "26ª VARA FEDERAL DE BRASÍLIA",
            "27ª VARA FEDERAL",
            "27ª VARA FEDERAL DE BRASÍLIA",
            "BRASILIA",
            "JUIZADO ESPECIAL FEDERAL DE ANÁPOLIS",
            "VARA DE AÇÕES PREVIDENCIÁRIAS DO DF",
            "VARA DE ÁGUAS LINDAS DE GOIÁS",
            "VARA FEDERAL DA SSJ LUZIÂNIA-GO",
            "VARA FEDERAL DE RIO VERDE-GO",
            "VARA FEDERAL SJDF",
            "TJ GOIÁS",
        ]
        
        if ((cliente.processo.estado === "DF" || cliente.processo.estado === "GO")) {
            if (!varasDF.includes(cliente.processo.vara)) {
                alert('Atenção: Confirme o responsável e executor da tarefa!')
            }
            let bruno = [0,1,2]
            if (bruno.includes(setimoDigito) || tarefaAtualNormalizada.search("AUDIENCIA") === 0)
                return {responsavel: "BRUNO PRADO GUIMARAES",executor: "BRUNO PRADO GUIMARAES"}
            return {responsavel: "BRUNO PRADO GUIMARAES",executor: "PAULO VICTOR SANTANA TEIXEIRA"}
        }

        if ((cliente.processo.estado === "BA")) {
            return {responsavel: "ANA CAROLINA SOARES DE MELO",executor: "ANA CAROLINA SOARES DE MELO"}
        }
        
       /*  if (cliente.processo.estado === "BA") {
            return {responsavel: "ANA CAROLINA SOARES DE MELO",executor: "ANA CAROLINA SOARES DE MELO"}
        }

        if (setimoDigito === 0 || setimoDigito === 1)
            return {responsavel: "MARCUS VINICIUS DE SOUZA MORAIS",executor: "MARCUS VINICIUS DE SOUZA MORAIS"}

        if (setimoDigito === 2 || setimoDigito === 3 || setimoDigito === 4)
            return {responsavel: "SARA GONÇALVES PINHEIRO",executor: "SARA GONÇALVES PINHEIRO"}

        if (setimoDigito === 5 || setimoDigito === 6 || setimoDigito === 7)
            return {responsavel: "ANA CAROLINA SOARES DE MELO",executor: "ANA CAROLINA SOARES DE MELO"}

        if (setimoDigito === 8 || setimoDigito === 9)
            return {responsavel: "KEVEN FARO DE CARVALHO",executor: "KEVEN FARO DE CARVALHO"} */
    }

    if (natureza === "PREVIDENCIÁRIA") {
        if (digitoVerificador === "403") { //Processos do TRF3
            /* if (setimoDigito === 0 || setimoDigito === 1)
                return {responsavel: "MARCUS VINICIUS DE SOUZA MORAIS",executor: "MARCUS VINICIUS DE SOUZA MORAIS"}

            if (setimoDigito === 2 || setimoDigito === 3 || setimoDigito === 4)
                return {responsavel: "SARA GONÇALVES PINHEIRO",executor: "SARA GONÇALVES PINHEIRO"}

            if (setimoDigito === 5 || setimoDigito === 6 || setimoDigito === 7)
                return {responsavel: "ANA CAROLINA SOARES DE MELO",executor: "ANA CAROLINA SOARES DE MELO"}

            if (setimoDigito === 8 || setimoDigito === 9)
                return {responsavel: "KEVEN FARO DE CARVALHO",executor: "KEVEN FARO DE CARVALHO"} */

            return {responsavel: "DIEGO MELO SOBRINHO",executor: "DIEGO MELO SOBRINHO"}
        }

        if ((digitoVerificador === "405" && numeroProcesso.search('080') === 0) || (digitoVerificador === "405" && cliente.processo.merito === "MANDADO DE SEGURANÇA")) { //Processos do TRF5
            /* if (setimoDigito === 0 || setimoDigito === 1)
                return {responsavel: "MARCUS VINICIUS DE SOUZA MORAIS",executor: "MARCUS VINICIUS DE SOUZA MORAIS"}

            if (setimoDigito === 2 || setimoDigito === 3 || setimoDigito === 4)
                return {responsavel: "SARA GONÇALVES PINHEIRO",executor: "SARA GONÇALVES PINHEIRO"}

            if (setimoDigito === 5 || setimoDigito === 6 || setimoDigito === 7)
                return {responsavel: "ANA CAROLINA SOARES DE MELO",executor: "ANA CAROLINA SOARES DE MELO"}

            if (setimoDigito === 8 || setimoDigito === 9)
                return {responsavel: "KEVEN FARO DE CARVALHO",executor: "KEVEN FARO DE CARVALHO"} */

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
                return {responsavel: "ANA CAROLINA SOARES DE MELO",executor: "ANA CAROLINA SOARES DE MELO"}
            const hoje = new Date()
            if (secao === "8502") { //Processos da seção de Estância
                if (setimoDigito < 3)
                    return {responsavel: "KEVEN FARO DE CARVALHO",executor: "KEVEN FARO DE CARVALHO"}
                return {responsavel: "SARA GONÇALVES PINHEIRO",executor: "SARA GONÇALVES PINHEIRO"}
            }
            if (secao === "8503") //Processos da seção de Lagarto
                return {responsavel: "SARA GONÇALVES PINHEIRO",executor: "SARA GONÇALVES PINHEIRO"}
            if (secao === "8504")//Processos da seção de Propriá
                return {responsavel: "ANA CAROLINA SOARES DE MELO",executor: "ANA CAROLINA SOARES DE MELO"}
            return {responsavel: "DIEGO MELO SOBRINHO",executor: "DIEGO MELO SOBRINHO"}
                
        }
    }
    
    if (natureza === "CÍVEL" || natureza === "CONSUMIDOR" || natureza === "SERVIDOR PÚBLICO" || natureza === "BANCÁRIO") { //Processos de natureza cível
        if (cliente.processo.estado === "DF" || cliente.processo.estado === "GO") {
            return {responsavel: "BRUNO PRADO GUIMARAES",executor: "BRUNO PRADO GUIMARAES"}
        }
        return {responsavel: "RODRIGO AGUIAR SANTOS",executor: "RODRIGO AGUIAR SANTOS"}
    }
}