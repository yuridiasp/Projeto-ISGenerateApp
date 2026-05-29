export function calculaPascoa(ano: number) {
    let X,
        Y

    if (ano >= 2020 && ano <= 2099) {
        X = 24
        Y = 5
    }
    if (ano >= 2100 && ano <= 2199) {
        X = 24
        Y = 6
    }
    if (ano >= 2200 && ano <= 2299) {
        X = 25
        Y = 7
    }

    let a = ano % 19,
        b = ano % 4,
        c = ano % 7,
        d = (19 * a + X) % 30,
        e = (2 * b + 4 * c + 6 * d + Y) % 7,
        dia,
        mes

    if (d+e > 9) {
        dia = d+e-9
        mes = 3
    } else {
        dia = d+e+22
        mes = 2
    }

    if (mes == 3 && dia == 26)
        dia = 19

    if (mes == 3 && dia == 25 && d == 28 && a > 10)
        dia = 18

    return new Date(ano, mes, dia)
}