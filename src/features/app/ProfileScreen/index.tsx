import { useRouter } from 'expo-router';
import { Text, View } from 'react-native';

import { Button } from '@components';
import { useAuth } from '@features/auth/AuthContext';

import { useProfileScreenStyles } from './useProfileScreenStyles';

export function ProfileScreen() {
  const router = useRouter();
  const { signOut } = useAuth();
  const styles = useProfileScreenStyles();

  const onSignOut = async () => {
    await signOut();
    router.replace('/welcome');
  };

  return (
    <View style={styles.screen}>
      <Text style={styles.title}>Profile</Text>
      <View style={styles.actions}>
        <Button title='Log Out' variant='cta' onPress={onSignOut} />
      </View>
    </View>
  );
}
