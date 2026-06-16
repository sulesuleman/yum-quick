import { Tabs } from 'expo-router';
import { Image, type ImageSourcePropType } from 'react-native';

import { theme } from '@theme';

const ICONS: Record<string, ImageSourcePropType> = {
  index: require('@/assets/home.png'),
  dashboard: require('@/assets/food.png'),
  favorites: require('@/assets/favorites.png'),
  notifications: require('@/assets/orders.png'),
  profile: require('@/assets/support.png')
};

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={({ route }) => ({
        headerShown: true,
        headerStyle: { backgroundColor: theme.colors.background.yellowBase },
        headerTintColor: theme.colors.text.primary,
        headerTitleAlign: 'center',
        headerTitleStyle: {
          fontFamily: theme.typography.families.bold,
          fontSize: theme.typography.sizes.title,
          color: theme.colors.text.inverse
        },
        headerShadowVisible: false,
        tabBarShowLabel: false,
        tabBarStyle: {
          backgroundColor: theme.colors.background.orangeBase,
          borderTopWidth: 0,
          height: 61,
          borderTopLeftRadius: theme.radii.navbar,
          borderTopRightRadius: theme.radii.navbar,
          position: 'absolute',
          paddingTop: 0,
          paddingBottom: 0
        },
        tabBarItemStyle: {
          justifyContent: 'center',
          alignItems: 'center',
          paddingVertical: 0
        },
        tabBarIconStyle: {
          marginTop: 0,
          marginBottom: 0,
          alignSelf: 'center'
        },
        tabBarActiveTintColor: theme.colors.text.inverse,
        tabBarInactiveTintColor: theme.colors.text.inverse,
        tabBarIcon: ({ focused }) => {
          const icon = ICONS[route.name];
          if (!icon) return null;
          return (
            <Image
              source={icon}
              resizeMode='contain'
              style={{
                width: 24,
                height: 24,
                tintColor: theme.colors.text.inverse,
                opacity: focused ? 1 : 0.7
              }}
            />
          );
        }
      })}
    >
      <Tabs.Screen name='index' options={{ title: 'Home' }} />
      <Tabs.Screen name='dashboard' options={{ title: 'My Orders' }} />
      <Tabs.Screen name='favorites' options={{ title: 'Favorites' }} />
      <Tabs.Screen name='notifications' options={{ title: 'Notifications' }} />
      <Tabs.Screen name='profile' options={{ title: 'Profile' }} />
    </Tabs>
  );
}
