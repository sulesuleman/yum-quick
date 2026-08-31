import type { Product } from '@yumquick/api';

import { TrashIcon } from '../icons';
import { FoodImage, resolveProductImage } from '../ui';

export type ProductRowProps = {
  product: Product;
  onDelete?: (product: Product) => void;
};

export function ProductRow({ product, onDelete }: ProductRowProps) {
  return (
    <div className='flex items-center gap-3 rounded-2xl border border-divider bg-card p-4 transition-all duration-150 hover:border-brand/30 hover:shadow-[0_8px_18px_-12px_rgba(57,23,19,0.25)]'>
      <FoodImage
        src={resolveProductImage(product.imageKey)}
        width={56}
        height={56}
        borderRadius={16}
        showPrice
        price={product.price}
      />

      <div className='flex min-w-0 flex-1 flex-col gap-0.5'>
        <span className='truncate text-[15px] font-semibold text-text'>{product.name}</span>
        <span className='truncate text-[13px] text-muted'>{product.subtitle}</span>
        <div className='mt-0.5 flex items-center gap-1.5'>
          <span className='text-xs font-medium text-brand capitalize'>{product.category}</span>
          {product.isBestSeller ? (
            <span className='text-xs font-medium text-success'>Best seller</span>
          ) : null}
        </div>
      </div>

      {onDelete ? (
        <button
          type='button'
          aria-label={`Delete ${product.name}`}
          onClick={() => onDelete(product)}
          className='flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-muted transition-colors hover:bg-danger-bg hover:text-danger active:scale-95'
        >
          <TrashIcon size={17} />
        </button>
      ) : null}
    </div>
  );
}
