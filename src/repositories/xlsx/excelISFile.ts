import XLSX from 'xlsx'
import { createNewFilePath } from '../../utils/directory/directory'
import { iExcelFileDTO } from 'src/models/file/iExcelFileDTO'
import { iWriteFileResponse } from 'src/models/file/iWriteFileResponse'

export function readExcelFile(endereco: string) {
    
    const workbook = XLSX.readFile(endereco)
    
    const sheetName = workbook.SheetNames[0]
    const worksheet = workbook.Sheets[sheetName]
    
    const data = XLSX.utils.sheet_to_json(worksheet)
    
    return data
}

export function writeExcelFileService({ data, filePath: { endereco, fileName  }, sheetName, prefix = ''}: iExcelFileDTO): iWriteFileResponse {
    
    if (data.length) {
        const newFilePath = createNewFilePath(endereco, prefix + fileName)

        const worksheet = XLSX.utils.json_to_sheet(data)
    
        const workbook = XLSX.utils.book_new()
        XLSX.utils.book_append_sheet(workbook, worksheet, sheetName)
    
        XLSX.writeFile(workbook, newFilePath)

        return { result: true, newFilePath }
    }

    return { result: false, newFilePath: null }
}