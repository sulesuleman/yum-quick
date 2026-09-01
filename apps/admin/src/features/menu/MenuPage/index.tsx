import { useEffect, useMemo, useState } from 'react';

import type { Product } from '@yumquick/api';
import { productsApi } from '@yumquick/api';

import { EmptyState, FilterChips, PageLoader, ProductRow } from '../../../components';
import { FastFoodIcon, PlusIcon, SearchIcon } from '../../../components/icons';
import { Button, ConfirmDialog, TextField } from '../../../components/ui';
import { AddProductModal } from './components/AddProductModal';

type CategoryFilter = Product['category'] | 'All';

const CATEGORY_FILTERS: { label: string; value: CategoryFilter }[] = [
  { label: 'All', value: 'All' },
  { label: 'Snacks', value: 'snacks' },
  { label: 'Meal', value: 'meal' },
  { label: 'Vegan', value: 'vegan' },
  { label: 'Dessert', value: 'dessert' },
  { label: 'Drinks', value: 'drinks' }
];

export function MenuPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [category, setCategory] = useState<CategoryFilter>('All');
  const [query, setQuery] = useState('');
  const [isAdding, setIsAdding] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [deletingProduct, setDeletingProduct] = useState<Product | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    productsApi.list().then(setProducts).finally(() => setIsLoading(false));
  }, []);

  const filteredProducts = useMemo(() => {
    return products
      .filter((product) => category === 'All' || product.category === category)
      .filter((product) => product.name.toLowerCase().includes(query.toLowerCase()));
  }, [products, category, query]);

  const handleCreate = async (product: Omit<Product, 'id'>) => {
    const created = await productsApi.create(product);
    setProducts((prev) => [created, ...prev]);
  };

  const handleConfirmDelete = async () => {
    if (!deletingProduct) return;
    setIsDeleting(true);
    try {
      await productsApi.delete(deletingProduct.id);
      setProducts((prev) => prev.filter((p) => p.id !== deletingProduct.id));
      setDeletingProduct(null);
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <div className='flex h-full flex-col'>
      <div className='flex shrink-0 flex-col gap-3 bg-card pb-3 shadow-[0_6px_10px_-6px_rgba(57,23,19,0.12)]'>
        <div className='flex flex-col gap-3 sm:flex-row sm:items-center'>
          <TextField
            placeholder='Search menu items'
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            icon={<SearchIcon size={16} />}
            containerClassName='flex-1 sm:max-w-sm'
          />
          <Button variant='cta' className='gap-2 whitespace-nowrap' onClick={() => setIsAdding(true)}>
            <PlusIcon size={16} />
            Add item
          </Button>
        </div>
        <FilterChips options={CATEGORY_FILTERS} value={category} onChange={setCategory} />
      </div>

      {isLoading ? (
        <PageLoader />
      ) : (
        <div className='flex flex-1 flex-col gap-3 overflow-y-auto pt-3'>
          {filteredProducts.length === 0 ? (
            <EmptyState
              icon={FastFoodIcon}
              title='No menu items found'
              description='Try a different search or category, or add a new item to the menu.'
            />
          ) : (
            filteredProducts.map((product) => (
              <ProductRow key={product.id} product={product} onDelete={setDeletingProduct} />
            ))
          )}
        </div>
      )}

      {isAdding ? (
        <AddProductModal onClose={() => setIsAdding(false)} onCreate={handleCreate} />
      ) : null}

      {deletingProduct ? (
        <ConfirmDialog
          title='Remove menu item'
          message={`Remove "${deletingProduct.name}" from the menu? This can't be undone.`}
          confirmLabel='Remove'
          variant='danger'
          isLoading={isDeleting}
          onConfirm={handleConfirmDelete}
          onCancel={() => setDeletingProduct(null)}
        />
      ) : null}
    </div>
  );
}
