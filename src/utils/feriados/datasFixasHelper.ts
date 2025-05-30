import { Holiday } from "../../models/feriado/Holiday"

type datasFixas = {
    nacional: Holiday[]
    recessoForense: Holiday[]
    feriasAdvogados: Holiday[]
    justicaNacional: Holiday[]
    justicaEstadual: Holiday[]
    TRF1: Holiday[]
    SE: Holiday[]
    ARACAJU: Holiday[]
    interiores: { [key: string]: Holiday[] }
}

type tipoRecesso = {
    nome: string,
    inicio: [number, number],
    fim: [number, number]
}

const recessos: { [ key: string ]: tipoRecesso } = {
    forense: {
        nome: "RECESSO FORENSE: 20/12 A 06/01",
        inicio: [20, 11],
        fim: [6, 0]
    },
    advogados: {
        nome: "RECESSO DOS ADVOGADOS (ART. 220 NCPC): 20/12 a 20/01",
        inicio: [20, 11],
        fim: [20, 0]
    }
}

export function setIntervaloFeriadosJudiciario (tipoRecesso: tipoRecesso): Holiday[] {
    const fimMesDezembro = 31
    const diaPrimeiro = 1
    const feriados = []
    const indexJaneiro = 0
    
    let [ dia, mes ] = tipoRecesso.inicio,
        [ diaFinal, mesFinal ] = tipoRecesso.fim

    while(dia > diaFinal && mes == mesFinal) {
        feriados.push(new Holiday([mes, dia], tipoRecesso.nome, true ))
        dia++
        
        if (dia > fimMesDezembro) {
            dia = diaPrimeiro
            mes = indexJaneiro
        }
    }

    return feriados
}

