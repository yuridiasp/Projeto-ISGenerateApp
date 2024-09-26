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


function selectTipoCompromisso (descricaoTarefa: string, tiposCompromisso: seletores[]) {
    const compromissoKey = removeAcentuacaoString(descricaoTarefa).split(" ")[0]

    type CompromissosJudiciais = {
        [key: string]: string;
        default: string;
        PERICIA: string;
        AUDIENCIA: string;
        ALVARA: string;
        RPV: string;
        PRECATORIO: string;
    };

    const compromissosJudiciais: CompromissosJudiciais = {
            default: "INTIMACAO",
            PERICIA: "PERICIA",
            AUDIENCIA: "AUDIENCIA",
            ALVARA: "ALVARA",
            RPV: "RPV",
            PRECATORIO: "PRECATORIO"
        }
            
    let tarefaIdentificada

    const compromissoJudicial = compromissosJudiciais[compromissoKey]
    tarefaIdentificada = compromissoJudicial ? compromissoJudicial : compromissosJudiciais.default

    for (const tipo of tiposCompromisso) {
        if (removeAcentuacaoString(tipo.nome.toUpperCase()) === tarefaIdentificada) {
            return tipo.id
        }
    }
}

function createBodyForCreateCompromisso({ compromisso, processo, tiposCompromisso }: { compromisso: Compromisso, processo: { origem: string }, tiposCompromisso: seletores[] }) {

    const idTipoCompromisso = selectTipoCompromisso(compromisso.tipoCompromisso, tiposCompromisso)

    const body: iCompromissoBody = {
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
    
    return body
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

    const body = createBodyForCreateCompromisso({ compromisso, processo, tiposCompromisso })

    return await createCompromisso(body, cookie)
}

/* 
Criação de compromisso:

Request URL:
http://fabioribeiro.eastus.cloudapp.azure.com/adv/compromissos/formularioScript.asp

Request Method:
POST

Form Data:
org: 
superior: 
idResponsavelAvisado: 
idPK: 
idAgendamentoINSS: 
idTipoCompromisso: 21
numeroProcesso: 202311301030
descricao: ATO ORDINATÓRIO
dataPublicacao: 16/08/2024
dataPrazoInterno: 03/09/2024
dataPrazoFatal: 06/09/2024
*/