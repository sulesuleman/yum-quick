import { StyleSheet } from 'react-native';

import { theme } from '@theme';

export function useQuantityStepperStyles() {
  return styles;
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.spacing.md,
    backgroundColor: theme.colors.background.card,
    borderRadius: theme.radii.pill,
    paddingHorizontal: theme.spacing.sm,
    paddingVertical: theme.spacing.xs
  },
  button: {
    width: 28,
    height: 28,
    borderRadius: theme.radii.pill
  },
  minusButton: {
    backgroundColor: theme.colors.brand.secondary
  },
  plusButton: {
    backgroundColor: theme.colors.brand.primary
  },
  buttonDisabled: {
    opacity: 0.5
  },
  value: {
    fontFamily: theme.typography.families.semiBold,
    fontSize: theme.typography.sizes.body,
    color: theme.colors.text.primary,
    minWidth: 16,
    textAlign: 'center'
  }
});
