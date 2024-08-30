const { Cliente } = require("../../models/Cliente")
const { createCompromisso } = require("./createCompromissoService")

/**
 * 
 * @param {Cliente} param0 
 */
function createBodyForCreateCompromisso({ compromisso, processo }) {
    const body = {
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

async function createCompromissoService(cliente, cookie) {
    const body = createBodyForCreateCompromisso(cliente)
    return await createCompromisso(body, cookie)
}

module.exports = { createCompromissoService }

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