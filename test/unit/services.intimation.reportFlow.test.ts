import { describe, expect, jest, test, beforeEach, afterEach } from "@jest/globals"

import { reportCellStyle } from "../../src/constants/reportCellStyle.constants"
import { dayjsConfig } from "../../src/config/dayjsConfig.config"
import { buildUnregisteredIntimationsMessage } from "../../src/helpers/reportMessage.helper"
import { formatIntimationReportData } from "../../src/services/intimation/intimationReportFormatter.services"
import { validateIntimationsAndNotifyView } from "../../src/services/intimation/intimationValidationRunner.services"
import { intimationValidateService } from "../../src/services/intimation"

jest.mock("../../src/services/intimation", () => ({
    intimationValidateService: jest.fn()
}))

dayjsConfig()

const validationReport = (isRegistered: boolean, reason = "") => ({
    description: "INTIMACAO",
    reason,
    isRegistered
})

describe("formatIntimationReportData", () => {
    test("em modo padrao retorna apenas intimacoes sem cadastro e conta total", () => {
        const registered = validationReport(true)
        const unregisteredOne = validationReport(false, "Processo nao encontrado")
        const unregisteredTwo = validationReport(false, "Cliente nao encontrado")

        const result = formatIntimationReportData(
            [registered, unregisteredOne, unregisteredTwo],
            false
        )

        expect(result).toEqual({
            data: [unregisteredOne, unregisteredTwo],
            unregisteredCount: 2,
            isRecorte: false
        })
    })

    test("em modo recorte retorna cabecalho e linhas estilizadas de todos os registros", () => {
        const validations = [
            {
                ...validationReport(true),
                objectRecorte: {
                    "DATA DISP": 45443,
                    "DATA PUBLIC": 45444,
                    PROCESSO: "0001"
                }
            },
            {
                ...validationReport(false),
                objectRecorte: {
                    "DATA DISP": 45445,
                    "DATA PUBLIC": 45446,
                    PROCESSO: "0002"
                }
            }
        ]

        const result = formatIntimationReportData(validations, true)

        expect(result.unregisteredCount).toBe(1)
        expect(result.isRecorte).toBe(true)
        expect(result.data).toHaveLength(3)
        expect(result.data[0]).toEqual([
            { v: "DATA DISP", t: "s", s: reportCellStyle.title },
            { v: "DATA PUBLIC", t: "s", s: reportCellStyle.title },
            { v: "PROCESSO", t: "s", s: reportCellStyle.title }
        ])
        expect(result.data[1]).toEqual([
            expect.objectContaining({ t: "d", s: reportCellStyle.success }),
            expect.objectContaining({ t: "d", s: reportCellStyle.success }),
            { v: "0001", t: "s", s: reportCellStyle.success }
        ])
        expect(result.data[2]).toEqual([
            expect.objectContaining({ t: "d", s: reportCellStyle.fail }),
            expect.objectContaining({ t: "d", s: reportCellStyle.fail }),
            { v: "0002", t: "s", s: reportCellStyle.fail }
        ])
        expect(String((result.data[1] as any)[0].v)).toMatch(/^\d{4}-\d{2}-\d{2} 00:00:28$/)
    })

    test("em modo recorte vazio nao tenta montar cabecalho", () => {
        expect(formatIntimationReportData([], true)).toEqual({
            data: [],
            unregisteredCount: 0,
            isRecorte: true
        })
    })
})

describe("buildUnregisteredIntimationsMessage", () => {
    test("monta mensagem no singular e plural", () => {
        expect(buildUnregisteredIntimationsMessage(1, "C:\\relatorio.xlsx"))
            .toContain("1 intima")
        expect(buildUnregisteredIntimationsMessage(2, "C:\\relatorio.xlsx"))
            .toContain("2 intima")
        expect(buildUnregisteredIntimationsMessage(2, "C:\\relatorio.xlsx"))
            .toContain("C:\\relatorio.xlsx")
    })
})

describe("validateIntimationsAndNotifyView", () => {
    beforeEach(() => {
        jest.clearAllMocks()
    })

    afterEach(() => {
        jest.restoreAllMocks()
    })

    test("retorna validacoes de sucesso e erro notificando a view", async () => {
        const successReport = validationReport(true, "Cadastrada")
        const errorReport = validationReport(false, "Nao cadastrada")
        const mainWindow = { webContents: { send: jest.fn() } }

        jest.mocked(intimationValidateService)
            .mockResolvedValueOnce({
                success: true,
                data: { validationReport: successReport }
            } as any)
            .mockResolvedValueOnce({
                success: false,
                error: { data: errorReport }
            } as any)

        const result = await validateIntimationsAndNotifyView(
            [{ processo: "0001" }, { processo: "0002" }] as any,
            "cookie",
            mainWindow as any
        )

        expect(result).toEqual([successReport, errorReport])
        expect(intimationValidateService)
            .toHaveBeenNthCalledWith(1, { processo: "0001" }, "cookie")
        expect(intimationValidateService)
            .toHaveBeenNthCalledWith(2, { processo: "0002" }, "cookie")
        expect(mainWindow.webContents.send)
            .toHaveBeenNthCalledWith(1, "update-view-report-validation", successReport)
        expect(mainWindow.webContents.send)
            .toHaveBeenNthCalledWith(2, "update-view-report-validation", errorReport)
    })
})
