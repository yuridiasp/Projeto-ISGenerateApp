import crypto from 'crypto'

const algorithm = 'aes-256-cbc'
const secretKey = 'mySecretKey'
const iv = crypto.randomBytes(16)

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
