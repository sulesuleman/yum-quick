import { StyleSheet } from 'react-native';

import { theme } from '@theme';

export function useCategoryFilterStyles() {
  return styles;
}

const styles = StyleSheet.create({
  content: {
    paddingHorizontal: theme.spacing.md,
    paddingBottom: theme.spacing.md,
    paddingTop: theme.spacing.xs,
    gap: theme.spacing.lg
  },
  item: {
    alignItems: 'center',
    gap: theme.spacing.xs
  },
  oval: {
    width: 49,
    height: 62,
    borderRadius: 30,
    backgroundColor: theme.colors.background.yellow2,

    alignItems: 'center',
    justifyContent: 'center'
  },
  ovalActive: {
    backgroundColor: theme.colors.background.yellowBase
  },
  label: {
    fontFamily: theme.typography.families.medium,
    fontSize: 12,
    color: theme.colors.text.primary
  },
  labelActive: {},
  divider: {
    height: 1,
    backgroundColor: '#FFD8C7',
    marginHorizontal: theme.spacing.md,
    marginBottom: 14
  }
});

