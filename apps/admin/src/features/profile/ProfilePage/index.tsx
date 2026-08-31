import { useNavigate } from 'react-router-dom';

import {
  ChevronRightIcon,
  LogOutIcon,
  ReceiptIcon,
  ShieldIcon,
  UserCircleIcon
} from '../../../components/icons';
import { Button } from '../../../components/ui';
import { useAuth } from '../../auth/AuthContext';

const SETTINGS_ROWS = [
  { icon: ReceiptIcon, label: 'Restaurant details' },
  { icon: UserCircleIcon, label: 'Notification preferences' },
  { icon: ReceiptIcon, label: 'Help & support' }
];

export function ProfilePage() {
  const navigate = useNavigate();
  const { adminName, adminEmail, signOut } = useAuth();

  const handleLogout = () => {
    signOut();
    navigate('/login', { replace: true });
  };

  return (
    <div className='mx-auto flex max-w-md flex-col gap-6'>
      <div className='relative flex flex-col items-center gap-2 overflow-hidden rounded-3xl bg-gradient-to-br from-orange-base to-orange-dark px-6 py-8 text-text-inverse shadow-lg'>
        <div className='pointer-events-none absolute -top-10 -left-8 h-32 w-32 rounded-full bg-white/10' />
        <div className='pointer-events-none absolute -right-8 -bottom-12 h-28 w-28 rounded-full bg-white/10' />
        <div className='relative flex h-18 w-18 items-center justify-center rounded-full bg-white/15 ring-4 ring-white/10'>
          <UserCircleIcon size={40} />
        </div>
        <span className='relative text-xl font-bold'>{adminName ?? 'yumQuick Admin'}</span>
        <span className='relative text-sm text-text-inverse/75'>
          {adminEmail ?? 'admin@yumquick.com'}
        </span>
      </div>

      <div className='flex flex-col gap-3'>
        <button
          type='button'
          onClick={() => navigate('/team')}
          className='flex items-center gap-3 rounded-2xl border border-divider bg-card p-4 text-left transition-all duration-150 hover:border-brand/30 hover:shadow-[0_8px_18px_-12px_rgba(57,23,19,0.25)]'
        >
          <div className='flex h-8 w-8 items-center justify-center rounded-[10px] bg-orange-2 text-brand'>
            <ShieldIcon size={18} />
          </div>
          <span className='flex-1 font-medium text-text'>Admin team & roles</span>
          <ChevronRightIcon size={18} className='text-muted' />
        </button>

        {SETTINGS_ROWS.map((row) => (
          <div
            key={row.label}
            className='flex items-center gap-3 rounded-2xl border border-divider bg-card p-4'
          >
            <div className='flex h-8 w-8 items-center justify-center rounded-[10px] bg-orange-2 text-brand'>
              <row.icon size={18} />
            </div>
            <span className='flex-1 font-medium text-text'>{row.label}</span>
            <span className='rounded-full bg-yellow-2 px-2 py-0.5 text-[10px] font-semibold tracking-wide text-brand uppercase'>
              Soon
            </span>
          </div>
        ))}
      </div>

      <Button variant='cta' className='mt-2 gap-2' onClick={handleLogout}>
        <LogOutIcon size={18} />
        Log out
      </Button>
    </div>
  );
}
