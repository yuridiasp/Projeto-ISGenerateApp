require("dotenv").config()

const { loggedPostRequest } = require("../../utils/request/postRequest")

async function createTarefa({ idPK = '',idCO, idPR, idCL = '', org = '', superior = '', idResponsavelAvisado = '', agendada = 'n', acaoColetiva = 'False', idTipoTarefa, pautaIdUsuarioResp = '', dataParaFinalizacaoAgendada = '', onde = '', horarioInicial = '', horarioFinal = '', dataParaFinalizacao, descricao, idResponsavel, idExecutor, lembreteQuandoFinalizarPara = '', cookie }) {

    const { URL_CREATE_TAREFA_SISTEMFR } = process.env

    const body = {
        idPK,
        idCO,
        idPR,
        idCL,
        org,
        superior,
        idResponsavelAvisado,
        agendada,
        acaoColetiva,
        idTipoTarefa,
        pautaIdUsuarioResp,
        dataParaFinalizacaoAgendada,
        onde,
        horarioInicial,
        horarioFinal,
        dataParaFinalizacao,
        descricao,
        idResponsavel,
        idExecutor,
        lembreteQuandoFinalizarPara
    }

    return await loggedPostRequest({ url: URL_CREATE_TAREFA_SISTEMFR, body, cookie })
}

module.exports = { createTarefa }

/* 
Criação de tarefa:

Request URL:
http://fabioribeiro.eastus.cloudapp.azure.com/adv/tarefas/formularioScript.asp

Request Method:
POST

Form Data:
idPK: 
idCO: 240134
idPR: 37653
idCL: 
org: 
superior: 
idResponsavelAvisado: 
agendada: n
acaoColetiva: False
idTipoTarefa: 101
pautaIdUsuarioResp: 
dataParaFinalizacaoAgendada: 
onde: 
horarioInicial: 
horarioFinal: 
dataParaFinalizacao: 03/09/2024
descricao: 202311301030 - ATO ORDINATÓRIO
idResponsavel: 55
idExecutor: 166
lembreteQuandoFinalizarPara: 


Audiência >
idPK: 
idCO: 240310
idPR: 23
idCL: 
org: 
superior: 
idResponsavelAvisado: 
agendada: s
acaoColetiva: False
idTipoTarefa: 27
pautaIdUsuarioResp: 
dataParaFinalizacaoAgendada: 27/09/2024
onde: VIDEOCONFERÊNCIA
horarioInicial: 10:00
horarioFinal: 12:00
dataParaFinalizacao: 
descricao: 201650001339 - AUDIÊNCIA DE INSTRUÇÃO E JULGAMENTO DE MARIA EUGENIA D ASSUMPÇÃO SOUSA (236.419.085-15) X FERNANDO JOSÉ CHAGAS JÚNIOR E OUTRO, NO DIA 27/09/2024 ÀS 10:00, LOCAL: VIDEOCONFERÊNCIA
idResponsavel: 55
idExecutor: 55
lembreteQuandoFinalizarPara: 
incluirOutra: s
*/