import {
    afterEach,
    beforeEach,
    describe,
    expect,
    jest,
    test
} from "@jest/globals"

import fs from "fs"
import os from "os"
import path from "path"

type PdfGetTextResult = {
    text: string
}


const mockGetText = jest.fn<() => Promise<PdfGetTextResult>>()

const mockDestroy = jest.fn<() => Promise<void>>()


jest.mock(
    "pdf-parse",
    () => ({
        PDFParse: jest.fn()
            .mockImplementation(
                () => ({
                    getText: mockGetText,
                    destroy: mockDestroy
                })
            )
    })
)


import {
    extractRawTextFromPdf
} from "../../src/infrastructure/pdfParse/pdfParse.infrastructure"


describe(
    "extractRawTextFromPdf",
    () => {

        let tempDirectory: string
        let filePath: string


        beforeEach(() => {

            jest.clearAllMocks()

            tempDirectory =
                fs.mkdtempSync(
                    path.join(
                        os.tmpdir(),
                        "isgea-pdf-"
                    )
                )

            filePath =
                path.join(
                    tempDirectory,
                    "arquivo.pdf"
                )

            /*
             * O PDFParse está mockado.
             * O conteúdo físico não precisa ser
             * um PDF verdadeiro neste teste.
             */
            fs.writeFileSync(
                filePath,
                Buffer.from("PDF MOCK")
            )

            mockDestroy
                .mockResolvedValue(undefined)
        })


        afterEach(() => {

            fs.rmSync(
                tempDirectory,
                {
                    recursive: true,
                    force: true
                }
            )
        })


        test(
            "retorna texto extraido do PDF",
            async () => {

                mockGetText
                    .mockResolvedValueOnce({
                        text:
                            "texto extraido do PDF"
                    })

                const result =
                    await extractRawTextFromPdf({
                        filePath,
                        fileName: "arquivo.pdf"
                    })

                expect(result)
                    .toBe(
                        "texto extraido do PDF"
                    )

                expect(
                    mockGetText
                ).toHaveBeenCalledTimes(1)

                expect(
                    mockDestroy
                ).toHaveBeenCalledTimes(1)
            }
        )


        test(
            "rejeita PDF sem camada de texto reconhecivel",
            async () => {

                mockGetText
                    .mockResolvedValueOnce({
                        text: "   "
                    })

                await expect(
                    extractRawTextFromPdf({
                        filePath,
                        fileName: "arquivo.pdf"
                    })
                )
                    .rejects
                    .toThrow(
                        /camada de texto reconhecível|camada de texto reconhecivel/i
                    )

                expect(
                    mockDestroy
                ).toHaveBeenCalledTimes(1)
            }
        )


        test(
            "destroi parser mesmo quando getText falha",
            async () => {

                const parserError =
                    new Error(
                        "erro interno do parser"
                    )

                mockGetText
                    .mockRejectedValueOnce(
                        parserError
                    )

                await expect(
                    extractRawTextFromPdf({
                        filePath,
                        fileName: "arquivo.pdf"
                    })
                )
                    .rejects
                    .toThrow(
                        "erro interno do parser"
                    )

                expect(
                    mockDestroy
                ).toHaveBeenCalledTimes(1)
            }
        )

    }
)