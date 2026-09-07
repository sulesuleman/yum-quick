import React from 'react';
import { Text, View } from 'react-native';

import { RadioButton } from '@components/RadioButton';
import { formatCurrency } from '@/src/utils/currency';

import { useToppingRowStyles } from './useToppingRowStyles';

type ToppingRowProps = {
  name: string;
  price: number;
  selected: boolean;
  onPress: () => void;
};

export function ToppingRow({ name, price, selected, onPress }: ToppingRowProps) {
  const styles = useToppingRowStyles();
  const testIdSuffix = name.toLowerCase().trim().replace(/\s+/g, '-');

  return (
    <View style={styles.row} testID={`topping-row-${testIdSuffix}`}>
      <Text style={styles.name}>{name}</Text>
      <View style={styles.leaderLine} />
      <Text style={styles.price}>{formatCurrency(price)}</Text>
      <RadioButton
        selected={selected}
        onPress={onPress}
        accessibilityRole='checkbox'
        accessibilityLabel={`${name}, ${formatCurrency(price)}`}
        testID={`topping-row-toggle-${testIdSuffix}`}
      />
    </View>
  );
}
