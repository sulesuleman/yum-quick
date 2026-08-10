import { Tabs } from 'expo-router';
import React from 'react';
import type { SvgProps } from 'react-native-svg';

import FavoritesIcon from '@/assets/heart-icon.svg';
import HomeIcon from '@/assets/home-icon.svg';
import FoodIcon from '@/assets/food-icon.svg';
import TaskIcon from '@/assets/task-icon.svg';
import SupportIcon from '@/assets/support-icon.svg';

import { theme } from '@theme';

const ICONS: Record<string, React.FC<SvgProps>> = {
  index: HomeIcon,
  'my-orders': FoodIcon,
  favorites: FavoritesIcon,
  notifications: TaskIcon,
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
          height: theme.layout.tabBarHeight,
          borderTopLeftRadius: theme.radii.navbar,
          borderTopRightRadius: theme.radii.navbar,
          position: 'absolute',
          paddingTop: 0,
          paddingBottom: 0
        },
        tabBarItemStyle: {
          justifyContent: 'center',
          alignItems: 'center',
          paddingVertical: 13
        },
        tabBarIconStyle: {
          marginTop: 0,
          marginBottom: 0,
          alignSelf: 'center'
        },
        tabBarActiveTintColor: theme.colors.text.inverse,
        tabBarInactiveTintColor: theme.colors.text.inverse,
        tabBarIcon: ({ focused }) => {
          const Icon = ICONS[route.name];
          if (!Icon) return null;
          return <Icon width={24} height={24} opacity={focused ? 1 : 0.7} />;
        }
      })}
    >
      <Tabs.Screen name='index' options={{ title: 'Home' }} />
      <Tabs.Screen
        name='my-orders'
        options={{ title: 'My Orders' }}
        listeners={{ tabPress: (e) => e.preventDefault() }}
      />
      <Tabs.Screen name='favorites' options={{ title: 'Favorites' }} />
      <Tabs.Screen name='notifications' options={{ title: 'Notifications' }} />
      <Tabs.Screen name='profile' options={{ title: 'Profile' }} />
      <Tabs.Screen name='my-profile' options={{ title: 'My profile', href: null }} />
      <Tabs.Screen name='delivery-address' options={{ title: 'Delivery Address', href: null }} />
      <Tabs.Screen name='product-details' options={{ title: 'Product Details', href: null }} />
      <Tabs.Screen name='payment-methods' options={{ title: 'Payment Methods', href: null }} />
    </Tabs>
  );
}
