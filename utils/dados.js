const { app } = require('electron')

const dados = {
    nomeapp: app.name,
    autor: 'Yuri Dias Pereira Gomes',
    version: '1.0.0',
    electronjs: process.versions.electron,
    nodejs: process.version,
    github: 'https://github.com/yuridiasp'
}

module.exports = dados