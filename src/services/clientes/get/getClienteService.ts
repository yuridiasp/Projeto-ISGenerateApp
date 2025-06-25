import { getDataClienteByCPF, getDataClienteByID } from "@services/clientes/index"

export async function getClienteByID(id: string, cookie: string) {
    const cliente = await getDataClienteByID(id, cookie)

    return { id, ...cliente }
}

export async function getIdClienteByCPF(id: string, cookie: string) {
    const idCliente = await getDataClienteByCPF(id, cookie)

    return idCliente
}