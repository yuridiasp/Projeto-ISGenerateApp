import path from 'path'
import fs from 'fs'
import mammoth from 'mammoth'
import { JSDOM } from "jsdom"
import iconv from "iconv-lite";

import { Result } from '@models/result/result';
import { ValidationError } from '@models/errors/validationError';
import { iCompromissoFromFile } from '@models/compromisso/iCompromissoFromFile';

type DocKind = "docx" | "html" | "unknown";

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
  console.log("Processo de extracao iniciado...");

  const caminho = path.resolve(endereco.replace(new RegExp("\\" + fileName, "g"), ""));
  console.log(`Caminho: ${caminho}`);

  // Leia como Buffer SEM encoding para detectar corretamente
  const buf = fs.readFileSync(endereco);

  const kind = detectDocKind(buf);
  console.log(`Tipo detectado: ${kind}`);

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

export async function readWordFile(endereco: string, fileName: string) {
    // case_number, description, publication_date
    let results: iCompromissoFromFile[] = [], object: iCompromissoFromFile = {
        case_number: "",
        description: "",
        publication_date: "",
        paragraph: ""
    }, date = ""
    
    const doc = await getDocFromWord(endereco, fileName)
    
    const regexCaseNumber = /\d{12,20}(?=\s(\-|\–)\s)/
    const regexDescription = /\s[-–]\s([\w\W]+?)\s[-–]\s\(/
    const regexCasePublicationDate = /^(\d\d\/\d\d\/\d\d\d\d)/

    doc.window.document.querySelectorAll("p").forEach(paragraph => {
        if (regexCaseNumber.test(paragraph.textContent)) {
            const caseNumber = paragraph.textContent.match(regexCaseNumber)
            const description = paragraph.textContent.match(regexDescription)
            if(caseNumber)
                object.case_number = caseNumber[0]
            if(description)
                object.description = description[1]

            object.publication_date = date
            object.paragraph = paragraph.textContent

            results.push({ ...object })

            object = {
                case_number: "",
                description: "",
                publication_date: ""
            }
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
        console.log(`Iniciando escrita do arquivo ${fileName} no caminho ${filePath}`)
        fs.writeFile(filePath, resultBuffer.data as Uint8Array, (error) => {
            if (error) {
                console.log('File ' + fileName +'.docx creation failed')
                console.log("Erro:" + error)
            } else {
                console.log('File ' + fileName +'.docx created successfully')
            }
        })
        
        return true
    }))
}