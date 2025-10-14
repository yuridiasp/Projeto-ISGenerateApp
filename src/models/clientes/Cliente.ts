import { iCompromisso } from "@models/compromissos"
import { iProcesso } from "@models/processos"
import { iDataCliente } from "@models/clientes"
import { validaTipoCompromisso } from "@utils/compromissos/validarTipoCompromisso";
import { lineXlsxIS } from "@repositories/xlsx/excelISFile";
import { excelDateToJsDate } from "@utils/date/excelDateToJsDate";
import dayjs, { Dayjs } from "dayjs";
import { timezone } from "@helpers/timezone";
import { dateTimeFormat } from "@helpers/dateTimeFormat";

export interface ISAnalysisDTO {
    availability_date?: Dayjs;
    publication_date: Dayjs;
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
    justification: string;
    paragraph?: string;
    isRecorte?: boolean;
    objectRecorte?: lineXlsxIS;
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
            prazoInterno: typeof ISAnalysis.internal_deadline === 'number' ? excelDateToJsDate(ISAnalysis.internal_deadline) : dayjs.tz(ISAnalysis.internal_deadline, dateTimeFormat, timezone),
            prazoFatal: typeof ISAnalysis.fatal_deadline === 'number' ? excelDateToJsDate(ISAnalysis.fatal_deadline) : dayjs.tz(ISAnalysis.fatal_deadline, dateTimeFormat, timezone),
            tarefas: null,
            quantidadeTarefas: null,
            tipoCompromisso: validaTipoCompromisso(ISAnalysis.description, dataProcesso.cidade, dataProcesso.estado),
            descricaoCompromisso: ISAnalysis.description,
            descricao: null,
            semanas: null,
            publicacao: typeof ISAnalysis.publication_date === 'number' ? excelDateToJsDate(ISAnalysis.publication_date) : dayjs.tz(ISAnalysis.publication_date, dateTimeFormat, timezone),
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