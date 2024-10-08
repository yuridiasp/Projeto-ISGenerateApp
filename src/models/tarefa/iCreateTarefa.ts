export interface iCreateTarefa {
    idPK?: string,
    idCO: string,
    idPR: string,
    idCL?: string,
    org?: string,
    superior?: string,
    idResponsavelAvisado?: string,
    agendada: string,
    acaoColetiva: string,
    idTipoTarefa: string,
    pautaIdUsuarioResp?: string,
    dataParaFinalizacaoAgendada?: string,
    onde?: string,
    horarioInicial?: string,
    horarioFinal?: string,
    dataParaFinalizacao: string,
    descricao: string,
    idResponsavel: string,
    idExecutor: string,
    lembreteQuandoFinalizarPara?: string,
    incluirOutra?: string
    idsCopias?: string[]
}