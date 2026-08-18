import { StyleSheet } from 'react-native';

import { theme } from '@theme';

export function useOrderConfirmedScreenStyles() {
  return styles;
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: theme.colors.background.yellowBase
  },
  customHeader: {
    backgroundColor: theme.colors.background.yellowBase,
    paddingHorizontal: theme.spacing.md * 2,
    paddingBottom: 22,
    flexDirection: 'row',
    alignItems: 'center'
  },
  backBtn: {
    width: 32
  },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: theme.spacing.xl
  },
  title: {
    marginTop: theme.spacing.lg,
    fontFamily: theme.typography.families.bold,
    fontSize: theme.typography.sizes.title,
    color: theme.colors.text.primary
  },
  subtitle: {
    marginTop: theme.spacing.sm,
    textAlign: 'center',
    fontFamily: theme.typography.families.medium,
    fontSize: theme.typography.sizes.body,
    color: theme.colors.text.primary
  },
  deliveryText: {
    marginTop: theme.spacing.lg,
    fontFamily: theme.typography.families.regular,
    fontSize: theme.typography.sizes.body,
    color: theme.colors.text.primary
  },
  trackLink: {
    marginTop: theme.spacing.md,
    fontFamily: theme.typography.families.bold,
    fontSize: theme.typography.sizes.body1,
    color: theme.colors.background.orangeBase
  },
  supportNote: {
    textAlign: 'center',
    paddingHorizontal: theme.spacing.lg,
    marginBottom: theme.spacing['3xl'],
    fontFamily: theme.typography.families.regular,
    fontSize: theme.typography.sizes.input,
    color: theme.colors.text.primary
  }
});
