import { useEffect, useMemo, useState } from 'react';

import type { Order, OrderStatus, User } from '@yumquick/api';
import { ordersApi, usersApi } from '@yumquick/api';

import { EmptyState, FilterChips, OrderRow, PageLoader } from '../../../components';
import { ReceiptIcon, SearchIcon } from '../../../components/icons';
import { TextField } from '../../../components/ui';

type StatusFilter = OrderStatus | 'All';

const STATUS_FILTERS: { label: string; value: StatusFilter }[] = [
  { label: 'All', value: 'All' },
  { label: 'Active', value: 'Active' },
  { label: 'Completed', value: 'Completed' },
  { label: 'Cancelled', value: 'Cancelled' }
];

export function OrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [customers, setCustomers] = useState<User[]>([]);
  const [statusFilter, setStatusFilter] = useState<StatusFilter>('All');
  const [query, setQuery] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    Promise.all([ordersApi.listAll(), usersApi.list()])
      .then(([o, c]) => {
        setOrders(o);
        setCustomers(c);
      })
      .finally(() => setIsLoading(false));
  }, []);

  const customerName = (userId: string) =>
    customers.find((customer) => customer.id === userId)?.name ?? 'Unknown customer';

  const filteredOrders = useMemo(() => {
    return orders
      .filter((order) => statusFilter === 'All' || order.status === statusFilter)
      .filter((order) => customerName(order.userId).toLowerCase().includes(query.toLowerCase()));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [orders, customers, statusFilter, query]);

  return (
    <div className='flex h-full flex-col'>
      <div className='flex shrink-0 flex-col gap-3 bg-card pb-3 shadow-[0_6px_10px_-6px_rgba(57,23,19,0.12)]'>
        <TextField
          placeholder='Search by customer name'
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          icon={<SearchIcon size={16} />}
          containerClassName='max-w-sm'
        />
        <FilterChips options={STATUS_FILTERS} value={statusFilter} onChange={setStatusFilter} />
      </div>

      {isLoading ? (
        <PageLoader />
      ) : (
        <div className='flex flex-1 flex-col gap-3 overflow-y-auto pt-3'>
          {filteredOrders.length === 0 ? (
            <EmptyState
              icon={ReceiptIcon}
              title='No orders found'
              description='Try adjusting your search or filter to find what you’re looking for.'
            />
          ) : (
            filteredOrders.map((order) => (
              <OrderRow key={order.id} order={order} customerName={customerName(order.userId)} />
            ))
          )}
        </div>
      )}
    </div>
  );
}
