import { iCompromisso } from "../compromisso/iCompromisso"
import { iProcesso } from "../processo/iProcesso"
import { iDataCliente } from "./iDataCliente"

interface iClienteConstructor {
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

    constructor ({ publication_date, case_number, related_case_number = null, description, internal_deadline, fatal_deadline, time = null, expert_or_defendant = null, local_adress = null, dataCliente, dataProcesso }: iClienteConstructor){
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
            prazoInterno: internal_deadline,
            prazoFatal: fatal_deadline,
            tarefas: null,
            quantidadeTarefas: null,
            tipoCompromisso: description,
            descricao: null,
            semanas: null,
            publicacao: publication_date,
            peritoOrReu: expert_or_defendant,
            local: local_adress,
            horario: time
        }
        this.processo = {
            id: dataProcesso.id,
            origem: case_number,
            dependente: related_case_number,
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