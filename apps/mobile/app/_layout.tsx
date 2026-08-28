import {
  LeagueSpartan_300Light,
  LeagueSpartan_400Regular,
  LeagueSpartan_500Medium,
  LeagueSpartan_600SemiBold,
  LeagueSpartan_700Bold,
  LeagueSpartan_800ExtraBold,
  useFonts
} from '@expo-google-fonts/league-spartan';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import { AuthProvider } from '@features/auth/AuthContext';
import { CartProvider } from '@features/cart/CartContext';
import { theme } from '@theme';

void SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [fontsLoaded, fontError] = useFonts({
    'LeagueSpartan-Light': LeagueSpartan_300Light,
    'LeagueSpartan-Regular': LeagueSpartan_400Regular,
    'LeagueSpartan-Medium': LeagueSpartan_500Medium,
    'LeagueSpartan-SemiBold': LeagueSpartan_600SemiBold,
    'LeagueSpartan-Bold': LeagueSpartan_700Bold,
    'LeagueSpartan-ExtraBold': LeagueSpartan_800ExtraBold
  });

  useEffect(() => {
    if (fontsLoaded || fontError) {
      void SplashScreen.hideAsync();
    }
  }, [fontsLoaded, fontError]);

  if (!fontsLoaded && !fontError) {
    return null;
  }

  return (
    <SafeAreaProvider>
      <AuthProvider>
        <CartProvider>
          <Stack
            screenOptions={{
              headerShown: false,
              animation: 'none',
              contentStyle: {
                backgroundColor: theme.colors.background.card
              }
            }}
          />
        </CartProvider>
      </AuthProvider>
    </SafeAreaProvider>
  );
}
