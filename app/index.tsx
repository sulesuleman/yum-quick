import { Redirect } from 'expo-router';

import { useAuth } from '@features/auth/AuthContext';

export default function HomeRoute() {
  const { isAuthenticated, isLoading } = useAuth();
  if (isLoading) return null;
  return <Redirect href={isAuthenticated ? '/(app)/(tabs)' : '/splash'} />;
}
