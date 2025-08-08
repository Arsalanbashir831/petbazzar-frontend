export function formatCurrencyPKR(value: number): string {
  return `Rs ${value.toLocaleString()}`
}

export function parseCurrency(value: string): number {
  const n = parseFloat(value.replace(/[^0-9.]/g, ''))
  return Number.isNaN(n) ? 0 : n
}

export function formatDateISO(date: string | Date): string {
  const d = typeof date === 'string' ? new Date(date) : date
  return d.toISOString().slice(0, 10)
}


