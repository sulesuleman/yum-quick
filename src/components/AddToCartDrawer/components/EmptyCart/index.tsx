import * as React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';

import PlusIcon from '@/assets/PlusIcon.svg';

import { useEmptyCartStyles } from './useEmptyCartStyles';

type Props = {
  onItemPress?: () => void;
};

export function EmptyCart({ onItemPress }: Props) {
  const styles = useEmptyCartStyles();

  return (
    <View style={styles.scrollContent}>
      <Text style={styles.emptyCartText} numberOfLines={1}>
        Your cart is empty
      </Text>
      <View style={styles.addToCartGroup}>
        <TouchableOpacity onPress={onItemPress}>
          <PlusIcon width={184} height={184} />
        </TouchableOpacity>
        <Text style={styles.headerText}>Want to add something?</Text>
      </View>
    </View>
  );
}
