import { ImageSourcePropType } from 'react-native';

export const PRODUCT_IMAGES: Record<string, ImageSourcePropType> = {
  'mexican-appetizer': require('@/assets/mexican-appetizer.png')
};

const FALLBACK_IMAGE_KEY = 'mexican-appetizer';

export function resolveProductImage(imageKey: string | undefined): ImageSourcePropType {
  return PRODUCT_IMAGES[imageKey ?? FALLBACK_IMAGE_KEY] ?? PRODUCT_IMAGES[FALLBACK_IMAGE_KEY];
}
