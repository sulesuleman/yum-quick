import { useRouter } from 'expo-router';
import { useState } from 'react';
import { Text, View } from 'react-native';

import { AuthCard, Button, TextField } from '@components';
import { useAuth } from '@features/auth/AuthContext';

import { useLoginScreenStyles } from './useLoginScreenStyles';

export function LoginScreen() {
  const router = useRouter();
  const { signIn } = useAuth();
  const styles = useLoginScreenStyles();
  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');

  const onSubmit = async () => {
    await signIn('demo-token');
    router.replace('/(app)/(tabs)');
  };

  return (
    <AuthCard>
      <View style={styles.content}>
        <Text style={styles.heading}>Welcome</Text>
        <Text style={styles.subheading}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt
          ut labore et dolore magna aliqua.
        </Text>

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
