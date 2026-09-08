import { useState } from 'react';

import type { Category, Product } from '@yumquick/api';

import { PencilIcon, TrashIcon } from '../../../../../components/icons';
import { Button, Modal, TextField } from '../../../../../components/ui';

export type ManageCategoriesModalProps = {
  categories: Category[];
  products: Product[];
  onClose: () => void;
  onRename: (category: Category, name: string) => Promise<void>;
  onDelete: (category: Category) => Promise<void>;
};

export function ManageCategoriesModal({
  categories,
  products,
  onClose,
  onRename,
  onDelete
}: ManageCategoriesModalProps) {
  const [editingId, setEditingId] = useState<string | null>(null);
  const [draftName, setDraftName] = useState('');
  const [busyId, setBusyId] = useState<string | null>(null);
  const [errorId, setErrorId] = useState<string | null>(null);

  const startEditing = (category: Category) => {
    setEditingId(category.id);
    setDraftName(category.name);
    setErrorId(null);
  };

  const saveRename = async (category: Category) => {
    const name = draftName.trim();
    if (!name || name === category.name) {
      setEditingId(null);
      return;
    }
    setBusyId(category.id);
    try {
      await onRename(category, name);
      setEditingId(null);
    } finally {
      setBusyId(null);
    }
  };

  const handleDelete = async (category: Category) => {
    const itemCount = products.filter((p) => p.category === category.id).length;
    if (itemCount > 0) {
      setErrorId(category.id);
      return;
    }
    setBusyId(category.id);
    try {
      await onDelete(category);
    } finally {
      setBusyId(null);
    }
  };

  return (
    <Modal title='Manage categories' onClose={onClose}>
      <div className='flex flex-col gap-2'>
        {categories.map((category) => {
          const itemCount = products.filter((p) => p.category === category.id).length;
          const isEditing = editingId === category.id;
          const isBusy = busyId === category.id;

          return (
            <div key={category.id} className='flex flex-col gap-1'>
              <div className='flex items-center gap-2 rounded-2xl border border-divider p-2'>
                {isEditing ? (
                  <TextField
                    value={draftName}
                    onChange={(e) => setDraftName(e.target.value)}
                    containerClassName='flex-1'
                    autoFocus
                  />
                ) : (
                  <div className='flex flex-1 flex-col px-2'>
                    <span className='text-sm font-medium text-text'>{category.name}</span>
                    <span className='text-xs text-muted'>
                      {itemCount} item{itemCount === 1 ? '' : 's'}
                    </span>
                  </div>
                )}

                {isEditing ? (
                  <Button variant='cta' onClick={() => saveRename(category)} disabled={isBusy}>
                    Save
                  </Button>
                ) : (
                  <>
                    <button
                      type='button'
                      aria-label={`Rename ${category.name}`}
                      onClick={() => startEditing(category)}
                      className='flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-muted transition-colors hover:bg-orange-2 hover:text-brand active:scale-95'
                    >
                      <PencilIcon size={16} />
                    </button>
                    <button
                      type='button'
                      aria-label={`Delete ${category.name}`}
                      onClick={() => handleDelete(category)}
                      disabled={isBusy}
                      className='flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-muted transition-colors hover:bg-danger-bg hover:text-danger active:scale-95 disabled:opacity-50'
                    >
                      <TrashIcon size={16} />
                    </button>
                  </>
                )}
              </div>
              {errorId === category.id ? (
                <p className='px-2 text-xs text-danger'>
                  Move or remove its {itemCount} item{itemCount === 1 ? '' : 's'} first.
                </p>
              ) : null}
            </div>
          );
        })}
      </div>
    </Modal>
  );
}
