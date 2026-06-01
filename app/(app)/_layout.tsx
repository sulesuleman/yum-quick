import { Redirect, Stack } from 'expo-router';

import { useAuth } from '@features/auth/AuthContext';
import { theme } from '@theme';

export default function AppLayout() {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) return null;
  if (!isAuthenticated) return <Redirect href='/welcome' />;

  return (
    <Stack
      screenOptions={{
        headerShown: true,
        headerStyle: { backgroundColor: theme.colors.background.yellowBase },
        headerTintColor: theme.colors.text.primary,
        headerTitleAlign: 'center',
        headerTitleStyle: {
          fontFamily: theme.typography.families.bold,
          fontSize: theme.typography.sizes.title
        },
        headerShadowVisible: false,
        contentStyle: { backgroundColor: theme.colors.background.card }
      }}
    >
      <Stack.Screen name='(tabs)' options={{ headerShown: false }} />
    </Stack>
  );
}
