export interface iProcesso {
    id: string
    origem: string
    dependente?: string
    reu: string
    responsavel: string
    natureza: string
    merito: string
    cidade: string
    estado: string
    vara: string
    acaoColetiva: string
    demaisEnvolvidosCPF?: string[]
}