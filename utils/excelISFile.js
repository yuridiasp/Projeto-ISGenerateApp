const XLSX = require('xlsx')
const { createNewFilePath } = require('./directory')

function readExcelFile(endereco) {
    
    const workbook = XLSX.readFile(endereco)
    
    const sheetName = workbook.SheetNames[0]
    const worksheet = workbook.Sheets[sheetName]
    
    const data = XLSX.utils.sheet_to_json(worksheet)
    console.log(data);
    
    return data
}

function writeExcelFile(validations, { endereco, fileName  }) {
    const notRegisteredIntimations = validations.filter(validation => !validation.isRegistered)

    if (notRegisteredIntimations.length) {
        const newFilePath = createNewFilePath(endereco, 'RELATORIO-REGISTRO-INTIMACAO-' + fileName)

        const worksheet = XLSX.utils.json_to_sheet(notRegisteredIntimations)
    
        const workbook = XLSX.utils.book_new()
        XLSX.utils.book_append_sheet(workbook, worksheet, "Relatório")
    
        XLSX.writeFile(workbook, newFilePath)

        const pluralOrSingularForIntimacao = notRegisteredIntimations.length > 1 ? 'intimações' : 'intimação'

        return `Encontrado ${notRegisteredIntimations.length} ${pluralOrSingularForIntimacao} sem cadastro. Exportado relatório no caminho: ${newFilePath}`
    }

    return 'Todas as intimações foram cadastradas! Nenhum arquivo de relatório gerado.'

}

module.exports = { readExcelFile, writeExcelFile }