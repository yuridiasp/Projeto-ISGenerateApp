import { iWindows } from "@models/windows/iWindows"
import { generateValidationReport } from "@infrastructure/reportGenerator/reportGenerator"
import { iValidationReport } from "@models/validation/iValidationReport"
import { updateViewReportValidation, enableButtonCloseReport } from "@utils/viewHelpers/viewHelpers"
import { getObjectValidateIntimationsService, iFileData } from "@services/validateIntimations/validateIntimationsService"
import { ValidationError } from "@models/errors/validationError"
import { Result } from "@models/result/result"
import { intimationValidateService } from "@services/intimation/intimationValidateService"
import { ISAnalysisDTO } from "@models/cliente/Cliente"

export type HandleIntimationsReportResult = { message: string; newFilePath: string }

//TODO: Refatorar essa função e distribuir responsabilidades
export async function handleIntimationsReportService (windows: iWindows, cookie: string, file: iFileData): Promise<Result<HandleIntimationsReportResult>> {
    const resultado: Promise<iValidationReport>[] = []
    
    const resultFile = await getObjectValidateIntimationsService(file)
    
    if (resultFile.success === false) {
        return {
            success: false,
            error: resultFile.error
        }
    }

    resultFile.data.file.forEach((intimation: ISAnalysisDTO) => {
        
        const response = intimationValidateService(intimation, cookie).then(result => {
            updateViewReportValidation(result, windows.mainWindow)
            return result
        })

        resultado.push(response)
    })

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