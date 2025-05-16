import { AxiosResponse } from "axios"

import { Cliente } from "../../models/cliente/Cliente"
import { createCompromisso } from "./createCompromissoService"
import { iCompromissoBody } from "../../models/compromisso/iCompromissoBody"
import { seletores } from "../../models/seletores/iSeletores"
import { removeAcentuacaoString } from "../../utils/textFormatting/textFormatting"
import { getSelectsCompromisso } from "../seletores/seletoresService"

type Compromisso = {
    tipoCompromisso: string
    publicacao: string
    prazoInterno: string
    prazoFatal: string
}

const compromissosJudiciais: Readonly<Record<string, string>> = {
    default: "INTIMACAO",
    PERICIA: "PERICIA",
    AUDIENCIA: "AUDIENCIA",
    ALVARA: "ALVARA",
    RPV: "RPV",
    PRECATORIO: "PRECATORIO"
}


function getCompromissoTypeId (descricaoTarefa: string, tiposCompromisso: seletores[]) {
    const key = removeAcentuacaoString(descricaoTarefa).split(" ")[0]
    const tipoPadrao = compromissosJudiciais[key] || compromissosJudiciais.default
            
    return tiposCompromisso.find(tipo => removeAcentuacaoString(tipo.nome.toUpperCase()) === tipoPadrao)?.id
}

function createBodyForCreateCompromisso(compromisso: Compromisso, processo: { origem: string }, tiposCompromisso: seletores[]): iCompromissoBody {

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

export async function createCompromissoService(cliente: Cliente, cookie: string) {
    const { descricao, prazoFatal, prazoInterno, publicacao } = cliente.compromisso

    const compromisso: Compromisso =  {
        prazoFatal,
        prazoInterno,
        publicacao,
        tipoCompromisso: descricao
    }

    const processo = {
        origem: cliente.processo.origem
    }

    const tiposCompromisso = await getSelectsCompromisso(cookie)

    const body = createBodyForCreateCompromisso(compromisso, processo, tiposCompromisso)

    const result = await createCompromisso(body, cookie)

    if (result) {
        return true
    }

    return false
}