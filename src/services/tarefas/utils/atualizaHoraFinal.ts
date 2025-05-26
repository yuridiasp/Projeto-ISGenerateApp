export function atualizaHoraFinal (horarioInicial: string) {
    const duracaoAudicencia = 2
    let hora = (Number(horarioInicial.slice(0,2)) + duracaoAudicencia).toString()

    if (!horarioInicial.length)
        horarioInicial = "00:00"

    if (hora === '24')
        hora = '00'
    else if (hora === '25')
        hora = '01'
    else if (hora === '26')
        hora = '02'
    else if (hora < '10') {
        let num = hora
        hora = `0${num}`
    }
    return `${hora}:${horarioInicial.slice(3)}`
}