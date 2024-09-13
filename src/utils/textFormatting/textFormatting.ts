/**
 * 
 * @param {string} string 
 * @returns {string}
 */
export function removeAcentuacaoString (string: string): string {
    return string.normalize('NFD').replace(/[\u0300-\u036f]/g, "")
}

/**
 * 
 * @param {string} numeroProcesso 
 * @returns {string}
 */
export function removeCaracteresProcesso(numeroProcesso: string): string {
    
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