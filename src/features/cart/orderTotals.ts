const TAX_RATE = 0.1;
const DELIVERY_FEE = 3;

export type OrderTotals = {
  subtotal: number;
  tax: number;
  delivery: number;
  total: number;
};

export function computeOrderTotals(subtotal: number): OrderTotals {
  const tax = subtotal > 0 ? Math.round(subtotal * TAX_RATE * 100) / 100 : 0;
  const delivery = subtotal > 0 ? DELIVERY_FEE : 0;
  return { subtotal, tax, delivery, total: subtotal + tax + delivery };
}
