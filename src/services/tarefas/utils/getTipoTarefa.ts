import { seletores } from "@models/seletores"
import { removeAcentuacaoString } from "@utils/text/textFormatting"

interface getTipoTarefaMockDTO {
    tipoIntimacaoToUpperNormalized: string
}

export function getTipoTarefa(tarefa: string, tiposTarefas: seletores[]) {
    
    const tipoIntimacaoToUpperNormalized = removeAcentuacaoString(tarefa.toUpperCase()).split("-")[0].trim()
    let achou = false,
        inputManifestacao = null,
        shortInput = null
    
    for (const option of tiposTarefas) {
        const optionToUpperNormalized = removeAcentuacaoString(option.nome.toUpperCase().trim())
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