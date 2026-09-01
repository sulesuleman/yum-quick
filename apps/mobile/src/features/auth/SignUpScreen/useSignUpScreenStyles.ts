import { StyleSheet } from 'react-native';

import { theme } from '@theme';

export function useSignUpScreenStyles() {
  return styles;
}

const styles = StyleSheet.create({
  scroll: {
    paddingHorizontal: theme.spacing.lg,
    paddingTop: theme.spacing.lg,
    paddingBottom: theme.spacing['2xl'],
    gap: theme.spacing.md,
    alignItems: 'center'
  },
  legal: {
    textAlign: 'center',
    fontFamily: theme.typography.families.regular,
    fontSize: theme.typography.sizes.body,
    color: theme.colors.text.primary,
    marginVertical: theme.spacing.sm
  },
  legalLink: {
    color: theme.colors.brand.primary,
    fontFamily: theme.typography.families.bold
  },
  footerCopy: {
    fontFamily: theme.typography.families.regular,
    fontSize: theme.typography.sizes.body,
    color: theme.colors.text.primary,
    marginTop: theme.spacing.md
  },
  footerLink: {
    color: theme.colors.brand.primary,
    fontFamily: theme.typography.families.bold
  }
});
