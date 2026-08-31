import type { OrderStatus } from '@yumquick/api';

const STATUS_CLASSES: Record<OrderStatus, string> = {
  Active: 'bg-orange-2 text-brand',
  Completed: 'bg-success-bg text-success',
  Cancelled: 'bg-danger-bg text-danger'
};

export type StatusBadgeProps = {
  status: OrderStatus;
};

export function StatusBadge({ status }: StatusBadgeProps) {
  return (
    <span
      className={`inline-flex self-start rounded-full px-2 py-1 text-xs font-semibold ${STATUS_CLASSES[status]}`}
    >
      {status}
    </span>
  );
}
