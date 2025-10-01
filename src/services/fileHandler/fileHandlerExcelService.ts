import path from 'path'
import fs from 'fs'
import jsdom from "jsdom"
import { writeExcelFileRepository } from '@repositories/xlsx/excelISFile'
import { isJF, isPrev, isTRT } from '@services/fileHandler'

function initAndSetIs(lista: NodeListOf<Element>) {

    const prev = [], civ = [], trt = [], jf = []

    type IS = {
        availability_date: string,
        publication_date: string,
        code: string,
        journal: string,
        tribunal: string,
        court: string,
        information: string,
        case_number: string,
        related_case_number: string,
        description: string,
        internal_deadline: string,
        fatal_deadline: string,
        time: string,
        expert_or_defendant: string,
        local_adress: string,
        executor: string,
        separate_task: string,
        justification: string
    }

    for (let index = 1; index < lista.length; index++) {
        const table = lista[index].querySelector("table")
        
        table.innerHTML = table.innerHTML.replace(/<br>/g,'')

        table.querySelector("tbody > tr:nth-child(1) > td:nth-child(4)")?.removeAttribute('colspan')

        
        if (table) {
            const html = table.innerHTML
            const tds = table.querySelectorAll("td")
            const textoLimpo = tds[7].textContent.replace(/\s+/g, ' ').trim()
            const isTJSE = textoLimpo.includes("TMP.NPRO")
            const processFound = isTJSE ? textoLimpo.match(/\d{12}/g) : textoLimpo.match(/\b(\d{7}-\d{2}\.\d{4}\.\d{1,2}\.\d{2}\.\d{4})\b/g)
            const processo = processFound.length ? processFound[0] : '-'
            const objIS: IS = {
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
            } else if (isJF(html)) {
                jf.push(objIS)
            } else {
                if (isPrev(html)) {
                    prev.push(objIS)
                } else {
                    civ.push(objIS)
                }
            }
        }
    }

    return { prev, trt, civ, jf }
}

export async function splitISToExcel (filePath: string, fileName: string) {
    console.log('Processo de extracao iniciado...')
    const caminho = path.resolve(filePath.replace(new RegExp("\\" + fileName, "g"),""))
    console.log(`Caminho: ${caminho}`)
    const data = fs.readFileSync(filePath, {encoding:'latin1', flag:'r'})
    console.log(`Realizado leitura do arquivo ${fileName} no caminho ${caminho}...`)
    const doc = new jsdom.JSDOM(data)
    console.log("Convertido binarios em documento html...")
    const lista = doc.window.document.querySelectorAll("body > div > p")
    const date = doc.window.document.querySelector("body > div > p:nth-child(2) > table > tbody > tr:nth-child(1) > td:nth-child(2)").innerHTML.replace('Data Publicação:\n<br><strong>','').replace('</strong>','').replace(/\//g,'')
    const { prev, trt, civ, jf } = initAndSetIs(lista)
    console.log('Inicializado variaveis...')

    if (prev.length) {
        const prevFileName = `PREV ${date}`

        console.log(`Iniciando criacao do documento xlsx ${prevFileName}`)

        const resultPrev = writeExcelFileRepository({ data: prev, filePath: { filePath, fileName: `${prevFileName}.xlsx` }, sheetName: prevFileName })
        
        if (resultPrev.success === true) {
            console.log(`File ${prevFileName}.xlsx created successfully`)
        } else {
            console.log(`File ${prevFileName}.xlsx created failed` + resultPrev.error.toString())
        }
    }

    if (civ.length) {
        const civFileName = `CIV ${date}`
        
        console.log(`Iniciando criacao do documento xlsx ${civFileName}`)

        const resultCiv = writeExcelFileRepository({ data: civ, filePath: { filePath, fileName: `${civFileName}.xlsx` }, sheetName: civFileName })
        
        if (resultCiv.success === true) {
            console.log(`File ${civFileName}.xlsx created successfully`)
        } else {
            console.log(`File ${civFileName}.xlsx created failed` + resultCiv.error.toString())
        }
    }

    if (trt.length) {
        const trtFileName = `TRT ${date}`
        
        console.log(`Iniciando criacao do documento xlsx ${trtFileName}`)

        const resultTrt = writeExcelFileRepository({ data: trt, filePath: { filePath, fileName: `${trtFileName}.xlsx` }, sheetName: trtFileName })
        
        if (resultTrt.success === true) {
            console.log(`File ${trtFileName}.xlsx created successfully`)
        } else {
            console.log(`File ${trtFileName}.xlsx created failed` + resultTrt.error.toString())
        }
    }

    if (jf.length) {
        const jfFileName = `JFSE ${date}`
        
        console.log(`Iniciando criacao do documento xlsx ${jfFileName}`)

        const resultJF = writeExcelFileRepository({ data: jf, filePath: { filePath, fileName: `${jfFileName}.xlsx` }, sheetName: jfFileName })
        
        if (resultJF.success === true) {
            console.log(`File ${jfFileName}.xlsx created successfully`)
        } else {
            console.log(`File ${jfFileName}.xlsx created failed` + resultJF.error.toString())
        }
    }

    return true
}