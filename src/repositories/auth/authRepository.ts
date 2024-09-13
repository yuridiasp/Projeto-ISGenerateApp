import fs from 'fs';
import path from 'path';

const credentialsFilePath = path.join(__dirname, '..', '..', '..', 'data', 'credentials.json')

export async function storeCredentials(username: string, encryptedPassword: string) {
    const data = { username, encryptedPassword }
    fs.writeFileSync(credentialsFilePath, JSON.stringify(data))
}

export function retrieveCredentials() {
    if (fs.existsSync(credentialsFilePath)) {
        const data = JSON.parse(fs.readFileSync(credentialsFilePath, 'utf-8'))
        return { login: data.login, encryptedPassword: data.encryptedPassword }
    }
    return null
}
