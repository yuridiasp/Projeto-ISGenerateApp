/**
 * 
 * @param {string} string 
 * @returns {string}
 */
function removeAcentuacaoString (string) {
    return string.normalize('NFD').replace(/[\u0300-\u036f]/g, "")
}

/**
 * 
 * @param {string} numeroProcesso 
 * @returns {string}
 */
function removeCaracteresProcesso(numeroProcesso) {
    
    let processoFormatado = ''

    function isNumber(n) {
        return !isNaN(parseFloat(n)) && isFinite(n);
    }

    for (let index = 0; index < numeroProcesso.length; index++) {
        if (isNumber(numeroProcesso[index]))
            processoFormatado += numeroProcesso[index]
    }

    return processoFormatado
}

module.exports = { removeAcentuacaoString, removeCaracteresProcesso }