import React from 'react';
import { ImageSourcePropType, StyleProp, Text, TouchableOpacity, View, ViewStyle } from 'react-native';

import { FoodImage } from '@components/FoodImage';

import { useOrderCardStyles } from './useOrderCardStyles';

type Props = {
  name: string;
  price: number;
  image?: ImageSourcePropType;
  date?: string;
  itemCount?: number;
  showPrice?: boolean;
  onCancel?: () => void;
  onTrack?: () => void;
  style?: StyleProp<ViewStyle>;
};

export function OrderCard({
  name,
  price,
  image,
  date,
  itemCount,
  showPrice = false,
  onCancel,
  onTrack,
  style
}: Props) {
  const styles = useOrderCardStyles();

  if (showPrice) {
    return (
      <FoodImage
        source={image}
        showPrice
        price={price}
        style={style}
      />
    );
  }

  return (
    <View style={[styles.card, style]}>
      <FoodImage source={image} showPrice price={price} />
      <View style={styles.info}>
        <View style={styles.topRow}>
          <Text style={styles.name} numberOfLines={1}>{name}</Text>
          <Text style={styles.price}>${price.toFixed(2)}</Text>
        </View>
        {(date || itemCount !== undefined) && (
          <View style={styles.metaRow}>
            {date && <Text style={styles.meta}>{date}</Text>}
            {itemCount !== undefined && <Text style={styles.meta}>{itemCount} items</Text>}
          </View>
        )}
        {(onCancel || onTrack) && (
          <View style={styles.buttonsRow}>
            {onCancel && (
              <TouchableOpacity style={styles.cancelBtn} onPress={onCancel} activeOpacity={0.8}>
                <Text style={styles.cancelText}>Cancel Order</Text>
              </TouchableOpacity>
            )}
            {onTrack && (
              <TouchableOpacity style={styles.trackBtn} onPress={onTrack} activeOpacity={0.8}>
                <Text style={styles.trackText}>Track Driver</Text>
              </TouchableOpacity>
            )}
          </View>
        )}
      </View>
    </View>
  );
}
