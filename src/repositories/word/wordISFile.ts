import path from 'path'
import fs from 'fs'
import mammoth from 'mammoth'
import { JSDOM } from "jsdom"
import iconv from "iconv-lite"

import { Result } from '@models/results'
import { ValidationError } from '@models/errors'
import { ISAnalysisDTO } from '@models/clientes'

type DocKind = "docx" | "html" | "unknown"

function detectDocKind(buf: Buffer): DocKind {
  // DOCX é um ZIP: 50 4B 03 04 (ou 50 4B 05 06 / 50 4B 07 08)
  const isZip =
    buf.length >= 4 &&
    buf[0] === 0x50 &&
    buf[1] === 0x4b &&
    (buf[2] === 0x03 || buf[2] === 0x05 || buf[2] === 0x07) &&
    (buf[3] === 0x04 || buf[3] === 0x06 || buf[3] === 0x08);

  if (isZip) return "docx";

  // Heurística de HTML: presença de <html, <!doctype html, ou meta content-type
  const head = buf.slice(0, Math.min(buf.length, 4096)).toString("utf8").toLowerCase();
  if (
    head.includes("<html") ||
    head.includes("<!doctype html") ||
    head.includes("content-type: text/html") ||
    head.includes("microsoft office html")
  ) {
    return "html";
  }

  return "unknown";
}

