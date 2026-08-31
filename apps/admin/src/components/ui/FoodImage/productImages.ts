import mexicanAppetizer from '../../../assets/mexican-appetizer.png';

export const PRODUCT_IMAGES: Record<string, string> = {
  'mexican-appetizer': mexicanAppetizer
};

const FALLBACK_IMAGE_KEY = 'mexican-appetizer';

export function resolveProductImage(imageKey: string | undefined): string {
  return PRODUCT_IMAGES[imageKey ?? FALLBACK_IMAGE_KEY] ?? PRODUCT_IMAGES[FALLBACK_IMAGE_KEY];
}
