import { seletores } from "@models/seletores"
import { removeAcentuacaoString } from "@utils/text/textFormatting"

const compromissosJudiciais: Readonly<Record<string, string>> = {
    default: "INTIMACAO",
    PERICIA: "PERICIA",
    AUDIENCIA: "AUDIENCIA",
    ALVARA: "ALVARA",
    RPV: "RPV",
    PRECATORIO: "PRECATORIO"
}

export function getCompromissoTypeId (descricaoTarefa: string, tiposCompromisso: seletores[]) {
    
    const key = removeAcentuacaoString(descricaoTarefa).split(" ")[0]
    const tipoPadrao = compromissosJudiciais[key] || compromissosJudiciais.default
    
    return tiposCompromisso.find(tipo => removeAcentuacaoString(tipo.nome.toUpperCase()) === tipoPadrao)?.id
}