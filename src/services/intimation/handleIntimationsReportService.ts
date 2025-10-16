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
import { CellObject } from "xlsx-js-style"
import { excelDateToJsDate } from "@utils/date/excelDateToJsDate"

export type HandleIntimationsReportResult = { message: string; newFilePath: string }

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

        return validationReport
    }))

    const isRecorte = resultFile.data.file.some(file => file.isRecorte)
    //TODO: Refatorar essa função - Dividir responsabilidades
    const validations = (await Promise.all(resultado).then(intimationsValidated => {
        if(isRecorte) {
            return intimationsValidated
        }
        
        return intimationsValidated.filter((intimation: { isRegistered: boolean }) => !intimation.isRegistered)}
    )).map((line) => {
        if (!line.isRegistered) unregisteredCont++
        if(isRecorte) {
            return Object.keys(line.objectRecorte).reduce((previous, current) => {
                //const widths =  [ 15.57, 7.29, 10, 12.71, 71.43, 7.43, 23.71, 73.57, 6.86, 11.71, 8.43 ]
                const isDataType = "DATA DISP" === current || current === "DATA PUBLIC"
                const t = isDataType ? "d" : "s"
                //const s = line.isRegistered ? {...cellStyle.success, } : {...cellStyle.fail}
                let v = line.objectRecorte[current as keyof typeof line.objectRecorte]
                
                if (isDataType) {
                    const date = excelDateToJsDate(line.objectRecorte[current as keyof typeof line.objectRecorte] as string)
                    // TODO: Propor nova solução para substituir esse acréscimo de 28 segundos
                    v =  date.tz().hour(0).minute(0).second(28).millisecond(0).format("YYYY-MM-DD HH:mm:ss")
                }
                const s = line.isRegistered ? cellStyle.success : cellStyle.fail
                previous.push({ v, t, s })
                return previous
            }, [] as CellObject[])
        }
        
        return line
    })

    if(isRecorte) validations.unshift([...Object.keys(resultFile.data.file[0].objectRecorte).map(key => ({ v: key, t:"s", s: cellStyle.title }))] as CellObject[])

    enableButtonCloseReport(windows.mainWindow)
    
    const resultReport = generateValidationReport({ data: validations, file: file, prefix: 'RELATORIO-REGISTRO-INTIMACAO-', isRecorte })

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
        error: new ValidationError('Todas as intimações foram cadastradas! Nenhum arquivo de relatório gerado.', resultFile.data.file.length)
    }
}