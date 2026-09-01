import { Image, Text, TouchableOpacity, View } from 'react-native';
import { router } from 'expo-router';

import { Button } from '@components/ui/button';
import { useAuth } from '@features/auth/AuthContext';

import { useProfileScreenStyles } from './useProfileScreenStyles';

const AVATAR_URI = 'https://randomuser.me/api/portraits/men/32.jpg';

const NAV_ITEMS = [
  { label: 'My Profile', path: '/(app)/(tabs)/my-profile' as const },
  { label: 'My Orders', path: '/(app)/(tabs)/my-orders' as const },
  { label: 'Delivery Address', path: '/(app)/(tabs)/delivery-address' as const },
  { label: 'Payment Methods', path: '/(app)/(tabs)/payment-methods' as const },
  { label: 'Favorites', path: '/(app)/(tabs)/favorites' as const }
];

export function ProfileScreen() {
  const styles = useProfileScreenStyles();
  const { userName, userEmail, signOut } = useAuth();

  const handleLogout = async () => {
    await signOut();
    router.replace('/welcome');
  };

  return (
    <View style={styles.screen}>
      <Image source={{ uri: AVATAR_URI }} style={styles.avatar} />
      <Text style={styles.title}>{userName ?? 'Guest'}</Text>
      <Text style={styles.email}>{userEmail ?? ''}</Text>

      <View style={styles.navList}>
        {NAV_ITEMS.map((item) => (
          <TouchableOpacity
            key={item.path}
            style={styles.navRow}
            onPress={() => router.push(item.path)}
            activeOpacity={0.7}
          >
            <Text style={styles.navLabel}>{item.label}</Text>
            <Text style={styles.navChevron}>›</Text>
          </TouchableOpacity>
        ))}
      </View>

      <Button
        title='Log Out'
        variant='cta'
        fullWidth={false}
        onPress={handleLogout}
        style={styles.actions}
      />
    </View>
  );
}
