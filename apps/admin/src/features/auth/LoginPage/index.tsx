import { useState, type FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';

import { adminsApi } from '@yumquick/api';

import { Button, TextField } from '../../../components/ui';
import { useAuth } from '../AuthContext';

export function LoginPage() {
  const navigate = useNavigate();
  const { signIn } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const onSubmit = async (event: FormEvent) => {
    event.preventDefault();
    setError(null);
    setIsSubmitting(true);

    try {
      const admin = await adminsApi.findByEmail(email);
      if (!admin || admin.password !== password) {
        setError('Invalid email or password');
        return;
      }
      if (admin.isActive === false) {
        setError('This admin account has been deactivated.');
        return;
      }
      signIn(admin.email, admin.name);
      navigate('/', { replace: true });
    } catch {
      setError('Could not reach the server. Is the mock API running?');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className='flex h-screen w-screen items-center justify-center bg-yellow-base'>
      <form onSubmit={onSubmit} className='flex w-full max-w-sm flex-col gap-5 rounded-3xl bg-card p-8'>
        <div>
          <h1 className='text-2xl font-bold text-text'>
            yum<span className='text-brand'>Quick</span> Admin
          </h1>
          <p className='mt-1 text-sm text-muted'>Sign in to manage orders, menu and customers.</p>
        </div>

        <div className='flex flex-col gap-4'>
          <TextField
            label='Email'
            type='email'
            placeholder='admin@yumquick.com'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            autoFocus
            required
          />
          <TextField
            label='Password'
            type='password'
            placeholder='••••••••'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        {error ? <p className='text-sm text-danger'>{error}</p> : null}

        <Button type='submit' variant='cta' fullWidth disabled={isSubmitting}>
          {isSubmitting ? 'Signing in…' : 'Log in'}
        </Button>
      </form>
    </div>
  );
}
