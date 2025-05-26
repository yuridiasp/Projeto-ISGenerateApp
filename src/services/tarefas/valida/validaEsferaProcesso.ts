import { Cliente } from "../../../models/cliente/Cliente"

export function validaEsferaProcesso(cliente: Cliente) {
    const caracteresProcesso = cliente.processo.origem.length
    const lengthCharProcessTJ = 12
    const lengthCharProcessFederalProtocol = 15
    const lengthCharProcessFederalEcint = 17
    const lengthCharProcessAllFederal = 20

    if (caracteresProcesso === lengthCharProcessTJ) {
        return true
    }
    
    if (caracteresProcesso === lengthCharProcessFederalProtocol || caracteresProcesso === lengthCharProcessFederalEcint || caracteresProcesso === lengthCharProcessAllFederal) {
        return false
    }

    throw new Error("Erro no cadastro do número do processo")
}