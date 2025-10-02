import { Cliente } from "@models/clientes"
import { getEndereço } from "@utils/locais/audiencias"
import { removeAcentuacaoString } from "@utils/textFormatting/textFormatting"
import { existeOrigem } from "@services/tarefas"

export interface getDescricaoMockDTO {
    fistWordInTarefa: string,
    localText?: string,
    numero: string,
    tipoTarefaNormalizado: string,
    tipoCompromissoNormalizado: string
}

export function getDescricao (tarefa: string, cliente: Cliente, tarefas: string[]) {
    const fistWordInTarefa = removeAcentuacaoString(tarefa.split(" ")[0]),
        localText = getEndereço(cliente.compromisso.local),
        numero = existeOrigem(cliente),
        tipoTarefaNormalizado = removeAcentuacaoString(tarefa),
        tipoCompromissoNormalizado = removeAcentuacaoString(cliente.compromisso.tipoCompromisso)
    
    if (cliente.compromisso.descricao && fistWordInTarefa !== "ANALISE" && tipoTarefaNormalizado !== "ATO ORDINATORIO" && cliente.compromisso.tipoCompromisso !== "EMENDAR"  && !tipoCompromissoNormalizado.includes('DECISAO ANTECIPACAO PERICIA')) {

        return cliente.compromisso.descricao

    } else if (tipoCompromissoNormalizado.search('PERICIA') === 0 && cliente.compromisso.quantidadeTarefas === tarefas.length) {
        return `${numero} - ${cliente.compromisso.tipoCompromisso} DE ${cliente.nome} (${cliente.cpf}), NO DIA ${cliente.compromisso.prazoInterno} ÀS ${cliente.compromisso.horario}, PERITO: ${cliente.compromisso.peritoOrReu}, LOCAL: ${localText}`

    } else {

        if (fistWordInTarefa == "AUDIENCIA" && cliente.compromisso.quantidadeTarefas === tarefas.length) {

            return `${numero} - ${cliente.compromisso.tipoCompromisso} DE ${cliente.nome} (${cliente.cpf}) X ${cliente.compromisso.peritoOrReu}, NO DIA ${cliente.compromisso.prazoInterno} ÀS ${cliente.compromisso.horario}, LOCAL: ${localText}`

        }
        else if (tipoTarefaNormalizado === "ATO ORDINATORIO" && tipoCompromissoNormalizado.includes('PERICIA')) {

            return `${numero} - ATO ORDINATÓRIO (PERÍCIA DESIGNADA)`

        } else if ((fistWordInTarefa === "ANALISE") && tipoCompromissoNormalizado.search('AUDIENCIA') === 0) {

            return `${numero} - VERIFICAR NECESSIDADE DE TESTEMUNHAS`

        } else if ((cliente.compromisso.tipoCompromisso === "EMENDAR") && (tarefa === "CONTATAR CLIENTE")) {

            return `${numero} - `

        } else if (tipoTarefaNormalizado.includes('ACOMPANHAR')  && tipoCompromissoNormalizado.includes('DECISAO ANTECIPACAO PERICIA')) {
            return `${numero} - ACOMPANHAR ANTECIPAÇÃO DA PERÍCIA ADMINISTRATIVA`
        } else {

            return `${numero} - ${cliente.compromisso.tipoCompromisso}`

        }
    }
}