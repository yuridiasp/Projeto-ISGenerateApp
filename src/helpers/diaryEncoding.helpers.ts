export function fixDiaryEncoding(text: string): string {
  return text
    .replace(/├é┬¬/g, "ª")
    .replace(/├é┬║/g, "º")
    .replace(/├é┬º/g, "§")

    .replace(/Âª/g, "ª")
    .replace(/Âº/g, "º")
    .replace(/Â§/g, "§")

    .replace(/┬¬/g, "ª")
    .replace(/┬║/g, "º")
    .replace(/┬º/g, "§")

    .replace(/DIÃRIO/g, "DIÁRIO")
    .replace(/DI├üRIO/g, "DIÁRIO")
    .replace(/REGIÃƒO/g, "REGIÃO")
    .replace(/REGI├âO/g, "REGIÃO")

    .replace(/CIVEL/g, "CÍVEL")
    .replace(/CiVEL/g, "CÍVEL")
    .replace(/DECLARAcaO/g, "DECLARAÇÃO")
    .replace(/AcaO/g, "AÇÃO")
    .replace(/SUMARiSSIMO/g, "SUMARÍSSIMO")
    .replace(/ORDINaRIO/g, "ORDINÁRIO")
    .replace(/PuBLICA/g, "PÚBLICA")

    .replace(/COMUNICAÇÃO_ID/g, "COMUNICACAO_ID")
    .replace(/comunicação_id/gi, "comunicacao_id")
    .replace(/├é┬¬/g, "ª")
    .replace(/├é┬║/g, "º")
    .replace(/├é┬º/g, "§")

    .replace(/Âª/g, "ª")
    .replace(/Âº/g, "º")
    .replace(/Â§/g, "§")

    .replace(/(\d+)Âª/g, "$1ª")
    .replace(/(\d+)Âº/g, "$1º")

    .replace(/┬¬/g, "ª")
    .replace(/┬║/g, "º")
    .replace(/┬º/g, "§")

    .replace(/DIÃRIO/g, "DIÁRIO")
    .replace(/DI├üRIO/g, "DIÁRIO")
    .replace(/REGIÃƒO/g, "REGIÃO")
    .replace(/REGI├âO/g, "REGIÃO")
    .replace(/CAMARA/g, "CÂMARA")
    .replace(/CIVEL/g, "CÍVEL")
    .replace(/CiVEL/g, "CÍVEL")
    .replace(/DECLARAcaO/g, "DECLARAÇÃO")
    .replace(/AcaO/g, "AÇÃO")
    .replace(/SUMARiSSIMO/g, "SUMARÍSSIMO")
    .replace(/ORDINaRIO/g, "ORDINÁRIO")
    .replace(/PuBLICA/g, "PÚBLICA")
    // Correções específicas devem vir antes das genéricas
    .replace(/├é┬¬/g, "ª")
    .replace(/├é┬º/g, "§")
    .replace(/├é┬║/g, "º")
    .replace(/├é┬░/g, "°")
    .replace(/├â┬º/g, "ç")
    .replace(/├â╬╝/g, "õ")
    .replace(/├º├Á/g, "çõ")

    // Padrões com números
    .replace(/(\d+)ê¬/g, "$1ª")
    .replace(/(\d+)êº/g, "$1º")
    .replace(/(\d+)┬¬/g, "$1ª")
    .replace(/(\d+)┬║/g, "$1º")

    // Padrões específicos encontrados
    .replace(/DI├üRIO/g, "DIÁRIO")
    .replace(/REGI├âO/g, "REGIÃO")
    .replace(/n┬║/g, "nº")
    .replace(/N┬║/g, "Nº")

    // Correções de caracteres
    .replace(/├ü/g, "Á")
    .replace(/├â/g, "Ã")
    .replace(/├Å/g, "ÃO")
    .replace(/├ç/g, "Ç")
    .replace(/├º/g, "ç")
    .replace(/├│/g, "ó")
    .replace(/├í/g, "á")
    .replace(/├á/g, "á")
    .replace(/├®/g, "é")
    .replace(/├¬/g, "ê")
    .replace(/├ú/g, "ú")
    .replace(/├Á/g, "ã")
    .replace(/┬¬/g, "ª")
    .replace(/┬º/g, "§")
    .replace(/┬║/g, "º")

    // Correções de palavras
    .replace(/C├│digo/g, "Código")
    .replace(/InformaçÁes/g, "Informações")
    .replace(/PublicaçÁes/g, "Publicações")

    .replace(/PUBLICAÇÃƒO/g, "PUBLICAÇÃO")
    .replace(/COMUNICAÇÃƒO/g, "COMUNICAÇÃO")
    .replace(/INTIMAÇÃƒO/g, "INTIMAÇÃO")
    .replace(/DISPONIBILIZAÇÃƒO/g, "DISPONIBILIZAÇÃO")
    .replace(/REGIÃƒO/g, "REGIÃO")

    .replace(/Di¡rio/g, "Diário")
    .replace(/Justiþa/g, "Justiça")
    .replace(/Eletr¶nico/g, "Eletrônico")
    .replace(/REGIÒO/g, "REGIÃO")
    .replace(/REGIãO/g, "REGIÃO")
    .replace(/PublicaþÒes/g, "Publicações")
    .replace(/DivulgaþÒo/g, "Divulgação")
    .replace(/PublicaþÒo/g, "Publicação")
    .replace(/SÒo/g, "São")
    .replace(/CristovÒo/g, "Cristovão")

    // Padronização de identificadores
    .replace(/COMUNICAÇÃO_ID/g, "COMUNICACAO_ID")
    .replace(/comunicação_id/gi, "comunicacao_id");
}