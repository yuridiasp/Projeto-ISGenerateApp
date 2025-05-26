export function getCompromissoCreatedId(url: string) {

    const regex = /idCO=(\d+)/

    const result = regex.exec(url)

    if(result) {
        return regex.exec(url)[1]
    }

    return null
}