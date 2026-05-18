import { StyleSheet } from 'react-native';

import { theme } from '@/theme';

export const fieldStyles = StyleSheet.create({
  wrapper: {
    width: '100%',
    maxWidth: theme.field.width,
    alignSelf: 'center',
  },
  container: {
    height: theme.field.height,
    width: '100%',
    borderRadius: theme.radii.field,
    backgroundColor: theme.colors.background.yellow2,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: theme.spacing.md,
  },
  containerDisabled: {
    opacity: 0.6,
  },
  input: {
    flex: 1,
    height: '100%',
    fontFamily: theme.typography.families.regular,
    fontSize: theme.typography.sizes.body,
    color: theme.colors.text.primary,
    paddingVertical: 0,
  },
  valueText: {
    flex: 1,
    fontFamily: theme.typography.families.regular,
    fontSize: theme.typography.sizes.body,
    color: theme.colors.text.primary,
    textAlignVertical: 'center',
  },
  adornment: {
    marginLeft: theme.spacing.sm,
    padding: theme.spacing.xs,
  },
  label: {
    marginBottom: theme.spacing.xs,
    fontFamily: theme.typography.families.medium,
    fontSize: theme.typography.sizes.body,
    color: theme.colors.text.primary,
  },
  error: {
    marginTop: theme.spacing.xs,
    fontFamily: theme.typography.families.regular,
    fontSize: theme.typography.sizes.body,
    color: theme.colors.brand.primary,
  },
});
