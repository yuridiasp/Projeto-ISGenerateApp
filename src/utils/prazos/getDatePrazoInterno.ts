export function getDatePrazoInterno (prazoFatal: string) {
    const [ dia, mes, ano ] = prazoFatal.split('/')
    
    return new Date(Number(ano), Number(mes)-1, Number(dia))
}