export const datas: datasFixas = { // [mes, dia] (indice do mes de 0 a 11)
    nacional: [
        {data: [0,1], feriado: "CONFRATERNIZAÇÃO UNIVERSAL - NACIONAL", isNacional: true},
        {data: [3,21], feriado: "TIRADENTES - NACIONAL", isNacional: true},
        {data: [4,1], feriado: "DIA DO TRABALHO - NACIONAL", isNacional: true},
        {data: [8,7], feriado: "INDEPENDÊNCIA DO BRASIL - NACIONAL", isNacional: true},
        {data: [9,12], feriado: "DIA DAS CRIANÇAS - DIA DA PADROEIRA DO BRASIL - NACIONAL", isNacional: true},
        {data: [10,2], feriado: "FINADOS - NACIONAL", isNacional: true},
        {data: [10,15], feriado: "PROCLAMAÇÃO DA REPÚBLICA - NACIONAL", isNacional: true},
        {data: [11,25], feriado: "NATAL - NACIONAL", isNacional: true},
    ],
    recessoForense : setIntervaloFeriadosJudiciario(recessos.forense),
    feriasAdvogados: setIntervaloFeriadosJudiciario(recessos.advogados),
    justicaNacional: [
        {data: [7,11], feriado: "DIA DO MAGISTRADO - JUSTIÇA", isNacional: false},
        {data: [9,28], feriado: "DIA DO FUNCIONÁRIO PÚBLICO - JUSTIÇA", isNacional: false},
        {data: [10,1], feriado: "LEI FEDERAL Nº 5.010/66 - JUSTIÇA", isNacional: false},
        {data: [11,8], feriado: "DIA DA JUSTIÇA - JUSTIÇA", isNacional: false},
    ],
    justicaEstadual: [],
    TRF1: [],
    SE: [
        {data: [5,24], feriado: "SÃO JOÃO - SERGIPE", isNacional: false},
        {data: [6,8], feriado: "EMANCIPAÇÃO POLÍTICA DE SERGIPE - SERGIPE", isNacional: false},
    ],
    ARACAJU: [
        {data: [11,8], feriado: "PADROEIRA - ARACAJU", isNacional: false},
        {data: [2,17], feriado: "ANIVERSÁRIO DE ARACAJU", isNacional: false}
    ],
    interiores : {
        AQUIDABA: [
            {data: [3,4], feriado: "EMANCIPAÇÃO POLÍTICA - AQUIDABÃ", isNacional: false},
            {data: [6,26], feriado: "PADROEIRA - AQUIDABÃ", isNacional: false}
        ],
        ARAUA: [
            {data: [3,9], feriado: "EMANCIPAÇÃO POLÍTICA - ARAUÁ", isNacional: false},
            {data: [9,5], feriado: "SÃO BENEDITO - ARAUÁ", isNacional: false},
            {data: [11,8], feriado: "PADROEIRA - ARAUÁ", isNacional: false}
        ],
        'AREIA BRANCA': [
            {data: [10,11], feriado: "FUNDAÇÃO DA CIDADE - AREIA BRANCA", isNacional: false},
            {data: [11,8], feriado: "PADROEIRA - AREIA BRANCA", isNacional: false}
        ],
        'BARRA DOS COQUEIROS': [
            {data: [10,25], feriado: "EMANCIPAÇÃO POLÍTICA - BARRA DOS COQUEIROS", isNacional: false},
            {data: [11,13], feriado: "PADROEIRA - BARRA DOS COQUEIROS", isNacional: false}
        ],
        BOQUIM: [
            {data: [2,21], feriado: "CRIAÇÃO DO MUNICÍPIO - BOQUIM", isNacional: false},
            {data: [6,26], feriado: "PADROEIRA - BOQUIM", isNacional: false}
        ],
        'CAMPO DO BRITO': [
            {data: [7,15], feriado: "PADROEIRA - CAMPO DO BRITO", isNacional: false},
            {data: [9,29], feriado: "EMANCIPAÇÃO POLÍTICA - CAMPO DO BRITO", isNacional: false}
        ],
        'CANINDE DE SAO FRANCISCO': [
            {data: [10,25], feriado: "EMANCIPAÇÃO POLÍTICA - CANINDÉ DE SÃO FRANCISCO", isNacional: false},
            {data: [11,8], feriado: "PADROEIRA - CANINDÉ DE SÃO FRANCISCO", isNacional: false}
        ],
        CAPELA: [
            {data: [1,2], feriado: "PADROEIRO - CAPELA", isNacional: false},
            {data: [7,28], feriado: "EMANCIPAÇÃO POLÍTICA - CAPELA", isNacional: false}
        ],
        CARIRA: [
            {data: [4,2], feriado: "PADROEIRA - CARIRA", isNacional: false},
            {data: [10,25], feriado: "EMANCIPAÇÃO POLÍTICA - CARIRA", isNacional: false}
        ],
        CARMOPOLIS: [
            {data: [6,16], feriado: "PADROEIRA - CARMÓPOLIS", isNacional: false},
            {data: [9,16], feriado: "EMANCIPAÇÃO POLÍTICA - CARMÓPOLIS", isNacional: false},
            {data: [10,29], feriado: "DIA DO EVANGÉLICO - CARMÓPOLIS", isNacional: false}
        ],
        'CEDRO DE SAO JOAO': [
            {data: [5,24], feriado: "PADROEIRO - CEDRO DE SÃO JOÃO", isNacional: false},
            {data: [9,4], feriado: "EMANCIPAÇÃO POLÍTICA - CEDRO DE SÃO JOÃO", isNacional: false}
        ],
        CRISTINAPOLIS: [
            {data: [3,24], feriado: "EMANCIPAÇÃO POLÍTICA - CRISTINÁPOLIS", isNacional: false},
            {data: [6,31], feriado: "FERIADO MUNICIPAL EVANGÉLICO - CRISTINÁPOLIS", isNacional: false},
            {data: [9,4], feriado: "PADROEIRO - CRISTINÁPOLIS", isNacional: false}
        ],
        'DIVINA PASTORA': [
            {data: [2,13], feriado: "EMANCIPAÇÃO POLÍTICA - DIVINA PASTORA", isNacional: false}
        ],
        ESTANCIA: [
            {data: [4,4], feriado: "ANIVERSÁRIO DE ESTÂNCIA", isNacional: false},
            {data: [11,12], feriado: "PADROEIRA - ESTÂNCIA", isNacional: false}
        ],
        'FREI PAULO': [
            {data: [5,30], feriado: "PADROEIRO - FREI PAULO", isNacional: false},
            {data: [9,23], feriado: "EMANCIPAÇÃO POLÍTICA - FREI PAULO", isNacional: false}
        ],
        'GARARU': [
            {data: [2,15], feriado: "EMANCIPAÇÃO POLÍTICA - GARARU", isNacional: false},
            {data: [4,10], feriado: "FESTA DO CRUZEIRO - GARARU", isNacional: false},
            {data: [7,15], feriado: "DIA DA ASSUNÇÃO DE NOSSA SENHORA - GARARU", isNacional: false}
        ],
        'INDIAROBA': [
            {data: [2,28], feriado: "EMANCIPAÇÃO POLÍTICA - INDIAROBA", isNacional: false},
            {data: [11,8], feriado: "PADROEIRA - INDIAROBA", isNacional: false}
        ],
        'ITABAIANA': [
            {data: [0,27], feriado: "PADROEIRO - ITABAIANA", isNacional: false},
            {data: [5,13], feriado: "EMANCIPAÇÃO POLÍTICA - ITABAIANA", isNacional: false},
            {data: [7,28], feriado: "PADROEIRA - ITABAIANA", isNacional: false}
        ],
        'ITABAIANINHA': [
            {data: [9,19], feriado: "EMANCIPAÇÃO POLÍTICA - ITABAIANINHA", isNacional: false},
            {data: [11,8], feriado: "PADROEIRA - ITABAIANINHA", isNacional: false}
        ],
        'ITAPORANGA DAJUDA': [
            {data: [1,2], feriado: "PADROEIRA - ITAPORANGA D'AJUDA", isNacional: false},
            {data: [2,28], feriado: "EMANCIPAÇÃO POLÍTICA - ITAPORANGA D'AJUDA", isNacional: false}
        ],
        'JAPARATUBA': [
            {data: [5,11], feriado: "EMANCIPAÇÃO POLÍTICA - JAPARATUBA", isNacional: false},
            {data: [11,8], feriado: "PADROEIRA - JAPARATUBA", isNacional: false}
        ],
        'JAPOATA': [
            {data: [10,23], feriado: "EMANCIPAÇÃO POLÍTICA - JAPOATÃ", isNacional: false},
            {data: [10,25], feriado: "PADROEIRA - JAPOATÃ", isNacional: false}
        ],
        'LAGARTO': [
            {data: [3,20], feriado: "EMANCIPAÇÃO POLÍTICA - LAGARTO", isNacional: false},
            {data: [8,8], feriado: "PADROEIRA - LAGARTO", isNacional: false}
        ],
        'LARANJEIRAS': [
            {data: [5,26], feriado: "PADROEIRA - LARANJEIRAS", isNacional: false},
            {data: [7,7], feriado: "EMANCIPAÇÃO POLÍTICA - LARANJEIRAS", isNacional: false}
        ],
        'MALHADOR': [
            {data: [2,19], feriado: "PADROEIRO - MALHADOR", isNacional: false},
            {data: [10,25], feriado: "EMANCIPAÇÃO POLÍTICA - MALHADOR", isNacional: false}
        ],
        'MARUIM': [
            {data: [0,21], feriado: "PADROEIRO - MARUIM", isNacional: false},
            {data: [4,5], feriado: "EMANCIPAÇÃO POLÍTICA - MARUIM", isNacional: false},
            {data: [7,15], feriado: "CO-PADROEIRA NOSSA SENHORA DA PAZ - MARUIM", isNacional: false}
        ],
        'MONTE ALEGRE DE SERGIPE': [
            {data: [5,24], feriado: "PADROEIRO - MONTE ALEGRE DE SERGIPE", isNacional: false},
            {data: [10,25], feriado: "EMANCIPAÇÃO POLÍTICA - MONTE ALEGRE DE SERGIPE", isNacional: false}
        ],
        'NEOPOLIS': [
            {data: [5,13], feriado: "PADROEIRO - NEOPÓLIS", isNacional: false},
            {data: [5,29], feriado: "SÃO PEDRO - NEOPÓLIS", isNacional: false},
            {data: [9,7], feriado: "NOSSA SENHORA DO ROSÁRIO - NEOPÓLIS", isNacional: false},
            {data: [9,18], feriado: "FUNDAÇÃO DA CIDADE - NEOPÓLIS", isNacional: false}
        ],
        'NOSSA SENHORA DA GLORIA': [
            {data: [0,5], feriado: "FESTA DOS SANTOS REIS - NOSSA SENHORA DA GLÓRIA", isNacional: false},
            {data: [7,15], feriado: "PADROEIRA - NOSSA SENHORA DA GLÓRIA", isNacional: false},
            {data: [8,26], feriado: "EMANCIPAÇÃO POLÍTICA - NOSSA SENHORA DA GLÓRIA", isNacional: false}
        ],
        'NOSSA SENHORA DAS DORES': [
            {data: [5,11], feriado: "EMANCIPAÇÃO POLÍTICA - NOSSA SENHORA DAS DORES", isNacional: false},
            {data: [8,15], feriado: "PADROEIRA - NOSSA SENHORA DAS DORES", isNacional: false}
        ],
        'SOCORRO': [
            {data: [1,2], feriado: "PADROEIRA - NOSSA SENHORA DO SOCORRO", isNacional: false},
            {data: [6,7], feriado: "EMANCIPAÇÃO POLÍTICA - NOSSA SENHORA DO SOCORRO", isNacional: false},
            {data: [7,15], feriado: "FESTA DE NOSSA SENHORA DO AMPARO - NOSSA SENHORA DO SOCORRO", isNacional: false}
        ],
        'PACATUBA': [
            {data: [10,20], feriado: "PADROEIRO - PACATUBA", isNacional: false},
            {data: [10,25], feriado: "EMANCIPAÇÃO POLÍTICA - PACATUBA", isNacional: false}
        ],
        'PEDRINHAS': [
            {data: [2,19], feriado: "PADROEIRO - PEDRINHAS", isNacional: false},
            {data: [10,25], feriado: "EMANCIPAÇÃO POLÍTICA - PEDRINHAS", isNacional: false}
        ],
        'PIRAMBU': [
            {data: [1,11], feriado: "PADROEIRA - PIRAMBU", isNacional: false},
            {data: [10,26], feriado: "EMANCIPAÇÃO POLÍTICA - PIRAMBU", isNacional: false}
        ],
        'POCO REDONDO': [
            {data: [7,15], feriado: "PADROEIRA - POÇO REDONDO", isNacional: false},
            {data: [10,25], feriado: "EMANCIPAÇÃO POLÍTICA - POÇO REDONDO", isNacional: false}
        ],
        'POCO VERDE': [
            {data: [0,21], feriado: "PADROEIRO - POÇO VERDE", isNacional: false},
            {data: [4,3], feriado: "CO-PADROEIRA - POÇO VERDE", isNacional: false},
            {data: [10,25], feriado: "EMANCIPAÇÃO POLÍTICA - POÇO VERDE", isNacional: false}
        ],
        'PORTO DA FOLHA': [
            {data: [1,19], feriado: "EMANCIPAÇÃO POLÍTICA - PORTO DA FOLHA", isNacional: false},
            {data: [11,7], feriado: "PADROEIRA - PORTO DA FOLHA", isNacional: false}
        ],
        'PROPRIA': [
            {data: [1,7], feriado: "EMANCIPAÇÃO POLÍTICA - PROPRIÁ", isNacional: false},
            {data: [5,13], feriado: "PADROEIRO - PROPRIÁ", isNacional: false}
        ],
        'RIACHAO DO DANTAS': [
            {data: [4,9], feriado: "EMANCIPAÇÃO POLÍTICA - RIACHÃO DO DANTAS", isNacional: false},
            {data: [10,21], feriado: "PADROEIRA - RIACHÃO DO DANTAS", isNacional: false}
        ],
        'RIACHUELO': [
            {data: [0,25], feriado: "EMANCIPAÇÃO POLÍTICA - RIACHUELO", isNacional: false},
            {data: [5,11], feriado: "BATALHA NAVAL DE RIACHUELO - RIACHUELO", isNacional: false},
            {data: [11,8], feriado: "PADROEIRA - RIACHUELO", isNacional: false}
        ],
        'RIBEIROPOLIS': [
            {data: [9,30], feriado: "PADROEIRO - RIBEIRÓPOLIS", isNacional: false},
            {data: [11,18], feriado: "EMANCIPAÇÃO POLÍTICA - RIBEIRÓPOLIS", isNacional: false}
        ],
        'SALGADO': [
            {data: [0,22], feriado: "PADROEIRO - SALGADO", isNacional: false},
            {data: [9,4], feriado: "EMANCIPAÇÃO POLÍTICA - SALGADO", isNacional: false}
        ],
        'SANTANA DO SAO FRANCISCO': [
            {data: [3,6], feriado: "EMANCIPAÇÃO POLÍTICA - SANTANA DO SÃO FRANCISCO", isNacional: false},
            {data: [6,26], feriado: "PADROEIRA - SANTANA DO SÃO FRANCISCO", isNacional: false}
        ],
        'SANTO AMARO DAS BROTAS': [
            {data: [0,15], feriado: "PADROEIRA - SANTO AMARO DAS BROTAS", isNacional: false},
            {data: [11,15], feriado: "EMANCIPAÇÃO POLÍTICA - SANTO AMARO DAS BROTAS", isNacional: false}
        ],
        'SAO CRISTOVAO': [
            {data: [8,8], feriado: "PADROEIRA - SÃO CRISTÓVÃO", isNacional: false}
        ],
        'SAO DOMINGOS': [
            {data: [9,21], feriado: "EMANCIPAÇÃO POLÍTICA - SÃO DOMINGOS", isNacional: false},
            {data: [7,8], feriado: "PADROEIRO - SÃO DOMINGOS", isNacional: false}
        ],
        'SIMAO DIAS': [
            {data: [5,12], feriado: "EMANCIPAÇÃO POLÍTICA - SIMÃO DIAS", isNacional: false},
            {data: [6,26], feriado: "PADROEIRA - SIMÃO DIAS", isNacional: false}
        ],
        'TOBIAS BARRETO': [
            {data: [5,7], feriado: "ANIVERSÁRIO DE NASCIMENTO DE TOBIAS BARRETO DE MENEZES - TOBIAS BARRETO", isNacional: false},
            {data: [7,15], feriado: "PADROEIRA - TOBIAS BARRETO", isNacional: false},
            {data: [9,23], feriado: "EMANCIPAÇÃO POLÍTICA - TOBIAS BARRETO", isNacional: false}
        ],
        'UMBAUBA': [
            {data: [1,2], feriado: "PADROEIRA - UMBAÚBA", isNacional: false},
            {data: [1,6], feriado: "EMANCIPAÇÃO POLÍTICA - UMBAÚBA", isNacional: false}
        ]
    }
}