import { iWindows } from "../../models/windows/iWindows"
import { getIntimations, intimationValidateController } from "../../controllers/controllers"
import { generateValidationReport } from "../../infrastructure/reportGenerator/reportGenerator"
import { iCompromissoFromFile } from "../../models/compromisso/iCompromissoFromFile"
import { iValidationReport } from "../../models/validation/iValidationReport"
import { updateViewReportValidation, enableButtonCloseReport } from "../../utils/viewHelpers/viewHelpers"
import { iFileData } from "../../models/file/iFileData"

    
export async function handleIntimationsReport (windows: iWindows, cookie: string, file: iFileData) {
    const resultado: Promise<iValidationReport>[] = []
    
    const { msg, value: intimations } = getIntimations(file)
    
    if (!intimations) {
        throw new Error(msg)
    } else {
        console.log(msg)
    }

    intimations.forEach((intimation: iCompromissoFromFile) => {
        
        const response = intimationValidateController(intimation, cookie).then(result => {
            updateViewReportValidation(result, windows)
            return result
        })

        resultado.push(response)
    })

    const validations = await Promise.all(resultado).then(intimationsValidated => intimationsValidated.filter((intimation: { isRegistered: boolean }) => !intimation.isRegistered))
    enableButtonCloseReport(windows)

    const { result, newFilePath } = generateValidationReport({ data: validations, file: file, prefix: 'RELATORIO-REGISTRO-INTIMACAO-' })
    
    if (result) {
        const pluralOrSingularForIntimacao = validations.length > 1 ? 'intimações' : 'intimação'
        
        return `Encontrado ${validations.length} ${pluralOrSingularForIntimacao} sem cadastro. Exportado relatório no caminho: ${newFilePath}`
    }

    return 'Todas as intimações foram cadastradas! Nenhum arquivo de relatório gerado.'

}