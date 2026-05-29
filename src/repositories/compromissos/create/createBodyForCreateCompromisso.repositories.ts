import { seletores } from "@models/seletores"
import { getCompromissoTypeId } from "@services/compromissos"
import { iCompromisso, iCompromissoBody } from "@models/compromissos"

export type Compromisso = Pick<iCompromisso, 'prazoFatal' | 'prazoInterno' | 'publicacao' | 'tipoCompromisso' | 'descricaoCompromisso'>

export function createBodyForCreateCompromisso(compromisso: Compromisso, processo: { origem: string }, tiposCompromisso: seletores[]): iCompromissoBody {
    
    const idTipoCompromisso = getCompromissoTypeId(compromisso.tipoCompromisso, tiposCompromisso)
    
    return {
        idTipoCompromisso: idTipoCompromisso,
        numeroProcesso: processo.origem,
        descricao: compromisso.descricaoCompromisso,
        dataPublicacao: compromisso.publicacao.toDate().toLocaleDateString(),
        dataPrazoInterno: compromisso.prazoInterno.toDate().toLocaleDateString(),
        dataPrazoFatal: compromisso.prazoFatal.toDate().toLocaleDateString(),
        btnGravar: 'Gravar e continuar'
    }
}