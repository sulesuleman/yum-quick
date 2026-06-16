import { StyleSheet } from 'react-native';

import { theme } from '@theme';

export function useCategoryCardStyles() {
  return styles;
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    gap: theme.spacing.xs,
  },
  iconWrapper: {
    width: 49,
    height: 62,
    borderRadius: 30,
    backgroundColor: theme.colors.background.yellow2,
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
    paddingVertical: 12.5,
    paddingHorizontal: 6
  },
  iconWrapperSelected: {
    backgroundColor: theme.colors.brand.primary,
  },
  icon: {
    width: '100%',
    height: '100%',
    objectFit: 'contain',
    tintColor: theme.colors.brand.primary,
  },
  iconSelected: {
    tintColor: theme.colors.text.inverse,
  },
  label: {
    fontFamily: theme.typography.families.regular,
    fontSize: theme.typography.sizes.input,
    lineHeight: theme.typography.lineHeights.input,
    color: theme.colors.text.primary,
    textAlign: 'center',
    textTransform: 'capitalize',
  },
});
