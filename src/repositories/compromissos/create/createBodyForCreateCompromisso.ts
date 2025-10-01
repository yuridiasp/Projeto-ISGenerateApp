import { seletores } from "@models/seletores"
import { getCompromissoTypeId } from "@services/compromissos"
import { iCompromissoBody } from "@models/compromissos"

export type Compromisso = {
    tipoCompromisso: string
    descricaoCompromisso: string
    publicacao: string
    prazoInterno: string
    prazoFatal: string
}

export function createBodyForCreateCompromisso(compromisso: Compromisso, processo: { origem: string }, tiposCompromisso: seletores[]): iCompromissoBody {
    
    const idTipoCompromisso = getCompromissoTypeId(compromisso.tipoCompromisso, tiposCompromisso)
    
    return {
        idTipoCompromisso: idTipoCompromisso,
        numeroProcesso: processo.origem,
        descricao: compromisso.descricaoCompromisso,
        dataPublicacao: compromisso.publicacao,
        dataPrazoInterno: compromisso.prazoInterno,
        dataPrazoFatal: compromisso.prazoFatal,
        btnGravar: 'Gravar e continuar'
    }
}