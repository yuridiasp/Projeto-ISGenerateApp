import { FileError, UnknownError } from "@models/errors";
import { AppError } from "@models/errors/appError.models";
import { Result } from "@models/results";
import { splitISToExcel } from "@services/fileHandler/fileHandlerExcel.services"
import { splitISToWord } from "@services/fileHandler/fileHandlerWord.services"
import { iFileData } from "@services/validateIntimations/validateIntimations.services"

type TSplitMethodResult = {
    message: string
}

export async function splitISService ({ filePath, fileName, isXlsx }: iFileData): Promise<Result<TSplitMethodResult>> {
    
    if (filePath && fileName) {
        try {
            const splitResult = isXlsx ? await splitISToExcel(filePath, fileName) : await splitISToWord(filePath, fileName)

            if(splitResult)
                return {
                    success: true,
                    data: {
                        message: 'Arquivos gerados com sucesso! Acesse a pasta do arquivo original.'
                    }
                }
            return {
                success: true,
                data: {
                    message: "Arquivo sem intimações para validar."
                }
            }
        } catch (error) {
            console.error(error)
            const errorMsg = 'UnknownError: ' + error
            return {
                success: false,
                error: new UnknownError(errorMsg)
            }
        }
    }

    return {
        success: false,
        error: new FileError('Erro! Nome ou caminho do arquivo não encontrados.')
    }
}