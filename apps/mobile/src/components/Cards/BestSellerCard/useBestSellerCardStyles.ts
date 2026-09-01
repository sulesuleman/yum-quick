import { StyleSheet } from 'react-native';

import { theme } from '@theme';

export function useBestSellerCardStyles() {
  return styles;
}

const styles = StyleSheet.create({
  container: {
    width: '48%'
  },
  imageCard: {
    position: 'relative',
    width: '100%',
    height: 'auto',
    aspectRatio: 158 / 141,
    marginBottom: 13
  },
  categoryBadge: {
    position: 'absolute',
    top: 8,
    left: 8,
    width: 26,
    height: 26,
    borderRadius: 10,
    backgroundColor: theme.colors.background.card,
    alignItems: 'center',
    justifyContent: 'center'
  },
  categoryIcon: {
    width: 16,
    height: 16,
    resizeMode: 'contain'
  },
  favoriteButton: {
    position: 'absolute',
    top: 8,
    right: 8,
    width: 21,
    height: 21,
    borderRadius: 10.5,
    backgroundColor: theme.colors.background.card
  },
  favoriteButtonActive: {
    backgroundColor: theme.colors.brand.primary
  },
  priceTag: {
    position: 'absolute',
    bottom: 12,
    right: -1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: theme.colors.background.orangeBase,
    height: 16,
    paddingLeft: 6,
    paddingRight: 4,
    borderTopLeftRadius: 30,
    borderBottomLeftRadius: 30
  },
  priceText: {
    fontFamily: theme.typography.families.regular,
    fontSize: theme.typography.sizes.input,
    color: theme.colors.text.inverse
  },
  nameRatingRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    gap: theme.spacing.xs,
    marginBottom: theme.spacing.xs
  },
  name: {
    flex: 1,
    fontFamily: theme.typography.families.medium,
    fontSize: 16,
    color: theme.colors.text.primary
  },
  ratingBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: theme.colors.brand.primary,
    borderRadius: 20,
    paddingHorizontal: theme.spacing.sm,
    paddingVertical: 2,
    gap: 3
  },
  ratingText: {
    fontFamily: theme.typography.families.medium,
    fontSize: theme.typography.sizes.input,
    color: theme.colors.text.inverse
  },
  descriptionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: theme.spacing.xs
  },
  description: {
    flex: 1,
    fontFamily: theme.typography.families.light,
    fontSize: theme.typography.sizes.input,
    color: theme.colors.text.primary,
    opacity: 0.8
  },
  cartBadge: {
    width: 19,
    height: 19,
    borderRadius: 7.31,
    backgroundColor: theme.colors.brand.primary,
    alignItems: 'center',
    justifyContent: 'center'
  }
});
