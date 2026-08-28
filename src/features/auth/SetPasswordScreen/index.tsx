import { useLocalSearchParams, useRouter } from 'expo-router';
import { useState } from 'react';
import { Text, View } from 'react-native';

import { AuthCard, Button, TextField } from '@components';
import { useAuth } from '@features/auth/AuthContext';
import { usersApi } from '@services/usersApi';

import { useSetPasswordScreenStyles } from './useSetPasswordScreenStyles';

export function SetPasswordScreen() {
  const router = useRouter();
  const { signIn } = useAuth();
  const styles = useSetPasswordScreenStyles();
  const params = useLocalSearchParams<{
    fullName?: string;
    email?: string;
    mobile?: string;
    dob?: string;
  }>();
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [error, setError] = useState<string | null>(null);

  const onSubmit = async () => {
    if (!password || password !== confirm) {
      setError('Passwords do not match');
      return;
    }

    const fullName = params.fullName || 'New User';
    const email = params.email || `${Date.now()}@yumquick.demo`;

    const user = await usersApi.create({
      name: fullName,
      email,
      password,
      phone: params.mobile || '',
      dob: params.dob || '',
      avatarUri: 'https://randomuser.me/api/portraits/lego/1.jpg'
    });

    await signIn(user.email, user.name, user.id);
    router.replace('/(app)/(tabs)');
  };

  return (
    <AuthCard>
      <View style={styles.content}>
        <Text style={styles.subheading}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt
          ut labore et dolore magna aliqua.
        </Text>

        <View style={styles.form}>
          <TextField
            label='Password'
            placeholder='••••••••••'
            type='password'
            value={password}
            onChangeText={setPassword}
          />
          <TextField
            label='Confirm Password'
            placeholder='••••••••••'
            type='password'
            value={confirm}
            onChangeText={setConfirm}
          />
        </View>

        {error && <Text style={styles.rootError}>{error}</Text>}

        <View style={styles.actions}>
          <Button title='Create New Password' variant='cta' onPress={onSubmit} />
        </View>
      </View>
    </AuthCard>
  );
}
