class Cliente {
    cliente = {
        id: null,
        nome: null,
        cpf: null,
        cidade: null,
        estado: null,
        localAtendido: null,
        parceiro: null
    }
    processo = {
        id: null,
        origem: null,
        dependente: null,
        reu: null,
        responsavel: null,
        natureza: null,
        merito: null,
        cidade: null,
        estado: null,
        vara: null
    }
    compromisso = {
        id: null,
        prazoInterno: null,
        prazoFatal: null,
        tarefas: null,
        quantidadeTarefas: null,
        tipoCompromisso: null,
        descricao: null,
        semanas: null,
        publicacao: null,
        peritoOrReu: null,
        local: null
    }

    constructor ({ publication_date, case_number, related_case_number, description, internal_deadline, fatal_deadline, time, expert_or_defendant, local_adress }) {
        this.compromisso.publicacao = publication_date
        this.compromisso.prazoInterno = internal_deadline
        this.compromisso.prazoFatal = fatal_deadline
        this.compromisso.tipoCompromisso = description
        this.compromisso.peritoOrReu = expert_or_defendant
        this.compromisso.local = local_adress
        this.processo.origem = case_number
        this.processo.dependente = related_case_number
    }
}

module.exports = { Cliente }