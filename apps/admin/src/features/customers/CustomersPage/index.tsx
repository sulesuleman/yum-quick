import { useEffect, useMemo, useState } from 'react';

import type { User } from '@yumquick/api';
import { usersApi } from '@yumquick/api';

import { EmptyState, PageLoader, Pagination } from '../../../components';
import { InfoIcon, SearchIcon, TrashIcon, UsersIcon } from '../../../components/icons';
import { ConfirmDialog, TextField } from '../../../components/ui';
import { usePagination } from '../../../hooks/usePagination';

const PAGE_SIZE = 8;

export function CustomersPage() {
  const [customers, setCustomers] = useState<User[]>([]);
  const [query, setQuery] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [deletingCustomer, setDeletingCustomer] = useState<User | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    usersApi.list().then(setCustomers).finally(() => setIsLoading(false));
  }, []);

  const filteredCustomers = useMemo(() => {
    const q = query.toLowerCase();
    return customers.filter(
      (customer) => customer.name.toLowerCase().includes(q) || customer.email.toLowerCase().includes(q)
    );
  }, [customers, query]);

  const { page, pageCount, setPage, pageItems } = usePagination(filteredCustomers, PAGE_SIZE, query);

  const handleConfirmDelete = async () => {
    if (!deletingCustomer) return;
    setIsDeleting(true);
    try {
      await usersApi.delete(deletingCustomer.id);
      setCustomers((prev) => prev.filter((c) => c.id !== deletingCustomer.id));
      setDeletingCustomer(null);
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <div className='flex h-full flex-col'>
      <div className='flex shrink-0 flex-col gap-3 bg-card pb-3 shadow-[0_6px_10px_-6px_rgba(57,23,19,0.12)]'>
        <TextField
          placeholder='Search by name or email'
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          icon={<SearchIcon size={16} />}
          containerClassName='max-w-sm'
        />
        <p className='flex items-center gap-1.5 text-xs text-muted'>
          <InfoIcon size={13} />
          Customers sign up from the yumQuick app — this list is read-only.
        </p>
      </div>

      {isLoading ? (
        <PageLoader />
      ) : filteredCustomers.length === 0 ? (
        <EmptyState
          icon={UsersIcon}
          title='No customers found'
          description='Try a different name or email to find who you’re looking for.'
        />
      ) : (
        <div className='flex min-h-0 flex-1 flex-col pt-3'>
          <div className='flex min-h-0 flex-1 flex-col overflow-hidden rounded-3xl border border-divider bg-card'>
            <div className='scroll-area min-h-0 flex-1 overflow-auto'>
              <table className='w-full text-left text-sm'>
                <thead>
                  <tr className='sticky top-0 border-b border-divider bg-orange-2/25 backdrop-blur-sm'>
                    <th className='px-4 py-3 text-xs font-semibold tracking-wide text-muted uppercase'>
                      Customer
                    </th>
                    <th className='px-4 py-3 text-xs font-semibold tracking-wide text-muted uppercase'>
                      Phone
                    </th>
                    <th className='px-4 py-3' />
                  </tr>
                </thead>
                <tbody>
                  {pageItems.map((customer) => (
                    <tr
                      key={customer.id}
                      className='border-b border-divider transition-colors last:border-0 hover:bg-orange-2/15'
                    >
                      <td className='px-4 py-3'>
                        <div className='flex items-center gap-3'>
                          <img
                            src={customer.avatarUri}
                            alt={customer.name}
                            className='h-10 w-10 shrink-0 rounded-full bg-orange-2 object-cover'
                          />
                          <div className='min-w-0'>
                            <p className='truncate font-semibold text-text'>{customer.name}</p>
                            <p className='truncate text-xs text-muted'>{customer.email}</p>
                          </div>
                        </div>
                      </td>
                      <td className='px-4 py-3 text-text whitespace-nowrap'>{customer.phone}</td>
                      <td className='px-4 py-3 text-right'>
                        <button
                          type='button'
                          aria-label={`Delete ${customer.name}`}
                          onClick={() => setDeletingCustomer(customer)}
                          className='inline-flex h-9 w-9 items-center justify-center rounded-full text-muted transition-colors hover:bg-danger-bg hover:text-danger active:scale-95'
                        >
                          <TrashIcon size={17} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <Pagination page={page} pageCount={pageCount} onPageChange={setPage} />
          </div>
        </div>
      )}

      {deletingCustomer ? (
        <ConfirmDialog
          title='Remove customer'
          message={`Remove "${deletingCustomer.name}" from your customers? This can't be undone.`}
          confirmLabel='Remove'
          variant='danger'
          isLoading={isDeleting}
          onConfirm={handleConfirmDelete}
          onCancel={() => setDeletingCustomer(null)}
        />
      ) : null}
    </div>
  );
}
