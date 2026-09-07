import { useState, type FormEvent } from 'react';

import type { CategoryIcon } from '@yumquick/api';

import { Button, Modal, Select, TextField } from '../../../../../components/ui';

const ICON_OPTIONS: { label: string; value: CategoryIcon }[] = [
  { label: 'Snacks', value: 'snacks' },
  { label: 'Meal', value: 'meal' },
  { label: 'Vegan', value: 'vegan' },
  { label: 'Dessert', value: 'dessert' },
  { label: 'Drinks', value: 'drinks' },
  { label: 'Other', value: 'other' }
];

export type AddCategoryModalProps = {
  onClose: () => void;
  onCreate: (name: string, icon: CategoryIcon) => Promise<void>;
};

export function AddCategoryModal({ onClose, onCreate }: AddCategoryModalProps) {
  const [name, setName] = useState('');
  const [icon, setIcon] = useState<CategoryIcon>('other');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const onSubmit = async (event: FormEvent) => {
    event.preventDefault();
    setIsSubmitting(true);
    try {
      await onCreate(name.trim(), icon);
      onClose();
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Modal title='Add category' onClose={onClose}>
      <form onSubmit={onSubmit} className='flex flex-col gap-4'>
        <TextField
          label='Name'
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder='e.g. Snacks'
          required
        />
        <Select label='Icon' value={icon} onChange={setIcon} options={ICON_OPTIONS} />

        <Button type='submit' variant='cta' fullWidth disabled={isSubmitting || !name.trim()}>
          {isSubmitting ? 'Adding…' : 'Add category'}
        </Button>
      </form>
    </Modal>
  );
}
