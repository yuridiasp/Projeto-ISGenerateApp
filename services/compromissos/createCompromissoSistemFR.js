require("dotenv").config()

const { loggedPostRequest } = require("../../utils/request/postRequest")

async function createCompromisso({ org = '', superior = '', idResponsavelAvisado = '', idPK = '', idAgendamentoINSS = '', idTipoCompromisso, numeroProcesso, descricao, dataPublicacao, dataPrazoInterno, dataPrazoFatal, cookie }) {

    const { URL_CREATE_COMPROMISSO_SISTEMFR } = process.env

    const body = {
        org,
        superior,
        idResponsavelAvisado,
        idPK,
        idAgendamentoINSS,
        idTipoCompromisso,
        numeroProcesso,
        descricao,
        dataPublicacao,
        dataPrazoInterno,
        dataPrazoFatal,
    }

    return await loggedPostRequest({ url: URL_CREATE_COMPROMISSO_SISTEMFR, body, cookie })
}

module.exports = { createCompromisso }

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