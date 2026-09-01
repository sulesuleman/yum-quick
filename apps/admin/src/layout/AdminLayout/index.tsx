import { useEffect, useState } from 'react';
import { NavLink, Outlet, useLocation, useNavigate } from 'react-router-dom';

import yumquickLogo from '../../assets/yumquick-logo.png';
import {
  CloseIcon,
  FastFoodIcon,
  GridIcon,
  LogOutIcon,
  MenuBarsIcon,
  ReceiptIcon,
  ShieldIcon,
  UserCircleIcon,
  UsersIcon
} from '../../components/icons';
import { useAuth } from '../../features/auth/AuthContext';

const NAV_ITEMS = [
  { to: '/', label: 'Dashboard', icon: GridIcon, end: true },
  { to: '/orders', label: 'Orders', icon: ReceiptIcon },
  { to: '/menu', label: 'Menu', icon: FastFoodIcon },
  { to: '/customers', label: 'Customers', icon: UsersIcon },
  { to: '/team', label: 'Admin Team', icon: ShieldIcon },
  { to: '/profile', label: 'Profile', icon: UserCircleIcon }
];

export function AdminLayout() {
  const location = useLocation();
  const navigate = useNavigate();
  const { adminName, adminEmail, signOut } = useAuth();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const activeItem =
    NAV_ITEMS.find((item) =>
      item.end ? location.pathname === item.to : location.pathname.startsWith(item.to)
    ) ?? NAV_ITEMS[0];

  // Close the mobile drawer whenever the route changes.
  useEffect(() => {
    setIsSidebarOpen(false);
  }, [location.pathname]);

  const handleLogout = () => {
    signOut();
    navigate('/login', { replace: true });
  };

  return (
    <div className='flex h-screen overflow-hidden bg-card'>
      {isSidebarOpen ? (
        <div
          className='fixed inset-0 z-30 bg-black/40 md:hidden'
          onClick={() => setIsSidebarOpen(false)}
        />
      ) : null}

      <aside
        className={`fixed inset-y-0 left-0 z-40 flex w-72 shrink-0 flex-col gap-6 overflow-hidden rounded-r-3xl bg-gradient-to-b from-orange-base to-orange-dark px-4 py-6 text-text-inverse shadow-2xl transition-transform duration-200 md:static md:z-auto md:w-64 md:translate-x-0 md:rounded-none md:shadow-none ${
          isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className='relative flex flex-col items-center gap-1 border-b border-white/15 pb-5'>
          <img src={yumquickLogo} alt='yumQuick' className='h-20 w-auto object-contain' />
          <span className='text-[11px] font-medium tracking-wide text-text-inverse/70 uppercase'>
            Admin panel
          </span>
          <button
            type='button'
            onClick={() => setIsSidebarOpen(false)}
            className='absolute top-0 right-0 rounded-full p-1 opacity-80 hover:opacity-100 md:hidden'
            aria-label='Close menu'
          >
            <CloseIcon size={20} />
          </button>
        </div>

        <nav className='flex flex-1 flex-col gap-1.5'>
          {NAV_ITEMS.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.end}
              className={({ isActive }) =>
                `flex items-center gap-3 rounded-2xl px-3.5 py-3 text-sm font-medium transition-all duration-150 active:scale-[0.98] ${
                  isActive
                    ? 'bg-card text-brand shadow-md'
                    : 'text-text-inverse/80 hover:bg-white/10 hover:text-text-inverse'
                }`
              }
            >
              <item.icon size={18} />
              {item.label}
            </NavLink>
          ))}
        </nav>

        <div className='flex items-center gap-2.5 rounded-2xl bg-white/10 p-2.5'>
          <span className='flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white/15'>
            <UserCircleIcon size={20} />
          </span>
          <div className='min-w-0 flex-1'>
            <p className='truncate text-sm font-semibold text-text-inverse'>
              {adminName ?? 'yumQuick Admin'}
            </p>
            <p className='truncate text-xs text-text-inverse/65'>{adminEmail ?? ''}</p>
          </div>
          <button
            type='button'
            onClick={handleLogout}
            aria-label='Log out'
            className='flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-text-inverse/75 transition-colors hover:bg-white/15 hover:text-text-inverse'
          >
            <LogOutIcon size={16} />
          </button>
        </div>
      </aside>

      <div className='flex min-w-0 flex-1 flex-col'>
        <header className='flex items-center gap-3 bg-gradient-to-r from-yellow-base to-yellow-dark px-4 py-4 shadow-[0_2px_10px_-4px_rgba(57,23,19,0.18)] md:px-6'>
          <button
            type='button'
            onClick={() => setIsSidebarOpen(true)}
            className='rounded-full p-1 text-text md:hidden'
            aria-label='Open menu'
          >
            <MenuBarsIcon size={22} />
          </button>
          <span className='text-xl font-bold text-text'>{activeItem.label}</span>

          <button
            type='button'
            onClick={() => navigate('/profile')}
            aria-label='Go to profile'
            className='ml-auto flex h-9 w-9 items-center justify-center rounded-full bg-brand text-text-inverse transition-colors hover:bg-orange-dark'
          >
            <UserCircleIcon size={17} />
          </button>
        </header>
        <main className='scroll-area flex-1 overflow-y-auto p-4 md:p-6'>
          <Outlet />
        </main>
      </div>
    </div>
  );
}

