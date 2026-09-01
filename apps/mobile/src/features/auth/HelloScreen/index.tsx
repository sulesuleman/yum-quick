import { useRouter } from 'expo-router';
import { useState } from 'react';
import { Text, View } from 'react-native';

import { AuthCard, Button, TextField } from '@components';
import { useAuth } from '@features/auth/AuthContext';
import { usersApi } from '@services/usersApi';

import { useHelloScreenStyles } from './useHelloScreenStyles';

export function HelloScreen() {
  const router = useRouter();
  const { signIn } = useAuth();
  const styles = useHelloScreenStyles();
  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);

  const onSubmit = async () => {
    const user = await usersApi.findByEmail(identifier);
    if (!user || user.password !== password) {
      setError('Invalid email or password');
      return;
    }
    await signIn(user.email, user.name, user.id);
    router.replace('/(app)/(tabs)');
  };

  return (
    <AuthCard>
      <View style={styles.content}>
        <Text style={styles.heading}>Welcome</Text>

        <View style={styles.form}>
          <TextField
            label='Email or Mobile Number'
            placeholder='example@example.com'
            type='email'
            value={identifier}
            onChangeText={setIdentifier}
          />
          <TextField
            label='Password'
            placeholder='••••••••••'
            type='password'
            value={password}
            onChangeText={setPassword}
          />
          <Text style={styles.forgot}>Forget Password</Text>
        </View>

        {error && <Text style={styles.rootError}>{error}</Text>}

        <View style={styles.actions}>
          <Button title='Log In' variant='cta' onPress={onSubmit} />
          <Text style={styles.footerCopy} onPress={() => router.push('/signup')}>
            Don&apos;t have an account? <Text style={styles.footerLink}>Sign Up</Text>
          </Text>
        </View>
      </View>
    </AuthCard>
  );
}
