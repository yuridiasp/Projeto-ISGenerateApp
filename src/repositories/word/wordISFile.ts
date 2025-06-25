import path from 'path'
import fs from 'fs'

import { Result } from '@models/result/result';
import { ValidationError } from '@models/errors/validationError';

export async function converterBuffer(fileBuffer: ArrayBuffer | Blob): Promise<Result<Buffer>> {
    if(fileBuffer instanceof ArrayBuffer) {
        return {
            success: true,
            data: Buffer.from(fileBuffer)
        }
    } else if (fileBuffer instanceof Blob) {
        const arrayBuffer = await (fileBuffer as Blob).arrayBuffer();
        return {
            success: true,
            data: Buffer.from(arrayBuffer)
        }
    } else {
        return {
            success: false,
            error: new ValidationError('Tipo de fileBuffer inesperado.')
        }
    }
}

export function writeWordFileRepository(wordFileObjects: {
    fileName: string;
    fileBuffer: ArrayBuffer | Blob;
}[], endereco: string) {
    wordFileObjects.forEach(async ({ fileName, fileBuffer })=> {
        const resultBuffer =  await converterBuffer(fileBuffer)

        if(resultBuffer.success === false) {
            return {
                success: false,
                error: resultBuffer.error
            }
        }
        
        const filePath = path.resolve(endereco.replace(new RegExp("\\" + fileName, "g"),""), fileName +'.docx')
        console.log(`Iniciando escrita do arquivo ${fileName} no caminho ${filePath}`)
        fs.writeFile(filePath, resultBuffer.data as Uint8Array, (error) => {
            if (error) {
                console.log('File ' + fileName +'.docx creation failed')
                console.log("Erro:" + error)
            }
            console.log('File ' + fileName +'.docx created successfully')
        })
    })

    return true
}