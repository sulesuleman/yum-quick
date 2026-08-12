import React from 'react';
import {
  Image,
  ImageResizeMode,
  ImageSourcePropType,
  StyleProp,
  View,
  ViewStyle
} from 'react-native';

import { getImageCardDimensions, ImageCardVariant, useImageCardStyles } from './useImageCardStyles';

type ImageCardProps = {
  variant?: ImageCardVariant;
  source?: ImageSourcePropType;
  SvgComponent?: React.ComponentType<{ width?: number | string; height?: number | string }>;
  resizeMode?: ImageResizeMode;
  style?: StyleProp<ViewStyle>;
  children?: React.ReactNode;
  width?: number;
  height?: number;
  borderRadius?: number;
  /** Alt text for the rendered content image. Omit only when the image is purely decorative. */
  accessibilityLabel?: string;
};

export function ImageCard({
  variant = 'md',
  source,
  SvgComponent,
  resizeMode = 'cover',
  style,
  children,
  width,
  height,
  borderRadius,
  accessibilityLabel
}: ImageCardProps) {
  const styles = useImageCardStyles(variant, { width, height, borderRadius });
  const dimensions = getImageCardDimensions(variant, { width, height, borderRadius });

  return (
    <View style={[styles.container, style]}>
      {SvgComponent ? (
        <SvgComponent width={dimensions.width} height={dimensions.height} />
      ) : source ? (
        <Image
          source={source}
          style={styles.image}
          resizeMode={resizeMode}
          accessible={!!accessibilityLabel}
          accessibilityLabel={accessibilityLabel}
          accessibilityRole={accessibilityLabel ? 'image' : undefined}
        />
      ) : (
        <View style={styles.placeholder} />
      )}
      {children}
    </View>
  );
}
