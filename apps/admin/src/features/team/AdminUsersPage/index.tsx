import { useEffect, useMemo, useState } from 'react';

import type { Admin } from '@yumquick/api';
import { adminsApi } from '@yumquick/api';

import { EmptyState, PageLoader, Pagination } from '../../../components';
import { PlusIcon, SearchIcon, ShieldIcon, TrashIcon } from '../../../components/icons';
import { Button, ConfirmDialog, Switch, TextField } from '../../../components/ui';
import { usePagination } from '../../../hooks/usePagination';
import { useAuth } from '../../auth/AuthContext';
import { AddAdminModal } from './components/AddAdminModal';

const PAGE_SIZE = 8;

type PendingToggle = { admin: Admin; nextActive: boolean };

export function AdminUsersPage() {
  const { adminEmail } = useAuth();
  const [admins, setAdmins] = useState<Admin[]>([]);
  const [query, setQuery] = useState('');
  const [isAdding, setIsAdding] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [deletingAdmin, setDeletingAdmin] = useState<Admin | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const [pendingToggle, setPendingToggle] = useState<PendingToggle | null>(null);
  const [isToggling, setIsToggling] = useState(false);

  useEffect(() => {
    adminsApi.list().then(setAdmins).finally(() => setIsLoading(false));
  }, []);

  const filteredAdmins = useMemo(() => {
    const q = query.toLowerCase();
    return admins.filter(
      (admin) => admin.name.toLowerCase().includes(q) || admin.email.toLowerCase().includes(q)
    );
  }, [admins, query]);

  const { page, pageCount, setPage, pageItems } = usePagination(filteredAdmins, PAGE_SIZE, query);

  const handleCreate = async (admin: Omit<Admin, 'id'>) => {
    const created = await adminsApi.create(admin);
    setAdmins((prev) => [created, ...prev]);
  };

  const handleConfirmDelete = async () => {
    if (!deletingAdmin) return;
    setIsDeleting(true);
    try {
      await adminsApi.delete(deletingAdmin.id);
      setAdmins((prev) => prev.filter((a) => a.id !== deletingAdmin.id));
      setDeletingAdmin(null);
    } finally {
      setIsDeleting(false);
    }
  };

  const handleConfirmToggle = async () => {
    if (!pendingToggle) return;
    const { admin, nextActive } = pendingToggle;
    setIsToggling(true);
    try {
      await adminsApi.update(admin.id, { isActive: nextActive });
      setAdmins((prev) => prev.map((a) => (a.id === admin.id ? { ...a, isActive: nextActive } : a)));
      setPendingToggle(null);
    } finally {
      setIsToggling(false);
    }
  };

  return (
    <div className='flex h-full flex-col'>
      <div className='flex shrink-0 flex-col gap-3 bg-card pb-3 shadow-[0_6px_10px_-6px_rgba(57,23,19,0.12)] sm:flex-row sm:items-center'>
        <TextField
          placeholder='Search by name or email'
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          icon={<SearchIcon size={16} />}
          containerClassName='flex-1 sm:max-w-sm'
        />
        <Button variant='cta' className='gap-2 whitespace-nowrap' onClick={() => setIsAdding(true)}>
          <PlusIcon size={16} />
          Add admin
        </Button>
      </div>

      <p className='shrink-0 pt-3 text-xs text-muted'>
        Admins listed here can log in to this dashboard with their email and password.
      </p>

      {isLoading ? (
        <PageLoader />
      ) : filteredAdmins.length === 0 ? (
        <EmptyState
          icon={ShieldIcon}
          title='No admins found'
          description='Try a different name or email, or add a new admin user.'
        />
      ) : (
        <div className='flex min-h-0 flex-1 flex-col pt-3'>
          <div className='flex min-h-0 flex-1 flex-col overflow-hidden rounded-3xl border border-divider bg-card'>
            <div className='scroll-area min-h-0 flex-1 overflow-auto'>
              <table className='w-full text-left text-sm'>
                <thead>
                  <tr className='sticky top-0 border-b border-divider bg-orange-2/25 backdrop-blur-sm'>
                    <th className='px-4 py-3 text-xs font-semibold tracking-wide text-muted uppercase'>
                      Admin
                    </th>
                    <th className='px-4 py-3 text-xs font-semibold tracking-wide text-muted uppercase'>
                      Email
                    </th>
                    <th className='px-4 py-3 text-xs font-semibold tracking-wide text-muted uppercase'>
                      Status
                    </th>
                    <th className='px-4 py-3' />
                  </tr>
                </thead>
                <tbody>
                  {pageItems.map((admin) => {
                    const isSelf = admin.email.toLowerCase() === (adminEmail ?? '').toLowerCase();
                    const initial = admin.name.trim().charAt(0).toUpperCase() || '?';
                    const isActive = admin.isActive !== false;

                    return (
                      <tr
                        key={admin.id}
                        className={`border-b border-divider transition-colors last:border-0 hover:bg-orange-2/15 ${
                          isActive ? '' : 'opacity-60'
                        }`}
                      >
                        <td className='px-4 py-3'>
                          <div className='flex items-center gap-3'>
                            <span className='flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-orange-2 font-bold text-brand'>
                              {initial}
                            </span>
                            <div className='flex min-w-0 items-center gap-2'>
                              <p className='truncate font-semibold text-text'>{admin.name}</p>
                              {isSelf ? (
                                <span className='shrink-0 rounded-full bg-success-bg px-2 py-0.5 text-[10px] font-semibold tracking-wide text-success uppercase'>
                                  You
                                </span>
                              ) : null}
                            </div>
                          </div>
                        </td>
                        <td className='px-4 py-3 text-text'>{admin.email}</td>
                        <td className='px-4 py-3'>
                          <Switch
                            checked={isActive}
                            onChange={(next) => setPendingToggle({ admin, nextActive: next })}
                            disabled={isSelf}
                            label={isActive ? `Deactivate ${admin.name}` : `Activate ${admin.name}`}
                          />
                        </td>
                        <td className='px-4 py-3 text-right'>
                          {!isSelf ? (
                            <button
                              type='button'
                              aria-label={`Remove ${admin.name}`}
                              onClick={() => setDeletingAdmin(admin)}
                              className='inline-flex h-9 w-9 items-center justify-center rounded-full text-muted transition-colors hover:bg-danger-bg hover:text-danger active:scale-95'
                            >
                              <TrashIcon size={17} />
                            </button>
                          ) : null}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
            <Pagination page={page} pageCount={pageCount} onPageChange={setPage} />
          </div>
        </div>
      )}

      {isAdding ? (
        <AddAdminModal
          onClose={() => setIsAdding(false)}
          onCreate={handleCreate}
          existingEmails={admins.map((admin) => admin.email.toLowerCase())}
        />
      ) : null}

      {deletingAdmin ? (
        <ConfirmDialog
          title='Remove admin'
          message={`Remove "${deletingAdmin.name}" from admin access? They will no longer be able to log in.`}
          confirmLabel='Remove'
          variant='danger'
          isLoading={isDeleting}
          onConfirm={handleConfirmDelete}
          onCancel={() => setDeletingAdmin(null)}
        />
      ) : null}

      {pendingToggle ? (
        <ConfirmDialog
          title={pendingToggle.nextActive ? 'Activate admin' : 'Deactivate admin'}
          message={
            pendingToggle.nextActive
              ? `"${pendingToggle.admin.name}" will be able to log in to this dashboard again.`
              : `"${pendingToggle.admin.name}" will no longer be able to log in to this dashboard.`
          }
          confirmLabel={pendingToggle.nextActive ? 'Activate' : 'Deactivate'}
          variant={pendingToggle.nextActive ? 'cta' : 'danger'}
          isLoading={isToggling}
          onConfirm={handleConfirmToggle}
          onCancel={() => setPendingToggle(null)}
        />
      ) : null}
    </div>
  );
}
