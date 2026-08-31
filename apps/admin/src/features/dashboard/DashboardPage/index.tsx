import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import type { Order, Product, User } from '@yumquick/api';
import { ordersApi, productsApi, usersApi } from '@yumquick/api';

import { OrderRow, PageLoader, SectionHeader, StatCard } from '../../../components';
import { CashIcon, FastFoodIcon, ReceiptIcon, UsersIcon } from '../../../components/icons';
import { formatCurrency } from '../../../utils/formatters';
import { useAuth } from '../../auth/AuthContext';

function getGreeting() {
  const hour = new Date().getHours();
  if (hour < 12) return 'Good morning';
  if (hour < 17) return 'Good afternoon';
  return 'Good evening';
}

export function DashboardPage() {
  const navigate = useNavigate();
  const { adminName } = useAuth();
  const [orders, setOrders] = useState<Order[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [customers, setCustomers] = useState<User[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    Promise.all([ordersApi.listAll(), productsApi.list(), usersApi.list()])
      .then(([o, p, c]) => {
        setOrders(o);
        setProducts(p);
        setCustomers(c);
      })
      .finally(() => setIsLoading(false));
  }, []);

  if (isLoading) return <PageLoader />;

  const activeOrders = orders.filter((order) => order.status === 'Active');
  const revenue = orders
    .filter((order) => order.status !== 'Cancelled')
    .reduce((sum, order) => sum + order.total, 0);
  const recentOrders = orders.slice(0, 4);

  const customerName = (userId: string) =>
    customers.find((customer) => customer.id === userId)?.name ?? 'Unknown customer';

  const firstName = (adminName ?? 'Admin').split(' ')[0];

  return (
    <div className='flex flex-col gap-6'>
      <div className='relative overflow-hidden rounded-3xl bg-gradient-to-br from-orange-base to-orange-dark p-6 text-text-inverse shadow-lg'>
        <div className='pointer-events-none absolute -top-10 -right-6 h-36 w-36 rounded-full bg-white/10' />
        <div className='pointer-events-none absolute -right-2 -bottom-14 h-28 w-28 rounded-full bg-white/10' />
        <div className='relative flex items-center gap-4'>
          <div className='flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-white/15'>
            <FastFoodIcon size={28} />
          </div>
          <div>
            <h1 className='text-2xl font-bold'>
              {getGreeting()}, {firstName}
            </h1>
            <p className='text-text-inverse/80'>Here's what's happening with yumQuick today.</p>
          </div>
        </div>
      </div>

      <div className='flex flex-wrap gap-3'>
        <StatCard
          label='Active orders'
          value={activeOrders.length}
          icon={ReceiptIcon}
          tone='orange'
          onClick={() => navigate('/orders')}
        />
        <StatCard
          label="Today's revenue"
          value={revenue}
          formatValue={formatCurrency}
          icon={CashIcon}
          tone='success'
          onClick={() => navigate('/orders')}
        />
        <StatCard
          label='Menu items'
          value={products.length}
          icon={FastFoodIcon}
          tone='paleYellow'
          onClick={() => navigate('/menu')}
        />
        <StatCard
          label='Customers'
          value={customers.length}
          icon={UsersIcon}
          tone='yellow'
          onClick={() => navigate('/customers')}
        />
      </div>

      <div className='rounded-3xl border border-divider bg-card p-4 shadow-[0_4px_14px_-8px_rgba(57,23,19,0.1)] sm:p-5'>
        <SectionHeader
          title='Recent orders'
          actionLabel='View all'
          onActionClick={() => navigate('/orders')}
        />
        <div className='flex flex-col gap-3'>
          {recentOrders.length === 0 ? (
            <p className='py-6 text-center text-muted'>No orders yet.</p>
          ) : (
            recentOrders.map((order) => (
              <button
                key={order.id}
                type='button'
                onClick={() => navigate('/orders')}
                className='rounded-2xl text-left transition-transform duration-150 hover:-translate-y-0.5 active:scale-[0.99]'
              >
                <OrderRow order={order} customerName={customerName(order.userId)} />
              </button>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
