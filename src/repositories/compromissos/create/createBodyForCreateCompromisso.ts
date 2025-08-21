import { seletores } from "../../../models/seletores/iSeletores"
import { getCompromissoTypeId } from "../../../services/compromissos/get/getCompromissoTypeId"
import { iCompromissoBody } from "../../../models/compromisso/iCompromissoBody"

export type Compromisso = {
    tipoCompromisso: string
    publicacao: string
    prazoInterno: string
    prazoFatal: string
}

function excelDateToJsDate(excelDate: string) {
  // Subtrai 25569 (diferença entre 1900-01-01 e 1970-01-01) e converte para milissegundos
  const jsDate = new Date((Number(excelDate) - 25569) * 86400 * 1000)
  
  // Adiciona um dia (24 horas em milissegundos) para corrigir o erro do Excel
  jsDate.setDate(jsDate.getDate() + 1)
  
  return jsDate
}

export function createBodyForCreateCompromisso(compromisso: Compromisso, processo: { origem: string }, tiposCompromisso: seletores[]): iCompromissoBody {
    
    const idTipoCompromisso = getCompromissoTypeId(compromisso.tipoCompromisso, tiposCompromisso)
    
    return {
        idTipoCompromisso: idTipoCompromisso,
        numeroProcesso: processo.origem,
        descricao: compromisso.tipoCompromisso,
        dataPublicacao: compromisso.publicacao,
        dataPrazoInterno: compromisso.prazoInterno,
        dataPrazoFatal: compromisso.prazoFatal,
        btnGravar: 'Gravar e continuar'
    }
}