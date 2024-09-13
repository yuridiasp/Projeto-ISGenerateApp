import { shell } from "electron"

import { dados } from "../../repositories/appData/dados"

export function getDadosService () {
    return dados
}

export async function openPageGithubService() {
    await shell.openExternal(dados.github)
}