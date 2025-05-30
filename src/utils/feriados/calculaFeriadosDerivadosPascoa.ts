function calculaFeriadosDerivadosPascoa(pascoa: Date) {
    const pascoaTimestamp = pascoa.getTime()
    
    const feriadosDerivados = [
        { nome: "SEGUNDA DE CARNAVAL - PONTO FACULTATIVO", offset: -48 },
        { nome: "TERÇA DE CARNAVAL - PONTO FACULTATIVO", offset: -47 },
        { nome: "QUARTA DE CINZAS - PONTO FACULTATIVO ATÉ AS 14H", offset: -46 },
        { nome: "QUARTA-FEIRA SANTA - PONTO FACULTATIVO", offset: -4 },
        { nome: "QUINTA-FEIRA MAIOR - PONTO FACULTATIVO", offset: -3 },
        { nome: "SEXTA-FEIRA DA PAIXÃO - NACIONAL", offset: -2 },
        { nome: "CORPUS CHRISTI - PONTO FACULTATIVO", offset: -60 }
    ]

    return [ {data: pascoa, feriado: "PÁSCOA - NACIONAL", isNacional: true},
        ...feriadosDerivados.map(({ nome, offset }) => {
            const data = new Date(pascoaTimestamp)

            data.setDate(data.getDate() + offset)

            return { data, feriado: nome, isNacional: nome.endsWith("NACIONAL") }
        })
    ]
}