// Funções auxiliares do projeto

export function formatNumber(num: number): string {
  return num.toLocaleString('pt-BR')
}

export function delay(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms))
}
