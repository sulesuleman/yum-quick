import { useState, type FormEvent } from 'react';

import type { Product } from '@yumquick/api';

import { Button, Checkbox, Modal, Select, TextField } from '../../../../../components/ui';

const CATEGORIES: Product['category'][] = ['snacks', 'meal', 'vegan', 'dessert', 'drinks'];
const CATEGORY_OPTIONS = CATEGORIES.map((category) => ({ label: category, value: category }));

export type AddProductModalProps = {
  onClose: () => void;
  onCreate: (product: Omit<Product, 'id'>) => Promise<void>;
};

export function AddProductModal({ onClose, onCreate }: AddProductModalProps) {
  const [name, setName] = useState('');
  const [subtitle, setSubtitle] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [category, setCategory] = useState<Product['category']>('snacks');
  const [isBestSeller, setIsBestSeller] = useState(false);
  const [isRecommended, setIsRecommended] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const onSubmit = async (event: FormEvent) => {
    event.preventDefault();
    setIsSubmitting(true);
    try {
      await onCreate({
        name,
        subtitle,
        description,
        price: Number(price) || 0,
        category,
        imageKey: 'mexican-appetizer',
        isBestSeller,
        isRecommended,
        rating: 4.5,
        toppings: []
      });
      onClose();
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Modal title='Add menu item' onClose={onClose}>
      <form onSubmit={onSubmit} className='flex flex-col gap-4'>
        <TextField label='Name' value={name} onChange={(e) => setName(e.target.value)} required />
        <TextField
          label='Subtitle'
          value={subtitle}
          onChange={(e) => setSubtitle(e.target.value)}
          placeholder="Chef's special"
        />
        <TextField
          label='Description'
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <div className='flex gap-3'>
          <TextField
            label='Price'
            type='number'
            step='0.01'
            min='0'
            placeholder='0.00'
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            required
            containerClassName='flex-1'
            icon={<span className='text-sm font-semibold'>$</span>}
          />
          <Select
            label='Category'
            value={category}
            onChange={setCategory}
            options={CATEGORY_OPTIONS}
            containerClassName='flex-1'
          />
        </div>

        <div className='flex gap-5'>
          <Checkbox
            label='Best seller'
            checked={isBestSeller}
            onChange={(e) => setIsBestSeller(e.target.checked)}
          />
          <Checkbox
            label='Recommended'
            checked={isRecommended}
            onChange={(e) => setIsRecommended(e.target.checked)}
          />
        </div>

        <Button type='submit' variant='cta' fullWidth disabled={isSubmitting}>
          {isSubmitting ? 'Adding…' : 'Add item'}
        </Button>
      </form>
    </Modal>
  );
}
