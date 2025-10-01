import { Cliente } from "@models/clientes/Cliente"
import { removeAcentuacaoString } from "@utils/textFormatting/textFormatting"

export function validaTipoCompromisso(descriptionCompromisso: string, cidadeProcesso: string, estadoProcesso: string) {
    const descriptionCompromissoNormalizado = removeAcentuacaoString(descriptionCompromisso)
    const pauta = ["PAUTA", "RETIRADO DE PAUTA"]
    const emendar = ["DADOS PERICIA SOCIAL", "DADOS COMPLEMENTARES", "EMENDA", "EMENDA A INICIAL", "EMENDAR A INICIAL", "EMENDAR"]
    const pedidoVistas = ["PEDIDO DE VISTAS", "PEDIDO DE VISTA"]

    if (descriptionCompromissoNormalizado === "RPV") {
        if (cidadeProcesso === "ESTANCIA")
            return "RPV TRF5 ESTÂNCIA"
        if (estadoProcesso === "DF")
            return "RPV TRF1 BRASÌLIA"
        if (estadoProcesso === "GO")
            return "RPV TRF1 GOIÁS"
        if (estadoProcesso === "BA")
            return "RPV TRF1 BAHIA"
        return "RPV TRF5 ARACAJU"
    }
    
    if (pauta.includes(descriptionCompromissoNormalizado))
        return "SESSÃO DE JULGAMENTO"

    if (descriptionCompromissoNormalizado === "ALVARA")
        return "RECEBIMENTO DE ALVARÁ"

    if (descriptionCompromissoNormalizado === "PRECATORIO")
        return "RECEBIMENTO DE PRECATÓRIO"
    
    if (descriptionCompromissoNormalizado === "AUDIENCIA DE CONCILIACAO")
        return "AUDIÊNCIA CONCILIATÓRIA"
    
    if (descriptionCompromissoNormalizado === "AUDIENCIA INICIAL")
        return "AUDIÊNCIA INAUGURAL"
    
    if (descriptionCompromissoNormalizado === "PLANILHA")
        return "CÁLCULOS"
    
    if (emendar.includes(descriptionCompromissoNormalizado))
        return "EMENDAR"
    
    if (pedidoVistas.includes(descriptionCompromissoNormalizado))
        return "MANIFESTAÇÃO"

    return descriptionCompromisso
}