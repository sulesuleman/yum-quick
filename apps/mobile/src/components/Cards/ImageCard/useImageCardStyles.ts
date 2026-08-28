import { StyleSheet } from 'react-native';

export type ImageCardVariant = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

export const IMAGE_CARD_DIMENSIONS: Record<
  ImageCardVariant,
  { width: number; height: number; borderRadius: number }
> = {
  xs: { width: 71.68141174316406, height: 108, borderRadius: 19.12 },
  sm: { width: 80, height: 80, borderRadius: 20 },
  md: { width: 127, height: 127, borderRadius: 20 },
  lg: { width: 157, height: 157, borderRadius: 31.72 },
  xl: { width: 323, height: 174.00001525878906, borderRadius: 36 }
};

type DimensionOverride = {
  width?: number;
  height?: number;
  borderRadius?: number;
};

export function getImageCardDimensions(variant: ImageCardVariant, override?: DimensionOverride) {
  const base = IMAGE_CARD_DIMENSIONS[variant];
  return {
    width: override?.width ?? base.width,
    height: override?.height ?? base.height,
    borderRadius: override?.borderRadius ?? base.borderRadius
  };
}

export function useImageCardStyles(variant: ImageCardVariant, override?: DimensionOverride) {
  const dimensions = getImageCardDimensions(variant, override);

  return StyleSheet.create({
    container: {
      ...dimensions,
      overflow: 'hidden'
    },
    image: {
      width: '100%',
      height: '100%'
    },
    placeholder: {
      width: '100%',
      height: '100%',
      backgroundColor: '#F0E8D8'
    }
  });
}
