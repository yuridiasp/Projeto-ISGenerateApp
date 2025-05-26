import { seletores } from "../../../models/seletores/iSeletores"
import { getCompromissoTypeId } from "../../../services/compromissos/get/getCompromissoTypeId"
import { iCompromissoBody } from "../../../models/compromisso/iCompromissoBody"

export type Compromisso = {
    tipoCompromisso: string
    publicacao: string
    prazoInterno: string
    prazoFatal: string
}

export function createBodyForCreateCompromisso(compromisso: Compromisso, processo: { origem: string }, tiposCompromisso: seletores[]): iCompromissoBody {

    const idTipoCompromisso = getCompromissoTypeId(compromisso.tipoCompromisso, tiposCompromisso)

    return {
        org: '',
        superior: '',
        idResponsavelAvisado: '',
        idPK: '',
        idAgendamentoINSS: '',
        idTipoCompromisso: idTipoCompromisso,
        numeroProcesso: processo.origem,
        descricao: compromisso.tipoCompromisso,
        dataPublicacao: compromisso.publicacao,
        dataPrazoInterno: compromisso.prazoInterno,
        dataPrazoFatal: compromisso.prazoFatal
    }
}