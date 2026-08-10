import { StyleSheet } from 'react-native';

import { theme } from '@theme';

export function useToppingRowStyles() {
  return styles;
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: theme.spacing.sm,
    gap: theme.spacing.sm
  },
  name: {
    fontFamily: theme.typography.families.regular,
    fontSize: theme.typography.sizes.body,
    color: theme.colors.text.primary
  },
  leaderLine: {
    flex: 1,
    height: 0,
    borderBottomWidth: 1,
    borderStyle: 'dashed',
    borderBottomColor: theme.colors.background.divider,
    marginHorizontal: theme.spacing.sm
  },
  price: {
    fontFamily: theme.typography.families.light,
    fontSize: theme.typography.sizes.input,
    color: theme.colors.text.primary,
    opacity: 0.7
  }
});
