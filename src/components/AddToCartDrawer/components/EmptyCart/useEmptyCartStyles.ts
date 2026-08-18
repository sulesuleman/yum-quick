import { StyleSheet } from 'react-native';

import { theme } from '@theme';

export function useEmptyCartStyles() {
  return styles;
}

const styles = StyleSheet.create({
  scrollContent: {
    flexGrow: 1,
    width: '100%',
    alignItems: 'center',
    paddingVertical: 70,
    paddingHorizontal: 24
  },
  headerText: {
    fontSize: 24,
    color: theme.colors.text.inverse,
    fontWeight: 'bold'
  }
});
