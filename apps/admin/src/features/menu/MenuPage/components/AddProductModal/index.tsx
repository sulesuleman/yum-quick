import { useState, type FormEvent } from 'react';

import type { Category, Product, Topping } from '@yumquick/api';

import { Button, Checkbox, Modal, Select, TextField } from '../../../../../components/ui';
import { ToppingsEditor } from './components/ToppingsEditor';

export type AddProductModalProps = {
  categories: Category[];
  defaultCategoryId?: string;
  product?: Product;
  onClose: () => void;
  onSubmit: (product: Omit<Product, 'id'>) => Promise<void>;
};

export function AddProductModal({
  categories,
  defaultCategoryId,
  product,
  onClose,
  onSubmit
}: AddProductModalProps) {
  const isEditing = Boolean(product);
  const categoryOptions = categories.map((c) => ({ label: c.name, value: c.id }));

  const [name, setName] = useState(product?.name ?? '');
  const [subtitle, setSubtitle] = useState(product?.subtitle ?? '');
  const [description, setDescription] = useState(product?.description ?? '');
  const [price, setPrice] = useState(product ? String(product.price) : '');
  const [category, setCategory] = useState(
    product?.category ?? defaultCategoryId ?? categories[0]?.id ?? ''
  );
  const [isBestSeller, setIsBestSeller] = useState(product?.isBestSeller ?? false);
  const [isRecommended, setIsRecommended] = useState(product?.isRecommended ?? false);
  const [toppings, setToppings] = useState<Topping[]>(product?.toppings ?? []);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    setIsSubmitting(true);
    try {
      await onSubmit({
        name,
        subtitle,
        description,
        price: Number(price) || 0,
        category,
        imageKey: product?.imageKey ?? 'mexican-appetizer',
        isBestSeller,
        isRecommended,
        rating: product?.rating ?? 4.5,
        toppings
      });
      onClose();
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Modal title={isEditing ? 'Edit menu item' : 'Add menu item'} onClose={onClose}>
      <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
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
            step='1'
            min='0'
            placeholder='0'
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            required
            containerClassName='flex-1'
            icon={<span className='text-sm font-semibold'>Rs</span>}
          />
          <Select
            label='Category'
            value={category}
            onChange={setCategory}
            options={categoryOptions}
            containerClassName='flex-1'
          />
        </div>

        <div className='flex gap-5'>
          <Checkbox
            label='Hot seller'
            checked={isBestSeller}
            onChange={(e) => setIsBestSeller(e.target.checked)}
          />
          <Checkbox
            label='Recommended'
            checked={isRecommended}
            onChange={(e) => setIsRecommended(e.target.checked)}
          />
        </div>

        <ToppingsEditor toppings={toppings} onChange={setToppings} />

        <Button type='submit' variant='cta' fullWidth disabled={isSubmitting || !category}>
          {isSubmitting ? 'Saving…' : isEditing ? 'Save changes' : 'Add item'}
        </Button>
      </form>
    </Modal>
  );
}
