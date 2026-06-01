import { useRouter } from 'expo-router';
import { useState } from 'react';
import { Text, View } from 'react-native';

import { AuthCard, Button, TextField } from '@components';
import { useAuth } from '@features/auth/AuthContext';

import { useSetPasswordScreenStyles } from './useSetPasswordScreenStyles';

export function SetPasswordScreen() {
  const router = useRouter();
  const { signIn } = useAuth();
  const styles = useSetPasswordScreenStyles();
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');

  const onSubmit = async () => {
    await signIn('demo-token');
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

        <View style={styles.actions}>
          <Button title='Create New Password' variant='cta' onPress={onSubmit} />
        </View>
      </View>
    </AuthCard>
  );
}
