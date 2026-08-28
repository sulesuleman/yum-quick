import { StyleSheet } from 'react-native';

import { theme } from '@theme';

export function useNotificationsScreenStyles() {
  return styles;
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: theme.colors.background.card
  },
  content: {
    padding: theme.spacing.lg,
    paddingBottom: theme.layout.tabBarHeight + theme.spacing.lg,
    gap: theme.spacing.sm
  },
  emptyScreen: {
    flex: 1,
    backgroundColor: theme.colors.background.card,
    alignItems: 'center',
    justifyContent: 'center',
    padding: theme.spacing.lg
  },
  title: {
    fontFamily: theme.typography.families.bold,
    fontSize: theme.typography.sizes.title,
    color: theme.colors.text.primary
  },
  row: {
    padding: theme.spacing.md,
    borderRadius: theme.radii.field,
    backgroundColor: theme.colors.background.yellow2
  },
  rowUnread: {
    backgroundColor: theme.colors.background.orange2
  },
  rowTitle: {
    fontFamily: theme.typography.families.semiBold,
    fontSize: theme.typography.sizes.body1,
    color: theme.colors.text.primary,
    marginBottom: theme.spacing.xs
  },
  rowMessage: {
    fontFamily: theme.typography.families.regular,
    fontSize: theme.typography.sizes.body,
    color: theme.colors.text.primary
  }
});
