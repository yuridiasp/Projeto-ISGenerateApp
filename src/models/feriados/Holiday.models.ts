export class Holiday {
    data: [ number, number ]
    feriado: string
    isNacional: boolean
    constructor (data: [ number, number ], feriado: string, isNacional: boolean) {
        this.data = data
        this.feriado = feriado
        this.isNacional = isNacional
    }
}