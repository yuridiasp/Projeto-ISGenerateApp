import axios, { AxiosResponse } from 'axios'

export async function loggedGetRequest({ url, cookie }: { url: string, cookie: string }): Promise<AxiosResponse<any, any>> {
    return await axios.get(url, {
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Cookie': cookie,
            'Connection': 'close'
        },
        withCredentials: true
    })
}

export async function getRequest(url: string): Promise<AxiosResponse<any, any>> {
    return await axios.get(url, {
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Connection': 'close'
        },
        withCredentials: true
    })
}