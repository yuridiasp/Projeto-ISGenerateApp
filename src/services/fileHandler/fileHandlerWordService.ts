import path from 'path'
import fs from 'fs'
import jsdom from "jsdom"
import HTMLtoDOCX from 'html-to-docx'

import { isPrev, isTRT } from '@services/fileHandler/index'
import { writeWordFileRepository } from '@repositories/word/wordISFile'

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

    let prev: string[] = [], civ: string[] = [], trt: string[] = []
    let prevResult: string, civResult: string, trtResult: string

    for (let index = 1; index < lista.length; index++) {
        const table = lista[index].querySelector("table")
        
        table.innerHTML = table.innerHTML.replace(/<br>/g,'')

        table.querySelector("tbody > tr:nth-child(1) > td:nth-child(4)").removeAttribute('colspan')

        
        if (table) {
            const html = table.innerHTML
            if (isTRT(html)) {
                trt.push(`<table>${table.innerHTML}</table><p></p><p></p>`)
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

    if (trt.length) {
        trt.unshift(htmlI)
        trt.push(htmlF)
        trtResult = trt.join('')
    }

    return { prevResult, trtResult, civResult }
}

export async function splitISToWord (endereco: string, fileName: string) {
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
    let { prevResult, trtResult, civResult } = initAndSetIs(lista)
    
    const result = []
    console.log('Inicializado variaveis...')
    
    const documentOptions = {
        margin: {top: 250, right: 250, bottom: 250, left: 250},
        table: {row: {cantSplit: false}},
        pageNumber: true,
        decodeUnicode: true
    }

    if (prevResult.length) {
        let obj = {fileName: `PREV ${date}`, fileBuffer: HTMLtoDOCX(prevResult, null, documentOptions)}
        result.push(obj)
        console.log(`Iniciando criacao do documento docx ${obj.fileName}`)
    }
    if (civResult.length) {
        let obj = {fileName: `CIV ${date}`, fileBuffer: HTMLtoDOCX(civResult, null, documentOptions)}
        result.push(obj)
        console.log(`Iniciando criacao do documento docx ${obj.fileName}`)
    }
    if (trtResult.length) {
        let obj = {fileName: `TRT ${date}`, fileBuffer: HTMLtoDOCX(trtResult, null, documentOptions)}
        result.push(obj)
        console.log(`Iniciando criacao do documento docx ${obj.fileName}`)
    }

    const wordFileObject = await Promise.all(result.map(async ({ fileName, fileBuffer }) => ({
        fileName,
        fileBuffer: await fileBuffer
    })))

    writeWordFileRepository(wordFileObject, endereco)

    return concluido
}