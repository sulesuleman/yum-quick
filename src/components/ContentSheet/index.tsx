import React from 'react';
import { ScrollView, StyleProp, ViewStyle } from 'react-native';

import { useContentSheetStyles } from './useContentSheetStyles';

type Props = {
  children: React.ReactNode;
  paddingBottom?: number;
  contentStyle?: StyleProp<ViewStyle>;
};

export function ContentSheet({ children, paddingBottom = 100, contentStyle }: Props) {
  const styles = useContentSheetStyles();
  return (
    <ScrollView
      style={styles.scroll}
      contentContainerStyle={[styles.content, { paddingBottom }, contentStyle]}
      showsVerticalScrollIndicator={false}
      keyboardShouldPersistTaps='handled'
    >
      {children}
    </ScrollView>
  );
}
