import { Stack } from 'expo-router';

export default function ScreensLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="splash" options={{ animation: 'none' }} />
      <Stack.Screen
        name="welcome"
        options={{
          animation: 'fade',
          animationDuration: 400,
        }}
      />
    </Stack>
  );
}
