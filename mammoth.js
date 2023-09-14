const mammoth = require("mammoth")
const officegen = require("officegen")

function extractObj (is) {
    let info = is[6]

    for (let index = 7; index < is.length; index++) {
        info += is[index]
    }

    return {
        dataDisponibilizacao: is[0].split(':')[1].trim(),
        dataPublicacao: is[1].split(':')[1].trim(),
        codigo: is[2].split(':')[1].trim(),
        jornal: is[3].split(':')[1].trim(),
        tribunal: is[4].split(':')[1].trim(),
        vara: is[5].split(':')[1].trim(),
        info: info.replaceAll('\n','').trim()
    }
}

function createAndFillTable(data, nome) {
    const docx = officegen({type: "docx", pageMargins: { top: 250, right: 250, bottom: 250, left: 250 }})
    
    data.forEach((item) => {
        let table = [
            [
                [`Data Disponibilização:`, item.dataDisponibilizacao],
                [`Data Publicação:`, item.dataPublicacao],
                [`Código:`, item.codigo],
                [`Jornal:`, item.jornal]
            ]
        ]

        let tableStyle = {
            tableColWidth: 2800,
            tableSize: 24,
            tableColor: "ada",
            tableAlign: "left",
            tableFontFamily: "Times New Roman",
            spacingBefor: 0, // default is 100
            spacingAfter: 0, // default is 100
            spacingLine: 0, // default is 240
            spacingLineRule: 'atLeast', // default is atLeast
            indent: 100, // table indent, default is 0
            fixedLayout: true, // default is false
            borders: true, // default is false. if true, default border size is 4
            borderSize: 2, // To use this option, the 'borders' must set as true, default is 4
            columns: [{ width: 1}, { width: 1 }, { width: 1 }, { width: 1 }], // Table logical columns
        }

        let pObj = docx.createTable(table, tableStyle)
        
        table = [
            [
                [`Tribunal:`, item.tribunal],
                [`Vara:`, item.vara]
            ]
        ]

        tableStyle = {
            tableColWidth: 5600,
            tableSize: 24,
            tableColor: "ada",
            tableAlign: "left",
            tableFontFamily: "Times New Roman",
            spacingBefor: 0, // default is 100
            spacingAfter: 0, // default is 100
            spacingLine: 0, // default is 240
            spacingLineRule: 'atLeast', // default is atLeast
            indent: 100, // table indent, default is 0
            fixedLayout: true, // default is false
            borders: true, // default is false. if true, default border size is 4
            borderSize: 2, // To use this option, the 'borders' must set as true, default is 4
            columns: [{ width: 1}, { width: 1 }], // Table logical columns
        }
        docx.createP().options.font_size = 0.1
        docx.createTable(table, tableStyle)

        pObj = docx.createP({
            align: 'justify'
        })
        pObj.addText(item.info)

        pObj = docx.createP()
        pObj = docx.createP()
    })

    const outputStream = fs.createWriteStream(nome + ".docx");
    docx.generate(outputStream);
}

function mammothJs(dir = { path: path.resolve(__dirname,'47W.doc') }) {

    mammoth.extractRawText(dir).then((result) => {
        
        const textArray = result.value.replaceAll('\t',' ').split('\n\n\n\nData Disponibilização')
        let prev = [], civ = [], trab = []
        textArray.forEach(e => {
            let is = 'Data Disponibilização' + e.replaceAll('\n\n\n\n','\n\n')
            let obj = extractObj(is.split('\n\n'))
            
            if (isPrev(e)) {
                prev.push(obj)
            } else {
                if (isTrab(e)) {
                    trab.push(obj)
                } else {
                    civ.push(obj)
                }
            }
        })
        console.log(prev)
        console.log(civ)
        console.log(trab)
        console.log(`PREV: ${prev.length},CIV: ${civ.length},TRT: ${trab.length}`)
    
        /* if (prev.length > 0)
            createAndFillTable(prev, 'PREV')
        if (civ.length > 0)
            createAndFillTable(civ, 'CIV')
        if (trab.length > 0)
            createAndFillTable(trab, 'TRT') */
        
    }).catch((error) => {
        console.error("Erro ao ler o documento:", error)
    })
}