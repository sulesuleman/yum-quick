import type { Product } from '@yumquick/api';

import { PencilIcon, TrashIcon } from '../icons';
import { ProductBadges } from '../ProductBadges';
import { FoodImage, resolveProductImage } from '../ui';

export type ProductCardProps = {
  product: Product;
  onEdit?: (product: Product) => void;
  onDelete?: (product: Product) => void;
};

export function ProductCard({ product, onEdit, onDelete }: ProductCardProps) {
  return (
    <div className='flex flex-col gap-3 rounded-2xl border border-divider bg-card p-4 transition-all duration-150 hover:border-brand/30 hover:shadow-[0_8px_18px_-12px_rgba(57,23,19,0.25)]'>
      <div className='flex items-start gap-3'>
        <FoodImage
          src={resolveProductImage(product.imageKey)}
          width={64}
          height={64}
          borderRadius={16}
          showPrice
          price={product.price}
        />
        <div className='flex min-w-0 flex-1 flex-col gap-0.5'>
          <span className='truncate text-[15px] font-semibold text-text'>{product.name}</span>
          <span className='truncate text-[13px] text-muted'>{product.subtitle}</span>
        </div>
        {onEdit || onDelete ? (
          <div className='flex shrink-0 flex-col items-center'>
            {onEdit ? (
              <button
                type='button'
                aria-label={`Edit ${product.name}`}
                onClick={() => onEdit(product)}
                className='flex h-9 w-9 items-center justify-center rounded-full text-muted transition-colors hover:bg-orange-2 hover:text-brand active:scale-95'
              >
                <PencilIcon size={16} />
              </button>
            ) : null}
            {onEdit && onDelete ? <div className='h-px w-5 bg-divider' /> : null}
            {onDelete ? (
              <button
                type='button'
                aria-label={`Delete ${product.name}`}
                onClick={() => onDelete(product)}
                className='flex h-9 w-9 items-center justify-center rounded-full text-muted transition-colors hover:bg-danger-bg hover:text-danger active:scale-95'
              >
                <TrashIcon size={17} />
              </button>
            ) : null}
          </div>
        ) : null}
      </div>

      <ProductBadges isBestSeller={product.isBestSeller} isRecommended={product.isRecommended} />
    </div>
  );
}
