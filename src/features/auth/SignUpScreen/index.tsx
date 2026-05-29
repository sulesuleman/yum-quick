import { useRouter } from 'expo-router';
import { useState } from 'react';
import { ScrollView, Text } from 'react-native';

import { AuthCard, Button, DatePickerField, TextField } from '@components';

import { useSignUpScreenStyles } from './useSignUpScreenStyles';

export function SignUpScreen() {
  const router = useRouter();
  const styles = useSignUpScreenStyles();
  const [fullName, setFullName] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [mobile, setMobile] = useState('');
  const [dob, setDob] = useState<Date | null>(null);

  const onContinue = () => {
    router.push('/set-password');
  };

  return (
    <AuthCard>
      <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
        <TextField
          label='Full name'
          placeholder='example@example.com'
          value={fullName}
          onChangeText={setFullName}
        />
        <TextField
          label='Password'
          placeholder='••••••••••'
          type='password'
          value={password}
          onChangeText={setPassword}
        />
        <TextField
          label='Email'
          placeholder='example@example.com'
          type='email'
          value={email}
          onChangeText={setEmail}
        />
        <TextField
          label='Mobile Number'
          placeholder='+ 123 456 789'
          type='phone'
          value={mobile}
          onChangeText={setMobile}
        />
        <DatePickerField label='Date of birth' value={dob} onChange={setDob} />

        <Text style={styles.legal}>
          By continuing, you agree to{'\n'}
          <Text style={styles.legalLink}>Terms of Use</Text> and{' '}
          <Text style={styles.legalLink}>Privacy Policy</Text>.
        </Text>

        <Button title='Sign Up' variant='cta' onPress={onContinue} />

        <Text style={styles.footerCopy} onPress={() => router.push('/login')}>
          Already have an account? <Text style={styles.footerLink}>Log In</Text>
        </Text>
      </ScrollView>
    </AuthCard>
  );
}
