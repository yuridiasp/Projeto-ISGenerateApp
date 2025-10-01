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

export type HandleIntimationsReportResult = { message: string; newFilePath: string }

//TODO: Refatorar essa função e distribuir responsabilidades
export async function handleIntimationsReportService (windows: iWindows, cookie: string, file: iFileData): Promise<Result<HandleIntimationsReportResult>> {
    const resultFile = await getObjectValidateIntimationsService(file)
    
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
    
    const validations = await Promise.all(resultado).then(intimationsValidated => intimationsValidated.filter((intimation: { isRegistered: boolean }) => !intimation.isRegistered))
    enableButtonCloseReport(windows.mainWindow)
    
    const resultReport = generateValidationReport({ data: validations, file: file, prefix: 'RELATORIO-REGISTRO-INTIMACAO-' })


    if (resultReport.success === true) {
        const pluralOrSingularForIntimacao = validations.length > 1 ? 'intimações' : 'intimação'
        
        const message =  `Encontrado ${validations.length} ${pluralOrSingularForIntimacao} sem cadastro. Exportado relatório no caminho: ${resultReport.data.newFilePath}`

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