import { iTarefa } from "@models/tarefas"
import { Dayjs } from "dayjs"

export interface iCompromisso {
    id: string
    prazoInterno: Dayjs
    prazoFatal: Dayjs
    tarefas: iTarefa[]
    quantidadeTarefas: number
    tipoCompromisso: string
    descricaoCompromisso: string
    descricao: string
    semanas: number
    publicacao: Dayjs
    peritoOrReu: string
    local: string
    horario: string
}