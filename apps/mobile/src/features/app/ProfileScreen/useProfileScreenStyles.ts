import { StyleSheet } from 'react-native';

import { theme } from '@theme';

export function useProfileScreenStyles() {
  return styles;
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: theme.colors.background.card,
    alignItems: 'center',
    padding: theme.spacing.lg,
    gap: theme.spacing.md
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginTop: theme.spacing.xl
  },
  title: {
    fontFamily: theme.typography.families.bold,
    fontSize: theme.typography.sizes.title,
    color: theme.colors.text.primary
  },
  email: {
    fontFamily: theme.typography.families.regular,
    fontSize: theme.typography.sizes.body,
    color: theme.colors.text.placeholder
  },
  navList: {
    width: '100%',
    marginTop: theme.spacing.lg,
    gap: theme.spacing.xs
  },
  navRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: theme.spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.background.divider
  },
  navLabel: {
    fontFamily: theme.typography.families.medium,
    fontSize: theme.typography.sizes.body1,
    color: theme.colors.text.primary
  },
  navChevron: {
    fontSize: theme.typography.sizes.body1,
    color: theme.colors.text.placeholder
  },
  actions: {
    width: '80%',
    marginTop: theme.spacing.lg
  }
});
