export function buildUnregisteredIntimationsMessage(
  unregisteredCount: number,
  newFilePath: string
): string {
  const pluralOrSingular =
    unregisteredCount > 1 ? "intimações" : "intimação";

  return `Encontrado ${unregisteredCount} ${pluralOrSingular} sem cadastro. Exportado relatório no caminho: ${newFilePath}`;
}