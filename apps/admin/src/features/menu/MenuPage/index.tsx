import { useEffect, useMemo, useState } from 'react';

import type { Category, CategoryIcon, Product } from '@yumquick/api';
import { categoriesApi, productsApi } from '@yumquick/api';

import { EmptyState, FilterChips, PageLoader, ProductCard } from '../../../components';
import { FastFoodIcon, PlusIcon, SearchIcon, TagIcon } from '../../../components/icons';
import { Button, ConfirmDialog, TextField } from '../../../components/ui';
import { AddCategoryModal } from './components/AddCategoryModal';
import { AddProductModal } from './components/AddProductModal';
import { ManageCategoriesModal } from './components/ManageCategoriesModal';

const ALL_FILTER = 'All';

export function MenuPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [categoryFilter, setCategoryFilter] = useState<string>(ALL_FILTER);
  const [query, setQuery] = useState('');
  const [isAdding, setIsAdding] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [isAddingCategory, setIsAddingCategory] = useState(false);
  const [isManagingCategories, setIsManagingCategories] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [deletingProduct, setDeletingProduct] = useState<Product | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    Promise.all([productsApi.list(), categoriesApi.list()])
      .then(([loadedProducts, loadedCategories]) => {
        setProducts(loadedProducts);
        setCategories(loadedCategories);
      })
      .finally(() => setIsLoading(false));
  }, []);

  const categoryFilterOptions = useMemo(
    () => [
      { label: 'All', value: ALL_FILTER },
      ...categories.map((c) => ({ label: c.name, value: c.id }))
    ],
    [categories]
  );

  const filteredProducts = useMemo(() => {
    return products
      .filter((product) => categoryFilter === ALL_FILTER || product.category === categoryFilter)
      .filter((product) => product.name.toLowerCase().includes(query.toLowerCase()));
  }, [products, categoryFilter, query]);

  const handleCreateProduct = async (product: Omit<Product, 'id'>) => {
    const created = await productsApi.create(product);
    setProducts((prev) => [created, ...prev]);
  };

  const handleUpdateProduct = async (product: Omit<Product, 'id'>) => {
    if (!editingProduct) return;
    const updated = await productsApi.update(editingProduct.id, product);
    setProducts((prev) => prev.map((p) => (p.id === updated.id ? updated : p)));
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

  const handleCreateCategory = async (name: string, icon: CategoryIcon) => {
    const created = await categoriesApi.create({
      name,
      icon,
      sortOrder: categories.length
    });
    setCategories((prev) => [...prev, created]);
    setCategoryFilter(created.id);
  };

  const handleRenameCategory = async (category: Category, name: string) => {
    const updated = await categoriesApi.update(category.id, { name });
    setCategories((prev) => prev.map((c) => (c.id === category.id ? updated : c)));
  };

  const handleDeleteCategory = async (category: Category) => {
    await categoriesApi.delete(category.id);
    setCategories((prev) => prev.filter((c) => c.id !== category.id));
    setCategoryFilter((current) => (current === category.id ? ALL_FILTER : current));
  };

  if (isLoading) {
    return <PageLoader />;
  }

  if (categories.length === 0) {
    return (
      <div className='flex h-full flex-col'>
        <EmptyState
          icon={TagIcon}
          title='Build your menu'
          description='Start by adding a category — Snacks, Meal, Drinks — then add items to it.'
        />
        <Button
          variant='cta'
          className='mx-auto -mt-10 gap-2'
          onClick={() => setIsAddingCategory(true)}
        >
          <PlusIcon size={16} />
          Add category
        </Button>

        {isAddingCategory ? (
          <AddCategoryModal
            onClose={() => setIsAddingCategory(false)}
            onCreate={handleCreateCategory}
          />
        ) : null}
      </div>
    );
  }

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
          <Button
            variant='cta'
            className='gap-2 whitespace-nowrap'
            onClick={() => setIsAdding(true)}
          >
            <PlusIcon size={16} />
            Add item
          </Button>
        </div>

        <div className='flex items-center gap-2'>
          <div className='min-w-0 flex-1'>
            <FilterChips
              options={categoryFilterOptions}
              value={categoryFilter}
              onChange={setCategoryFilter}
            />
          </div>
          <button
            type='button'
            onClick={() => setIsAddingCategory(true)}
            className='shrink-0 rounded-full border border-dashed border-divider px-3 py-1.5 text-[13px] font-medium text-muted transition-colors hover:border-brand/50 hover:text-brand'
          >
            + Category
          </button>
          <Button variant='ghost' onClick={() => setIsManagingCategories(true)}>
            Manage
          </Button>
        </div>
      </div>

      <div className='flex flex-1 flex-col gap-3 overflow-y-auto pt-3'>
        {filteredProducts.length === 0 ? (
          <EmptyState
            icon={FastFoodIcon}
            title='No items yet'
            description='Add your first item to this category to see it here.'
          />
        ) : (
          <div className='grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-3'>
            {filteredProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onEdit={setEditingProduct}
                onDelete={setDeletingProduct}
              />
            ))}
          </div>
        )}
      </div>

      {isAdding ? (
        <AddProductModal
          categories={categories}
          defaultCategoryId={categoryFilter !== ALL_FILTER ? categoryFilter : undefined}
          onClose={() => setIsAdding(false)}
          onSubmit={handleCreateProduct}
        />
      ) : null}

      {editingProduct ? (
        <AddProductModal
          categories={categories}
          product={editingProduct}
          onClose={() => setEditingProduct(null)}
          onSubmit={handleUpdateProduct}
        />
      ) : null}

      {isAddingCategory ? (
        <AddCategoryModal
          onClose={() => setIsAddingCategory(false)}
          onCreate={handleCreateCategory}
        />
      ) : null}

      {isManagingCategories ? (
        <ManageCategoriesModal
          categories={categories}
          products={products}
          onClose={() => setIsManagingCategories(false)}
          onRename={handleRenameCategory}
          onDelete={handleDeleteCategory}
        />
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
