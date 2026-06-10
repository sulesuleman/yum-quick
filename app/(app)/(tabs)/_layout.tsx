import { Tabs } from 'expo-router';
import React from 'react';
import type { SvgProps } from 'react-native-svg';

import FavoritesIcon from '@/assets/favorites.svg';
import HomeIcon from '@/assets/Home.svg';
import ListIcon from '@/assets/list.svg';
import OrdersIcon from '@/assets/Orders.svg';
import SupportIcon from '@/assets/support.svg';

import { theme } from '@theme';

const ICONS: Record<string, React.FC<SvgProps>> = {
  index: HomeIcon,
  dashboard: ListIcon,
  favorites: FavoritesIcon,
  notifications: OrdersIcon,
  profile: SupportIcon
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
          height: 61,
          justifyContent: 'center',
          alignItems: 'center',
          paddingTop: 0,
          paddingBottom: 0
        },
        tabBarIconStyle: {
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          marginTop: 0,
          marginBottom: 0
        },

        tabBarIcon: ({ focused }) => {
          const Icon = ICONS[route.name];
          if (!Icon) return null;
          return <Icon width={24} height={24} opacity={focused ? 1 : 0.7} />;
        }
      })}
    >
      <Tabs.Screen name='index' options={{ title: 'Home', headerShown: false }} />
      <Tabs.Screen name='dashboard' options={{ title: 'Dashboard' }} />
      <Tabs.Screen name='favorites' options={{ title: 'Favorites' }} />
      <Tabs.Screen name='notifications' options={{ title: 'Notifications' }} />
      <Tabs.Screen name='profile' options={{ title: 'Profile' }} />
    </Tabs>
  );
}

