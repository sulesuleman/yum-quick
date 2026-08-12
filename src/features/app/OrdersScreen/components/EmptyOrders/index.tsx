import React from 'react';
import { Text, View } from 'react-native';

import TransferDocumentIcon from '@/assets/transfer-document-icon.svg';

import { OrderTab } from '../OrderTabs';
import { useEmptyOrdersStyles } from './useEmptyOrdersStyles';

const MESSAGES: Record<OrderTab, string> = {
  Active: "You don't have any active orders at this time",
  Completed: "You don't have any completed orders yet",
  Cancelled: "You don't have any cancelled orders"
};

type Props = {
  tab: OrderTab;
};

export function EmptyOrders({ tab }: Props) {
  const styles = useEmptyOrdersStyles();
  return (
    <View style={styles.container}>
      <TransferDocumentIcon width={100} height={120} />
      <Text style={styles.text}>{MESSAGES[tab]}</Text>
    </View>
  );
}
