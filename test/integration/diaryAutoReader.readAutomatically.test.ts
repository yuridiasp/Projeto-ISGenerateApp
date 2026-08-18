import {
    beforeAll,
    describe,
    expect,
    test
} from "@jest/globals"

import path from "path"
import { execFileSync } from "child_process"

import {
    dayjsConfig
} from "../../src/config/dayjsConfig.config"

import {
    readDiaryAutomatically
} from "../../src/services/diaryAutoReader/diaryAutoReader.services"


function docPath(
    fileName: string
): string {

    return path.resolve(
        __dirname,
        "..",
        "..",
        "doc",
        fileName
    )
}


function readDiaryAutomaticallyInProjectProcess(
    fileName: string
) {
    const root =
        path.resolve(
            __dirname,
            "..",
            ".."
        )

    const filePath =
        docPath(fileName)

    const fileData = {
        filePath,
        fileName:
            path.basename(filePath)
    }

    const tsxCli =
        path.join(
            root,
            "node_modules",
            "tsx",
            "dist",
            "cli.mjs"
        )

    const script = `
        import { dayjsConfig } from "./src/config/dayjsConfig.config.ts";
        import { readDiaryAutomatically } from "./src/services/diaryAutoReader/diaryAutoReader.services.ts";

        (async () => {
          dayjsConfig();
          console.log = () => {};
          const records = await readDiaryAutomatically(${JSON.stringify(fileData)});
          process.stdout.write(JSON.stringify({ records }));
        })().catch(error => {
          console.error(error);
          process.exit(1);
        });
    `

    const output =
        execFileSync(
            process.execPath,
            [
                tsxCli,
                "-e",
                script
            ],
            {
                cwd: root,
                encoding: "utf8",
                maxBuffer:
                    20 * 1024 * 1024
            }
        )

    return JSON.parse(output)
        .records
}


describe(
    "readDiaryAutomatically - integracao",
    () => {

        beforeAll(() => {
            dayjsConfig()
        })


        test(
            "identifica e processa PDF SERDIJUL automaticamente",
            async () => {

                const records =
                    readDiaryAutomaticallyInProjectProcess(
                        "SERIJDUL TRT20 01062026.pdf"
                    )

                expect(
                    records.length
                ).toBeGreaterThan(0)

                expect(records).toEqual(
                    expect.arrayContaining([
                        expect.objectContaining({
                            layout: "SERDIJUL",

                            processo:
                                expect.stringMatching(
                                    /^\d{7}-\d{2}\.\d{4}\.\d\.\d{2}\.\d{4}$/
                                ),

                            orgao:
                                expect.any(String),

                            dataDisponibilizacao:
                                expect.any(String),

                            conteudo:
                                expect.any(String)
                        })
                    ])
                )
            },
            30000
        )


        test(
            "identifica e processa PDF exportado pelo IS automaticamente",
            async () => {

                const records =
                    readDiaryAutomaticallyInProjectProcess(
                        "IS JFSE 08052026.pdf"
                    )

                expect(
                    records.length
                ).toBeGreaterThan(0)

                /*
                 * O identificador classifica o documento
                 * físico como PDF_IS_PROCESSOS.
                 *
                 * Os registros produzidos pelo parser
                 * atualmente usam layout DEFAULT.
                 */
                expect(records).toEqual(
                    expect.arrayContaining([
                        expect.objectContaining({
                            layout: "DEFAULT",

                            processo:
    expect.stringMatching(
        /^\d{7}-\d{2}\.\d{4}\.\d\.\d{2}\.\d{4}$/
    ),

                            orgao:
                                expect.any(String),

                            dataDisponibilizacao:
                                expect.any(String),

                            conteudo:
                                expect.any(String)
                        })
                    ])
                )
            },
            30000
        )


        test(
            "identifica e processa DOCX cadastrado automaticamente",
            async () => {

                const filePath =
                    docPath(
                        "TRT30092025 - Cadastrados.docx"
                    )

                const records =
                    await readDiaryAutomatically({
                        filePath,

                        fileName:
                            path.basename(filePath)
                    })

                expect(
                    records.length
                ).toBeGreaterThan(0)

                expect(records).toEqual(
                    expect.arrayContaining([
                        expect.objectContaining({
                            layout:
                                "WORD_CADASTRADO",

                            processo:
                                expect.stringMatching(/^\d{20}$/),

                            orgao:
                                expect.any(String),

                            dataDisponibilizacao:
                                expect.any(String),

                            conteudo:
                                expect.any(String)
                        })
                    ])
                )
            }, 30000)

            test("processa SERDIJUL DOCX automaticamente", async () => {
                const filePath = docPath("SERDIJUL TJSE 13082026.docx");

                const records = await readDiaryAutomatically({
                    filePath,
                    fileName: path.basename(filePath)
                });

                expect(records.length).toBeGreaterThan(0);

                const record = records.find(
                item =>
                    item.processo ===
                    "5006405-28.2026.8.25.0084"
                );

                expect(record).toBeDefined();

                expect(record).toMatchObject({
                layout: "SERDIJUL",
                processo: "5006405-28.2026.8.25.0084",
                tipoComunicacao: "Intimacao"
                });
            }, 30000);
    }
)
