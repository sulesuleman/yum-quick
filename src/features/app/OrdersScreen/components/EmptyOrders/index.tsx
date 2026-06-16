import React from 'react';
import { Text, View } from 'react-native';

import TransferDocumentIcon from '@/assets/transfer-document-icon.svg';

import { useEmptyOrdersStyles } from './useEmptyOrdersStyles';

export function EmptyOrders() {
  const styles = useEmptyOrdersStyles();
  return (
    <View style={styles.container}>
      <TransferDocumentIcon width={100} height={120} />
      <Text style={styles.text}>You don't have any active orders at this time</Text>
    </View>
  );
}
