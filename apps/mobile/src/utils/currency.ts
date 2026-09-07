export function formatCurrency(value: number): string {
  return `Rs ${Math.round(value).toLocaleString('en-US')}`;
}
