import { useState } from 'react';

import type { Topping } from '@yumquick/api';

import { PlusIcon, TrashIcon } from '../../../../../../../components/icons';
import { Button, Checkbox, TextField } from '../../../../../../../components/ui';

function generateToppingId(name: string): string {
  const slug = name
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
  return `${slug || 'topping'}-${Date.now().toString(36)}`;
}

export type ToppingsEditorProps = {
  toppings: Topping[];
  onChange: (toppings: Topping[]) => void;
};

export function ToppingsEditor({ toppings, onChange }: ToppingsEditorProps) {
  const [draftName, setDraftName] = useState('');
  const [draftPrice, setDraftPrice] = useState('');
  const [draftDefault, setDraftDefault] = useState(false);

  const handleAdd = () => {
    const name = draftName.trim();
    if (!name) return;
    onChange([
      ...toppings,
      {
        id: generateToppingId(name),
        name,
        price: Number(draftPrice) || 0,
        defaultSelected: draftDefault
      }
    ]);
    setDraftName('');
    setDraftPrice('');
    setDraftDefault(false);
  };

  const handleRemove = (id: string) => onChange(toppings.filter((t) => t.id !== id));

  const handleToggleDefault = (id: string) =>
    onChange(
      toppings.map((t) => (t.id === id ? { ...t, defaultSelected: !t.defaultSelected } : t))
    );

  return (
    <div className='flex flex-col gap-2'>
      <label className='text-sm font-medium text-text'>Toppings</label>

      {toppings.length > 0 ? (
        <div className='flex flex-col gap-2'>
          {toppings.map((topping) => (
            <div
              key={topping.id}
              className='flex items-center gap-2 rounded-2xl border border-divider p-2'
            >
              <div className='flex flex-1 flex-col px-1'>
                <span className='text-sm font-medium text-text'>{topping.name}</span>
                <span className='text-xs text-muted'>Rs {topping.price}</span>
              </div>
              <Checkbox
                label='Default'
                checked={topping.defaultSelected}
                onChange={() => handleToggleDefault(topping.id)}
              />
              <button
                type='button'
                aria-label={`Remove ${topping.name}`}
                onClick={() => handleRemove(topping.id)}
                className='flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-muted transition-colors hover:bg-danger-bg hover:text-danger active:scale-95'
              >
                <TrashIcon size={16} />
              </button>
            </div>
          ))}
        </div>
      ) : (
        <p className='text-xs text-muted'>No toppings yet — add one below.</p>
      )}

      <div className='flex items-end gap-2'>
        <TextField
          placeholder='Topping name'
          value={draftName}
          onChange={(e) => setDraftName(e.target.value)}
          containerClassName='flex-1'
        />
        <TextField
          type='number'
          step='1'
          min='0'
          placeholder='0'
          value={draftPrice}
          onChange={(e) => setDraftPrice(e.target.value)}
          containerClassName='w-24'
          icon={<span className='text-sm font-semibold'>Rs</span>}
        />
        <Button
          variant='ghost'
          onClick={handleAdd}
          disabled={!draftName.trim()}
          className='shrink-0 gap-1 whitespace-nowrap px-4'
        >
          <PlusIcon size={14} />
          Add
        </Button>
      </div>
      <Checkbox
        label='Selected by default'
        checked={draftDefault}
        onChange={(e) => setDraftDefault(e.target.checked)}
      />
    </div>
  );
}
