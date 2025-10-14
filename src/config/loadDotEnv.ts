import path from 'path'
import dotenv from 'dotenv'
import fs from 'fs'

export function loadDotEnv() {
  // Em dev, o .env está na raiz; em prod, fica em resources ao lado do asar
  const devPath = path.resolve(process.cwd(), ".env");
  const prodPath = path.join(process.resourcesPath, ".env");

  const envPath = fs.existsSync(prodPath) ? prodPath : devPath;
  dotenv.config({ path: envPath });
}