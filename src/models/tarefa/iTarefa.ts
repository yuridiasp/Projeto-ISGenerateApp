export interface iTarefa {
    tipoId: string
    descricao: string
    dataParaFinalizacao: Date
    responsavel: string
    executor: string
    horarioInicial?: string
    horarioFinal?: string
}