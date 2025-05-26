import { JSDOM } from "jsdom"

import { iColaborador } from "../../../models/colaborador/iColaborador"
import { filterColaboradoresJudicial } from "../utils/filterColaboradoresJudicial"
import { getTarefa } from "./getTaskService"
import { iTarefa } from "../../../models/tarefa/iTarefa"
import { Cliente } from "../../../models/cliente/Cliente"

interface getTarefasColaboradoresDTO {
    dom: JSDOM
}

export async function getTarefasColaboradores(colaborador: iColaborador, data: Date, cookie: string, getTarefasColaboradoresMock?: getTarefasColaboradoresDTO) {
    let contador = 0

    const dateString = data.toLocaleDateString()

    const dom = getTarefasColaboradoresMock ? getTarefasColaboradoresMock.dom : new JSDOM((await getTarefa({ bsAdvTarefasDe: dateString, bsAdvTarefasAte: dateString, bsAdvTarefasExecutor: colaborador.id, cookie })).data)

    const tarefas: NodeListOf<Element> = dom.window.document.querySelectorAll('body > section > section > div.fdt-espaco > div > div.fdt-pg-conteudo > div.table-responsive > table > tbody > tr')
    
    tarefas.forEach(e => {
        if (e.children[2] != null) {
            const lengthProcessTJ = 12
            if ((e.children[2].textContent.match("[0-9]*")[0].length >= lengthProcessTJ) && !(e.children[3].textContent.search('Acompanhar') == 0)) {
                contador++
            }
        }
    })

    colaborador.tarefas = contador

    return colaborador
}

export async function requererTarefasContatar(tarefa: iTarefa, cliente: Cliente, cookie: string) {

    const colaboradores = filterColaboradoresJudicial(cliente)

    return colaboradores.map(async colaborador => {
        return await getTarefasColaboradores(colaborador, tarefa.dataParaFinalizacao, cookie)
    })
}