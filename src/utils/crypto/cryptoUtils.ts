import crypto from 'crypto'
import dotEnv from 'dotenv'

dotEnv.config()

const algorithm = process.env.ALGORITHM
const secretKey = Buffer.from(process.env.SECRETKEY, 'hex')
const ivnum = Number(process.env.IVNUM)
const iv = crypto.randomBytes(ivnum)

export function encrypt(text: string) {
    const cipher = crypto.createCipheriv(algorithm, Buffer.from(secretKey), iv)
    let encrypted = cipher.update(text);
    encrypted = Buffer.concat([encrypted, cipher.final()]);
    return iv.toString('hex') + ':' + encrypted.toString('hex');
}

export function decrypt(text: string) {
    const parts = text.split(':')
    const iv = Buffer.from(parts.shift()!, 'hex')
    const encryptedText = Buffer.from(parts.join(':'), 'hex')
    const decipher = crypto.createDecipheriv(algorithm, Buffer.from(secretKey), iv)
    let decrypted = decipher.update(encryptedText)
    decrypted = Buffer.concat([decrypted, decipher.final()])
    return decrypted.toString();
}
