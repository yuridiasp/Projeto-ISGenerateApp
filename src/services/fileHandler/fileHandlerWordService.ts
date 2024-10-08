import path from 'path'
import fs from 'fs'
import jsdom from "jsdom"

function isPrev (is: string) {
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

function isTrab (is: string) {
    return (is.includes('TRIBUNAL REGIONAL DO TRABALHO'))
}

function initAndSetIs(lista: NodeListOf<Element>) {

    const htmlI = `<html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:w="urn:schemas-microsoft-com:office:word" xmlns="http://www.w3.org/TR/REC-html40"><head>
    <meta http-equiv="Content-Type" content="text/html; charset=windows-1252">
    <meta name="ProgId" content="Word.Document">
    <meta name="Generator" content="MsDocGenerator 0.4">
    <meta name="Originator" content="MsDocGenerator 0.4">
    <!--[if !mso]>
    <style>
    v\:* {behavior:url(#default#VML);}
    o\:* {behavior:url(#default#VML);}
    w\:* {behavior:url(#default#VML);}
    .shape {behavior:url(#default#VML);}
    </style>
    <![endif]-->
    <style>
    <!--
    /* Style Definitions */
    @page Section1
       {size: 595.35pt 841.995pt;
       mso-page-orientation: portrait;
       margin: 1cm 1cm 1cm 1cm;
       mso-header-margin: 36pt;
       mso-footer-margin: 36pt;
       mso-paper-source: 0;}
    div.Section1
      {page: Section1;}
    
    p.normalText, li.normalText, div.normalText{
       mso-style-parent: "";
       margin: 0cm;
       margin-bottom: 6pt;
       mso-pagination: widow-orphan;
       font-size: 7pt;
       font-family: "Arial";
       mso-fareast-font-family: "Arial";
    }
    
    table.normalTable{
       mso-style-name: "Tabela com grade";
       mso-tstyle-rowband-size: 0;
       mso-tstyle-colband-size: 0;
       border-collapse: collapse;
       mso-border-alt: solid windowtext 0.5pt;
       mso-yfti-tbllook: 480;
       mso-padding-alt: 0cm 5.4pt 0cm 5.4pt;
       mso-border-insideh: 0.5pt solid windowtext;
       mso-border-insidev: 0.5pt solid windowtext;
       mso-para-margin: 0cm;
       mso-para-margin-bottom: .0001pt;
       mso-pagination: widow-orphan;
       font-size: 7pt;
       font-family: "Arial";
    }
    table.normalTable td{
       border: solid windowtext 1.0pt;
       border-left: none;
       mso-border-left-alt: solid windowtext .5pt;
       mso-border-alt: solid windowtext .5pt;
       padding: 0cm 5.4pt 0cm 5.4pt;
    }
    
    table.tableWithoutGrid{
       mso-style-name: "Tabela sem grade";
       mso-tstyle-rowband-size: 0;
       mso-tstyle-colband-size: 0;
       border-collapse: collapse;
       border: none;
       mso-border-alt: none;
       mso-yfti-tbllook: 480;
       mso-padding-alt: 0cm 5.4pt 0cm 5.4pt;
       mso-border-insideh: 0.5pt solid windowtext;
       mso-border-insidev: 0.5pt solid windowtext;
       mso-para-margin: 0cm;
       mso-para-margin-bottom: .0001pt;
       mso-pagination: widow-orphan;
       font-size: 7pt;
       font-family: "Arial";
    }
    
    
    -->
    </style>
    </head>
    <body lang="PT-BR" style="tab-interval: 35.4pt">
    <div class="Section1">`
    const htmlF = `</div>
    </body></html>`

    let prev: string[] = [], civ: string[] = [], trab: string[] = []
    let prevResult: string, civResult: string, trabResult: string

    for (let index = 1; index < lista.length; index++) {
        const table = lista[index].querySelector("table")
        
        table.innerHTML = table.innerHTML.replace(/<br>/g,'')

        table.querySelector("tbody > tr:nth-child(1) > td:nth-child(4)").removeAttribute('colspan')

        
        if (table) {
            const html = table.innerHTML
            if (isTrab(html)) {
                trab.push(`<table>${table.innerHTML}</table><p></p><p></p>`)
            } else {
                if (isPrev(html)) {
                    prev.push(`<table>${table.innerHTML}</table><p></p><p></p>`)
                } else {
                    civ.push(`<table>${table.innerHTML}</table><p></p><p></p>`)
                }
            }
        }
    }

    if (prev.length) {
        prev.unshift(htmlI)
        prev.push(htmlF)
        prevResult = prev.join('')
    }

    if (civ.length) {
        civ.unshift(htmlI)
        civ.push(htmlF)
        civResult = civ.join('')
    }

    if (trab.length) {
        trab.unshift(htmlI)
        trab.push(htmlF)
        trabResult = trab.join('')
    }

    return { prevResult, trabResult, civResult }
}

export async function splitISToWord (endereco: string, fileName: string) {
    const HTMLtoDOCX = require('html-to-docx')

    console.log('Processo de extracao iniciado...')
    const caminho = path.resolve(endereco.replace(new RegExp("\\" + fileName, "g"),""))
    console.log(`Caminho: ${caminho}`)
    const data = fs.readFileSync(endereco, {encoding:'latin1', flag:'r'})
    console.log(`Realizado leitura do arquivo ${fileName} no caminho ${endereco}...`)
    const doc = new jsdom.JSDOM(data)
    console.log("Convertido binarios em documento html...")
    const lista = doc.window.document.querySelectorAll("body > div > p")
    let concluido = false
    const date = doc.window.document.querySelector("body > div > p:nth-child(2) > table > tbody > tr:nth-child(1) > td:nth-child(2)").innerHTML.replace('Data Publicação:\n<br><strong>','').replace('</strong>','').replace(/\//g,'')
    let { prevResult, trabResult, civResult } = initAndSetIs(lista)
    
    let result = [], promises = []
    console.log('Inicializado variaveis...')
    
    const documentOptions = {
        margin: {top: 250, right: 250, bottom: 250, left: 250},
        table: {row: {cantSplit: false}},
        pageNumber: true,
        decodeUnicode: true
    }

    if (prevResult.length > 0) {
        let obj = {fileName: `PREV ${date}`, fileBuffer: HTMLtoDOCX(prevResult, null, documentOptions)}
        result.push(obj)
        promises.push(obj.fileBuffer)
        console.log(`Iniciando criacao do documento docx ${obj.fileName}`)
    }
    if (civResult.length > 0) {
        let obj = {fileName: `CIV ${date}`, fileBuffer: HTMLtoDOCX(civResult, null, documentOptions)}
        result.push(obj)
        promises.push(obj.fileBuffer)
        console.log(`Iniciando criacao do documento docx ${obj.fileName}`)
    }
    if (trabResult.length > 0) {
        let obj = {fileName: `TRT ${date}`, fileBuffer: HTMLtoDOCX(trabResult, null, documentOptions)}
        result.push(obj)
        promises.push(obj.fileBuffer)
        console.log(`Iniciando criacao do documento docx ${obj.fileName}`)
    }

    const results = await Promise.all(
        result.map(async (obj) => ({
            ...obj,
            result: await obj.fileBuffer
        }))
    )
    
    results.forEach(e => {
        const filePath = path.resolve(endereco.replace(new RegExp("\\" + fileName, "g"),""), e.fileName +'.docx')
        console.log(`Iniciando escrita do arquivo ${e.fileName} no caminho ${filePath}`)
        fs.writeFile(filePath, e.result, (error) => {
            if (error) {
                console.log('File ' + e.fileName +'.docx creation failed')
                console.log("Erro:" + error)
            }
            console.log('File ' + e.fileName +'.docx created successfully')
            concluido = true
        })
    })

    return concluido
}