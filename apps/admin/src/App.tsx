import type { ReactElement } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';

import { SplashScreen } from './components/SplashScreen';
import { AuthProvider, useAuth } from './features/auth/AuthContext';
import { LoginPage } from './features/auth/LoginPage';
import { AdminLayout } from './layout/AdminLayout';
import { DashboardPage } from './features/dashboard/DashboardPage';
import { OrdersPage } from './features/orders/OrdersPage';
import { MenuPage } from './features/menu/MenuPage';
import { CustomersPage } from './features/customers/CustomersPage';
import { ProfilePage } from './features/profile/ProfilePage';
import { AdminUsersPage } from './features/team/AdminUsersPage';

function RequireAuth({ children }: { children: ReactElement }) {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) return <SplashScreen />;
  if (!isAuthenticated) return <Navigate to='/login' replace />;
  return children;
}

function Routing() {
  return (
    <Routes>
      <Route path='/login' element={<LoginPage />} />
      <Route
        element={
          <RequireAuth>
            <AdminLayout />
          </RequireAuth>
        }
      >
        <Route index element={<DashboardPage />} />
        <Route path='orders' element={<OrdersPage />} />
        <Route path='menu' element={<MenuPage />} />
        <Route path='customers' element={<CustomersPage />} />
        <Route path='profile' element={<ProfilePage />} />
        <Route path='team' element={<AdminUsersPage />} />
      </Route>
    </Routes>
  );
}

export function App() {
  return (
    <AuthProvider>
      <Routing />
    </AuthProvider>
  );
}
