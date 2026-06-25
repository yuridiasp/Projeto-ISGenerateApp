export function getCompromissoCreatedId(url: string) {
    
    const regex = /idCO=(\d+)/

    const result = regex.exec(url)

    if(result) {
        const r = regex.exec(url)
        
        if (r?.length && r?.length > 1)
            return r[1]
    }

    return ""
}