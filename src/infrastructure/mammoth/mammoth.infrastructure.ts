import { iFileData } from "@services/validateIntimations";
import fs from "fs";
import mammoth from "mammoth";
import iconv from "iconv-lite";
import { JSDOM } from "jsdom";

type WordDocumentKind =
  | "docx"
  | "html"
  | "ole"
  | "unknown";

function isZip(buffer: Buffer): boolean {
  return (
    buffer.length >= 4 &&
    buffer[0] === 0x50 &&
    buffer[1] === 0x4b &&
    (buffer[2] === 0x03 ||
      buffer[2] === 0x05 ||
      buffer[2] === 0x07) &&
    (buffer[3] === 0x04 ||
      buffer[3] === 0x06 ||
      buffer[3] === 0x08)
  );
}

function isOleCompoundDocument(buffer: Buffer): boolean {
  const signature = [
    0xd0,
    0xcf,
    0x11,
    0xe0,
    0xa1,
    0xb1,
    0x1a,
    0xe1
  ];

  if (buffer.length < signature.length) {
    return false;
  }

  return signature.every(
    (byte, index) => buffer[index] === byte
  );
}

function isHtml(buffer: Buffer): boolean {
  const head = buffer
    .slice(0, Math.min(buffer.length, 8192))
    .toString("utf8")
    .toLowerCase();

  return (
    head.includes("<html") ||
    head.includes("<!doctype html") ||
    head.includes("content-type: text/html") ||
    head.includes("microsoft office html")
  );
}

function detectWordDocumentKind(
  buffer: Buffer
): WordDocumentKind {
  if (isZip(buffer)) {
    return "docx";
  }

  if (isHtml(buffer)) {
    return "html";
  }

  if (isOleCompoundDocument(buffer)) {
    return "ole";
  }

  return "unknown";
}

function detectHtmlCharset(
  htmlHead: string
): string {
  const charsetMeta = htmlHead.match(
    /<meta[^>]*charset=["']?\s*([\w-]+)\s*["']?/i
  );

  if (charsetMeta?.[1]) {
    return charsetMeta[1].toLowerCase();
  }

  const contentTypeMeta = htmlHead.match(
    /content=["'][^"']*charset=([\w-]+)[^"']*["']/i
  );

  if (contentTypeMeta?.[1]) {
    return contentTypeMeta[1].toLowerCase();
  }

  return "utf-8";
}

async function extractRawTextFromDocxBuffer(
  buffer: Buffer
): Promise<string> {
  const result = await mammoth.extractRawText({
    buffer
  });

  return result.value;
}

function extractRawTextFromHtmlBuffer(
  buffer: Buffer
): string {
  const head = buffer
    .slice(0, Math.min(buffer.length, 8192))
    .toString("utf8");

  const charset = detectHtmlCharset(head);

  const html = iconv.decode(buffer, charset);

  const dom = new JSDOM(html);

  return (
    dom.window.document.body.textContent ??
    dom.window.document.documentElement.textContent ??
    ""
  );
}

export async function extractRawTextFromWord(
  file: iFileData
): Promise<string> {
  const buffer = await fs.promises.readFile(
    file.filePath
  );

  const kind = detectWordDocumentKind(buffer);

  switch (kind) {
    case "docx":
      return extractRawTextFromDocxBuffer(buffer);

    case "html":
      return extractRawTextFromHtmlBuffer(buffer);

    case "ole":
      throw new Error(
        "Arquivo .doc binário antigo (OLE) não suportado. " +
        "Converta o documento para DOCX antes de processá-lo."
      );

    default:
      throw new Error(
        "Formato Word não reconhecido. " +
        "O arquivo não é DOCX nem HTML compatível com Word."
      );
  }
}

/**
 * Mantido por compatibilidade com chamadas existentes.
 */
export async function extractRawTextFromDocx(
  file: iFileData
): Promise<string> {
  return extractRawTextFromWord(file);
}