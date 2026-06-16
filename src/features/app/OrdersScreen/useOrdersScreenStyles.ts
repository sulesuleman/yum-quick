import { StyleSheet } from 'react-native';

import { theme } from '@theme';

export function useOrdersScreenStyles() {
  return styles;
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: theme.colors.background.yellowBase
  },
  emptyContent: {
    flexGrow: 1
  }
});
