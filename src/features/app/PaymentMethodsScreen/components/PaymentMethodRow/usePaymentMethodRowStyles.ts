import { StyleSheet } from 'react-native';

import { theme } from '@theme';

export function usePaymentMethodRowStyles() {
  return styles;
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 27,
    marginHorizontal: theme.spacing.md,
    paddingHorizontal: theme.spacing.md,
    paddingVertical: 18,
    borderTopWidth: 1,
    borderTopColor: theme.colors.background.divider,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.background.divider
  },
  iconBox: {
    width: 40
  },
  label: {
    flex: 1,
    fontFamily: theme.typography.families.regular,
    fontSize: theme.typography.sizes.subHeading,
    color: theme.colors.text.primary
  }
});
