import { getProcessoService } from "@services/processos"
import { getClienteByID } from "@services/clientes"
import { Cliente, ISAnalysisDTO } from "@models/clientes"
import { Result } from "@models/results"

export async function createClienteService(ISAnalysis: ISAnalysisDTO, cookie: string): Promise<Result<{ cliente: Cliente}>> {
    const result = await getProcessoService({ processo: ISAnalysis.case_number.replaceAll("'",""), cookie })
    
    if(result.success === false) {
        return {
            success: false,
            error: result.error
        }
    }

    const { idCliente, processo } = result.data
    
    const resultCliente = await getClienteByID(idCliente, cookie)

    if(resultCliente.success === false) {
        return {
            success: false,
            error: resultCliente.error
        }
    }

    const newCliente = new Cliente(ISAnalysis, resultCliente.data.dataCliente, processo)

    return {
        success: true,
        data: { cliente: newCliente }
    }
}