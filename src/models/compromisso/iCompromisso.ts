import { iTarefa } from "../tarefa/iTarefa"

export interface iCompromisso {
    id: string
    prazoInterno: string
    prazoFatal: string
    tarefas: iTarefa[]
    quantidadeTarefas: number
    tipoCompromisso: string
    descricao: string
    semanas: number
    publicacao: string
    peritoOrReu: string | null
    local: string | null
    horario: string | null
}