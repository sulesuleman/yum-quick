import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';

import { useOrderTabsStyles } from './useOrderTabsStyles';

const TABS = ['Active', 'Completed', 'Cancelled'] as const;
export type OrderTab = (typeof TABS)[number];

type Props = {
  activeTab: OrderTab;
  onTabChange: (tab: OrderTab) => void;
};

export function OrderTabs({ activeTab, onTabChange }: Props) {
  const styles = useOrderTabsStyles();

  return (
    <View style={styles.container}>
      {TABS.map(tab => {
        const isActive = activeTab === tab;
        return (
          <TouchableOpacity
            key={tab}
            style={[styles.tab, isActive ? styles.tabActive : styles.tabInactive]}
            onPress={() => onTabChange(tab)}
            activeOpacity={0.8}
          >
            <Text style={[styles.tabText, isActive ? styles.tabTextActive : styles.tabTextInactive]}>
              {tab}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}
