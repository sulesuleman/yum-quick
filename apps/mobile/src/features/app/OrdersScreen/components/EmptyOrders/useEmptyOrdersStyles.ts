import { StyleSheet } from 'react-native';

import { theme } from '@theme';

export function useEmptyOrdersStyles() {
  return styles;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  text: {
    fontFamily: theme.typography.families.medium,
    fontSize: 16,
    color: theme.colors.brand.primary,
    textAlign: 'center',
    maxWidth: 200,
    marginTop: theme.spacing.md,
    lineHeight: 24
  }
});
