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
import mammoth from "mammoth"

import {
    extractRawTextFromWord
} from "../../src/infrastructure/mammoth/mammoth.infrastructure"


jest.mock(
    "mammoth",
    () => ({
        __esModule: true,

        default: {
            extractRawText: jest.fn()
        }
    })
)


describe(
    "extractRawTextFromWord",
    () => {

        let tempDirectory: string

        const mammothExtractRawText =
            jest.mocked(
                mammoth.extractRawText
            )


        beforeEach(() => {

            jest.clearAllMocks()

            tempDirectory =
                fs.mkdtempSync(
                    path.join(
                        os.tmpdir(),
                        "isgea-word-"
                    )
                )
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
            "identifica DOCX pela assinatura ZIP e usa Mammoth",
            async () => {

                const filePath =
                    path.join(
                        tempDirectory,
                        "arquivo.docx"
                    )

                /*
                 * Assinatura ZIP:
                 * 50 4B 03 04
                 */
                const fakeDocx = Buffer.from([
                    0x50,
                    0x4b,
                    0x03,
                    0x04,
                    0x00,
                    0x00,
                    0x00,
                    0x00
                ])

                fs.writeFileSync(
                    filePath,
                    fakeDocx
                )

                mammothExtractRawText
                    .mockResolvedValueOnce({
                        value:
                            "texto extraido do DOCX",
                        messages: []
                    })

                const result =
                    await extractRawTextFromWord({
                        filePath,
                        fileName: "arquivo.docx"
                    })

                expect(result)
                    .toBe(
                        "texto extraido do DOCX"
                    )

                expect(
                    mammothExtractRawText
                ).toHaveBeenCalledTimes(1)

                expect(
                    mammothExtractRawText
                ).toHaveBeenCalledWith(
                    expect.objectContaining({
                        buffer:
                            expect.any(Buffer)
                    })
                )
            }
        )


        test(
            "identifica arquivo DOC salvo como HTML do Word",
            async () => {

                const filePath =
                    path.join(
                        tempDirectory,
                        "arquivo.doc"
                    )

                const html = `
                    <!doctype html>
                    <html>
                        <head>
                            <meta charset="utf-8">
                        </head>

                        <body>
                            <p>
                                Data Disponibilizacao:
                                31/05/2026
                            </p>

                            <p>
                                Texto do documento
                            </p>
                        </body>
                    </html>
                `

                fs.writeFileSync(
                    filePath,
                    Buffer.from(
                        html,
                        "utf8"
                    )
                )

                const result =
                    await extractRawTextFromWord({
                        filePath,
                        fileName: "arquivo.doc"
                    })

                expect(result)
                    .toContain(
                        "Data Disponibilizacao"
                    )

                expect(result)
                    .toContain(
                        "Texto do documento"
                    )

                expect(
                    mammothExtractRawText
                ).not.toHaveBeenCalled()
            }
        )


        test(
            "rejeita DOC binario antigo OLE com mensagem clara",
            async () => {

                const filePath =
                    path.join(
                        tempDirectory,
                        "arquivo.doc"
                    )

                const oleSignature =
                    Buffer.from([
                        0xd0,
                        0xcf,
                        0x11,
                        0xe0,
                        0xa1,
                        0xb1,
                        0x1a,
                        0xe1,
                        0x00,
                        0x00
                    ])

                fs.writeFileSync(
                    filePath,
                    oleSignature
                )

                await expect(
                    extractRawTextFromWord({
                        filePath,
                        fileName: "arquivo.doc"
                    })
                )
                    .rejects
                    .toThrow(/OLE/i)

                expect(
                    mammothExtractRawText
                ).not.toHaveBeenCalled()
            }
        )


        test(
            "rejeita formato Word desconhecido",
            async () => {

                const filePath =
                    path.join(
                        tempDirectory,
                        "arquivo.doc"
                    )

                fs.writeFileSync(
                    filePath,
                    Buffer.from(
                        "arquivo sem formato reconhecido"
                    )
                )

                await expect(
                    extractRawTextFromWord({
                        filePath,
                        fileName: "arquivo.doc"
                    })
                )
                    .rejects
                    .toThrow(
                        /formato Word não reconhecido|formato Word nao reconhecido/i
                    )

                expect(
                    mammothExtractRawText
                ).not.toHaveBeenCalled()
            }
        )

    }
)