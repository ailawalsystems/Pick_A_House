/**
 * Format a number as a currency
 */
export function formatCurrency(value: number): string {
  return new Intl.NumberFormat("en-NG", {
    style: "decimal",
    maximumFractionDigits: 0,
  }).format(value)
}

/**
 * Format a date
 */
export function formatDate(date: Date | string): string {
  const d = new Date(date)
  return d.toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  })
}
