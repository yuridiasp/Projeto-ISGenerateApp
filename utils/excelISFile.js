const XLSX = require('xlsx')
const { createNewFilePath } = require('./directory')

function readExcelFile(endereco) {
    
    const workbook = XLSX.readFile(endereco)
    
    const sheetName = workbook.SheetNames[0]
    const worksheet = workbook.Sheets[sheetName]
    
    const data = XLSX.utils.sheet_to_json(worksheet)
    
    return data
}

function writeExcelFile({ data, filePath: { endereco, fileName  }, sheetName, prefix = ''}) {

    if (data.length) {
        const newFilePath = createNewFilePath(endereco, prefix + fileName)

        const worksheet = XLSX.utils.json_to_sheet(data)
    
        const workbook = XLSX.utils.book_new()
        XLSX.utils.book_append_sheet(workbook, worksheet, sheetName)
    
        XLSX.writeFile(workbook, newFilePath)

        return [ true, newFilePath ]
    }

    return [ false, null ]
}

module.exports = { readExcelFile, writeExcelFile }