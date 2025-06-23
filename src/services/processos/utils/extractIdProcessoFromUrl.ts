export function extractIdProcessoFromUrl(url: string) {
    return url.split("idPR=")[1]
}