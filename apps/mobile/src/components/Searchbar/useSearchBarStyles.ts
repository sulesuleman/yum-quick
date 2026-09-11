import { StyleSheet } from 'react-native';

import { theme } from '@theme';

export function useSearchbarStyles() {
  return styles;
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: theme.colors.background.card,
    borderRadius: 30,
    paddingHorizontal: 12,
    paddingVertical: 3,
    height: 26,
    gap: theme.spacing.sm,
    flex: 1
  },
  searchIcon: {
    width: 18,
    height: 18,
    tintColor: theme.colors.text.primary
  },
  input: {
    flex: 1,
    fontFamily: theme.typography.families.regular,
    fontSize: theme.typography.sizes.input,
    color: theme.colors.text.placeholder,
    lineHeight: theme.typography.lineHeights.input,
    padding: 0
  }
});
