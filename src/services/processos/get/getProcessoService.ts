
import { getCadastroProcessoService, requestDataProcesso, extractIdProcessoFromUrl } from "../index"
import { iProcesso } from "../../../models/processo/iProcesso"
import { Result } from "../../../models/result/result"

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