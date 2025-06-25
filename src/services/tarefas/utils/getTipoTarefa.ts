import { seletores } from "@models/seletores/iSeletores"
import { iTarefa } from "@models/tarefa/iTarefa"
import { removeAcentuacaoString } from "@utils/textFormatting/textFormatting"

interface getTipoTarefaMockDTO {
    tipoIntimacaoToUpperNormalized: string
}

export function getTipoTarefa(tarefa: iTarefa, tiposTarefas: seletores[], getTipoTarefaMock?: getTipoTarefaMockDTO) {
    
    const tipoIntimacaoToUpperNormalized = getTipoTarefaMock ? getTipoTarefaMock.tipoIntimacaoToUpperNormalized : removeAcentuacaoString(tarefa.descricao.toUpperCase()).split("-")[0].trim()
    let achou = false,
        inputManifestacao = null,
        shortInput = null
    
    for (const option of tiposTarefas) {
        const optionToUpperNormalized = getTipoTarefaMock ? option.normalizado : removeAcentuacaoString(option.nome.toUpperCase().trim())
        const isManifestacao = optionToUpperNormalized.includes("MANIFESTACAO")
        const isTask = optionToUpperNormalized === tipoIntimacaoToUpperNormalized
        const fistWordIncluded = optionToUpperNormalized.split(" ").includes(tipoIntimacaoToUpperNormalized.split(" ")[0])
        
        if (isManifestacao) {
            inputManifestacao = option.id
        }

        if (isTask) {
            return option.id
        } else {
            if (!shortInput && fistWordIncluded) {
                shortInput = option.id
                achou = true
            }
        }
    }
    
    if (achou) {
        return shortInput
    }
    
    return inputManifestacao
}