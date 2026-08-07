import { StyleSheet } from 'react-native';

import { theme } from '@theme';

export function useAddressRowStyles() {
  return styles;
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 15,
    marginHorizontal: theme.spacing.md,
    paddingHorizontal: theme.spacing.md,
    paddingVertical: 21,
    borderTopWidth: 1,
    borderTopColor: theme.colors.background.divider,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.background.divider
  },
  info: {
    flex: 1,
    gap: 5
  },
  label: {
    fontFamily: theme.typography.families.medium,
    fontSize: theme.typography.sizes.subHeading,
    color: theme.colors.text.primary
  },
  address: {
    fontFamily: theme.typography.families.light,
    fontSize: theme.typography.sizes.body,
    color: theme.colors.text.primary
  }
});
