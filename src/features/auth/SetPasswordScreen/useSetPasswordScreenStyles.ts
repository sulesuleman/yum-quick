import { StyleSheet } from 'react-native';

import { theme } from '@theme';

export function useSetPasswordScreenStyles() {
  return styles;
}

const styles = StyleSheet.create({
  content: {
    flex: 1,
    paddingHorizontal: theme.spacing.lg,
    paddingTop: theme.spacing.xl
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
  actions: {
    marginTop: theme.spacing.xl,
    alignItems: 'center'
  },
  rootError: {
    fontFamily: theme.typography.families.medium,
    fontSize: theme.typography.sizes.body,
    color: theme.colors.brand.primary,
    marginTop: theme.spacing.sm
  }
});
