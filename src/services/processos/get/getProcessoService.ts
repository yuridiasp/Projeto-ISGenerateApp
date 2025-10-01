
import { getCadastroProcessoService, requestDataProcesso, extractIdProcessoFromUrl } from "@services/processos"
import { iProcesso } from "@models/processos"
import { Result } from "@models/results/result"

export type DataProcesso = {
    idCliente: string;
    processo: iProcesso;
}

export async function getProcessoService({ processo, cookie }: { processo: string, cookie: string }): Promise<Result<DataProcesso>> {
    const result = await getCadastroProcessoService(processo, cookie)

    if (result.success === false) {
        return {
            success: false,
            error: result.error
        }
    }

    const id = extractIdProcessoFromUrl(result.data.url)
    
    return {
        success: true,
        data: await requestDataProcesso(id, cookie)
    }
}