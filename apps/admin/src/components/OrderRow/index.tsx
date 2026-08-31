import type { Order } from '@yumquick/api';

import { FoodImage, resolveProductImage } from '../ui';
import { StatusBadge } from '../StatusBadge';
import { formatCurrency, formatDate } from '../../utils/formatters';

export type OrderRowProps = {
  order: Order;
  customerName: string;
};

export function OrderRow({ order, customerName }: OrderRowProps) {
  const itemsSummary = order.items.map((item) => `${item.quantity}× ${item.name}`).join(', ');

  return (
    <div className='flex items-center gap-3 rounded-2xl border border-divider bg-card p-4 transition-all duration-150 hover:border-brand/30 hover:shadow-[0_8px_18px_-12px_rgba(57,23,19,0.25)]'>
      <FoodImage src={resolveProductImage(order.imageKey)} width={56} height={56} borderRadius={16} />

      <div className='flex min-w-0 flex-1 flex-col gap-0.5'>
        <span className='truncate text-[15px] font-semibold text-text'>{customerName}</span>
        <span className='truncate text-[13px] text-muted'>{itemsSummary}</span>
        <span className='text-xs text-muted'>{formatDate(order.placedAt)}</span>
      </div>

      <div className='flex flex-col items-end gap-1'>
        <span className='text-[15px] font-bold text-text'>{formatCurrency(order.total)}</span>
        <StatusBadge status={order.status} />
      </div>
    </div>
  );
}
