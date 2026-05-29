import { StyleSheet } from 'react-native';

import { theme } from '@theme';

export function useLoginScreenStyles() {
  return styles;
}

const styles = StyleSheet.create({
  content: {
    flex: 1,
    paddingHorizontal: theme.spacing.lg,
    paddingTop: theme.spacing.xl
  },
  heading: {
    fontFamily: theme.typography.families.bold,
    fontSize: theme.typography.sizes.title,
    color: theme.colors.text.primary,
    marginBottom: theme.spacing.sm
  },
  subheading: {
    fontFamily: theme.typography.families.regular,
    fontSize: theme.typography.sizes.body,
    color: theme.colors.text.primary,
    marginBottom: theme.spacing.xl
  },
  form: {
    gap: theme.spacing.md
  },
  forgot: {
    alignSelf: 'flex-end',
    fontFamily: theme.typography.families.medium,
    fontSize: theme.typography.sizes.body,
    color: theme.colors.brand.primary
  },
  actions: {
    marginTop: theme.spacing.xl,
    gap: theme.spacing.md,
    alignItems: 'center'
  },
  footerCopy: {
    fontFamily: theme.typography.families.regular,
    fontSize: theme.typography.sizes.body,
    color: theme.colors.text.primary
  },
  footerLink: {
    color: theme.colors.brand.primary,
    fontFamily: theme.typography.families.bold
  }
});
