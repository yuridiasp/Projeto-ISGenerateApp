import { iTarefa } from "@models/tarefas"

export interface iCompromisso {
    id: string
    prazoInterno: string
    prazoFatal: string
    tarefas: iTarefa[]
    quantidadeTarefas: number
    tipoCompromisso: string
    descricaoCompromisso: string
    descricao: string
    semanas: number
    publicacao: string
    peritoOrReu: string
    local: string
    horario: string
}