function detectHtmlCharset(htmlHead: string): string {
  // tenta <meta charset="..."> ou <meta http-equiv="Content-Type" content="text/html; charset=...">
  const m1 = htmlHead.match(/<meta[^>]*charset=["']?\s*([\w-]+)\s*["']?/i);
  if (m1?.[1]) return m1[1].toLowerCase();

  const m2 = htmlHead.match(/content=["'][^"']*charset=([\w-]+)[^"']*["']/i);
  if (m2?.[1]) return m2[1].toLowerCase();

  return "utf-8"; // padrão razoável
}

export async function getDocFromWord(endereco: string, fileName: string) {

  const caminho = path.resolve(endereco.replace(new RegExp("\\" + fileName, "g"), ""));

  // Leia como Buffer SEM encoding para detectar corretamente
  const buf = fs.readFileSync(endereco);

  const kind = detectDocKind(buf);

  if (kind === "docx") {
    // Fluxo DOCX → mammoth
    const { value: html } = await mammoth.convertToHtml({ path: endereco });
    return new JSDOM(html);
  }

  if (kind === "html") {
    // Fluxo HTML → JSDOM, respeitando charset quando possível
    const headUtf8 = buf.slice(0, Math.min(buf.length, 8192)).toString("utf8");
    const charset = detectHtmlCharset(headUtf8);
    const html = iconv.decode(buf, charset);
    return new JSDOM(html);
  }

  // Caso desconhecido: opcionalmente você pode tentar fallback ou lançar erro claro
  throw new Error(
    "Formato do arquivo não reconhecido como DOCX (zip) ou HTML. Verifique se não é um .doc binário antigo (OLE)."
  );
}

export async function readWordFile(endereco: string, fileName: string): Promise<ISAnalysisDTO[]> {
    const resetObjectIS = (): ISAnalysisDTO => ({
        case_number: null,
        description: null,
        publication_date: null,
        related_case_number: null,
        internal_deadline: null,
        fatal_deadline: null,
        time: null,
        expert_or_defendant: null,
        local_adress: null,
        dataCliente: undefined,
        dataProcesso: undefined,
        executor: null,
        separate_task: null,
        justification: null,
        paragraph: null,
    })
    
    let results: ISAnalysisDTO[] = [], object: ISAnalysisDTO = resetObjectIS(), date = ""
    
    const doc = await getDocFromWord(endereco, fileName)
    
    const regexCaseNumber = /\d{12,20}(?=\s(\-|\–)\s)/
    const regexCaseNumberOrigin = /\d{12,20}(?=\s\(ORIGEM)/
    const regexDescription = /\s[-–]\s(.+?)\s[-–]\s\(/
    const regexCasePublicationDate = /^(\d\d\/\d\d\/\d{4})/
    const regexDefendant = /(?<=RÉU:\s)(.+?)(?=LOCAL:)/
    const regexLocal = /(?<=LOCAL:\s)([\w\W]+)$/
    const regexExpert = /(?<=PERITO:)(.+?)(?=LOCAL:)/
    const regexInternalDeadline = /\d\d\/\d\d\/\d{4}(?=\s[-–]\s\d\d\/\d\d\/\d{4})/
    const regexFatalDeadline = /(?<=\d\d\/\d\d\/\d{4}\s[-–]\s)\d\d\/\d\d\/\d{4}/
    const regexTime = /(?<=\d\d\/\d\d\sÀS\s)\d\d:\d\d/
    const regexExecutor = /(?<=\d{12,20}\s(\(ORIGEM\s\d{12,20}\)\s)?[-–]\s(.+?)\s[-–]\s(\(\d\d\/\d\d\/\d{4}\s((ÀS\s\d\d:\d\d)|([-–]\s\d\d\/\d\d\/\d{4}))\))\s[-–]\s)(.*?)(?=(?:PERITO:|RÉU:|$))/
    
    doc.window.document.querySelectorAll("p").forEach(paragraph => {
        const hasOriginCaseNumber = regexCaseNumberOrigin.test(paragraph.textContent)
        if (regexCaseNumber.test(paragraph.textContent) || hasOriginCaseNumber) {
            const defendant = paragraph.textContent.match(regexDefendant)
            const description = paragraph.textContent.match(regexDescription)
            const local = paragraph.textContent.match(regexLocal)
            const expert = paragraph.textContent.match(regexExpert)
            const internalDeadline = paragraph.textContent.match(regexInternalDeadline)
            const fatalDeadline = paragraph.textContent.match(regexFatalDeadline)
            const time = paragraph.textContent.match(regexTime)
            const executor = paragraph.textContent.match(regexExecutor)

            if (hasOriginCaseNumber) {
                const [ dependente, origem ] = paragraph.textContent.match(/\d{12,20}(?=\s\(ORIGEM (\d{12,20}))/)
                object.case_number = origem?.trim()
                object.related_case_number = dependente?.trim()
            } else {
                object.case_number = paragraph.textContent.match(regexCaseNumber)[0]?.trim()
            }

            if(defendant)
                object.expert_or_defendant = defendant[0]?.trim()

            if(local)
                object.local_adress = local[0]?.trim()

            if(description)
                object.description = description[1]?.trim()

            if(expert)
                object.expert_or_defendant = expert[0]?.trim()

            if(internalDeadline)
                object.internal_deadline = internalDeadline[0]?.trim()

            if(fatalDeadline)
                object.fatal_deadline = fatalDeadline[0]?.trim()

            if(time)
                object.time = time[0]?.trim()

            if(executor)
                object.executor = executor[0]?.trim()

            object.publication_date = date
            object.paragraph = paragraph.textContent

            results.push({ ...object })

            object = resetObjectIS()
        } else {
            const casePublicationDate = regexCasePublicationDate.test(paragraph.textContent)
            if(casePublicationDate)
                date = paragraph.textContent
        }
    })
    
    return results.filter(result => result.case_number.length && result.description.length)
}

type BufferLike = ArrayBuffer | ArrayBufferView | Blob | Buffer;

export async function converterBuffer(fileBuffer: BufferLike): Promise<Result<Buffer>> {
    // 1) Já é Buffer do Node?
    if (typeof Buffer !== 'undefined' && Buffer.isBuffer(fileBuffer)) {
        return { success: true, data: fileBuffer }
    }

    // 2) É Blob (Node 18+/browser)? Use arrayBuffer()
    if (typeof (fileBuffer as any)?.arrayBuffer === 'function') {
        const ab = await (fileBuffer as Blob).arrayBuffer()
        return { success: true, data: Buffer.from(ab) }
    }

    // 3) É ArrayBuffer puro?
    if (fileBuffer instanceof ArrayBuffer) {
        return { success: true, data: Buffer.from(fileBuffer) }
    }

    // 4) É uma View (Uint8Array, DataView, etc.)?
    if (ArrayBuffer.isView(fileBuffer)) {
        const view = fileBuffer as ArrayBufferView
        const slice = view.buffer.slice(view.byteOffset, view.byteOffset + view.byteLength)
        return { success: true, data: Buffer.from(slice) }
    }

        // 5) Diagnóstico: log mais útil
        console.log('converterBuffer: tipo inesperado', {
        toStringTag: Object.prototype.toString.call(fileBuffer),
        ctor: (fileBuffer as any)?.constructor?.name
    })

    return {
        success: false,
        error: new ValidationError('Tipo de fileBuffer inesperado.')
    }
}


export async function writeWordFileRepository(wordFileObjects: {
    fileName: string;
    fileBuffer: ArrayBuffer | Blob;
}[], endereco: string, originalName: string) {
    return await Promise.all(wordFileObjects.map(async ({ fileName, fileBuffer })=> {
        const resultBuffer =  await converterBuffer(fileBuffer)

        if(resultBuffer.success === false) {
            return {
                success: false,
                error: resultBuffer.error
            }
        }

        const filePath = path.resolve(path.dirname(endereco), fileName +'.docx')

        try {
            fs.writeFileSync(filePath, resultBuffer.data as Uint8Array)
            return true
        } catch (error) {
            console.log('File ' + fileName +'.docx creation failed')
            console.log("Erro:" + error)
        }
        
        return false
    }))
}