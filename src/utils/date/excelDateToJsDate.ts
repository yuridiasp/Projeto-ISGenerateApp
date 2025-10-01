export function excelDateToJsDate(excelDate: string) {
  // Subtrai 25569 (diferença entre 1900-01-01 e 1970-01-01) e converte para milissegundos
  const jsDate = new Date((Number(excelDate) - 25569) * 86400 * 1000)
  
  // Adiciona um dia (24 horas em milissegundos) para corrigir o erro do Excel
  jsDate.setDate(jsDate.getDate() + 1)
  
  return jsDate
}