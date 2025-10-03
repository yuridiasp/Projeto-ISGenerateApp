import { iWindows } from "@models/windows/iWindows"
import { generateValidationReport } from "@infrastructure/reportGenerator/reportGenerator"
import { iValidationReport } from "@models/validations"
import { updateViewReportValidation, enableButtonCloseReport } from "@utils/viewHelpers/viewHelpers"
import { getObjectValidateIntimationsService, iFileData } from "@services/validateIntimations"
import { ValidationError } from "@models/errors"
import { Result } from "@models/results"
import { intimationValidateService } from "@services/intimation"
import { ISAnalysisDTO } from "@models/clientes"
import { RecordResultsWithError } from "@models/errors"
import { excelDateToJsDate } from "@utils/date/excelDateToJsDate"
import { CellObject } from "xlsx-js-style"

export type HandleIntimationsReportResult = { message: string; newFilePath: string }

export type RecorteDTO = CellObject

const cellStyle = {
    title: {
        fill: { fgColor: { rgb: "0F243E" } },
        font: { color: { rgb: "FFFFFF"} },
    },
    success: {
        fill: { fgColor: { rgb: "C6EFCE" } },
        font: { color: { rgb: "006100" } }
    },
    fail: {
        fill: { fgColor: { rgb: "FFC7CE" } },
        font: { color: { rgb: "9C0006" } },
    },
}

//TODO: Refatorar essa função e distribuir responsabilidades
export async function handleIntimationsReportService (windows: iWindows, cookie: string, file: iFileData): Promise<Result<HandleIntimationsReportResult>> {
    const resultFile = await getObjectValidateIntimationsService(file)
    let unregisteredCont = 0
    
    if (resultFile.success === false) {
        return {
            success: false,
            error: resultFile.error
        }
    }
    
    const resultado = resultFile.data.file.map(async (intimation: ISAnalysisDTO) => intimationValidateService(intimation, cookie).then(result => {
        
        if (result.success === true) {
            updateViewReportValidation(result.data.validationReport, windows.mainWindow)
            return result.data.validationReport
        }
        
        
        const error = result.error as RecordResultsWithError
        const validationReport = error.data as iValidationReport
        updateViewReportValidation(validationReport, windows.mainWindow)
        
        unregisteredCont++

        return validationReport
    }))

    const isRecorte = resultFile.data.file.some(file => file.isRecorte)
    //TODO: Refatorar essa função - Extrair para um novo arquivo
    const validations = (await Promise.all(resultado).then(intimationsValidated => isRecorte ? intimationsValidated : intimationsValidated.filter((intimation: { isRegistered: boolean }) => !intimation.isRegistered))).map((line) => {
        if(isRecorte) {
            line.objectRecorte['DATA DISP'] = excelDateToJsDate(line.objectRecorte['DATA DISP'] as string)
            line.objectRecorte['DATA PUBLIC'] = excelDateToJsDate(line.objectRecorte['DATA PUBLIC'] as string)
            return Object.keys(line.objectRecorte).reduce((previous, current) => {
                previous.push({ v: line.objectRecorte[current as keyof typeof line.objectRecorte], t: "DATA DISP" === current || current === "DATA PUBLIC" ? "d" : "s", s: line.isRegistered ? cellStyle.success : cellStyle.fail })
                return previous
            }, [] as RecorteDTO[])
        }
        
        return line
    })

    if(isRecorte) validations.unshift([...Object.keys(resultFile.data.file[0].objectRecorte).map(key => ({ v: key, t:"s", s: cellStyle.title }))] as RecorteDTO[])

    enableButtonCloseReport(windows.mainWindow)
    
    const resultReport = generateValidationReport({ data: validations, file: file, prefix: isRecorte ? '' : 'RELATORIO-REGISTRO-INTIMACAO-', isRecorte })

    if (resultReport.success === true) {
        
        const pluralOrSingularForIntimacao = unregisteredCont > 1 ? 'intimações' : 'intimação'
        
        const message =  `Encontrado ${unregisteredCont} ${pluralOrSingularForIntimacao} sem cadastro. Exportado relatório no caminho: ${resultReport.data.newFilePath}`

        return {
            success: true,
            data: { message, newFilePath: resultReport.data.newFilePath }
        }
    }

    return {
        success: false,
        error: new ValidationError('Todas as intimações foram cadastradas! Nenhum arquivo de relatório gerado.')
    }
}