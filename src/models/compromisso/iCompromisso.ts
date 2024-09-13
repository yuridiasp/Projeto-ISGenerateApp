export interface iCompromisso {
    id: string
    prazoInterno: string
    prazoFatal: string
    tarefas: string[]
    quantidadeTarefas: number
    tipoCompromisso: string
    descricao: string
    semanas: number
    publicacao: string
    peritoOrReu: string | null
    local: string | null
    horario: string | null
}