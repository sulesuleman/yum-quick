import React from 'react';
import { Text, View } from 'react-native';

import { RadioButton } from '@components/RadioButton';

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
      <Text style={styles.price}>${price.toFixed(2)}</Text>
      <RadioButton
        selected={selected}
        onPress={onPress}
        accessibilityRole='checkbox'
        accessibilityLabel={`${name}, $${price.toFixed(2)}`}
        testID={`topping-row-toggle-${testIdSuffix}`}
      />
    </View>
  );
}
