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
            prazoInterno: typeof ISAnalysis.internal_deadline === 'number' ? this.excelDateToJsDate(ISAnalysis.internal_deadline).toLocaleDateString() : ISAnalysis.internal_deadline,
            prazoFatal: typeof ISAnalysis.fatal_deadline === 'number' ? this.excelDateToJsDate(ISAnalysis.fatal_deadline).toLocaleDateString() : ISAnalysis.fatal_deadline,
            tarefas: null,
            quantidadeTarefas: null,
            tipoCompromisso: ISAnalysis.description,
            descricao: null,
            semanas: null,
            publicacao: typeof ISAnalysis.publication_date === 'number' ? this.excelDateToJsDate(ISAnalysis.publication_date).toLocaleDateString() : ISAnalysis.publication_date,
            peritoOrReu: ISAnalysis.expert_or_defendant,
            local: ISAnalysis.local_adress,
            horario: typeof ISAnalysis.time === 'number' ? this.excelDecimalToTime(ISAnalysis.time) : ISAnalysis.time
        }
        this.processo = {
            id: dataProcesso.id,
            origem: ISAnalysis.case_number?.replaceAll("'",""),
            dependente: ISAnalysis.related_case_number?.replaceAll("'",""),
            reu: dataProcesso.reu,
            responsavel: dataProcesso.responsavel,
            natureza: dataProcesso.natureza,
            merito: dataProcesso.merito,
            cidade: dataProcesso.cidade,
            estado: dataProcesso.estado,
            vara: dataProcesso.vara
        }
    }

    excelDateToJsDate(excelDate: string) {
        // Subtrai 25569 (diferença entre 1900-01-01 e 1970-01-01) e converte para milissegundos
        const jsDate = new Date((Number(excelDate) - 25569) * 86400 * 1000)
        
        // Adiciona um dia (24 horas em milissegundos) para corrigir o erro do Excel
        jsDate.setDate(jsDate.getDate() + 1)
        
        return jsDate
    }

    excelDecimalToTime(excelDecimal: string) {
        // Extrai a parte inteira (dias) e a parte decimal (fração do dia)
        const hoursDecimal = (Number(excelDecimal) - Math.floor(Number(excelDecimal))) * 24
        
        // Extrai as horas (parte inteira)
        const hours = Math.floor(hoursDecimal)
        
        // Extrai os minutos (parte decimal de hoursDecimal)
        const minutes = Math.round((hoursDecimal - hours) * 60)
        
        // Formata como "HH:mm"
        const formattedTime = `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}`
        
        return formattedTime
    }
}