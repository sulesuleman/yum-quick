import { StyleSheet } from 'react-native';

import { theme } from '@theme';

export function useFoodItemCardStyles() {
  return styles;
}

const styles = StyleSheet.create({
  container: {
    gap: theme.spacing.sm,
    paddingBottom: theme.spacing.md,
    marginBottom: theme.spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.background.orange2,
  },
  image: {
    width: '100%',
    height: 180,
    borderRadius: 16,
    objectFit: 'cover',
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  nameRatingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.spacing.sm,
    flex: 1,
  },
  name: {
    fontFamily: theme.typography.families.bold,
    fontSize: theme.typography.sizes.body,
    color: theme.colors.text.primary,
  },
  ratingBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: theme.colors.brand.primary,
    borderRadius: 20,
    paddingHorizontal: theme.spacing.sm,
    paddingVertical: 2,
    gap: 3,
  },
  ratingText: {
    fontFamily: theme.typography.families.medium,
    fontSize: theme.typography.sizes.input,
    color: theme.colors.text.inverse,
  },
  starIcon: {
    width: 10,
    height: 10,
  },
  price: {
    fontFamily: theme.typography.families.bold,
    fontSize: theme.typography.sizes.body,
    color: theme.colors.brand.primary,
  },
  description: {
    fontFamily: theme.typography.families.regular,
    fontSize: theme.typography.sizes.input,
    color: theme.colors.text.primary,
    opacity: 0.6,
    lineHeight: theme.typography.lineHeights.body,
  },
});
