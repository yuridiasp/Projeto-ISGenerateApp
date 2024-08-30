const path = require('path')
const fs = require('fs')
const jsdom = require("jsdom")
const { writeExcelFile } = require('../../utils/xlsx/excelISFile')

function isPrev (is) {
    const termos = [
        ': INSS',
        'ADO - INSS',
        'ANTE - INSS',
        ': I N S S',
        'ADO - I N S S',
        'ANTE - I N S S',
        ': INSTITUTO NACIONAL DE SEGURO SOCIAL',
        'ADO - INSTITUTO NACIONAL DE SEGURO SOCIAL',
        'ANTE - INSTITUTO NACIONAL DE SEGURO SOCIAL',
        ': INSTITUTO NACIONAL DO SEGURO SOCIAL',
        'ADO - INSTITUTO NACIONAL DO SEGURO SOCIAL',
        'ANTE - INSTITUTO NACIONAL DO SEGURO SOCIAL',
        ': INSTITUTO NACIONAL DE SEGURIDADE SOCIAL',
        'ADO - INSTITUTO NACIONAL DE SEGURIDADE SOCIAL',
        'ANTE - INSTITUTO NACIONAL DE SEGURIDADE SOCIAL',
        ': I.N.D.S.S',
        'IDO - I.N.D.S.S',
        'ADO - I.N.D.S.S',
        'ANTE - I.N.D.S.S',
    ]

    return termos.some(termo => is.includes(termo))
}

function isTRT (is) {
    return (is.includes('TRIBUNAL REGIONAL DO TRABALHO'))
}

function initAndSetIs(lista) {

    let prev = [], civ = [], trt = []

    for (let index = 1; index < lista.length; index++) {
        const table = lista[index].querySelector("table")
        
        table.innerHTML = table.innerHTML.replaceAll('<br>','')

        table.querySelector("tbody > tr:nth-child(1) > td:nth-child(4)").removeAttribute('colspan')

        
        if (table) {
            const html = table.innerHTML
            const tds = table.querySelectorAll("td")
            const textoLimpo = tds[7].textContent.replace(/\s+/g, ' ').trim()
            const processFound = textoLimpo.match(/\b(\d{12}|\d{7}-\d{2}\.\d{4}\.\d{1,2}\.\d{2}\.\d{4})\b/g)
            const processo = processFound.length ? processFound[0] : '-'
            const objIS = {
                availability_date: tds[0].querySelector("strong").textContent,
                publication_date: tds[1].querySelector("strong").textContent,
                code: tds[2].querySelector("strong").textContent,
                journal: tds[3].querySelector("strong").textContent,
                tribunal: tds[4].querySelector("strong").textContent,
                court: tds[5].querySelector("strong").textContent,
                information: tds[7].textContent,
                case_number: processo,
                related_case_number: null,
                description: null,
                internal_deadline: null,
                fatal_deadline: null,
                time: null,
                expert_or_defendant: null,
                local_adress: null,
                executor: null,
                separate_task: null,
                justification: null
            }

            if (isTRT(html)) {
                trt.push(objIS)
            } else {
                if (isPrev(html)) {
                    prev.push(objIS)
                } else {
                    civ.push(objIS)
                }
            }
        }
    }

    return { prev, trt, civ }
}

async function splitISToExcel (endereco, fileName) {
    console.log('Processo de extracao iniciado...')
    const caminho = path.resolve(endereco.replaceAll("\\" + fileName,""))
    console.log(`Caminho: ${caminho}`)
    const data = fs.readFileSync(endereco, {encoding:'latin1', flag:'r'})
    console.log(`Realizado leitura do arquivo ${fileName} no caminho ${endereco}...`)
    const doc = new jsdom.JSDOM(data)
    console.log("Convertido binarios em documento html...")
    const lista = doc.window.document.querySelectorAll("body > div > p")
    const date = doc.window.document.querySelector("body > div > p:nth-child(2) > table > tbody > tr:nth-child(1) > td:nth-child(2)").innerHTML.replace('Data Publicação:\n<br><strong>','').replace('</strong>','').replaceAll('/','')
    const { prev, trt, civ } = initAndSetIs(lista)
    console.log('Inicializado variaveis...')


    if (prev.length) {
        const prevFileName = `PREV ${date}`

        console.log(`Iniciando criacao do documento xlsx ${prevFileName}`)

        const [ result ] = writeExcelFile({ data: prev, filePath: { endereco, fileName: `${prevFileName}.xlsx` }, sheetName: prevFileName })
        
        if (result) {
            console.log(`File ${prevFileName}.xlsx created successfully`)
        } else {
            console.log(`File ${prevFileName}.xlsx created failed`)
        }
    }

    if (civ.length) {
        const civFileName = `CIV ${date}`
        
        console.log(`Iniciando criacao do documento xlsx ${civFileName}`)

        const [ result ] = writeExcelFile({ data: civ, filePath: { endereco, fileName: `${civFileName}.xlsx` }, sheetName: civFileName })
        
        if (result) {
            console.log(`File ${civFileName}.xlsx created successfully`)
        } else {
            console.log(`File ${civFileName}.xlsx created failed`)
        }
    }

    if (trt.length) {
        const trtFileName = `TRT ${date}`
        
        console.log(`Iniciando criacao do documento xlsx ${trtFileName}`)

        const [ result ] = writeExcelFile({ data: trt, filePath: { endereco, fileName: `${trtFileName}.xlsx` }, sheetName: trtFileName })
        
        if (result) {
            console.log(`File ${trtFileName}.xlsx created successfully`)
        } else {
            console.log(`File ${trtFileName}.xlsx created failed`)
        }
    }

    return true
}

module.exports = splitISToExcel