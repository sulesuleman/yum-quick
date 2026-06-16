import { StyleSheet } from 'react-native';

import { theme } from '@theme';

export function useOrderTabsStyles() {
  return styles;
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
    paddingTop: theme.spacing.md,
    paddingBottom: 19,
    gap: theme.spacing.sm
  },
  tab: {
    borderRadius: 20,
    paddingVertical: 8,
    paddingHorizontal: 20
  },
  tabActive: {
    backgroundColor: theme.colors.background.orangeBase
  },
  tabInactive: {
    backgroundColor: theme.colors.background.orange2
  },
  tabText: {
    fontSize: 13
  },
  tabTextActive: {
    fontFamily: theme.typography.families.bold,
    color: '#FFFFFF'
  },
  tabTextInactive: {
    fontFamily: theme.typography.families.medium,
    color: theme.colors.brand.primary
  }
});
