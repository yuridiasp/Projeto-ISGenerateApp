import path from "path"
import { execFileSync } from "child_process"
import { beforeAll, describe, expect, it } from "@jest/globals"

import { dayjsConfig } from "../../src/config/dayjsConfig.config"
import { getDocFromWord, readWordFile } from "../../src/repositories/word/wordISFile.repositories"
import { readExcelFile } from "../../src/repositories/xlsx/excelISFile.repositories"
import { extractPdfDiaryMetadata, normalizePdfDiaryText } from "../../src/helpers/pdfDiaryText.helpers"
import { parsePdfDiaryRecords } from "../../src/services/pdfDiaryParser/pdfDiaryParser.services"
import { parseWordDiaryRecords } from "../../src/services/diaryParser/wordDiaryParser.services"
import { normalizeDiaryText } from "../../src/helpers/diaryText.helpers";

function docPath(fileName: string) {
  return path.resolve(__dirname, "..", "..", "doc", fileName)
}

type readMode = 'PDF' | 'DOCX'

function extractTextWithProjectReader(fileName: string, mode: readMode) {
  const root = path.resolve(__dirname, "..", "..")
  const filePath = docPath(fileName)
  const tsxCli = path.join(root, "node_modules", "tsx", "dist", "cli.mjs")
  const script = mode === 'PDF' as readMode ? `
    import { extractRawTextFromPdf } from "./src/infrastructure/pdfParse/pdfParse.infrastructure.ts";

    (async () => {
      const text = await extractRawTextFromPdf(${JSON.stringify(filePath)});
      process.stdout.write(JSON.stringify({ text }));
    })().catch(error => {
      console.error(error);
      process.exit(1);
    });
  ` : `
    import { extractRawTextFromDocx } from "./src/infrastructure/mammoth/mammoth.infrastructure.ts";

    (async () => {
      const text = await extractRawTextFromDocx(${JSON.stringify(filePath)});
      process.stdout.write(JSON.stringify({ text }));
    })().catch(error => {
      console.error(error);
      process.exit(1);
    });
  `

  const output = execFileSync(process.execPath, [tsxCli, "-e", script], {
    cwd: root,
    encoding: "utf8",
    maxBuffer: 20 * 1024 * 1024
  })

  return JSON.parse(output).text as string
}

describe("leitura de documentos reais da pasta doc", () => {
  beforeAll(() => {
    dayjsConfig()
  })

  it("le e estrutura intimacoes de um DOCX de IS", async () => {
    const records = await readWordFile(
      docPath("PREV30092025.docx"),
      "PREV30092025"
    )

    expect(records.length).toBeGreaterThan(0)
    expect(records).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          case_number: expect.stringMatching(/^\d{12,20}$/),
          description: expect.any(String),
          internal_deadline: expect.stringMatching(/^\d{2}\/\d{2}\/\d{4}$/),
          fatal_deadline: expect.stringMatching(/^\d{2}\/\d{2}\/\d{4}$/),
          executor: expect.any(String),
          paragraph: expect.any(String)
        })
      ])
    )
    expect(records.every(record => record.publication_date?.isValid())).toBe(true)
  })

  it("abre um DOC antigo salvo como HTML do Word", async () => {
    const dom = await getDocFromWord(docPath("47.doc"), "47")

    expect(dom.window.document.querySelectorAll("body table").length).toBeGreaterThan(0)
    expect(dom.window.document.body.textContent).toContain("Data")
  })

  it("le planilha do Recorte Digital e preserva a linha original", () => {
    const records = readExcelFile(
      docPath("RECORTE DIGITAL_BA-GO-DF - DISP 01-10-2025.xlsx")
    )

    expect(records.length).toBeGreaterThan(0)
    expect(records).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          case_number: expect.stringMatching(/^\d+$/),
          publication_date: expect.any(Object),
          availability_date: expect.any(Object),
          isRecorte: true,
          objectRecorte: expect.objectContaining({
            "NRO. PROCESSO": expect.any(String)
          })
        })
      ])
    )
  })

  it("extrai registros de um PDF SERDIJUL", async () => {
    const rawText = extractTextWithProjectReader("SERIJDUL TRT20 01062026.pdf", "PDF")
    const metadata = extractPdfDiaryMetadata(rawText)
    const records = parsePdfDiaryRecords(normalizePdfDiaryText(rawText), metadata)

    expect(records.length).toBeGreaterThan(0)
    expect(records).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          layout: "SERDIJUL",
          processo: expect.stringMatching(/^\d{7}-\d{2}\.\d{4}\.\d\.\d{2}\.\d{4}$/),
          orgao: expect.any(String),
          dataDisponibilizacao: expect.any(String),
          conteudo: expect.any(String)
        })
      ])
    )
  }, 30000)

  it("extrai registros de um PDF IS", async () => {
    const rawText = extractTextWithProjectReader("IS JFSE 08052026.pdf", "PDF")
    const metadata = extractPdfDiaryMetadata(rawText)
    const records = parsePdfDiaryRecords(normalizePdfDiaryText(rawText), metadata)

    expect(records.length).toBeGreaterThan(0)
    expect(records).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          layout: "DEFAULT",
          processo: expect.stringMatching(/^\d{7}-\d{2}\.\d{4}\.\d\.\d{2}\.\d{4}$/),
          orgao: expect.any(String),
          dataDisponibilizacao: expect.any(String),
          conteudo: expect.any(String)
        })
      ])
    )
  }, 30000)

  it("extrai registros de um DOCX IS", async () => {
    const rawText = extractTextWithProjectReader("TRT30092025 - Cadastrados.docx", "DOCX")
    const records = parseWordDiaryRecords(normalizeDiaryText(rawText))
    expect(records.length).toBeGreaterThan(0)
    expect(records).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          layout: "WORD_CADASTRADO",
          processo: expect.stringMatching(/^\d{7}-\d{2}\.\d{4}\.\d\.\d{2}\.\d{4}$/),
          orgao: expect.any(String),
          dataDisponibilizacao: expect.any(String),
          conteudo: expect.any(String)
        })
      ])
    )
  }, 30000)
})
