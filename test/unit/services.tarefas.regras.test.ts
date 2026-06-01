import { describe, expect, test } from "@jest/globals"

import { calculaIntervaloTarefasJudicial } from "../../src/utils/prazos/calculaIntervaloTarefasJudicial.utils"
import { getParametroData } from "../../src/services/tarefas/utils/getParametroData.services"
import { getTipoTarefa } from "../../src/services/tarefas/utils/getTipoTarefa.services"
import { parametros } from "../../src/utils/feriados/parametros.utils"

function cliente({
    tipoCompromisso,
    estado = "SE",
    semanas = 2,
    quantidadeTarefas = 1
}) {
    return {
        compromisso: {
            tipoCompromisso,
            semanas,
            quantidadeTarefas
        },
        processo: {
            estado
        }
    } as any
}

describe("calculaIntervaloTarefasJudicial", () => {
    test("espalha tarefas de audiencia longa fora de DF/GO", () => {
        const tarefas = [
            "AUDIENCIA DE INSTRUCAO",
            "CONTATAR CLIENTE",
            "SMS E WHATSAPP",
            "LEMBRAR CLIENTE",
            "ANALISE"
        ]
        const base = cliente({
            tipoCompromisso: "AUDIENCIA DE INSTRUCAO",
            quantidadeTarefas: tarefas.length
        })

        expect(calculaIntervaloTarefasJudicial(12, base, tarefas, 4)).toBe(11)
        expect(calculaIntervaloTarefasJudicial(12, base, tarefas, 1)).toBe(10)
        expect(calculaIntervaloTarefasJudicial(12, base, tarefas, 3)).toBe(2)
    })

    test("aplica regra especifica para audiencia de DF/GO", () => {
        const tarefas = [
            "AUDIENCIA DE CONCILIACAO",
            "CONTATAR CLIENTE",
            "SMS E WHATSAPP",
            "LEMBRAR CLIENTE"
        ]
        const base = cliente({
            tipoCompromisso: "AUDIENCIA DE CONCILIACAO",
            estado: "DF",
            quantidadeTarefas: tarefas.length
        })

        expect(calculaIntervaloTarefasJudicial(12, base, tarefas, 1)).toBe(9)
        expect(calculaIntervaloTarefasJudicial(12, base, tarefas, 2)).toBe(5)
    })

    test("separa regra de financeiro e advogado em RPV", () => {
        const tarefas = [
            "RPV TRF1 GOIAS - ADVOGADO",
            "RPV TRF1 GOIAS - FINANCEIRO"
        ]
        const base = cliente({
            tipoCompromisso: "RPV TRF1 GOIAS",
            estado: "GO",
            semanas: 0,
            quantidadeTarefas: tarefas.length
        })

        expect(calculaIntervaloTarefasJudicial(9, base, tarefas, 0)).toBe(4)
        expect(calculaIntervaloTarefasJudicial(9, base, tarefas, 1)).toBe(0)
    })
})

describe("getTipoTarefa", () => {
    const tiposTarefas = [
        { id: "manifestacao", nome: "MANIFESTACAO" },
        { id: "pericia", nome: "PERICIA" },
        { id: "emendar", nome: "EMENDAR PRAZO" }
    ]

    test("prioriza correspondencia exata normalizada", () => {
        expect(getTipoTarefa("PERICIA - ADVOGADO", tiposTarefas)).toBe("pericia")
    })

    test("usa a primeira palavra quando nao ha correspondencia exata", () => {
        expect(getTipoTarefa("EMENDAR DOCUMENTOS", tiposTarefas)).toBe("emendar")
    })

    test("usa manifestacao como fallback quando a tarefa nao foi encontrada", () => {
        expect(getTipoTarefa("CUMPRIR DILIGENCIA", tiposTarefas)).toBe("manifestacao")
    })
})

describe("getParametroData", () => {
    test.each([
        "CONTATAR CLIENTE",
        "LEMBRAR CLIENTE",
        "SMS E WHATSAPP"
    ])("usa parametro de contato para %s", descricao => {
        expect(getParametroData({ descricao } as any)).toBe(parametros.tarefaContatar)
    })

    test("usa parametro de advogado para as demais tarefas", () => {
        expect(getParametroData({ descricao: "ANALISE" } as any)).toBe(parametros.tarefaAdvogado)
    })
})
