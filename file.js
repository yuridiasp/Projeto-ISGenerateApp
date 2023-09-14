const path = require('path')
const fs = require('fs')
const jsdom = require("jsdom")
const HTMLtoDOCX = require('html-to-docx')

function isPrev (is) {
    return ((is.includes('INSS') || is.includes('I N S S') || is.includes('INSTITUTO NACIONAL DE SEGURO SOCIAL')) && !is.includes('TRIBUNAL REGIONAL DO TRABALHO'))
}

function isTrab (is) {
    return (is.includes('TRIBUNAL REGIONAL DO TRABALHO'))
}

(async () => {
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
    const data = fs.readFileSync(path.resolve(__dirname,'47W.doc'),{encoding:'latin1', flag:'r'})
    const doc = new jsdom.JSDOM(data)
    const lista = doc.window.document.querySelectorAll("body > div > p")
    
    let prev = '', civ = '', trab = ''
    prev += htmlI
    civ += htmlI
    trab += htmlI
    for (let index = 1; index < lista.length; index++) {
        const table = lista[index].querySelector("table")
        
        table.innerHTML = table.innerHTML.replaceAll('<br>','')

        table.querySelector("tbody > tr:nth-child(1) > td:nth-child(4)").removeAttribute('colspan')

        
        if (table) {
            const html = table.innerHTML
            if (isPrev(html)) {
                prev += `<table>${table.innerHTML}</table><p></p><p></p>`
            } else {
                if (isTrab(html)) {
                    trab += `<table>${table.innerHTML}</table><p></p><p></p>`
                } else {
                    civ += `<table>${table.innerHTML}</table><p></p><p></p>`
                }
            }
        }

    }
    prev += htmlF
    civ += htmlF
    trab += htmlF
    let result = [], promises = []
    const documentOptions = {
        margin: {top: 250, right: 250, bottom: 250, left: 250},
        table: {row: {cantSplit: false}},
        pageNumber: true,
        decodeUnicode: true
    }
    if (prev.length > 0) {
        let obj = {fileName: 'PREV', fileBuffer: HTMLtoDOCX(prev, null, documentOptions)}
        result.push(obj)
        promises.push(obj.fileBuffer)
    }
    if (civ.length > 0) {
        let obj = {fileName: 'CIV', fileBuffer: HTMLtoDOCX(civ, null, documentOptions)}
        result.push(obj)
        promises.push(obj.fileBuffer)
    }
    if (trab.length > 0) {
        let obj = {fileName: 'TRT', fileBuffer: HTMLtoDOCX(trab, null, documentOptions)}
        result.push(obj)
        promises.push(obj.fileBuffer)
    }

    const results = await Promise.all(
        result.map(async (obj) => ({
            ...obj,
            result: await obj.fileBuffer
        }))
    )
    
    results.forEach(e => {
        const filePath = path.resolve(__dirname, e.fileName +'.docx')

        fs.writeFile(filePath, e.result, (error) => {
            if (error) {
                console.log('File ' + e.fileName +'.docx creation failed')
                return
            }
            console.log('File ' + e.fileName +'.docx created successfully')
        })
    })
})()