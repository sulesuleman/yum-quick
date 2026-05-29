import { Stack } from 'expo-router';

import { AuthHeader } from '@features/auth/components/AuthHeader';
import { theme } from '@theme';

export default function AuthLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: true,
        header: (props) => <AuthHeader {...props} />,
        contentStyle: { backgroundColor: theme.colors.background.yellowBase },
        animation: 'slide_from_right'
      }}
    >
      <Stack.Screen name='login' options={{ title: 'Log In' }} />
      <Stack.Screen name='hello' options={{ title: 'Hello!' }} />
      <Stack.Screen name='signup' options={{ title: 'New Account' }} />
      <Stack.Screen name='set-password' options={{ title: 'Set Password' }} />
    </Stack>
  );
}
