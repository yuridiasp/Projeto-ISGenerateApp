import axios, { AxiosResponse } from 'axios'
import { iCompromissoBody } from '../../models/compromisso/iCompromissoBody'
import { iCreateTarefa } from '../../models/tarefa/iCreateTarefa'
import { credential } from '../../services/login/loginService'

export async function loggedPostRequest({ url, body, cookie }: { url: string, cookie: string, body: Record<string, string> | iCreateTarefa | iCompromissoBody | credential }): Promise<AxiosResponse<any, any>> {

    return await axios.post(url, new URLSearchParams(body as Record<string, string>).toString(), {
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Cookie': cookie,
            'Connection': 'close'
        },
        withCredentials: true
    })
}