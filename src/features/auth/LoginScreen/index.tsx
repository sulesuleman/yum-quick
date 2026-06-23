import { yupResolver } from '@hookform/resolvers/yup';
import { useRouter } from 'expo-router';
import { Controller, useForm } from 'react-hook-form';
import { Text, View } from 'react-native';

import { AuthCard, Button, TextField } from '@components';
import { useAuth } from '@features/auth/AuthContext';
import { findAuthorizedUser } from '@features/auth/constants/authorizedUsers';

import { LoginFormValues, loginSchema } from './loginSchema';
import { useLoginScreenStyles } from './useLoginScreenStyles';

export function LoginScreen() {
  const router = useRouter();
  const { signIn } = useAuth();
  const styles = useLoginScreenStyles();

  const {
    control,         // connects each field to the form
    handleSubmit,    // wraps your submit fn — only calls it when validation passes
    setError,        // lets us add a server-side / credential error after submission
    formState: { errors, isSubmitting },
  } = useForm<LoginFormValues>({
    resolver: yupResolver(loginSchema),
    defaultValues: { email: '', password: '' },
    mode: 'onBlur',            // validate a field when the user leaves it
    reValidateMode: 'onChange', // re-validate on every keystroke once an error is showing
  });

  const onSubmit = async (values: LoginFormValues) => {
    const user = findAuthorizedUser(values.email, values.password);

    if (!user) {
      setError('root', { message: 'Invalid email or password' });
      return;
    }

    await signIn(values.email, user.name);
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
          {/* Email field */}
          <Controller
            control={control}
            name="email"
            render={({ field: { onChange, onBlur, value } }) => (
              <TextField
                label="Email or Mobile Number"
                placeholder="example@example.com"
                type="email"
                value={value}
                onChangeText={onChange}
                onBlur={onBlur}
                error={errors.email?.message}
              />
            )}
          />

          {/* Password field */}
          <Controller
            control={control}
            name="password"
            render={({ field: { onChange, onBlur, value } }) => (
              <TextField
                label="Password"
                placeholder="••••••••••"
                type="password"
                value={value}
                onChangeText={onChange}
                onBlur={onBlur}
                error={errors.password?.message}
              />
            )}
          />

          <Text style={styles.forgot}>Forget Password</Text>
        </View>

        {/* Root-level error (wrong credentials) */}
        {errors.root && (
          <Text style={styles.rootError}>{errors.root.message}</Text>
        )}

        <View style={styles.actions}>
          <Button
            title="Log In"
            variant="cta"
            onPress={handleSubmit(onSubmit)}
            disabled={isSubmitting}
          />
          <Text style={styles.footerCopy} onPress={() => router.push('/signup')}>
            Don&apos;t have an account? <Text style={styles.footerLink}>Sign Up</Text>
          </Text>
        </View>
      </View>
    </AuthCard>
  );
}
