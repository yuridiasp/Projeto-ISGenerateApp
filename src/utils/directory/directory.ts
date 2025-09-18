import path from 'path'
import fs from 'fs'

function ensureDir(dir: string) {
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true })
}

export function buildXlsxPath(endereco: string, fileName: string, prefix: string) {
    const dir = path.dirname(endereco)
    const base = path.parse(fileName).name // remove .doc/.docx do nome
    const outName = `${prefix}${base}.xlsx` // força extensão .xlsx
    ensureDir(dir)
    return path.join(dir, outName)
}