import React from 'react';
import { Image, ImageSourcePropType, StyleProp, Text, View, ViewStyle } from 'react-native';

import { formatCurrency } from '@/src/utils/currency';

import { useFoodImageStyles } from './useFoodImageStyles';

type Props = {
  source?: ImageSourcePropType;
  SvgComponent?: React.ComponentType<{ width?: number; height?: number }>;
  width?: number;
  height?: number;
  borderRadius?: number;
  showPrice?: boolean;
  price?: number;
  style?: StyleProp<ViewStyle>;
};

export function FoodImage({
  source,
  SvgComponent,
  width = 72,
  height = 108,
  borderRadius = 19.12,
  showPrice = false,
  price,
  style
}: Props) {
  const styles = useFoodImageStyles({ width, height, borderRadius });

  return (
    <View style={[styles.container, style]}>
      {SvgComponent ? (
        <SvgComponent width={width} height={height} />
      ) : source ? (
        <Image source={source} style={styles.image} resizeMode='cover' />
      ) : (
        <View style={styles.placeholder} />
      )}
      {showPrice && price !== undefined && (
        <View style={styles.priceOverlay}>
          <Text style={styles.priceText}>{formatCurrency(price)}</Text>
        </View>
      )}
    </View>
  );
}
