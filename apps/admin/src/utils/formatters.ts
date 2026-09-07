export function formatCurrency(value: number) {
  return `Rs ${Math.round(value).toLocaleString('en-US')}`;
}

export function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString(undefined, {
    month: 'short',
    day: 'numeric',
    hour: 'numeric',
    minute: '2-digit'
  });
}
