const fs = require('fs');
const { PDFDocument } = require('pdf-lib');


async function readPDFFile({ endereco }) {
    const existingPdfBytes = fs.readFileSync(endereco)
    
    const pdfDoc = await PDFDocument.load(existingPdfBytes)
    
    const pageCount = pdfDoc.getPageCount()
    console.log(`Número de páginas: ${pageCount}`)
    
    for (let i = 0; i < pageCount; i++) {
      const page = pdfDoc.getPage(i);
      const text = await page.getTextContent();
      console.log(`Conteúdo da página ${i + 1}:`, text.items.map(item => item.str).join(' '))
    }

    return readPdf(filePath)
}

module.exports = { readPDFFile }