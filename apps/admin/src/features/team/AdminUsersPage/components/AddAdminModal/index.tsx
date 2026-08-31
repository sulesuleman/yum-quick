import { useState, type FormEvent } from 'react';

import type { Admin } from '@yumquick/api';

import { Button, Modal, TextField } from '../../../../../components/ui';

export type AddAdminModalProps = {
  onClose: () => void;
  onCreate: (admin: Omit<Admin, 'id'>) => Promise<void>;
  existingEmails: string[];
};

export function AddAdminModal({ onClose, onCreate, existingEmails }: AddAdminModalProps) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const onSubmit = async (event: FormEvent) => {
    event.preventDefault();
    setError('');

    if (existingEmails.includes(email.trim().toLowerCase())) {
      setError('An admin with this email already exists.');
      return;
    }

    setIsSubmitting(true);
    try {
      await onCreate({ name: name.trim(), email: email.trim(), password, isActive: true });
      onClose();
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Modal title='Add admin user' onClose={onClose}>
      <form onSubmit={onSubmit} className='flex flex-col gap-4'>
        <TextField label='Full name' value={name} onChange={(e) => setName(e.target.value)} required />
        <TextField
          label='Email'
          type='email'
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <TextField
          label='Password'
          type='password'
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          minLength={6}
          required
        />
        {error ? <p className='text-sm text-danger'>{error}</p> : null}
        <Button type='submit' variant='cta' fullWidth disabled={isSubmitting}>
          {isSubmitting ? 'Adding…' : 'Add admin'}
        </Button>
      </form>
    </Modal>
  );
}
