export function isPrev (is: string) {
    const termos = [
        ': INSS',
        'ADO - INSS',
        'ANTE - INSS',
        ': I N S S',
        'ADO - I N S S',
        'ANTE - I N S S',
        ': INSTITUTO NACIONAL DE SEGURO SOCIAL',
        'ADO - INSTITUTO NACIONAL DE SEGURO SOCIAL',
        'ANTE - INSTITUTO NACIONAL DE SEGURO SOCIAL',
        ': INSTITUTO NACIONAL DO SEGURO SOCIAL',
        'ADO - INSTITUTO NACIONAL DO SEGURO SOCIAL',
        'ANTE - INSTITUTO NACIONAL DO SEGURO SOCIAL',
        ': INSTITUTO NACIONAL DE SEGURIDADE SOCIAL',
        'ADO - INSTITUTO NACIONAL DE SEGURIDADE SOCIAL',
        'ANTE - INSTITUTO NACIONAL DE SEGURIDADE SOCIAL',
        ': I.N.D.S.S',
        'IDO - I.N.D.S.S',
        'ADO - I.N.D.S.S',
        'ANTE - I.N.D.S.S',
        ': INSTITUTO NACIONAL DE SEGURIDADE - INSS',
    ]

    return termos.some(termo => is.includes(termo))
}