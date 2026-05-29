export function removeAcentuacaoString (string: string): string {
    return string.normalize('NFD').replace(/[\u0300-\u036f]/g, "")
}

export function removeCaracteresProcesso(numeroProcesso: string): string {

    if(!numeroProcesso) {
        return null
    }
    
    let processoFormatado = ''

    function isNumber(n: string) {
        return !isNaN(parseFloat(n)) && isFinite(Number(n))
    }

    for (let index = 0; index < numeroProcesso.length; index++) {
        if (isNumber(numeroProcesso[index]))
            processoFormatado += numeroProcesso[index]
    }

    return processoFormatado
}

export function cleanCharDocument (text: string) {
    const cleanedText = text.replace(/[\x00-\x08\x0B-\x0C\x0E-\x1F]/g, '')

    return cleanedText
}