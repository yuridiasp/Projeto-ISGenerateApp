import { Cliente } from "../../../models/cliente/Cliente"

export function existeOrigem(cliente: Cliente) {
    if (cliente.processo.dependente)
        if (cliente.processo.dependente.length > 0)
            return `${cliente.processo.dependente} (ORIGEM ${cliente.processo.origem})`
    return cliente.processo.origem
}