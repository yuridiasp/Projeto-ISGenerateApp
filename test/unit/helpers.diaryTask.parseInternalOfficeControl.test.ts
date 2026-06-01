import { describe, expect, test } from "@jest/globals"

import { parseInternalOfficeControl } from "../../src/helpers/diaryTask.helpers"

describe("parseInternalOfficeControl", () => {
    test("separa informacoes, tarefas internas e status OK", () => {
        const rawTask = "000123456789 (ORIGEM 0009876-54.2024.5.20.0001) - CONTATAR CLIENTE - (02/06/2026) - MARIA"

        const result = parseInternalOfficeControl(`
            Texto livre inicial
            |comunicacao_id: 123|
            ${rawTask}
            OK
        `)

        expect(result.informacoes).toBe("Texto livre inicial")
        expect(result.statusInterno).toBe("OK")
        expect(result.tarefas).toEqual([
            {
                processo: "000123456789",
                origem: "0009876-54.2024.5.20.0001",
                descricao: "CONTATAR CLIENTE",
                prazo: "02/06/2026",
                responsavel: "MARIA",
                raw: rawTask
            }
        ])
    })

    test("mantem tarefa malformada como raw para nao perder informacao", () => {
        const rawTask = "000123456789 - Linha sem prazo - MARIA"

        const result = parseInternalOfficeControl(rawTask)

        expect(result.informacoes).toBeUndefined()
        expect(result.statusInterno).toBeUndefined()
        expect(result.tarefas).toEqual([{ raw: rawTask }])
    })
})
