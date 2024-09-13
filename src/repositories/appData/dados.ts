import { app } from 'electron'

export const dados = {
    nomeapp: app.name,
    autor: 'Yuri Dias Pereira Gomes',
    version: app.getVersion(),
    electronjs: process.versions.electron,
    nodejs: process.version,
    github: 'https://github.com/yuridiasp'
}