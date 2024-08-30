const { JSDOM } = require("jsdom")

const { loggedGetRequest } = require("../../utils/request/getRequest")

function extrairDadosRequisicaoProcessoHtml(response) {

    const dom = new JSDOM(response)
    
    const selectResponsavelProcesso = dom.window.document.querySelector("#idResponsavel")
    const indexResponsavelProcesso = selectResponsavelProcesso.selectedIndex
    const responsavel = indexResponsavelProcesso === -1 ? "" : selectResponsavelProcesso.options[indexResponsavelProcesso].innerText.toUpperCase()
    
    const selectNaturezaProcesso = dom.window.document.querySelector("#idNatureza")
    const indexNaturezaProcesso = selectNaturezaProcesso.selectedIndex
    const natureza = indexNaturezaProcesso === -1 ? 0 : selectNaturezaProcesso.options[indexNaturezaProcesso].innerText.toUpperCase()
    
    const selectMeritoProcesso = dom.window.document.querySelector("#idMerito")
    const indexMeritoProcesso = selectMeritoProcesso.selectedIndex
    const merito = indexMeritoProcesso === -1 ? 0 : selectMeritoProcesso.options[indexMeritoProcesso].innerText.toUpperCase()
    
    const selectCidadeProcesso = dom.window.document.querySelector("#lstCidade")
    const indexCidadeProcesso = selectCidadeProcesso.selectedIndex
    const cidade = indexCidadeProcesso === -1 ? 0 : selectCidadeProcesso.options[indexCidadeProcesso].innerText.toUpperCase()
    
    const selectEstadoProcesso = dom.window.document.querySelector("#lstEstado")
    const indexEstadoProcesso = selectEstadoProcesso.selectedIndex
    const estado = indexEstadoProcesso === -1 ? 0 : selectEstadoProcesso.options[indexEstadoProcesso].value.toUpperCase()
    
    const selectVaraProcesso = dom.window.document.querySelector("#idVara")
    const indexVaraProcesso = selectVaraProcesso.selectedIndex
    const vara = indexVaraProcesso === -1 ? 0 : selectVaraProcesso.options[indexVaraProcesso].innerText.toUpperCase()
    
    const dataCliente = {
        idCliente: dom.window.document.querySelector("#fdt-form > input[type=hidden]:nth-child(2)").value.toUpperCase(),
        processo: {
            id: dom.window.document.querySelector("#fdt-form > input[type=hidden]:nth-child(1)").value.toUpperCase(),
            origem: dom.window.document.querySelector("#numero").value.toUpperCase(),
            reu: dom.window.document.querySelector("#nomeReu").value.toUpperCase(),
            responsavel,
            natureza,
            merito,
            cidade,
            estado,
            vara
        }
    }

    return dataCliente
}

async function requestDataProcesso(id, cookie) {
    const { URL_GET_PROCESSO_SISTEMFR } = process.env
    
    const url = `${URL_GET_PROCESSO_SISTEMFR}${id}`

    const response = await loggedGetRequest(url, cookie)

    return extrairDadosRequisicaoProcessoHtml(response)
}


function getIdProcesso(url) {
    return url.split("idPR=")[1]
}

async function buscarDadosProcesso({ processo, cookie }) {
    const url = await getCadastroProcesso(processo)
    const id = getIdProcesso(url)

    return await requestDataProcesso({ id, cookie })
}

module.exports = { buscarDadosProcesso }