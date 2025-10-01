import fs from 'fs'
import path from 'path'

import { Result } from '@models/results'
import { NotFoundError } from '@models/errors'

const credentialsFilePath = path.join(__dirname, '..', '..', '..', 'data', 'credentials.json')

export type EncryptedCredentials = {
    login: string,
    encryptedPassword: string
}

export async function storeCredentials(login: string, encryptedPassword: string) {
    const data: EncryptedCredentials = { login, encryptedPassword }

    const dir = path.dirname(credentialsFilePath)

    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
    }
    
    fs.writeFileSync(credentialsFilePath, JSON.stringify(data))
}

export function retrieveCredentials(): Result<EncryptedCredentials> {
    if (fs.existsSync(credentialsFilePath)) {
        const data = JSON.parse(fs.readFileSync(credentialsFilePath, 'utf-8'))

        return {
            success: true,
            data: { login: data.login, encryptedPassword: data.encryptedPassword }
        }
    }

    return {
        success: false,
        error: new NotFoundError(credentialsFilePath)
    }
}
