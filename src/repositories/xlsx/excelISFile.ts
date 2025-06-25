import XLSX from 'xlsx'

import { createNewFilePath } from '../../utils/directory/directory'
import { iExcelFileDTO } from '../../models/file/iExcelFileDTO'
import { Result } from '../../models/result/result'
import { ValidationError } from '../../models/errors/validationError'

type ResultWriteEFile = {
    newFilePath?: string,
    result: boolean
}

export function readExcelFile(endereco: string) {
    
    const workbook = XLSX.readFile(endereco)
    
    const sheetName = workbook.SheetNames[0]
    const worksheet = workbook.Sheets[sheetName]
    
    const data = XLSX.utils.sheet_to_json(worksheet)
    
    return data
}

export function writeExcelFileRepository({ data, filePath: { endereco, fileName  }, sheetName, prefix = ''}: iExcelFileDTO): Result<ResultWriteEFile> {
    
    if (data.length) {
        const newFilePath = createNewFilePath(endereco, prefix + fileName)

        const worksheet = XLSX.utils.json_to_sheet(data)
    
        const workbook = XLSX.utils.book_new()
        XLSX.utils.book_append_sheet(workbook, worksheet, sheetName)
    
        XLSX.writeFile(workbook, newFilePath)

        return {
            success: true,
            data: {
                newFilePath,
                result: true
            }
        }
    }

    return {
        success: false,
        error: new ValidationError('Todas as intimações foram cadastradas! Nenhum arquivo de relatório gerado.')
    }
}