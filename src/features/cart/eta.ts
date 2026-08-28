const ETA_MINUTES = 45;

function ordinalSuffix(day: number): string {
  if (day % 10 === 1 && day !== 11) return 'st';
  if (day % 10 === 2 && day !== 12) return 'nd';
  if (day % 10 === 3 && day !== 13) return 'rd';
  return 'th';
}

/** Formats a delivery ETA roughly `ETA_MINUTES` from now, e.g. "Thu, 29th, 4:00 PM". */
export function computeEtaLabel(): string {
  const eta = new Date(Date.now() + ETA_MINUTES * 60000);
  const weekday = eta.toLocaleDateString('en-US', { weekday: 'short' });
  const day = eta.getDate();
  const time = eta.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' });
  return `${weekday}, ${day}${ordinalSuffix(day)}, ${time}`;
}
