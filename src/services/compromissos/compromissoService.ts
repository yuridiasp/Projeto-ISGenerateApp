import { Cliente } from "src/models/cliente/Cliente"

import { createCompromisso } from "./createCompromissoService"
import { iCompromissoBody } from "src/models/compromisso/iCompromissoBody"

type Compromisso = {
    tipoCompromisso: string
    publicacao: string
    prazoInterno: string
    prazoFatal: string
}

function createBodyForCreateCompromisso({ compromisso, processo }: { compromisso: Compromisso, processo: { origem: string } }) {
    const body: iCompromissoBody = {
        org: '',
        superior: '',
        idResponsavelAvisado: '',
        idPK: '',
        idAgendamentoINSS: '',
        idTipoCompromisso: 21,
        numeroProcesso: processo.origem,
        descricao: compromisso.tipoCompromisso,
        dataPublicacao: compromisso.publicacao,
        dataPrazoInterno: compromisso.prazoInterno,
        dataPrazoFatal: compromisso.prazoFatal
    }
    
    return body
}

export async function createCompromissoService(cliente: Cliente, cookie: string) {
    const body = createBodyForCreateCompromisso(cliente)
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