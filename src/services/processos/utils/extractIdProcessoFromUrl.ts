export function extractIdProcessoFromUrl(url: string) {
    return url.split("idPK=")[1]
}