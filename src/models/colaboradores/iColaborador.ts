export interface iColaborador {
    id: string,
    nome: string,
    nomeTLC: string,
    interiores?: string[],
    assignments?: string[],
    datasViagem?: string[],
    tarefas?: number
}