export interface iCreateTarefa {
    idPK?: string,
    idCO: number,
    idPR: number,
    idCL?: string,
    org?: string,
    superior?: string,
    idResponsavelAvisado?: string,
    agendada: string,
    acaoColetiva: string,
    idTipoTarefa: number,
    pautaIdUsuarioResp?: string,
    dataParaFinalizacaoAgendada?: string,
    onde?: string,
    horarioInicial?: string,
    horarioFinal?: string,
    dataParaFinalizacao: string,
    descricao: string,
    idResponsavel: number,
    idExecutor: number,
    lembreteQuandoFinalizarPara?: string
}