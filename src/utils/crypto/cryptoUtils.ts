import crypto from 'crypto'

export function getKey(key: string): string {
  const raw = process.env[key];
  if (!raw) {
    // Não deixe estourar dentro de Buffer.from
    throw new Error(`${key} ausente. Verifique o .env em produção.`);
  }
  return raw
}


export function encrypt(text: string) {
    const ivnum = Number(getKey(process.env.IVNUM))
    const iv = crypto.randomBytes(ivnum)
    const algorithm = getKey(process.env.ALGORITHM)
    const secretKey = Buffer.from(getKey(process.env.SECRETKEY), 'hex')
    const cipher = crypto.createCipheriv(algorithm, Buffer.from(secretKey), iv)
    let encrypted = cipher.update(text);
    encrypted = Buffer.concat([encrypted, cipher.final()]);
    return iv.toString('hex') + ':' + encrypted.toString('hex');
}

export function decrypt(text: string) {
    const secretKey = Buffer.from(getKey(process.env.SECRETKEY), 'hex')
    const algorithm = getKey(process.env.ALGORITHM)
    const parts = text.split(':')
    const iv = Buffer.from(parts.shift()!, 'hex')
    const encryptedText = Buffer.from(parts.join(':'), 'hex')
    const decipher = crypto.createDecipheriv(algorithm, Buffer.from(secretKey), iv)
    let decrypted = decipher.update(encryptedText)
    decrypted = Buffer.concat([decrypted, decipher.final()])
    return decrypted.toString();
}
