import { assignments } from "@helpers/assignments"
import { ADM } from "@helpers/colaboradores"

export function filterColaboradoresJudicial (estadoCliente: string, localAtendido: string, parceiro: string, vara: string) {
    const colaboradores = []

    const parceiros = ['ELIZEU ( PARCEIRO)','MARIA DO POV. PREGUIÇA','AGENOR (PARCEIRO)','ELIZANGELA ( PARCEIRA)','ERMINIO','AUGUSTO ( PARCEIRO)'],
        varaEstancia = ['7ª VARA FEDERAL', '1ª VARA CIVEL DE ESTÂNCIA', '2ª VARA CIVEL DE ESTÂNCIA', 'JUIZADO ESPECIAL CÍVEL E CRIMINAL DE ESTÂNCIA', 'VARA DE ESTÂNCIA', 'VARA DO TRABALHO DE ESTÂNCIA']

    if (estadoCliente === 'GO' || estadoCliente === 'DF') {
        colaboradores.push(...ADM.filter(colaborador => colaborador.assignments.includes(assignments.ADM.contatar.BSB)))
    } else if ((localAtendido == "ESTANCIA") || ((parceiros.includes(parceiro)) && varaEstancia.includes(vara))) {
        colaboradores.push(...ADM.filter(colaborador => colaborador.assignments.includes(assignments.ADM.contatar.estancia)))
    } else {
        if (varaEstancia.includes(vara)) {
            colaboradores.push(...ADM.filter(colaborador => (colaborador.assignments.includes(assignments.ADM.contatar.geral) || colaborador.assignments.includes(assignments.ADM.contatar.estancia))))
        } else {
            colaboradores.push(...ADM.filter(colaborador => colaborador.assignments.includes(assignments.ADM.contatar.geral)))
        }
    }

    return colaboradores
}