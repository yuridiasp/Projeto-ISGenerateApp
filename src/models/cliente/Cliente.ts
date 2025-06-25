import { iCompromisso } from "@models/compromisso/iCompromisso"
import { iProcesso } from "@models/processo/iProcesso"
import { iDataCliente } from "@models/cliente/iDataCliente"

export interface ISAnalysisDTO {
    publication_date: string;
    case_number: string;
    related_case_number: string;
    description: string;
    internal_deadline: string;
    fatal_deadline: string;
    time: string;
    expert_or_defendant: string;
    local_adress: string;
    dataCliente: iDataCliente;
    dataProcesso: iProcesso;
    executor: string;
    separate_task: string;
    justification: string
}

export class Cliente {
    id: string
    nome: string
    cpf: string
    cidade: string
    estado: string
    localAtendido: string
    parceiro: string
    situacao: string
    compromisso: iCompromisso
    processo: iProcesso

    constructor (ISAnalysis: ISAnalysisDTO, dataCliente: iDataCliente, dataProcesso: iProcesso){
        this.id = dataCliente.id
        this.nome = dataCliente.nome
        this.cpf = dataCliente.cpf
        this.cidade = dataCliente.cidade
        this.estado = dataCliente.estado
        this.localAtendido = dataCliente.localAtendido
        this.parceiro = dataCliente.parceiro,
        this.situacao = dataCliente.situacao,
        this.compromisso = {
            id: null,
            prazoInterno: ISAnalysis.internal_deadline,
            prazoFatal: ISAnalysis.fatal_deadline,
            tarefas: null,
            quantidadeTarefas: null,
            tipoCompromisso: ISAnalysis.description,
            descricao: null,
            semanas: null,
            publicacao: ISAnalysis.publication_date,
            peritoOrReu: ISAnalysis.expert_or_defendant,
            local: ISAnalysis.local_adress,
            horario: ISAnalysis.time
        }
        this.processo = {
            id: dataProcesso.id,
            origem: ISAnalysis.case_number,
            dependente: ISAnalysis.related_case_number,
            reu: dataProcesso.reu,
            responsavel: dataProcesso.responsavel,
            natureza: dataProcesso.natureza,
            merito: dataProcesso.merito,
            cidade: dataProcesso.cidade,
            estado: dataProcesso.estado,
            vara: dataProcesso.vara
        }
    }
}