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
      <TouchableOpacity onPress={onItemPress}>
        <PlusIcon width={128} height={128} />
      </TouchableOpacity>
      <Text style={styles.headerText}>Want to add something?</Text>
    </View>
  );
}
