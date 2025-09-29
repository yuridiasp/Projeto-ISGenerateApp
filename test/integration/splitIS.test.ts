import path from 'path'
import { describe, expect, it, afterAll } from '@jest/globals'
import fs from 'fs'

import { getFileDataSplit, getFileData } from './utils/getFileData'
import { splitISService } from '../../src/services/splitIS/splitISService'

describe("Dividir arquivos de IS por natureza a partir de um único arquivo de IS", () => {
    const files = [{filename: "47", publication: "29092025" }]

    afterAll(() => {
        files.forEach(({ publication }) => {
            getFileDataSplit(publication).forEach(([ fileNameReport, fileData ]) => {
                const fileExists = fs.existsSync(fileData.filePath)
                
                if(fileExists) {
                    try {
                        fs.unlinkSync(fileData.filePath)
                        console.log("Arquivo removido!")
                    } catch (error) {
                        console.log("Erro ao remover arquivo: ", error)
                    }
                } else {
                    console.log("Arquivo não encontrado.")
                    console.log("Caminho: ", fileData.filePath)
                }
            })
        })
    })

    it("Arquivos divididos com sucesso para word", async () => {
        const index = 0
        const [ fileNameDoc, fileData ] = getFileData(files[index].filename, ".doc", false)
        
        const result = await splitISService(fileData)
        
        getFileDataSplit(files[index].publication).forEach(([ fileName, fileData ]) => {
            const filePath = path.join(fileData.filePath)
            const fileExists = fs.existsSync(filePath)
    
            expect(fileExists).toBeTruthy()
        })

        expect(result).toEqual({ msg: 'Arquivos gerados com sucesso! Acesse a pasta do arquivo original.', value: true })
    }, 20000)
})